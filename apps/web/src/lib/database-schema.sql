-- HIPAA-Compliant Mental Health Authentication Database Schema
-- Designed for Mental Wellness App with crisis intervention capabilities

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User profiles with healthcare-specific fields
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'provider', 'admin', 'emergency')),
  authentication_tier VARCHAR(20) NOT NULL DEFAULT 'standard' CHECK (authentication_tier IN ('standard', 'sensitive', 'clinical', 'emergency')),
  crisis_level VARCHAR(20) NOT NULL DEFAULT 'none' CHECK (crisis_level IN ('none', 'mild', 'moderate', 'severe', 'imminent')),

  -- Healthcare provider specific fields
  npi_number VARCHAR(10) NULL, -- National Provider Identifier
  dea_number VARCHAR(9) NULL, -- Drug Enforcement Administration number
  license_number VARCHAR(50) NULL,
  license_state VARCHAR(2) NULL,
  license_expiry DATE NULL,
  credential_verification_status VARCHAR(20) DEFAULT 'pending' CHECK (credential_verification_status IN ('pending', 'verified', 'expired', 'revoked')),
  credential_verified_at TIMESTAMP WITH TIME ZONE NULL,
  credential_verified_by UUID NULL,

  -- Patient specific fields
  emergency_contact_name VARCHAR(255) NULL,
  emergency_contact_phone VARCHAR(20) NULL,
  emergency_contact_relationship VARCHAR(50) NULL,
  preferred_crisis_intervention_method VARCHAR(50) DEFAULT 'phone' CHECK (preferred_crisis_intervention_method IN ('phone', 'text', 'email', 'in_person')),

  -- Privacy and consent
  hipaa_authorization BOOLEAN NOT NULL DEFAULT FALSE,
  hipaa_authorization_date TIMESTAMP WITH TIME ZONE NULL,
  consent_to_treatment BOOLEAN DEFAULT FALSE,
  consent_to_treatment_date TIMESTAMP WITH TIME ZONE NULL,
  data_sharing_consent JSONB DEFAULT '{}', -- Granular consent tracking

  -- Crisis intervention tracking
  last_crisis_assessment TIMESTAMP WITH TIME ZONE NULL,
  crisis_assessment_score INTEGER NULL CHECK (crisis_assessment_score >= 0 AND crisis_assessment_score <= 100),
  current_safety_plan_id UUID NULL,
  assigned_provider_id UUID NULL REFERENCES user_profiles(id),

  -- Audit fields
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by UUID NULL REFERENCES auth.users(id),
  updated_by UUID NULL REFERENCES auth.users(id),

  -- HIPAA compliance
  phi_access_level VARCHAR(20) DEFAULT 'basic' CHECK (phi_access_level IN ('none', 'basic', 'clinical', 'full')),
  minimum_necessary_access BOOLEAN DEFAULT TRUE,

  UNIQUE(user_id),
  UNIQUE(npi_number) WHERE npi_number IS NOT NULL,
  UNIQUE(dea_number) WHERE dea_number IS NOT NULL
);

-- Multi-factor authentication methods
CREATE TABLE user_mfa_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  method VARCHAR(20) NOT NULL CHECK (method IN ('totp', 'sms', 'email', 'backup_codes', 'hardware_token')),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  setup_complete BOOLEAN NOT NULL DEFAULT FALSE,
  secret_key TEXT NULL, -- Encrypted TOTP secret
  phone_number VARCHAR(20) NULL, -- For SMS
  email_address VARCHAR(255) NULL, -- For email codes
  device_name VARCHAR(100) NULL, -- For hardware tokens

  -- Configuration
  backup_phone VARCHAR(20) NULL,
  require_for_tier VARCHAR(20) NOT NULL DEFAULT 'sensitive' CHECK (require_for_tier IN ('standard', 'sensitive', 'clinical', 'emergency')),

  -- Usage tracking
  last_used TIMESTAMP WITH TIME ZONE NULL,
  use_count INTEGER NOT NULL DEFAULT 0,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE NULL,

  -- Audit
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, method)
);

