-- Migration: User Assessment History (Fixed)
-- Description: Track assessment results over time for authenticated users
-- Created: 2025-01-18
-- Fixed: Removed dependencies on tables that don't exist in your database

-- Create table for user assessment history
CREATE TABLE IF NOT EXISTS user_assessment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Assessment details
  tool_name VARCHAR(100) NOT NULL,
  assessment_type VARCHAR(100) NOT NULL,
  assessment_version VARCHAR(20) DEFAULT 'v1.0',

  -- Results
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (ROUND((score::DECIMAL / NULLIF(max_score, 0)) * 100, 2)) STORED,
  level VARCHAR(50),
  severity_score INTEGER CHECK (severity_score >= 0 AND severity_score <= 100),

  -- Detailed results
  assessment_results JSONB NOT NULL DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  question_responses JSONB,

  -- Context
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_seconds INTEGER,
  device_type VARCHAR(50),

  -- Comparison with previous assessments
  previous_assessment_id UUID REFERENCES user_assessment_history(id),
  score_change INTEGER,
  improvement_percentage DECIMAL(5,2),

  -- Flags
  is_baseline BOOLEAN DEFAULT FALSE,
  flagged_for_review BOOLEAN DEFAULT FALSE,
  crisis_level VARCHAR(20) CHECK (crisis_level IN ('none', 'mild', 'moderate', 'severe', 'imminent')),
  provider_notified BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- HIPAA compliance
  phi_accessed_by JSONB DEFAULT '[]',
  retention_required_until TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 years')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_assessment_user_id ON user_assessment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_assessment_type ON user_assessment_history(user_id, assessment_type);
