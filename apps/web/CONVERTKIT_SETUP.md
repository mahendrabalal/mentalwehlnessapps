# ConvertKit Email Integration Setup

Complete setup guide for sending assessment results emails using ConvertKit (kit.com).

## What You Need to Add to .env.local

Add these environment variables to `/apps/web/.env.local`:

```bash
# Email Provider Configuration
EMAIL_PROVIDER=convertkit
EMAIL_FROM=you@mentalwellnessapps.com
EMAIL_REPLY_TO=support@mentalwellnessapps.com

# ConvertKit API Credentials
CONVERTKIT_API_KEY=your-api-key-here
CONVERTKIT_API_SECRET=your-api-secret-here

# App URL (you already have NEXT_PUBLIC_SITE_URL, this is an alias)
NEXT_PUBLIC_APP_URL=https://www.mentalwellnessapps.com
```

## Step 1: Get Your ConvertKit API Credentials

1. **Login to ConvertKit**:
   - Go to: https://app.convertkit.com/

2. **Navigate to Settings**:
   - Click your profile icon (top right)
   - Select "Settings"
   - Click "Advanced" in the left sidebar

3. **Find Your API Credentials**:
   - Scroll down to "API" section
   - You'll see two values:
     - **API Key** (looks like: `1234567890abcdef`)
     - **API Secret** (looks like: `abcdef1234567890_abcd`)
   - Copy both of these

4. **Add to .env.local**:
   ```bash
   CONVERTKIT_API_KEY=your-api-key-from-step-3
   CONVERTKIT_API_SECRET=your-api-secret-from-step-3
   ```

## Step 2: Verify Your Sender Email

ConvertKit requires you to verify the email address you'll send from:

1. **Go to Settings > Sending**:
   - https://app.convertkit.com/account_settings/sending

2. **Add Your Email Domain**:
   - If you want to use `noreply@mentalwellnessapps.com`
   - You'll need to verify ownership of `mentalwellnessapps.com`

3. **For Testing - Use Your Personal Email**:
   - You can use your personal email that's already verified
   - Just update `EMAIL_FROM` in `.env.local`
   - Example: `EMAIL_FROM=your.email@gmail.com`

## Step 3: Run Database Migration

You need to create the `guest_assessment_emails` table in Supabase:

1. **Go to Supabase Dashboard**:
   - https://supabase.com/dashboard/project/ghpuuobotfswlpprzsic

2. **Open SQL Editor**:
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run the Migration**:
   - Copy the contents from: `apps/web/supabase/migrations/20250118_guest_assessment_emails.sql`
   - Paste into the SQL editor
   - Click "Run" or press Cmd/Ctrl + Enter

This creates the table to store guest email submissions.

## Step 4: Complete .env.local Configuration

Your final `.env.local` should include:

```bash
# ... your existing Supabase, Stripe, etc. config ...

# Email Configuration (ADD THESE)
EMAIL_PROVIDER=convertkit
EMAIL_FROM=you@mentalwellnessapps.com  # or your verified email
EMAIL_REPLY_TO=support@mentalwellnessapps.com
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_API_SECRET=your_api_secret_here
NEXT_PUBLIC_APP_URL=https://www.mentalwellnessapps.com
```

## Step 5: Test It!

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit an assessment**:
   - Go to: http://localhost:3000/tools/loneliness-assessment

3. **Complete the assessment**

4. **Click "Just Email Me Results"**

5. **Enter your email** (use the email you verified in ConvertKit)

6. **Check your inbox!** 📧

## How It Works

### Email Flow:

```
User completes assessment
        ↓
Clicks "Just Email Me Results"
        ↓
API saves to database (`guest_assessment_emails` table)
        ↓
ConvertKit API sends email with results
        ↓
Database updated with `email_sent: true`
        ↓
User receives beautiful HTML email with:
  - Their score and level
  - Personalized recommendations
  - CTA to create account
```

### What Gets Sent:

The email includes:
- ✅ Assessment score (e.g., "5/9")
- ✅ Result level (e.g., "Moderate Loneliness")
- ✅ Personalized action items
- ✅ Call-to-action to create account
- ✅ Beautiful HTML design (mobile-responsive)
- ✅ Plain text fallback

## ConvertKit Dashboard

After sending emails, you can view:
- **Broadcasts**: All sent assessment emails
- **Subscribers**: Guests who received emails (auto-added)
- **Analytics**: Open rates, click rates, etc.

Go to: https://app.convertkit.com/broadcasts

## Troubleshooting

### "API credentials not found" error
- ✅ Check you added both `CONVERTKIT_API_KEY` and `CONVERTKIT_API_SECRET`
- ✅ Make sure there are no extra spaces in `.env.local`
- ✅ Restart your dev server after adding variables

### "Email address not verified" error
- ✅ Go to ConvertKit Settings > Sending
- ✅ Verify your sender email domain
- ✅ Or use a personal email that's already verified

### "Database error" when saving
- ✅ Make sure you ran the SQL migration
- ✅ Check Supabase dashboard to verify `guest_assessment_emails` table exists

### Email not received
- ✅ Check spam/junk folder
- ✅ Check ConvertKit dashboard > Broadcasts for sending status
- ✅ Verify the email address is correct
- ✅ Check server console for error messages

## Advanced: ConvertKit Sequences

Want to follow up with guests automatically?

1. **Create a Sequence in ConvertKit**:
   - Go to https://app.convertkit.com/sequences
   - Create "Assessment Follow-Up" sequence

2. **Modify the code** to tag subscribers:
   ```typescript
   // In /api/guest/save-email.ts
   // After sending email, add subscriber to sequence
   ```

3. **Sequence Ideas**:
   - Day 3: "How are you feeling since taking the assessment?"
   - Day 7: "3 tips for [their specific result]"
   - Day 14: "Have you considered therapy? Here's how to start"
   - Day 30: "Time to retake your assessment - track your progress!"

## What's Next?

✅ Emails are working
✅ Guest data is stored
✅ Subscribers auto-added to ConvertKit

**Consider adding:**
1. Automated retake reminders (monthly)
2. Follow-up sequences based on assessment results
3. Newsletter signup option
4. Progress tracking emails

## Need Help?

- ConvertKit Docs: https://developers.convertkit.com/
- ConvertKit Support: support@convertkit.com
- Check server console for detailed error logs