-- Backup codes for MFA recovery
CREATE TABLE user_backup_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code VARCHAR(8) NOT NULL, -- 8-character alphanumeric code
  used BOOLEAN NOT NULL DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '1 year'),

  UNIQUE(user_id, code)
);

-- Organization management for multi-tenant healthcare systems
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('hospital', 'clinic', 'private_practice', 'mental_health_center', 'telehealth', 'insurance')),
  npi_number VARCHAR(10) NULL UNIQUE,
  tax_id VARCHAR(20) NULL,

  -- Contact information
  address_line1 VARCHAR(255) NULL,
  address_line2 VARCHAR(255) NULL,
  city VARCHAR(100) NULL,
  state VARCHAR(2) NULL,
  zip_code VARCHAR(10) NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(255) NULL,
  website VARCHAR(255) NULL,

  -- Compliance
  hipaa_baa_signed BOOLEAN NOT NULL DEFAULT FALSE,
  hipaa_baa_date TIMESTAMP WITH TIME ZONE NULL,
  security_tier VARCHAR(20) NOT NULL DEFAULT 'standard' CHECK (security_tier IN ('standard', 'enhanced', 'high_security')),

  -- Configuration
  settings JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  crisis_protocols JSONB DEFAULT '{}',

  -- Status
  active BOOLEAN NOT NULL DEFAULT TRUE,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE NULL,
  verified_by UUID NULL REFERENCES auth.users(id),

  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User organization memberships
CREATE TABLE user_organization_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('member', 'provider', 'admin', 'billing', 'compliance')),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'revoked')),

  -- Permissions
  permissions JSONB DEFAULT '{}',
  access_level VARCHAR(20) DEFAULT 'basic' CHECK (access_level IN ('basic', 'clinical', 'administrative', 'full')),

  -- Dates
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  effective_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  effective_until TIMESTAMP WITH TIME ZONE NULL,
  last_accessed TIMESTAMP WITH TIME ZONE NULL,

  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, organization_id)
);

-- Authentication audit log for HIPAA compliance
CREATE TABLE authentication_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  user_id UUID NULL REFERENCES auth.users(id),
  session_id VARCHAR(255) NULL,

  -- Context
  authentication_tier VARCHAR(20) NULL,
  user_role VARCHAR(20) NULL,
  crisis_level VARCHAR(20) NULL,
  organization_id UUID NULL REFERENCES organizations(id),

  -- Event details
  event_data JSONB DEFAULT '{}',
  success BOOLEAN NULL,
  failure_reason TEXT NULL,

  -- Network information
  ip_address INET NULL,
  user_agent TEXT NULL,
  device_fingerprint VARCHAR(255) NULL,
  location_country VARCHAR(2) NULL,
  location_region VARCHAR(100) NULL,

  -- Risk assessment
  risk_score INTEGER NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_factors JSONB DEFAULT '{}',

  -- Compliance
  hipaa_relevant BOOLEAN NOT NULL DEFAULT FALSE,
  retention_required_until TIMESTAMP WITH TIME ZONE NULL,

  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  -- Indexes for performance and compliance queries
  INDEX idx_auth_audit_user_id (user_id),
  INDEX idx_auth_audit_event_type (event_type),
  INDEX idx_auth_audit_timestamp (timestamp),
  INDEX idx_auth_audit_hipaa (hipaa_relevant, timestamp) WHERE hipaa_relevant = TRUE
);

-- MFA audit log
CREATE TABLE mfa_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_type VARCHAR(50) NOT NULL,
  method VARCHAR(20) NOT NULL,

  -- Context
  required_tier VARCHAR(20) NOT NULL,
  crisis_level VARCHAR(20) DEFAULT 'none',

  -- Event details
  event_data JSONB DEFAULT '{}',
  success BOOLEAN NULL,
  attempts_count INTEGER DEFAULT 1,

  -- Network
  ip_address INET NULL,
  user_agent TEXT NULL,

  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Security audit log
