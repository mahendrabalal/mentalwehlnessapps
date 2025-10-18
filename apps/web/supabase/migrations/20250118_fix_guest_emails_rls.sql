-- Fix RLS policy for guest_assessment_emails to allow anonymous inserts

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow public insert for guest emails" ON guest_assessment_emails;

-- Create new policy that explicitly allows anonymous users
CREATE POLICY "Allow anonymous insert for guest emails"
  ON guest_assessment_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Allow authenticated insert for guest emails"
  ON guest_assessment_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
