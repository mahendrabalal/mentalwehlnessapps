-- Production Database Deployment Script
-- Mental Wellness App - HIPAA-Compliant Healthcare Authentication
-- Run this script on production Supabase instance

-- Step 1: Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Step 2: Set up encryption configuration
-- Note: In production, use a strong encryption key from environment variables
-- This should be set via Supabase dashboard or API, not in SQL
-- ALTER DATABASE SET app.encryption_key = 'your-production-encryption-key-here';

-- Step 3: Create all tables with production-grade settings
\i apps/web/src/lib/database-schema.sql

-- Step 4: Production-specific configurations

-- Create quality gate audit log table (missing from original schema)
CREATE TABLE IF NOT EXISTS quality_gate_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  compliance_level VARCHAR(20) NOT NULL CHECK (compliance_level IN ('non_compliant', 'basic', 'enhanced', 'fully_compliant')),
  clinical_risk VARCHAR(20) NOT NULL CHECK (clinical_risk IN ('low', 'medium', 'high', 'critical')),
  total_findings INTEGER NOT NULL DEFAULT 0,
  critical_findings INTEGER NOT NULL DEFAULT 0,
  hipaa_findings INTEGER NOT NULL DEFAULT 0,
  detailed_results JSONB DEFAULT '{}',
  findings_summary JSONB DEFAULT '[]',
  recommendations TEXT[] DEFAULT '{}',
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  INDEX idx_quality_gate_user_id (user_id),
  INDEX idx_quality_gate_timestamp (timestamp),
  INDEX idx_quality_gate_compliance (compliance_level, clinical_risk)
);

-- Create crisis assessments table (referenced in quality gates)
CREATE TABLE IF NOT EXISTS crisis_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_data JSONB NOT NULL DEFAULT '{}',
  calculated_risk VARCHAR(20) NOT NULL CHECK (calculated_risk IN ('none', 'mild', 'moderate', 'severe', 'imminent')),
  assessment_score INTEGER NULL CHECK (assessment_score >= 0 AND assessment_score <= 100),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  provider_reviewed BOOLEAN DEFAULT FALSE,
  provider_notes TEXT NULL,
  follow_up_required BOOLEAN DEFAULT TRUE,
  follow_up_scheduled TIMESTAMP WITH TIME ZONE NULL,

  INDEX idx_crisis_assessments_user_id (user_id),
  INDEX idx_crisis_assessments_risk (calculated_risk),
  INDEX idx_crisis_assessments_completed (completed_at)
);

-- Create crisis resources table
CREATE TABLE IF NOT EXISTS crisis_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('hotline', 'text', 'chat', 'emergency', 'website')),
  phone VARCHAR(20) NULL,
  url TEXT NULL,
  availability VARCHAR(20) NOT NULL DEFAULT '24/7' CHECK (availability IN ('24/7', 'business_hours', 'limited')),
  description TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 10,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  target_audience VARCHAR(100) NULL, -- e.g., 'lgbtq', 'veterans', 'general'
  language_support VARCHAR(100) DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create safety plans table (referenced in quality gates and safety plan page)
CREATE TABLE IF NOT EXISTS safety_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  warning_signs TEXT[] DEFAULT '{}',
  coping_strategies TEXT[] DEFAULT '{}',
  support_contacts TEXT[] DEFAULT '{}',
  professional_contacts TEXT[] DEFAULT '{}',
  emergency_services TEXT[] DEFAULT '{"988 Suicide & Crisis Lifeline", "911 Emergency Services"}',
  items_to_remove TEXT[] DEFAULT '{}',
  safe_locations TEXT[] DEFAULT '{}',
  reasons_for_living TEXT[] DEFAULT '{}',
  future_goals TEXT[] DEFAULT '{}',
  last_reviewed TIMESTAMP WITH TIME ZONE NULL,
  provider_approved BOOLEAN DEFAULT FALSE,
  provider_id UUID NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  UNIQUE(user_id),
  INDEX idx_safety_plans_user_id (user_id),
  INDEX idx_safety_plans_last_reviewed (last_reviewed),
  INDEX idx_safety_plans_provider_id (provider_id)
);

