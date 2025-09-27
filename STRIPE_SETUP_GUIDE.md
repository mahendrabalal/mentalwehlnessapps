# Stripe Setup Guide for Mental Wellness App

## Overview
Your existing Stripe account can be used for the Mental Wellness App. You just need to create new products for the premium subscription plans.

## Step 1: Access Stripe Dashboard

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top-right)
3. Your current test keys are already configured in `.env.local`

## Step 2: Create Mental Wellness Premium Products

### Product 1: Premium Monthly Plan

1. Navigate to **Products** → **Add product**
2. Fill in the details:
   - **Name:** Mental Wellness Premium Monthly
   - **Description:** Unlimited AI therapy companion, advanced analytics, premium content library, and priority crisis support
   - **Pricing Model:** Standard pricing
   - **Price:** $19.99 USD
   - **Billing Period:** Monthly
   - **Usage Type:** Licensed

3. **Advanced Settings:**
   - **Statement Descriptor:** MENTAL WELLNESS
   - **Tax Code:** SaaS (Software as a Service) - if applicable
   - **Metadata (important for HIPAA compliance):**
     ```
     healthcare_service: true
     hipaa_compliant: true
     clinical_features: ai_companion,analytics,content_library
     crisis_support: enhanced
     ```

4. Click **Add product**
5. **Copy the Price ID** (starts with `price_`) - you'll need this for `.env.local`

### Product 2: Premium Yearly Plan

1. Navigate to **Products** → **Add product**
2. Fill in the details:
   - **Name:** Mental Wellness Premium Yearly
   - **Description:** All premium monthly features plus annual clinical report, 2 months free, and extended data retention
   - **Pricing Model:** Standard pricing
   - **Price:** $89.99 USD
   - **Billing Period:** Yearly
   - **Usage Type:** Licensed

3. **Advanced Settings:**
   - **Statement Descriptor:** MENTAL WELLNESS
   - **Tax Code:** SaaS (Software as a Service) - if applicable
   - **Metadata (important for HIPAA compliance):**
     ```
     healthcare_service: true
     hipaa_compliant: true
     clinical_features: ai_companion,analytics,content_library,annual_report
     crisis_support: enhanced
     billing_cycle: yearly
     savings: 2_months_free
     ```

4. Click **Add product**
5. **Copy the Price ID** (starts with `price_`) - you'll need this for `.env.local`

## Step 3: Configure Free Trial

For both products, you can configure the trial period:

1. Go to the product page
2. Click on the price
3. In **Free trial** section, set to **7 days**
4. Save changes

## Step 4: Update Environment Variables

Replace the placeholder price IDs in `.env.local`:

```bash
# Replace these placeholder values with your actual Stripe price IDs
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_1234567890abcdef  # Your actual monthly price ID
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_1234567890abcdef  # Same as above
STRIPE_PREMIUM_YEARLY_PRICE_ID=price_0987654321fedcba  # Your actual yearly price ID
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_0987654321fedcba  # Same as above
```

## Step 5: Configure Webhook (Optional but Recommended)

1. Navigate to **Developers** → **Webhooks** → **Add endpoint**
2. **Endpoint URL:** `https://yourdomain.com/api/subscriptions/webhook`
   - For local development: Use ngrok or similar to expose localhost
   - For production: Your deployed domain
3. **Events to send:**
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Click **Add endpoint**
5. **Copy the Webhook Secret** (starts with `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in `.env.local` if different

## Step 6: Test the Integration

### Test Cards for Development:
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **Requires Authentication:** `4000 0025 0000 3155`

### Test Flow:
1. Start your development server
2. Navigate to the dashboard
3. Click "Start Free Trial"
4. Use a test card to complete subscription
5. Verify the webhook receives events

## Step 7: HIPAA Compliance Notes

Your Stripe configuration includes healthcare metadata for compliance:
- All customer data is encrypted in transit and at rest
- Metadata includes healthcare context for audit trails
- Business Associate Agreement (BAA) available from Stripe
- PCI DSS Level 1 compliance for payment processing

## Production Deployment Checklist

When ready for production:
- [ ] Switch to Live Mode in Stripe Dashboard
- [ ] Create live versions of your products
- [ ] Update `.env.local` with live keys and price IDs
- [ ] Configure production webhook URL
- [ ] Sign Business Associate Agreement with Stripe
- [ ] Test with real payment methods
- [ ] Monitor webhook delivery and error logs

## Support

- **Stripe Documentation:** [https://stripe.com/docs](https://stripe.com/docs)
- **Healthcare & HIPAA:** [https://stripe.com/guides/hipaa](https://stripe.com/guides/hipaa)
- **Business Associate Agreement:** Contact Stripe Support

## Quick Reference

After setup, your `.env.local` should look like:
```bash
STRIPE_SECRET_KEY=sk_test_51S1ray... # Your existing key ✅
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S1ray... # Your existing key ✅
STRIPE_WEBHOOK_SECRET=whsec_9f44c5c8... # Your existing or new webhook secret ✅
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_[your_monthly_id] # Replace with actual ID
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_[your_monthly_id] # Replace with actual ID
STRIPE_PREMIUM_YEARLY_PRICE_ID=price_[your_yearly_id] # Replace with actual ID
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_[your_yearly_id] # Replace with actual ID
```