-- Migration: Assessment Reminder Preferences (Fixed)
-- Description: User preferences for retake reminders with notification scheduling
-- Created: 2025-01-18
-- Fixed: Removed dependencies on tables that don't exist

-- Create table for reminder preferences
CREATE TABLE IF NOT EXISTS assessment_reminder_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type VARCHAR(100) NOT NULL,

  -- Reminder settings
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  frequency VARCHAR(20) NOT NULL DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'custom')),
  custom_interval_days INTEGER CHECK (custom_interval_days > 0),

  -- Notification channels (granular opt-in)
  email_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  sms_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  push_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  in_app_enabled BOOLEAN NOT NULL DEFAULT TRUE,

  -- Contact information (can override profile defaults)
  reminder_email VARCHAR(255),
  reminder_phone VARCHAR(20),

  -- Scheduling
  preferred_time_of_day TIME DEFAULT '09:00:00',
  timezone VARCHAR(50) DEFAULT 'UTC',
  next_reminder_date TIMESTAMPTZ,
  last_reminded_at TIMESTAMPTZ,

  -- Engagement tracking
  total_reminders_sent INTEGER DEFAULT 0,
  total_reminders_opened INTEGER DEFAULT 0,
  total_reminders_acted_on INTEGER DEFAULT 0,
  open_rate DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE
      WHEN total_reminders_sent > 0
      THEN ROUND((total_reminders_opened::DECIMAL / total_reminders_sent) * 100, 2)
      ELSE 0
    END
  ) STORED,

  -- Smart reminder features
  auto_adjust_frequency BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME DEFAULT '22:00:00',
  quiet_hours_end TIME DEFAULT '08:00:00',
  pause_until TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, assessment_type)
);

-- Create table for reminder history/queue
CREATE TABLE IF NOT EXISTS assessment_reminder_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preference_id UUID NOT NULL REFERENCES assessment_reminder_preferences(id) ON DELETE CASCADE,
  assessment_type VARCHAR(100) NOT NULL,

  -- Scheduling
  scheduled_for TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'cancelled')),

  -- Delivery details
  channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'in_app')),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  -- Content
  subject TEXT,
  message_body TEXT,
  cta_url TEXT,

  -- Tracking
  external_message_id VARCHAR(255),
  user_agent TEXT,
  ip_address INET,

  -- A/B testing support
  variant_id UUID,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for notification unsubscribe tokens (GDPR requirement)