-- Step 5: Enable Row Level Security on new tables
ALTER TABLE quality_gate_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_plans ENABLE ROW LEVEL SECURITY;

-- Step 6: Create RLS policies for new tables

-- Quality gate audit log policies
CREATE POLICY "Users can view own quality gate audits" ON quality_gate_audit_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all quality gate audits" ON quality_gate_audit_log
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Crisis assessments policies
CREATE POLICY "Users can manage own crisis assessments" ON crisis_assessments
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Providers can view patient crisis assessments" ON crisis_assessments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organization_memberships uom1
      JOIN user_organization_memberships uom2 ON uom1.organization_id = uom2.organization_id
      WHERE uom1.user_id = auth.uid()
        AND uom2.user_id = crisis_assessments.user_id
        AND uom1.role = 'provider'
        AND uom1.status = 'active'
        AND uom2.status = 'active'
    )
  );

-- Crisis resources policies (public read for crisis situations)
CREATE POLICY "Anyone can view active crisis resources" ON crisis_resources
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Admins can manage crisis resources" ON crisis_resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Safety plans policies
CREATE POLICY "Users can manage own safety plans" ON safety_plans
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Providers can view patient safety plans" ON safety_plans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organization_memberships uom1
      JOIN user_organization_memberships uom2 ON uom1.organization_id = uom2.organization_id
      WHERE uom1.user_id = auth.uid()
        AND uom2.user_id = safety_plans.user_id
        AND uom1.role = 'provider'
        AND uom1.status = 'active'
        AND uom2.status = 'active'
    )
  );

-- Step 7: Insert production crisis resources
INSERT INTO crisis_resources (id, name, type, phone, url, availability, description, priority, target_audience) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Suicide & Crisis Lifeline', 'hotline', '988', 'https://988lifeline.org', '24/7', 'Free and confidential emotional support for people in suicidal crisis or emotional distress', 1, 'general'),
  ('00000000-0000-0000-0000-000000000002', 'Crisis Text Line', 'text', '741741', 'https://crisistextline.org', '24/7', 'Text HOME to 741741 for free, 24/7 crisis support in the US', 2, 'general'),
  ('00000000-0000-0000-0000-000000000003', 'Emergency Services', 'emergency', '911', null, '24/7', 'Call 911 for immediate emergency response and life-threatening situations', 3, 'general'),
  ('00000000-0000-0000-0000-000000000004', 'Trans Lifeline', 'hotline', '877-565-8860', 'https://translifeline.org', '24/7', 'Crisis support specifically for transgender individuals', 4, 'lgbtq'),
  ('00000000-0000-0000-0000-000000000005', 'The Trevor Project', 'hotline', '1-866-488-7386', 'https://thetrevorproject.org', '24/7', 'Crisis intervention and suicide prevention for LGBTQ+ youth', 5, 'lgbtq'),
  ('00000000-0000-0000-0000-000000000006', 'Veterans Crisis Line', 'hotline', '1-800-273-8255', 'https://veteranscrisisline.net', '24/7', 'Crisis support for veterans and their families', 6, 'veterans'),
  ('00000000-0000-0000-0000-000000000007', 'SAMHSA National Helpline', 'hotline', '1-800-662-4357', 'https://samhsa.gov', '24/7', 'Treatment referral and information service for mental health and substance use disorders', 7, 'general'),
  ('00000000-0000-0000-0000-000000000008', 'Crisis Chat', 'chat', null, 'https://suicidepreventionlifeline.org/chat', '24/7', 'Online chat support for crisis intervention', 8, 'general')
ON CONFLICT (id) DO NOTHING;

-- Step 8: Create production-specific database functions

