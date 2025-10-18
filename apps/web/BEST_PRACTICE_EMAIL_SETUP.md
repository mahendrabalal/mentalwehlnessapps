# Best Practice Email Setup for Assessment Results

## Industry Standard Approach

**Transactional vs. Marketing Emails:**
- **Transactional emails** (assessment results, password resets): Use Resend/SendGrid/Postmark
- **Marketing emails** (newsletters, campaigns): Use ConvertKit/Mailchimp

## Recommended: Option 1 - Resend (5-minute setup)

### Why Resend?
✅ Built for developers
✅ Free up to 3,000 emails/month
✅ Immediate email delivery
✅ No dashboard setup required
✅ Better deliverability for transactional emails
✅ Used by Vercel, Linear, Cal.com

### Setup Steps:

1. **Sign up for Resend** (FREE):
   - Go to https://resend.com/signup
   - Verify your email

2. **Get API Key**:
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_`)

3. **Verify your domain** (for better deliverability):
   - Dashboard → Domains → Add Domain
   - Add DNS records to your domain
   - Or use `onboarding@resend.dev` for testing

4. **Update .env.local**:
   ```bash
   # Replace ConvertKit with Resend
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@mentalwellnessapps.com  # Or onboarding@resend.dev for testing
   EMAIL_REPLY_TO=support@mentalwellnessapps.com
   ```

5. **Restart your dev server** - Done! ✅

### Testing:
```bash
# Test locally
curl -X POST http://localhost:3003/api/guest/save-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@gmail.com",
    "toolName": "Loneliness Assessment",
    "assessmentType": "ucla-loneliness",
    "assessmentResults": {
      "score": 7,
      "maxScore": 9,
      "level": "High loneliness",
      "recommendations": ["Connect with others"]
    }
  }'
```

---

## Alternative: Option 2 - ConvertKit Only

If you want to stick with ConvertKit (requires more setup):

### Step 1: Create Custom Fields in ConvertKit

1. Go to ConvertKit Dashboard → Settings → Custom Fields
2. Create these fields:
   - `last_assessment_subject` (Text)
   - `last_assessment_date` (Date)
   - `assessment_score` (Number)
   - `assessment_level` (Text)

### Step 2: Create Email Sequence

1. Dashboard → Sequences → New Sequence
2. Name it "Assessment Results"
3. Create email with this content:

```html
Subject: Your {{last_assessment_subject}} Results

Hi there! 👋

Thanks for completing the assessment. Here are your results:

Score: {{assessment_score}}
Level: {{assessment_level}}

[Rest of your email template]
```

4. Set to send immediately
5. Copy the Sequence ID from the URL

### Step 3: Create a Tag

1. Dashboard → Tags → New Tag
2. Create tag: "Assessment Completed"
3. Set to automatically add to "Assessment Results" sequence

### Step 4: Update Environment Variables

```bash
# Add to .env.local
CONVERTKIT_ASSESSMENT_SEQUENCE_ID=your_sequence_id_here
CONVERTKIT_ASSESSMENT_TAG_ID=your_tag_id_here
```

### Step 5: Update Code

Uncomment the sequence code in `/apps/web/src/lib/email.ts` (lines 187-198)

**Drawbacks of ConvertKit approach:**
- More complex setup
- Requires dashboard configuration
- Less control over email content
- Slower delivery (not real-time)
- Custom fields have limitations

---

## Recommended: Hybrid Approach (Best of Both Worlds)

This is what most SaaS companies do:

```bash
# .env.local
EMAIL_PROVIDER=resend                    # For transactional emails
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@mentalwellnessapps.com

# Keep ConvertKit for marketing
CONVERTKIT_API_KEY=Do5OFBBgFqOxfjd2pabYjQ
CONVERTKIT_API_SECRET=f7JMsQvMsKZnbgFKroJ4sYOQ0_d5UQCHlXbqYwFG0Fk
```

**Use Resend for:**
- Assessment results ✉️
- Password resets 🔒
- Account notifications 📧

**Use ConvertKit for:**
- Weekly wellness tips newsletter 📰
- Product announcements 📣
- Onboarding sequences 🎯

---

## Quick Comparison

| Feature | Resend | ConvertKit |
|---------|--------|------------|
| Transactional emails | ✅ Excellent | ⚠️ Not designed for this |
| Marketing emails | ❌ No | ✅ Excellent |
| Setup time | 5 minutes | 30+ minutes |
| Free tier | 3,000/month | Subscribers based |
| Immediate delivery | ✅ Yes | ⚠️ Delayed |
| Dynamic content | ✅ Full HTML | ⚠️ Limited merge fields |
| API simplicity | ✅✅✅ Very easy | ⚠️ Complex |

---

## My Recommendation

**For you:** Switch to **Resend for assessment emails** (keep ConvertKit for marketing later)

**Why:**
1. ✅ Takes 5 minutes to setup
2. ✅ Free for your volume
3. ✅ Just works™
4. ✅ Better email deliverability
5. ✅ No dashboard configuration needed
6. ✅ Professional transactional emails

**Later:** Add ConvertKit for marketing newsletters when you're ready to grow your email list.

---

## Need Help?

- Resend Docs: https://resend.com/docs
- Resend React Email: https://react.email (for beautiful email templates)
- Questions? Check `/apps/web/EMAIL_SETUP.md`