CREATE TABLE security_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),

  -- User context
  user_id UUID NULL REFERENCES auth.users(id),
  user_role VARCHAR(20) NULL,
  authentication_tier VARCHAR(20) NULL,
  crisis_level VARCHAR(20) NULL,
  session_id VARCHAR(255) NULL,

  -- Event details
  event_details JSONB DEFAULT '{}',
  affected_resources JSONB DEFAULT '{}',

  -- Network
  ip_address INET NULL,
  user_agent TEXT NULL,

  -- Response
  action_taken TEXT NULL,
  escalated BOOLEAN DEFAULT FALSE,
  escalated_to VARCHAR(255) NULL,

  -- Compliance
  hipaa_relevant BOOLEAN NOT NULL DEFAULT FALSE,

  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Emergency interventions log
CREATE TABLE emergency_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  crisis_level VARCHAR(20) NOT NULL,
  intervention_type VARCHAR(50) NOT NULL CHECK (intervention_type IN ('automatic_notification', 'provider_alert', 'emergency_services', 'crisis_hotline', 'safety_plan_activation')),

  -- Details
  trigger_event VARCHAR(100) NULL,
  assessment_score INTEGER NULL,
  intervention_details JSONB DEFAULT '{}',

  -- Response
  provider_notified UUID NULL REFERENCES user_profiles(id),
  emergency_contact_notified BOOLEAN DEFAULT FALSE,
  emergency_services_contacted BOOLEAN DEFAULT FALSE,
  crisis_hotline_provided BOOLEAN DEFAULT FALSE,

  -- Outcome
  intervention_status VARCHAR(20) DEFAULT 'initiated' CHECK (intervention_status IN ('initiated', 'in_progress', 'completed', 'escalated', 'resolved')),
  outcome_notes TEXT NULL,
  follow_up_required BOOLEAN DEFAULT TRUE,
  follow_up_scheduled TIMESTAMP WITH TIME ZONE NULL,

  -- Network context
  ip_address INET NULL,
  user_agent TEXT NULL,

  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE NULL,

  INDEX idx_emergency_user_id (user_id),
  INDEX idx_emergency_crisis_level (crisis_level),
  INDEX idx_emergency_triggered_at (triggered_at)
);

-- User sessions with healthcare context
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) NOT NULL UNIQUE,

  -- Authentication context
  authentication_tier VARCHAR(20) NOT NULL DEFAULT 'standard',
  mfa_verified BOOLEAN NOT NULL DEFAULT FALSE,
  mfa_method VARCHAR(20) NULL,
  crisis_level VARCHAR(20) NOT NULL DEFAULT 'none',

  -- Session details
  device_fingerprint VARCHAR(255) NULL,
  ip_address INET NULL,
  user_agent TEXT NULL,
  location_country VARCHAR(2) NULL,
  location_region VARCHAR(100) NULL,

  -- Timing
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Security
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  revoked_at TIMESTAMP WITH TIME ZONE NULL,
  revoked_reason TEXT NULL,

  -- Healthcare context
  clinical_context BOOLEAN NOT NULL DEFAULT FALSE,
  organization_id UUID NULL REFERENCES organizations(id),
  patient_context_id UUID NULL, -- References specific patient being treated

  INDEX idx_sessions_user_id (user_id),
  INDEX idx_sessions_token (session_token),
  INDEX idx_sessions_expires_at (expires_at),
  INDEX idx_sessions_active (user_id, revoked, expires_at) WHERE revoked = FALSE
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mfa_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_backup_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE authentication_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfa_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- User profiles policy - users can only see their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Providers can view patients in their organization
CREATE POLICY "Providers can view organization patients" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organization_memberships uom1
      JOIN user_organization_memberships uom2 ON uom1.organization_id = uom2.organization_id
      WHERE uom1.user_id = auth.uid()
        AND uom2.user_id = user_profiles.user_id
        AND uom1.role IN ('provider', 'admin')
        AND uom1.status = 'active'
        AND uom2.status = 'active'
    )
  );

-- MFA methods policy
CREATE POLICY "Users can manage own MFA methods" ON user_mfa_methods
  FOR ALL USING (auth.uid() = user_id);