-- Function to validate HIPAA compliance
CREATE OR REPLACE FUNCTION validate_hipaa_compliance(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  profile_data RECORD;
BEGIN
  -- Get user profile
  SELECT * INTO profile_data FROM user_profiles WHERE user_id = target_user_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'compliant', false,
      'reason', 'User profile not found'
    );
  END IF;

  -- Check HIPAA authorization
  IF NOT profile_data.hipaa_authorization THEN
    RETURN jsonb_build_object(
      'compliant', false,
      'reason', 'HIPAA authorization not obtained'
    );
  END IF;

  -- Check consent to treatment for patients
  IF profile_data.role = 'patient' AND NOT profile_data.consent_to_treatment THEN
    RETURN jsonb_build_object(
      'compliant', false,
      'reason', 'Consent to treatment not obtained'
    );
  END IF;

  -- Check provider credentials
  IF profile_data.role = 'provider' AND profile_data.credential_verification_status != 'verified' THEN
    RETURN jsonb_build_object(
      'compliant', false,
      'reason', 'Provider credentials not verified'
    );
  END IF;

  RETURN jsonb_build_object(
    'compliant', true,
    'validated_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate crisis risk score
CREATE OR REPLACE FUNCTION calculate_crisis_risk(assessment_data JSONB)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Thoughts of harm
  IF (assessment_data->>'thoughts_of_harm')::boolean THEN
    score := score + 30;
  END IF;

  -- Specific plan
  IF (assessment_data->>'specific_plan')::boolean THEN
    score := score + 40;
  END IF;

  -- Means available
  IF (assessment_data->>'means_available')::boolean THEN
    score := score + 30;
  END IF;

  -- Timeline
  CASE assessment_data->>'timeline'
    WHEN 'immediate' THEN score := score + 50;
    WHEN 'hours' THEN score := score + 40;
    WHEN 'days' THEN score := score + 20;
    WHEN 'weeks' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  -- Support system (protective factor)
  CASE assessment_data->>'support_system'
    WHEN 'none' THEN score := score + 20;
    WHEN 'limited' THEN score := score + 10;
    WHEN 'some' THEN score := score + 0;
    WHEN 'strong' THEN score := score - 10;
  END CASE;

  -- Previous attempts
  IF (assessment_data->>'previous_attempts')::boolean THEN
    score := score + 20;
  END IF;

  -- Substance use
  IF (assessment_data->>'substance_use')::boolean THEN
    score := score + 20;
  END IF;

  RETURN GREATEST(0, LEAST(100, score));
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create production indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_role_tier ON user_profiles(role, authentication_tier);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_crisis_provider ON user_profiles(crisis_level, assigned_provider_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auth_audit_timestamp_user ON authentication_audit_log(timestamp DESC, user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mfa_audit_timestamp_user ON mfa_audit_log(timestamp DESC, user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_security_audit_severity_timestamp ON security_audit_log(severity, timestamp DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_emergency_interventions_status ON emergency_interventions(intervention_status, triggered_at DESC);

-- Step 10: Create production triggers for automatic updates
CREATE OR REPLACE FUNCTION update_user_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_profile_updated_at();

CREATE TRIGGER trigger_safety_plans_updated_at
  BEFORE UPDATE ON safety_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_crisis_resources_updated_at
  BEFORE UPDATE ON crisis_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 11: Grant production permissions
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON crisis_resources TO anon; -- Allow anonymous access to crisis resources
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Step 12: Production-specific settings
ALTER DATABASE SET log_statement = 'mod'; -- Log all data modification statements
ALTER DATABASE SET log_min_duration_statement = 1000; -- Log slow queries
ALTER DATABASE SET track_activities = on;
ALTER DATABASE SET track_counts = on;

-- Step 13: Create production health check view
CREATE OR REPLACE VIEW system_health AS
SELECT
  'database' as component,
  'healthy' as status,
  jsonb_build_object(
    'tables_count', (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'),
    'active_connections', (SELECT count(*) FROM pg_stat_activity),
    'last_stats_reset', (SELECT stats_reset FROM pg_stat_database WHERE datname = current_database())
  ) as details;

-- Grant access to system health
GRANT SELECT ON system_health TO authenticated;

-- Final step: Verify deployment
SELECT
  'Deployment completed successfully' as status,
  NOW() as deployed_at,
  version() as postgres_version;

-- Show table summary
SELECT
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;