CREATE INDEX IF NOT EXISTS idx_user_assessment_completed ON user_assessment_history(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_assessment_crisis ON user_assessment_history(crisis_level) WHERE crisis_level IN ('severe', 'imminent');
CREATE INDEX IF NOT EXISTS idx_user_assessment_flagged ON user_assessment_history(flagged_for_review) WHERE flagged_for_review = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_assessment_trending ON user_assessment_history(user_id, assessment_type, completed_at DESC);

-- Enable Row Level Security
ALTER TABLE user_assessment_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own assessment history
CREATE POLICY "Users can view own assessment history"
  ON user_assessment_history
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy: Users can insert their own assessments
CREATE POLICY "Users can insert own assessments"
  ON user_assessment_history
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create or replace the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_user_assessment_history_updated_at ON user_assessment_history;
CREATE TRIGGER update_user_assessment_history_updated_at
  BEFORE UPDATE ON user_assessment_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate score change from previous assessment
CREATE OR REPLACE FUNCTION calculate_assessment_change()
RETURNS TRIGGER AS $$
DECLARE
  prev_record RECORD;
BEGIN
  -- Find most recent previous assessment of same type
  SELECT * INTO prev_record
  FROM user_assessment_history
  WHERE user_id = NEW.user_id
    AND assessment_type = NEW.assessment_type
    AND id != NEW.id
  ORDER BY completed_at DESC
  LIMIT 1;

  IF FOUND THEN
    NEW.previous_assessment_id := prev_record.id;
    NEW.score_change := NEW.score - prev_record.score;
    NEW.improvement_percentage := ROUND(
      ((NEW.score - prev_record.score)::DECIMAL / NULLIF(prev_record.score, 0)) * 100,
      2
    );
  ELSE
    -- This is the first assessment of this type
    NEW.is_baseline := TRUE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate changes on insert
DROP TRIGGER IF EXISTS calculate_user_assessment_change ON user_assessment_history;
CREATE TRIGGER calculate_user_assessment_change
  BEFORE INSERT ON user_assessment_history
  FOR EACH ROW
  EXECUTE FUNCTION calculate_assessment_change();

-- Function to migrate guest assessments when user signs up
CREATE OR REPLACE FUNCTION migrate_guest_to_user_assessments(
  p_email VARCHAR,
  p_user_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  migrated_count INTEGER := 0;
  guest_record RECORD;
BEGIN
  -- Loop through all guest assessments for this email
  FOR guest_record IN
    SELECT * FROM guest_assessment_emails
    WHERE email = LOWER(p_email)
      AND converted_to_user = FALSE
  LOOP
    -- Insert into user_assessment_history
    INSERT INTO user_assessment_history (
      user_id,
      tool_name,
      assessment_type,
      score,
      max_score,
      level,
      assessment_results,
      recommendations,
      completed_at,
      is_baseline
    )
    VALUES (
      p_user_id,
      guest_record.tool_name,
      guest_record.assessment_type,
      COALESCE((guest_record.assessment_results->>'score')::INTEGER, 0),
      COALESCE((guest_record.assessment_results->>'maxScore')::INTEGER, 100),
      guest_record.assessment_results->>'level',
      guest_record.assessment_results,
      guest_record.assessment_results->'recommendations',
      guest_record.created_at,
      TRUE
    );

    -- Mark guest record as converted
    UPDATE guest_assessment_emails
    SET
      converted_to_user = TRUE,
      converted_user_id = p_user_id,
      updated_at = NOW()
    WHERE id = guest_record.id;

    migrated_count := migrated_count + 1;
  END LOOP;

  RETURN migrated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create materialized view for assessment trends
CREATE MATERIALIZED VIEW IF NOT EXISTS user_assessment_trends AS
SELECT
  user_id,
  assessment_type,
  COUNT(*) as total_assessments,
  AVG(score) as avg_score,
  MIN(score) as min_score,
  MAX(score) as max_score,
  STDDEV(score) as score_stddev,
  MIN(completed_at) as first_assessment_date,
  MAX(completed_at) as last_assessment_date,
  -- Calculate trend direction
  CASE
    WHEN COUNT(*) >= 2 THEN
      CASE
        WHEN (
          SELECT score FROM user_assessment_history uah2
          WHERE uah2.user_id = uah1.user_id
            AND uah2.assessment_type = uah1.assessment_type
          ORDER BY completed_at DESC LIMIT 1
        ) > (
          SELECT score FROM user_assessment_history uah3
          WHERE uah3.user_id = uah1.user_id
            AND uah3.assessment_type = uah1.assessment_type
          ORDER BY completed_at ASC LIMIT 1
        ) THEN 'improving'
        WHEN (
          SELECT score FROM user_assessment_history uah2
          WHERE uah2.user_id = uah1.user_id
            AND uah2.assessment_type = uah1.assessment_type
          ORDER BY completed_at DESC LIMIT 1
        ) < (
          SELECT score FROM user_assessment_history uah3
          WHERE uah3.user_id = uah1.user_id
            AND uah3.assessment_type = uah1.assessment_type
          ORDER BY completed_at ASC LIMIT 1
        ) THEN 'declining'
        ELSE 'stable'
      END
    ELSE 'insufficient_data'
  END as trend_direction
FROM user_assessment_history uah1
GROUP BY user_id, assessment_type;

-- Create unique index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_assessment_trends_unique
  ON user_assessment_trends(user_id, assessment_type);

-- Function to refresh trends
CREATE OR REPLACE FUNCTION refresh_assessment_trends()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_assessment_trends;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE user_assessment_history IS 'HIPAA-compliant storage of mental health assessment results for authenticated users with progress tracking';
COMMENT ON COLUMN user_assessment_history.assessment_results IS 'Complete JSON snapshot of assessment results';
COMMENT ON COLUMN user_assessment_history.question_responses IS 'Individual question answers for detailed analysis and research';
COMMENT ON COLUMN user_assessment_history.previous_assessment_id IS 'Links to previous assessment for tracking progress over time';
COMMENT ON FUNCTION migrate_guest_to_user_assessments IS 'Migrates guest assessment data to user account when they sign up';
COMMENT ON MATERIALIZED VIEW user_assessment_trends IS 'Aggregated trends and statistics for user assessments - refresh periodically';
