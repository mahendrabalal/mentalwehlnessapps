-- Complete RLS reset for guest_assessment_emails table
-- This will remove ALL policies and recreate them fresh

-- First, disable RLS temporarily
ALTER TABLE guest_assessment_emails DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies (catch any orphaned policies)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'guest_assessment_emails')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON guest_assessment_emails';
    END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE guest_assessment_emails ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
CREATE POLICY "guest_assessment_emails_anon_insert"
  ON guest_assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "guest_assessment_emails_auth_insert"
  ON guest_assessment_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "guest_assessment_emails_auth_select"
  ON guest_assessment_emails
  FOR SELECT
  TO authenticated
  USING (converted_user_id = auth.uid());
