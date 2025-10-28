# Deployment Checklist - Email Integration

## ✅ Completed

- [x] Guest assessment results email capture feature
- [x] SaveResultsPrompt component integrated into 3 assessment tools
- [x] Supabase database schema (guest_assessment_emails table)
- [x] RLS policies for secure email insertion
- [x] Resend transactional email service integrated
- [x] Professional HTML email templates with results
- [x] Server-side API endpoint with authentication
- [x] Local testing (curl tests successful)
- [x] Git commit with full changelog
- [x] Code pushed to GitHub

## ⏳ Required Before Production

### 1. Add Resend API Key to Vercel (CRITICAL)

Your code is deployed but emails won't send without this!

**Steps:**
1. Go to: https://vercel.com/dashboard
2. Select your project: `mentalwellnessapps`
3. Go to: Settings → Environment Variables
4. Add new variable:
   ```
   Name: RESEND_API_KEY
   Value: re_LZamBnHT_53cxtC7C1HhSLBqrVPes4BmB
   ```
5. Select: Production
6. Click: Add
7. Redeploy the project

**Also add:**
   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocHV1b2JvdGZzd2xwcHJ6c2ljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ5MDIxMywiZXhwIjoyMDc0MDY2MjEzfQ.Dim6-ZJayukoGHsdQZNvkoJppf-wqfSJjMBVW5zrOlw
   ```

### 2. Verify Resend Domain (Optional but Recommended)

**Current Status:** Domain DNS records added, waiting for verification

**What to do:**
1. Check Resend dashboard: https://resend.com/domains
2. If domain shows ✅ verified:
   - Update `.env.local` locally: `EMAIL_FROM=noreply@mentalwellnessapps.com`
   - Or update Vercel environment variable
   - Redeploy
3. If still pending:
   - Wait 15-30 minutes for DNS propagation
   - Try "Verify" button again
   - Check DNS records at https://www.dnschecker.org/

**Once verified:**
- All emails will come from `noreply@mentalwellnessapps.com`
- Better deliverability
- Professional appearance

### 3. Test in Production

Once environment variables are added:

```bash
# Test via production API
curl -X POST https://www.mentalwellnessapps.com/api/guest/save-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mahendrabalalport@gmail.com",
    "toolName": "Loneliness Assessment",
    "assessmentType": "ucla-loneliness",
    "assessmentResults": {
      "score": 7,
      "maxScore": 9,
      "level": "High Loneliness",
      "recommendations": ["Connect with friends", "Join groups"]
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Email saved successfully. Check your inbox for your results!",
  "data": {
    "id": "uuid-here",
    "email": "mahendrabalalport@gmail.com"
  }
}
```

## Current Configuration

```bash
# .env.local (Development)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_LZamBnHT_53cxtC7C1HhSLBqrVPes4BmB
EMAIL_FROM=onboarding@resend.dev  # Testing email
RESEND_TEST_EMAIL=mahendrabalalport@gmail.com
EMAIL_REPLY_TO=support@mentalwellnessapps.com
```

## Files Changed

### New Files
- `apps/web/src/components/SaveResultsPrompt.tsx` - Email capture component
- `apps/web/src/lib/email.ts` - Resend email service
- `apps/web/src/pages/api/guest/save-email.ts` - API endpoint
- `apps/web/supabase/migrations/` - Database schema
- `apps/web/EMAIL_SETUP.md` - Email configuration guide
- `apps/web/BEST_PRACTICE_EMAIL_SETUP.md` - Industry best practices
- `apps/web/CONVERTKIT_SETUP.md` - ConvertKit integration (optional)

### Modified Files
- `apps/web/src/lib/supabase.ts` - Added server client function
- `apps/web/src/components/SocialConnectionAssessment.tsx` - Integrated SaveResultsPrompt
- `apps/web/src/components/StigmaAssessmentTool.tsx` - Integrated SaveResultsPrompt
- `apps/web/src/components/GuestBurnoutAssessment.tsx` - Integrated SaveResultsPrompt
- `apps/web/src/components/GuestToolBanner.tsx` - Updated banner styles

## Deployment Steps

1. **Environment Variables** (Most Important!)
   ```
   Add to Vercel:
   - RESEND_API_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Trigger Redeploy**
   - Go to Vercel Dashboard
   - Click "Redeploy" on latest commit
   - Or push new commit to trigger auto-deploy

3. **Monitor Deployment**
   - Check Vercel deployment logs
   - Should see build complete ✓

4. **Test Production**
   - Visit: https://www.mentalwellnessapps.com
   - Take an assessment
   - Submit email in SaveResultsPrompt
   - Check inbox for email (2-5 min delivery)

## Troubleshooting

### Email not sending?
1. Check Vercel environment variables are set
2. Check Vercel deployment is complete
3. Check API logs in Vercel dashboard
4. Verify Resend API key is correct

### Domain verification stuck?
1. Check DNS records at https://www.dnschecker.org/
2. Wait 30 minutes for full propagation
3. Try "Retry verification" in Resend dashboard
4. Contact Resend support if still stuck

### Database errors?
1. Check Supabase migration ran: `SELECT * FROM guest_assessment_emails LIMIT 1`
2. Check RLS policies: Settings → Security → Row Level Security
3. Verify service role key is correct in environment variables

## Next Steps

- [ ] Add Resend API key to Vercel
- [ ] Add Supabase service role key to Vercel
- [ ] Redeploy on Vercel
- [ ] Test email capture on production
- [ ] Monitor email deliverability
- [ ] Set up email domain verification (when DNS propagates)
- [ ] Add ConvertKit for marketing emails (optional, later)

## Support

Need help?
- Resend Docs: https://resend.com/docs
- Supabase Docs: https://supabase.io/docs
- Check server logs in Vercel dashboard
- Review EMAIL_SETUP.md in apps/web/

---

**Status:** Code deployed, awaiting environment variables to activate email service
**Last Updated:** 2025-10-18
**Deployed Commit:** 8212245