-- Backup codes policy
CREATE POLICY "Users can manage own backup codes" ON user_backup_codes
  FOR ALL USING (auth.uid() = user_id);

-- Organization membership policy
CREATE POLICY "Users can view own memberships" ON user_organization_memberships
  FOR SELECT USING (auth.uid() = user_id);

-- Audit log policies - users can view their own audit entries
CREATE POLICY "Users can view own auth audit" ON authentication_audit_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own MFA audit" ON mfa_audit_log
  FOR SELECT USING (auth.uid() = user_id);

-- Emergency interventions - users can view their own
CREATE POLICY "Users can view own emergency interventions" ON emergency_interventions
  FOR SELECT USING (auth.uid() = user_id);

-- Sessions policy
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Functions for HIPAA compliance and security

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_organization_memberships_updated_at BEFORE UPDATE ON user_organization_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_sensitive_field(data TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(encrypt(data::bytea, current_setting('app.encryption_key')::bytea, 'aes'), 'base64');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive_field(encrypted_data TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN convert_from(decrypt(decode(encrypted_data, 'base64'), current_setting('app.encryption_key')::bytea, 'aes'), 'utf8');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_authentication_tier ON user_profiles(authentication_tier);
CREATE INDEX idx_user_profiles_crisis_level ON user_profiles(crisis_level);
CREATE INDEX idx_user_profiles_provider_id ON user_profiles(assigned_provider_id);

CREATE INDEX idx_user_mfa_methods_user_id ON user_mfa_methods(user_id);
CREATE INDEX idx_user_mfa_methods_enabled ON user_mfa_methods(user_id, enabled) WHERE enabled = TRUE;

CREATE INDEX idx_organizations_type ON organizations(type);
CREATE INDEX idx_organizations_active ON organizations(active) WHERE active = TRUE;

CREATE INDEX idx_memberships_user_org ON user_organization_memberships(user_id, organization_id);
CREATE INDEX idx_memberships_org_role ON user_organization_memberships(organization_id, role);

-- HIPAA compliance views

-- View for audit trail reports
CREATE VIEW hipaa_audit_trail AS
SELECT
  'authentication' as audit_type,
  id,
  event_type,
  user_id,
  timestamp,
  ip_address,
  user_agent,
  event_data,
  hipaa_relevant
FROM authentication_audit_log
WHERE hipaa_relevant = TRUE

UNION ALL

SELECT
  'security' as audit_type,
  id,
  event_type,
  user_id,
  timestamp,
  ip_address,
  user_agent,
  event_details as event_data,
  hipaa_relevant
FROM security_audit_log
WHERE hipaa_relevant = TRUE

ORDER BY timestamp DESC;

-- View for active sessions
CREATE VIEW active_user_sessions AS
SELECT
  us.*,
  up.role,
  up.authentication_tier,
  up.crisis_level,
  o.name as organization_name
FROM user_sessions us
JOIN user_profiles up ON us.user_id = up.user_id
LEFT JOIN organizations o ON us.organization_id = o.id
WHERE us.revoked = FALSE
  AND us.expires_at > NOW();

-- Comments for documentation
COMMENT ON TABLE user_profiles IS 'HIPAA-compliant user profiles supporting both patients and healthcare providers';
COMMENT ON TABLE authentication_audit_log IS 'Comprehensive audit log for all authentication events, required for HIPAA compliance';
COMMENT ON TABLE emergency_interventions IS 'Crisis intervention tracking for mental health emergency protocols';
COMMENT ON TABLE organizations IS 'Healthcare organizations with HIPAA Business Associate Agreement tracking';

-- Initial data for crisis intervention
INSERT INTO organizations (id, name, type, active, verified) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Crisis Text Line', 'mental_health_center', TRUE, TRUE),
  ('00000000-0000-0000-0000-000000000002', 'National Suicide Prevention Lifeline', 'mental_health_center', TRUE, TRUE),
  ('00000000-0000-0000-0000-000000000003', 'Emergency Services (911)', 'emergency', TRUE, TRUE);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;