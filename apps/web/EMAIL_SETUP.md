# Email Integration Setup Guide

This guide explains how to set up email integration for sending assessment results to guests.

## Overview

The app supports three email providers:
1. **SendGrid** (Recommended) - Industry standard, reliable
2. **Resend** - Modern alternative, developer-friendly
3. **Mailchimp Transactional** (Mandrill) - If you already use Mailchimp

## Quick Start

### 1. Choose Your Email Provider

**SendGrid (Recommended)**
- Free tier: 100 emails/day
- Sign up: https://signup.sendgrid.com/
- Documentation: https://docs.sendgrid.com/

**Resend (Modern Alternative)**
- Free tier: 3,000 emails/month
- Sign up: https://resend.com/signup
- Documentation: https://resend.com/docs

**Mailchimp Transactional**
- For existing Mailchimp users
- Sign up: https://mailchimp.com/developer/transactional/

### 2. Get Your API Key

**SendGrid:**
1. Go to Settings > API Keys
2. Create API Key with "Mail Send" permissions
3. Copy the key (you won't see it again!)

**Resend:**
1. Go to API Keys section
2. Create new API key
3. Copy the key

**Mailchimp:**
1. Go to Transactional > Settings
2. Copy your API key

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Email Provider Configuration
EMAIL_PROVIDER=sendgrid          # Options: sendgrid, resend, mailchimp
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=support@yourdomain.com

# SendGrid (if using SendGrid)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxx

# Resend (if using Resend)
# RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# Mailchimp (if using Mailchimp)
# MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxx

# App URL (for email links)
NEXT_PUBLIC_APP_URL=https://yourdomain.com  # or http://localhost:3000 for development
```

### 4. Run Database Migration

Run the SQL migration to create the required database table:

```bash
# Copy the migration file content from:
# apps/web/supabase/migrations/20250118_guest_assessment_emails.sql

# Then run it in your Supabase SQL Editor or via CLI:
supabase db push
```

Or manually execute the SQL in your Supabase dashboard:
1. Go to SQL Editor
2. Copy content from `supabase/migrations/20250118_guest_assessment_emails.sql`
3. Click "Run"

### 5. Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Visit a assessment tool (e.g., `/tools/loneliness-assessment`)

3. Complete the assessment

4. Click "Just Email Me Results"

5. Enter your email address

6. Check your email inbox!

## Email Providers Comparison

| Feature | SendGrid | Resend | Mailchimp |
|---------|----------|--------|-----------|
| Free Tier | 100/day | 3,000/month | 500/month |
| Ease of Setup | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Deliverability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Analytics | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Price (Paid) | $$ | $ | $$$ |

## Development Tips

### Testing Locally

For local development, you can use:
- **Mailtrap.io** - Fake SMTP server for testing
- **MailHog** - Local email testing tool
- **Your personal email** - Just use your own email for testing

### Email Template Customization

The email template is in `/apps/web/src/lib/email.ts` in the `generateAssessmentEmailTemplate()` function.

You can customize:
- Colors and branding
- Content structure
- Call-to-action buttons
- Footer links

### Debugging

Enable email debugging:

```bash
# Add to .env.local
DEBUG=email:*
```

Then check your server console for detailed email sending logs.

## Production Checklist

Before going to production:

- [ ] Set up proper SPF/DKIM records for your domain
- [ ] Verify your sender email domain
- [ ] Test email delivery to multiple providers (Gmail, Outlook, etc.)
- [ ] Set up email tracking (opens, clicks) if needed
- [ ] Configure unsubscribe links (if required)
- [ ] Test on mobile devices
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Add rate limiting to prevent abuse

## Troubleshooting

### Emails not sending

1. Check API key is correct in `.env.local`
2. Check server console for error messages
3. Verify database record was created (`guest_assessment_emails` table)
4. Check email provider dashboard for bounces/errors

### Emails going to spam

1. Set up SPF records for your domain
2. Set up DKIM signing
3. Use a verified sender domain
4. Avoid spam trigger words in subject/content
5. Include unsubscribe link

### Database errors

1. Make sure you ran the migration SQL
2. Check Supabase RLS policies are set correctly
3. Verify API keys have correct permissions

## Advanced Features

### Batch Email Processing

Create a cron job to send emails in batches (for better deliverability):

```bash
# Create: apps/web/src/pages/api/cron/send-pending-emails.ts
```

### Email Analytics

Track email opens and clicks by adding tracking pixels and UTM parameters.

### A/B Testing

Test different email subject lines and content to improve open rates.

## Support

For issues or questions:
- Check the logs in your development console
- Review SendGrid/Resend/Mailchimp documentation
- Create an issue in the repository

## Next Steps

After email is working, consider:
1. Setting up automated retake reminders (monthly)
2. Adding personalized wellness tips
3. Creating email sequences for engagement
4. Building a newsletter system
5. Adding progress reports via email
