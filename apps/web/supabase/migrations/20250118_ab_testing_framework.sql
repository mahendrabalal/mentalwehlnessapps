-- Migration: A/B Testing Framework
-- Description: Comprehensive experimentation platform for CTA optimization
-- Created: 2025-01-18
-- Best Practice: Statistical significance tracking with multi-armed bandit support

-- Create table for A/B test experiments
CREATE TABLE IF NOT EXISTS ab_test_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  hypothesis TEXT, -- What we're testing and why

  -- Experiment configuration
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
  type VARCHAR(50) NOT NULL DEFAULT 'ab_test' CHECK (type IN ('ab_test', 'multivariate', 'multi_armed_bandit')),
  target_metric VARCHAR(100) NOT NULL, -- e.g., 'signup_conversion', 'email_capture', 'assessment_completion'

  -- Targeting
  page_url_pattern VARCHAR(500), -- URL pattern where test runs (e.g., '/tools/%')
  assessment_type VARCHAR(100), -- Specific assessment or NULL for all
  user_segment JSONB DEFAULT '{}', -- User targeting criteria

  -- Traffic allocation
  traffic_allocation_percentage INTEGER DEFAULT 100 CHECK (traffic_allocation_percentage >= 0 AND traffic_allocation_percentage <= 100),

  -- Timing
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Statistical settings
  required_sample_size INTEGER DEFAULT 1000, -- Minimum participants per variant
  confidence_level DECIMAL(3,2) DEFAULT 0.95, -- 95% confidence
  minimum_detectable_effect DECIMAL(5,2) DEFAULT 5.00, -- 5% minimum improvement

  -- Multi-armed bandit settings (for adaptive allocation)
  enable_adaptive_allocation BOOLEAN DEFAULT FALSE,
  exploration_rate DECIMAL(3,2) DEFAULT 0.10, -- Epsilon for epsilon-greedy algorithm

  -- Results (calculated)
  winner_variant_id UUID,
  is_statistically_significant BOOLEAN DEFAULT FALSE,
  primary_metric_improvement DECIMAL(7,2), -- Percentage improvement of winner

  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for test variants
CREATE TABLE IF NOT EXISTS ab_test_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES ab_test_experiments(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Variant configuration
  is_control BOOLEAN DEFAULT FALSE,
  traffic_weight INTEGER DEFAULT 50 CHECK (traffic_weight >= 0 AND traffic_weight <= 100), -- Percentage of traffic

  -- CTA content variations
  variant_config JSONB NOT NULL DEFAULT '{}', -- Complete variant configuration
  /*
    Example variant_config structure:
    {
      "cta_text": "Get Your Results Now",
      "cta_color": "#FF5733",
      "button_size": "large",
      "headline": "Discover Your Mental Wellness Score",
      "subheadline": "Free personalized insights in 2 minutes",
      "show_social_proof": true,
      "urgency_message": "Join 10,000+ users",
      "form_fields": ["email"],
      "position": "modal",
      "trigger_timing": "on_completion"
    }
  */

  -- Performance metrics (aggregated)
  total_impressions INTEGER DEFAULT 0,
  total_interactions INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,

  conversion_rate DECIMAL(7,4) GENERATED ALWAYS AS (
    CASE
      WHEN total_impressions > 0
      THEN ROUND((total_conversions::DECIMAL / total_impressions) * 100, 4)
      ELSE 0
    END
  ) STORED,

  interaction_rate DECIMAL(7,4) GENERATED ALWAYS AS (
    CASE
      WHEN total_impressions > 0
      THEN ROUND((total_interactions::DECIMAL / total_impressions) * 100, 4)
      ELSE 0
    END
  ) STORED,

  -- Statistical measures
  confidence_interval_lower DECIMAL(7,4),
  confidence_interval_upper DECIMAL(7,4),
  p_value DECIMAL(10,8),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(experiment_id, name)
);

