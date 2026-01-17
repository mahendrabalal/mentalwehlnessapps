# Database Setup Instructions

## Supabase Database Configuration

To complete the authentication setup for your mental wellness app, you need to run the database setup SQL in your Supabase project.

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/ghpuuobotfswlpprzsic
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New query"**

### Step 2: Run Database Setup

Copy the entire contents of `database/setup.sql` and paste it into the SQL editor, then click **"Run"**.

This will create:
- **User profiles table** - Extended user information beyond auth
- **Mood entries table** - Daily mood tracking data
- **Assessments table** - PHQ-9, GAD-7 clinical assessments
- **Crisis contacts table** - Emergency contact information
- **Crisis events table** - Crisis intervention tracking
- **Safety plans table** - User safety planning
- **Provider profiles table** - Healthcare provider information
- **Row Level Security policies** - Data protection and privacy
- **Automatic triggers** - Profile creation and timestamp updates

### Step 3: Verify Setup

After running the SQL, verify the tables were created:

1. Go to **Table Editor** in Supabase dashboard
2. You should see these new tables:
   - `user_profiles`
   - `mood_entries`
   - `assessments`
   - `crisis_contacts`
   - `crisis_events`
   - `safety_plans`
   - `provider_profiles`
   - `provider_patient_connections`

### Step 4: Test Authentication

1. Go back to your app at `http://localhost:3000`
2. Click **"Sign Up"** to create a new account
3. Check your email for the confirmation link
4. After confirming, you should be able to log in

### Important Notes

- **Data Security**: All tables have Row Level Security (RLS) enabled
- **HIPAA Compliance**: The database structure follows healthcare data protection standards
- **Automatic Profile Creation**: User profiles are automatically created when users sign up
- **Crisis Detection**: The system can automatically detect crisis indicators from assessments

### Troubleshooting

If you encounter issues:

1. **Permission errors**: Make sure you're logged in as the project owner
2. **SQL errors**: Check that all lines were copied correctly
3. **Missing tables**: Re-run the setup.sql file
4. **Authentication not working**: Verify the environment variables in `.env.local` match your project

### Next Steps

Once the database is set up:
1. Test user registration and login
2. Try the mood tracking features
3. Take a clinical assessment (PHQ-9 or GAD-7)
4. Explore the crisis support resources

The app will now have full authentication and data persistence capabilities!