-- Migration: Guest Assessment Email Captures (Simplified)
-- Description: Store email addresses from guests who want to receive their assessment results
-- Created: 2025-01-18

-- Create table for guest email captures
CREATE TABLE IF NOT EXISTS guest_assessment_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  tool_name VARCHAR(100) NOT NULL,
  assessment_type VARCHAR(100) NOT NULL,
  assessment_results JSONB,
  current_path VARCHAR(500),
  user_agent TEXT,
  ip_address INET,
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ,
  converted_to_user BOOLEAN DEFAULT FALSE,
  converted_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_guest_emails_email ON guest_assessment_emails(email);

-- Create index on assessment_type for analytics
CREATE INDEX IF NOT EXISTS idx_guest_emails_assessment_type ON guest_assessment_emails(assessment_type);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_guest_emails_created_at ON guest_assessment_emails(created_at DESC);

-- Create index on email_sent for batch email processing
CREATE INDEX IF NOT EXISTS idx_guest_emails_email_sent ON guest_assessment_emails(email_sent) WHERE email_sent = FALSE;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_guest_assessment_emails_updated_at ON guest_assessment_emails;
CREATE TRIGGER update_guest_assessment_emails_updated_at
  BEFORE UPDATE ON guest_assessment_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE guest_assessment_emails ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for guest submissions)
CREATE POLICY "Allow public insert for guest emails"
  ON guest_assessment_emails
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can view their own converted submissions
CREATE POLICY "Users can view their own converted submissions"
  ON guest_assessment_emails
  FOR SELECT
  TO authenticated
  USING (converted_user_id = auth.uid());

-- Add comments for documentation
COMMENT ON TABLE guest_assessment_emails IS 'Stores email addresses from guests who want to receive assessment results before signing up';
COMMENT ON COLUMN guest_assessment_emails.assessment_results IS 'JSON object containing the assessment results (score, level, recommendations)';
COMMENT ON COLUMN guest_assessment_emails.converted_to_user IS 'TRUE if the guest eventually signed up for an account';
COMMENT ON COLUMN guest_assessment_emails.email_sent IS 'TRUE if we have sent the results email to this address';