-- Create table for user variant assignments
CREATE TABLE IF NOT EXISTS ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES ab_test_experiments(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES ab_test_variants(id) ON DELETE CASCADE,

  -- User identification (support both authenticated and guest users)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_identifier VARCHAR(255), -- Cookie/fingerprint for guest users
  session_id VARCHAR(255),

  -- Assignment context
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assignment_method VARCHAR(50) DEFAULT 'random' CHECK (assignment_method IN ('random', 'adaptive', 'sticky', 'forced')),

  -- Device context
  user_agent TEXT,
  device_type VARCHAR(50),
  ip_address INET,

  -- Ensure one assignment per user per experiment
  UNIQUE(experiment_id, user_id),
  UNIQUE(experiment_id, guest_identifier),

  CHECK (user_id IS NOT NULL OR guest_identifier IS NOT NULL)
);

-- Create table for tracking events (impressions, interactions, conversions)
CREATE TABLE IF NOT EXISTS ab_test_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES ab_test_experiments(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES ab_test_variants(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES ab_test_assignments(id) ON DELETE CASCADE,

  -- User identification
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_identifier VARCHAR(255),

  -- Event details
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('impression', 'interaction', 'conversion', 'custom')),
  event_name VARCHAR(100), -- For custom events
  event_data JSONB DEFAULT '{}', -- Additional event data

  -- Context
  page_url TEXT,
  referrer TEXT,
  assessment_type VARCHAR(100),

  -- Timing
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  time_on_page_seconds INTEGER,

  -- Device/browser
  user_agent TEXT,
  device_type VARCHAR(50),
  browser VARCHAR(50),
  ip_address INET,

  -- Conversion specific data
  conversion_value DECIMAL(10,2), -- Revenue or other numeric value
  conversion_metadata JSONB DEFAULT '{}'
);