CREATE TABLE IF NOT EXISTS reminder_unsubscribe_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token VARCHAR(64) NOT NULL UNIQUE,
  assessment_type VARCHAR(100),
  channel VARCHAR(20) CHECK (channel IN ('email', 'sms', 'push', 'in_app', 'all')),

  used BOOLEAN NOT NULL DEFAULT FALSE,
  used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '90 days')
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reminder_prefs_user ON assessment_reminder_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_reminder_prefs_enabled ON assessment_reminder_preferences(enabled) WHERE enabled = TRUE;
CREATE INDEX IF NOT EXISTS idx_reminder_prefs_next_date ON assessment_reminder_preferences(next_reminder_date) WHERE enabled = TRUE AND next_reminder_date IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_reminder_queue_user ON assessment_reminder_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_reminder_queue_scheduled ON assessment_reminder_queue(scheduled_for, status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_reminder_queue_status ON assessment_reminder_queue(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_reminder_queue_preference ON assessment_reminder_queue(preference_id);

CREATE INDEX IF NOT EXISTS idx_unsubscribe_token ON reminder_unsubscribe_tokens(token) WHERE used = FALSE;
CREATE INDEX IF NOT EXISTS idx_unsubscribe_user ON reminder_unsubscribe_tokens(user_id);

-- Enable Row Level Security
ALTER TABLE assessment_reminder_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_reminder_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_unsubscribe_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reminder_preferences
CREATE POLICY "Users can manage own reminder preferences"
  ON assessment_reminder_preferences
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for reminder_queue
CREATE POLICY "Users can view own reminder queue"
  ON assessment_reminder_queue
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for unsubscribe_tokens
CREATE POLICY "Users can view own unsubscribe tokens"
  ON reminder_unsubscribe_tokens
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_reminder_prefs_updated_at ON assessment_reminder_preferences;
CREATE TRIGGER update_reminder_prefs_updated_at
  BEFORE UPDATE ON assessment_reminder_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reminder_queue_updated_at ON assessment_reminder_queue;
CREATE TRIGGER update_reminder_queue_updated_at
  BEFORE UPDATE ON assessment_reminder_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate next reminder date based on frequency
CREATE OR REPLACE FUNCTION calculate_next_reminder_date(
  p_frequency VARCHAR,
  p_custom_interval_days INTEGER DEFAULT NULL,
  p_base_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TIMESTAMPTZ AS $$
BEGIN
  RETURN CASE p_frequency
    WHEN 'weekly' THEN p_base_date + INTERVAL '7 days'
    WHEN 'biweekly' THEN p_base_date + INTERVAL '14 days'
    WHEN 'monthly' THEN p_base_date + INTERVAL '1 month'
    WHEN 'quarterly' THEN p_base_date + INTERVAL '3 months'
    WHEN 'custom' THEN p_base_date + (p_custom_interval_days || ' days')::INTERVAL
    ELSE p_base_date + INTERVAL '1 month'
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to set next_reminder_date on insert/update
CREATE OR REPLACE FUNCTION set_next_reminder_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.enabled = TRUE THEN
    NEW.next_reminder_date := calculate_next_reminder_date(
      NEW.frequency,
      NEW.custom_interval_days,
      COALESCE(NEW.last_reminded_at, NOW())
    );
  ELSE
    NEW.next_reminder_date := NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_reminder_next_date ON assessment_reminder_preferences;
CREATE TRIGGER set_reminder_next_date
  BEFORE INSERT OR UPDATE ON assessment_reminder_preferences
  FOR EACH ROW
  EXECUTE FUNCTION set_next_reminder_date();

-- Function to create default reminder preferences when user completes first assessment
CREATE OR REPLACE FUNCTION create_default_reminder_preferences()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_baseline = TRUE THEN
    INSERT INTO assessment_reminder_preferences (
      user_id,
      assessment_type,
      enabled,
      frequency,
      email_enabled,
      in_app_enabled,
      reminder_email
    )
    VALUES (
      NEW.user_id,
      NEW.assessment_type,
      TRUE,
      'monthly',
      TRUE,
      TRUE,
      (SELECT email FROM auth.users WHERE id = NEW.user_id)
    )
    ON CONFLICT (user_id, assessment_type) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS create_reminder_prefs_on_assessment ON user_assessment_history;
CREATE TRIGGER create_reminder_prefs_on_assessment
  AFTER INSERT ON user_assessment_history
  FOR EACH ROW
  EXECUTE FUNCTION create_default_reminder_preferences();

-- Function to schedule reminder (to be called by cron job)
CREATE OR REPLACE FUNCTION schedule_pending_reminders()
RETURNS TABLE(scheduled_count INTEGER) AS $$
DECLARE
  pref_record RECORD;
  reminder_count INTEGER := 0;
BEGIN
  FOR pref_record IN
    SELECT *
    FROM assessment_reminder_preferences
    WHERE enabled = TRUE
      AND next_reminder_date <= NOW()
      AND (pause_until IS NULL OR pause_until < NOW())
  LOOP
    IF pref_record.email_enabled THEN
      INSERT INTO assessment_reminder_queue (
        user_id,
        preference_id,
        assessment_type,
        scheduled_for,
        channel,
        status
      ) VALUES (
        pref_record.user_id,
        pref_record.id,
        pref_record.assessment_type,
        NOW(),
        'email',
        'pending'
      );
      reminder_count := reminder_count + 1;
    END IF;

    IF pref_record.in_app_enabled THEN
      INSERT INTO assessment_reminder_queue (
        user_id,
        preference_id,
        assessment_type,
        scheduled_for,
        channel,
        status
      ) VALUES (
        pref_record.user_id,
        pref_record.id,
        pref_record.assessment_type,
        NOW(),
        'in_app',
        'pending'
      );
      reminder_count := reminder_count + 1;
    END IF;

    UPDATE assessment_reminder_preferences
    SET
      last_reminded_at = NOW(),
      total_reminders_sent = total_reminders_sent + 1
    WHERE id = pref_record.id;
  END LOOP;

  RETURN QUERY SELECT reminder_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate unsubscribe token
CREATE OR REPLACE FUNCTION generate_unsubscribe_token(
  p_user_id UUID,
  p_assessment_type VARCHAR DEFAULT NULL,
  p_channel VARCHAR DEFAULT 'all'
)
RETURNS VARCHAR AS $$
DECLARE
  v_token VARCHAR(64);
BEGIN
  v_token := encode(gen_random_bytes(32), 'hex');

  INSERT INTO reminder_unsubscribe_tokens (
    user_id,
    token,
    assessment_type,
    channel
  ) VALUES (
    p_user_id,
    v_token,
    p_assessment_type,
    p_channel
  );

  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle unsubscribe
CREATE OR REPLACE FUNCTION process_unsubscribe(p_token VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  v_record RECORD;
BEGIN
  SELECT * INTO v_record
  FROM reminder_unsubscribe_tokens
  WHERE token = p_token
    AND used = FALSE
    AND expires_at > NOW();

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  IF v_record.channel = 'all' THEN
    IF v_record.assessment_type IS NULL THEN
      UPDATE assessment_reminder_preferences
      SET enabled = FALSE
      WHERE user_id = v_record.user_id;
    ELSE
      UPDATE assessment_reminder_preferences
      SET enabled = FALSE
      WHERE user_id = v_record.user_id
        AND assessment_type = v_record.assessment_type;
    END IF;
  ELSE
    UPDATE assessment_reminder_preferences
    SET
      email_enabled = CASE WHEN v_record.channel = 'email' THEN FALSE ELSE email_enabled END,
      sms_enabled = CASE WHEN v_record.channel = 'sms' THEN FALSE ELSE sms_enabled END,
      push_enabled = CASE WHEN v_record.channel = 'push' THEN FALSE ELSE push_enabled END,
      in_app_enabled = CASE WHEN v_record.channel = 'in_app' THEN FALSE ELSE in_app_enabled END
    WHERE user_id = v_record.user_id
      AND (v_record.assessment_type IS NULL OR assessment_type = v_record.assessment_type);
  END IF;

  UPDATE reminder_unsubscribe_tokens
  SET used = TRUE, used_at = NOW()
  WHERE token = p_token;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE assessment_reminder_preferences IS 'User preferences for assessment retake reminders with GDPR-compliant opt-in/opt-out';
COMMENT ON TABLE assessment_reminder_queue IS 'Queue of scheduled reminder notifications with delivery tracking';
COMMENT ON TABLE reminder_unsubscribe_tokens IS 'One-time use tokens for unsubscribing from reminders (GDPR compliance)';
COMMENT ON FUNCTION schedule_pending_reminders IS 'Cron job function to create reminder notifications for due assessments';
COMMENT ON FUNCTION generate_unsubscribe_token IS 'Generate secure unsubscribe token for email/notification footer';
COMMENT ON FUNCTION process_unsubscribe IS 'Process unsubscribe request and disable appropriate notifications';
