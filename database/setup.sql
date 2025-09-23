-- Mental Wellness App Database Setup
-- This file contains the SQL commands to set up the database structure for the mental wellness app

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'clinical_plus');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE gender AS ENUM ('male', 'female', 'non_binary', 'prefer_not_to_say');
CREATE TYPE assessment_type AS ENUM ('phq9', 'gad7', 'wellness_check', 'custom');
CREATE TYPE severity_level AS ENUM ('minimal', 'mild', 'moderate', 'moderately_severe', 'severe');
CREATE TYPE crisis_risk_level AS ENUM ('low', 'moderate', 'high', 'immediate');
CREATE TYPE trigger_source AS ENUM ('scheduled', 'mood_decline', 'user_initiated', 'provider_requested');

-- User profiles table (extends auth.users)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  preferred_name TEXT,
  pronouns TEXT,
  date_of_birth DATE,
  gender gender,
  phone_number TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  language_preference TEXT DEFAULT 'en',

  -- Emergency contacts
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,

  -- Privacy & Consent
  data_sharing_consent BOOLEAN DEFAULT FALSE,
  research_participation_consent BOOLEAN DEFAULT FALSE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  crisis_plan_enabled BOOLEAN DEFAULT TRUE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  provider_data_sharing BOOLEAN DEFAULT FALSE,

  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  wellness_goals TEXT[],
  mental_health_history TEXT,
  current_treatments TEXT,

  -- Subscription
  subscription_tier subscription_tier DEFAULT 'free',
  status user_status DEFAULT 'active',
  provider_id UUID REFERENCES auth.users(id),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood entries table
CREATE TABLE mood_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Core mood metrics (1-10 scale)
  mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10) NOT NULL,
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10) NOT NULL,
  anxiety_level INTEGER CHECK (anxiety_level >= 1 AND anxiety_level <= 10) NOT NULL,
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10) NOT NULL,
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),

  -- Contextual information
  notes TEXT,
  activities TEXT[],
  triggers TEXT[],
  coping_strategies TEXT[],

  -- Environmental factors
  weather TEXT,
  location TEXT,
  social_interactions TEXT,

  -- Clinical indicators
  medication_taken BOOLEAN DEFAULT FALSE,
  therapy_session_today BOOLEAN DEFAULT FALSE,
  crisis_episode BOOLEAN DEFAULT FALSE,

  -- Metadata
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  entry_method TEXT DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type assessment_type NOT NULL,
  version TEXT DEFAULT '1.0',

  -- Responses and scoring
  responses INTEGER[] NOT NULL,
  total_score INTEGER NOT NULL,
  severity_level severity_level NOT NULL,
  interpretation TEXT,

  -- Risk assessment
  crisis_risk_level crisis_risk_level DEFAULT 'low',
  suicide_risk_indicated BOOLEAN DEFAULT FALSE,
  requires_immediate_attention BOOLEAN DEFAULT FALSE,

  -- Clinical context
  triggered_by trigger_source DEFAULT 'user_initiated',
  provider_notified BOOLEAN DEFAULT FALSE,
  provider_reviewed BOOLEAN DEFAULT FALSE,
  provider_notes TEXT,

  -- Metadata
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  time_to_complete_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis contacts table
CREATE TABLE crisis_contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Contact information
  name TEXT NOT NULL,
  phone TEXT NOT NULL CHECK (phone ~ '^[\+]?[1-9][\d]{0,15}$'),
  email TEXT,
  relationship TEXT NOT NULL,

  -- Configuration
  is_primary BOOLEAN DEFAULT FALSE,
  notify_on_crisis BOOLEAN DEFAULT TRUE,
  notify_on_assessment BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis events table
CREATE TABLE crisis_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Crisis details
  crisis_type TEXT NOT NULL,
  severity_level crisis_risk_level NOT NULL,
  trigger_source TEXT NOT NULL,

  -- Detection information
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  detection_algorithm TEXT,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),

  -- Response actions
  interventions_triggered TEXT[],
  contacts_notified TEXT[],
  resources_provided TEXT[],
  professional_contacted BOOLEAN DEFAULT FALSE,

  -- Resolution
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'monitoring', 'resolved', 'escalated')),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_method TEXT,
  follow_up_required BOOLEAN DEFAULT TRUE,

  -- User interaction
  user_acknowledged BOOLEAN DEFAULT FALSE,
  user_response TEXT,
  safety_plan_reviewed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety plans table
CREATE TABLE safety_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Warning signs
  personal_warning_signs TEXT[],
  environmental_triggers TEXT[],

  -- Coping strategies
  self_soothing_activities TEXT[],
  distraction_techniques TEXT[],
  grounding_exercises TEXT[],

  -- Support network (stored as JSONB for complex structure)
  people_to_contact JSONB,

  -- Professional resources
  therapist_contact TEXT,
  crisis_hotlines TEXT[],
  emergency_services TEXT[],

  -- Environment safety
  items_to_remove TEXT[],
  safe_locations TEXT[],

  -- Reasons for living
  reasons_for_living TEXT[],
  future_goals TEXT[],

  -- Metadata
  last_reviewed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  provider_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Provider profiles table