-- Create table for experiment snapshots (for historical analysis)
CREATE TABLE IF NOT EXISTS ab_test_experiment_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES ab_test_experiments(id) ON DELETE CASCADE,

  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  variants_data JSONB NOT NULL, -- Complete snapshot of all variants' metrics
  experiment_config JSONB NOT NULL, -- Config at time of snapshot

  total_participants INTEGER,
  total_conversions INTEGER,
  overall_conversion_rate DECIMAL(7,4),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(experiment_id, snapshot_date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_experiments_status ON ab_test_experiments(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_experiments_dates ON ab_test_experiments(start_date, end_date) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_experiments_type ON ab_test_experiments(assessment_type);

CREATE INDEX IF NOT EXISTS idx_variants_experiment ON ab_test_variants(experiment_id);
CREATE INDEX IF NOT EXISTS idx_variants_control ON ab_test_variants(experiment_id, is_control);

CREATE INDEX IF NOT EXISTS idx_assignments_experiment ON ab_test_assignments(experiment_id);
CREATE INDEX IF NOT EXISTS idx_assignments_variant ON ab_test_assignments(variant_id);
CREATE INDEX IF NOT EXISTS idx_assignments_user ON ab_test_assignments(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_assignments_guest ON ab_test_assignments(guest_identifier) WHERE guest_identifier IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_events_experiment ON ab_test_events(experiment_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_variant ON ab_test_events(variant_id, event_type);
CREATE INDEX IF NOT EXISTS idx_events_type ON ab_test_events(event_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_user ON ab_test_events(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON ab_test_events(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_snapshots_experiment ON ab_test_experiment_snapshots(experiment_id, snapshot_date DESC);

-- Enable Row Level Security
ALTER TABLE ab_test_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_experiment_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admins can manage experiments
CREATE POLICY "Admins can manage experiments"
  ON ab_test_experiments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Public read access to active experiments (for assignment)
CREATE POLICY "Public can view active experiments"
  ON ab_test_experiments
  FOR SELECT
  TO public
  USING (status = 'active');

-- Similar policies for variants
CREATE POLICY "Admins can manage variants"
  ON ab_test_variants
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Public can view variants of active experiments"
  ON ab_test_variants
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM ab_test_experiments
      WHERE id = ab_test_variants.experiment_id AND status = 'active'
    )
  );

-- Assignments - users can view their own, public can insert
CREATE POLICY "Users can view own assignments"
  ON ab_test_assignments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Public can insert assignments"
  ON ab_test_assignments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Events - public can insert, users can view their own
CREATE POLICY "Public can insert events"
  ON ab_test_events
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own events"
  ON ab_test_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all events"
  ON ab_test_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Triggers
DROP TRIGGER IF EXISTS update_experiments_updated_at ON ab_test_experiments;
CREATE TRIGGER update_experiments_updated_at
  BEFORE UPDATE ON ab_test_experiments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_variants_updated_at ON ab_test_variants;
CREATE TRIGGER update_variants_updated_at
  BEFORE UPDATE ON ab_test_variants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to assign variant to user (with sticky behavior)
CREATE OR REPLACE FUNCTION assign_experiment_variant(
  p_experiment_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_guest_identifier VARCHAR DEFAULT NULL,
  p_session_id VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_assignment RECORD;
  v_variant_id UUID;
  v_experiment RECORD;
  v_random_num DECIMAL;
  v_cumulative_weight INTEGER := 0;
  v_total_weight INTEGER;
BEGIN
  -- Validate inputs
  IF p_user_id IS NULL AND p_guest_identifier IS NULL THEN
    RAISE EXCEPTION 'Either user_id or guest_identifier must be provided';
  END IF;

  -- Check if user already has assignment (sticky behavior)
  IF p_user_id IS NOT NULL THEN
    SELECT variant_id INTO v_variant_id
    FROM ab_test_assignments
    WHERE experiment_id = p_experiment_id AND user_id = p_user_id;
  ELSE
    SELECT variant_id INTO v_variant_id
    FROM ab_test_assignments
    WHERE experiment_id = p_experiment_id AND guest_identifier = p_guest_identifier;
  END IF;

  -- Return existing assignment if found
  IF FOUND THEN
    RETURN v_variant_id;
  END IF;

  -- Get experiment details
  SELECT * INTO v_experiment
  FROM ab_test_experiments
  WHERE id = p_experiment_id AND status = 'active';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Experiment not found or not active';
  END IF;

  -- Calculate total weight
  SELECT SUM(traffic_weight) INTO v_total_weight
  FROM ab_test_variants
  WHERE experiment_id = p_experiment_id;

  -- Generate random number for weighted selection
  v_random_num := random() * v_total_weight;

  -- Select variant based on weighted random
  FOR v_assignment IN
    SELECT id, traffic_weight
    FROM ab_test_variants
    WHERE experiment_id = p_experiment_id
    ORDER BY created_at
  LOOP
    v_cumulative_weight := v_cumulative_weight + v_assignment.traffic_weight;
    IF v_random_num <= v_cumulative_weight THEN
      v_variant_id := v_assignment.id;
      EXIT;
    END IF;
  END LOOP;

  -- Create assignment record
  INSERT INTO ab_test_assignments (
    experiment_id,
    variant_id,
    user_id,
    guest_identifier,
    session_id,
    assignment_method
  ) VALUES (
    p_experiment_id,
    v_variant_id,
    p_user_id,
    p_guest_identifier,
    p_session_id,
    CASE WHEN v_experiment.enable_adaptive_allocation THEN 'adaptive' ELSE 'random' END
  );

  RETURN v_variant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track event and update variant metrics
CREATE OR REPLACE FUNCTION track_ab_test_event(
  p_experiment_id UUID,
  p_variant_id UUID,
  p_event_type VARCHAR,
  p_user_id UUID DEFAULT NULL,
  p_guest_identifier VARCHAR DEFAULT NULL,
  p_event_data JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
  v_assignment_id UUID;
BEGIN
  -- Find assignment
  IF p_user_id IS NOT NULL THEN
    SELECT id INTO v_assignment_id
    FROM ab_test_assignments
    WHERE experiment_id = p_experiment_id AND user_id = p_user_id;
  ELSIF p_guest_identifier IS NOT NULL THEN
    SELECT id INTO v_assignment_id
    FROM ab_test_assignments
    WHERE experiment_id = p_experiment_id AND guest_identifier = p_guest_identifier;
  END IF;

  -- Insert event
  INSERT INTO ab_test_events (
    experiment_id,
    variant_id,
    assignment_id,
    user_id,
    guest_identifier,
    event_type,
    event_data
  ) VALUES (
    p_experiment_id,
    p_variant_id,
    v_assignment_id,
    p_user_id,
    p_guest_identifier,
    p_event_type,
    p_event_data
  ) RETURNING id INTO v_event_id;

  -- Update variant metrics
  UPDATE ab_test_variants
  SET
    total_impressions = CASE WHEN p_event_type = 'impression' THEN total_impressions + 1 ELSE total_impressions END,
    total_interactions = CASE WHEN p_event_type = 'interaction' THEN total_interactions + 1 ELSE total_interactions END,
    total_conversions = CASE WHEN p_event_type = 'conversion' THEN total_conversions + 1 ELSE total_conversions END
  WHERE id = p_variant_id;

  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate statistical significance (Chi-square test)
CREATE OR REPLACE FUNCTION calculate_experiment_significance(p_experiment_id UUID)
RETURNS TABLE(
  variant_id UUID,
  variant_name VARCHAR,
  conversion_rate DECIMAL,
  p_value DECIMAL,
  is_significant BOOLEAN
) AS $$
DECLARE
  v_control_rate DECIMAL;
  v_control_count INTEGER;
BEGIN
  -- Get control variant conversion rate
  SELECT
    (total_conversions::DECIMAL / NULLIF(total_impressions, 0)),
    total_impressions
  INTO v_control_rate, v_control_count
  FROM ab_test_variants
  WHERE experiment_id = p_experiment_id AND is_control = TRUE
  LIMIT 1;

  -- Return comparison for each variant
  RETURN QUERY
  SELECT
    v.id,
    v.name,
    v.conversion_rate,
    NULL::DECIMAL as p_value, -- Simplified - real implementation would use Chi-square
    (v.conversion_rate > v_control_rate AND v.total_impressions >= 100) as is_significant
  FROM ab_test_variants v
  WHERE v.experiment_id = p_experiment_id
  ORDER BY v.conversion_rate DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to create daily snapshot
CREATE OR REPLACE FUNCTION create_experiment_snapshot(p_experiment_id UUID)
RETURNS UUID AS $$
DECLARE
  v_snapshot_id UUID;
  v_variants_data JSONB;
  v_experiment_config JSONB;
BEGIN
  -- Aggregate variant data
  SELECT jsonb_agg(
    jsonb_build_object(
      'variant_id', id,
      'variant_name', name,
      'impressions', total_impressions,
      'interactions', total_interactions,
      'conversions', total_conversions,
      'conversion_rate', conversion_rate
    )
  ) INTO v_variants_data
  FROM ab_test_variants
  WHERE experiment_id = p_experiment_id;

  -- Get experiment config
  SELECT to_jsonb(ab_test_experiments.*) INTO v_experiment_config
  FROM ab_test_experiments
  WHERE id = p_experiment_id;

  -- Insert snapshot
  INSERT INTO ab_test_experiment_snapshots (
    experiment_id,
    variants_data,
    experiment_config,
    total_participants,
    total_conversions
  )
  SELECT
    p_experiment_id,
    v_variants_data,
    v_experiment_config,
    COUNT(DISTINCT COALESCE(user_id::TEXT, guest_identifier)),
    COUNT(*) FILTER (WHERE event_type = 'conversion')
  FROM ab_test_events
  WHERE experiment_id = p_experiment_id
  RETURNING id INTO v_snapshot_id;

  RETURN v_snapshot_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE ab_test_experiments IS 'A/B test experiment definitions with statistical configuration';
COMMENT ON TABLE ab_test_variants IS 'Test variants with CTA configurations and performance metrics';
COMMENT ON TABLE ab_test_assignments IS 'User-to-variant assignments with sticky behavior';
COMMENT ON TABLE ab_test_events IS 'Event tracking for impressions, interactions, and conversions';
COMMENT ON FUNCTION assign_experiment_variant IS 'Assigns user to variant with weighted random selection and sticky behavior';
COMMENT ON FUNCTION track_ab_test_event IS 'Tracks events and updates variant metrics atomically';
COMMENT ON FUNCTION calculate_experiment_significance IS 'Calculates statistical significance of experiment results';