CREATE TABLE provider_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- Professional information
  license_number TEXT NOT NULL,
  license_state TEXT NOT NULL,
  specialty TEXT[],
  credentials TEXT[],

  -- Organization
  organization_name TEXT,
  department TEXT,
  npi_number TEXT,

  -- Contact information
  phone TEXT NOT NULL,
  address JSONB,

  -- Platform configuration
  patient_capacity INTEGER DEFAULT 50,
  accepts_new_patients BOOLEAN DEFAULT TRUE,
  notification_preferences JSONB DEFAULT '{"crisis_alerts": true, "assessment_summaries": true, "weekly_reports": false, "patient_milestones": true}',

  -- Verification
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Provider-patient connections table
CREATE TABLE provider_patient_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Connection details
  relationship_type TEXT DEFAULT 'therapist' CHECK (relationship_type IN ('primary_care', 'therapist', 'psychiatrist', 'case_manager')),
  connection_status TEXT DEFAULT 'pending' CHECK (connection_status IN ('pending', 'active', 'inactive', 'terminated')),

  -- Permissions
  can_view_mood_data BOOLEAN DEFAULT TRUE,
  can_view_assessments BOOLEAN DEFAULT TRUE,
  can_receive_crisis_alerts BOOLEAN DEFAULT TRUE,
  can_modify_treatment_plan BOOLEAN DEFAULT FALSE,

  -- Clinical context
  primary_diagnosis TEXT,
  treatment_goals TEXT[],
  session_frequency TEXT,

  -- Dates
  connection_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_contact_date TIMESTAMP WITH TIME ZONE,
  next_appointment TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(provider_id, patient_id)
);

-- Create indexes for performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(id);
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON mood_entries(entry_date DESC);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_assessments_type ON assessments(assessment_type);
CREATE INDEX idx_assessments_risk ON assessments(crisis_risk_level);
CREATE INDEX idx_crisis_contacts_user_id ON crisis_contacts(user_id);
CREATE INDEX idx_crisis_events_user_id ON crisis_events(user_id);
CREATE INDEX idx_crisis_events_status ON crisis_events(status);
CREATE INDEX idx_safety_plans_user_id ON safety_plans(user_id);
CREATE INDEX idx_provider_patient_connections_provider ON provider_patient_connections(provider_id);
CREATE INDEX idx_provider_patient_connections_patient ON provider_patient_connections(patient_id);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_patient_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for mood_entries
CREATE POLICY "Users can view their own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood entries" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for assessments
CREATE POLICY "Users can view their own assessments" ON assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" ON assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for crisis_contacts
CREATE POLICY "Users can manage their own crisis contacts" ON crisis_contacts
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for crisis_events
CREATE POLICY "Users can view their own crisis events" ON crisis_events
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for safety_plans
CREATE POLICY "Users can manage their own safety plans" ON safety_plans
  FOR ALL USING (auth.uid() = user_id);

-- Provider policies (providers can view connected patients' data)
CREATE POLICY "Providers can view connected patients' profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM provider_patient_connections
      WHERE provider_id = auth.uid()
        AND patient_id = user_profiles.id
        AND connection_status = 'active'
    )
  );

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_mood_entries_updated_at
  BEFORE UPDATE ON mood_entries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_crisis_contacts_updated_at
  BEFORE UPDATE ON crisis_contacts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_crisis_events_updated_at
  BEFORE UPDATE ON crisis_events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to delete user account and all associated data
CREATE OR REPLACE FUNCTION public.delete_user_account(user_id UUID)
RETURNS void AS $$
BEGIN
  -- Delete user data in correct order due to foreign key constraints
  DELETE FROM crisis_events WHERE user_id = delete_user_account.user_id;
  DELETE FROM safety_plans WHERE user_id = delete_user_account.user_id;
  DELETE FROM crisis_contacts WHERE user_id = delete_user_account.user_id;
  DELETE FROM assessments WHERE user_id = delete_user_account.user_id;
  DELETE FROM mood_entries WHERE user_id = delete_user_account.user_id;
  DELETE FROM provider_patient_connections WHERE patient_id = delete_user_account.user_id;
  DELETE FROM user_profiles WHERE id = delete_user_account.user_id;

  -- Note: auth.users deletion is handled by Supabase auth when user is deleted
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_safety_plans_updated_at
  BEFORE UPDATE ON safety_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Audit logs table for HIPAA compliance and security monitoring
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  outcome TEXT NOT NULL CHECK (outcome IN ('success', 'failure', 'error')),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  compliance_flags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for audit logs for efficient querying
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX idx_audit_logs_event_category ON audit_logs(event_category);
CREATE INDEX idx_audit_logs_risk_level ON audit_logs(risk_level);
CREATE INDEX idx_audit_logs_outcome ON audit_logs(outcome);
CREATE INDEX idx_audit_logs_compliance_flags ON audit_logs USING GIN(compliance_flags);

-- Enable RLS for audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow system and authorized personnel to access audit logs
-- In production, this should be restricted to audit personnel only
CREATE POLICY "Audit logs are system managed" ON audit_logs
  FOR ALL USING (false); -- No user access by default

-- Create a service role policy for system access (to be used with service key)
CREATE POLICY "System can manage audit logs" ON audit_logs
  FOR ALL USING (current_setting('role', true) = 'service_role');

CREATE TRIGGER set_provider_profiles_updated_at
  BEFORE UPDATE ON provider_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_provider_patient_connections_updated_at
  BEFORE UPDATE ON provider_patient_connections
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();