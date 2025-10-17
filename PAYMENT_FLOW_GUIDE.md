# Payment Flow Implementation Guide

## Overview

This document describes the complete payment and subscription flow implemented for the Mental Wellness App. The implementation follows Stripe's industry best practices for SCA (Strong Customer Authentication) compliance and provides a secure, user-friendly payment experience.

## Payment Flow Architecture

### Industry Best Practice: 2-Step Payment Flow

We use a **Setup Intent** followed by **Subscription Creation** flow. This is Stripe's recommended approach for subscription payments.

```
┌─────────────────────────────────────────────────────────────────┐
│                    PAYMENT FLOW DIAGRAM                          │
└─────────────────────────────────────────────────────────────────┘

User Action                Backend                    Stripe
───────────                ───────                    ──────

1. Click "Subscribe"
      │
      ├──────────────────► POST /api/subscriptions/setup-intent
      │                           │
      │                           ├──────────────► Create Customer
      │                           │                (if not exists)
      │                           │
      │                           ├──────────────► Create Setup Intent
      │                           │                (for payment method)
      │                           │
      │                           │◄───────────── Client Secret
      │                           │
      │◄─────────────────── Return Client Secret
      │
      │
2. Enter Card Details
   & Submit Payment
      │
      ├──────────────────────────────────────────► Stripe.js validates
      │                                             & encrypts card data
      │
      ├──────────────────────────────────────────► confirmSetup()
      │                                             (handles 3D Secure
      │                                              automatically)
      │
      │◄─────────────────────────────────────────  Setup Intent
      │                                             confirmed ✓
      │
      │
3. Create Subscription
      │
      ├──────────────────► POST /api/subscriptions/create-with-payment
      │                           │
      │                           ├──────────────► Attach Payment Method
      │                           │                to Customer
      │                           │
      │                           ├──────────────► Create Subscription
      │                           │                with Payment Method
      │                           │
      │                           │◄───────────── Subscription Created
      │                           │
      │◄─────────────────── Success Response
      │
      │
4. Show Success
   Message & Redirect
```

## Implementation Details

### Step 1: Setup Intent Creation

**Endpoint:** `POST /api/subscriptions/setup-intent`

**Purpose:**
- Creates or retrieves a Stripe Customer
- Creates a Setup Intent for payment method collection
- Returns client secret for frontend payment form

**Request:**
```typescript
{
  userId: string
  email: string
  name?: string
}
```

**Response:**
```typescript
{
  setupIntentId: string
  clientSecret: string  // Used to initialize Stripe Elements
  customerId: string
}
```

**Code Location:** [`apps/web/src/pages/api/subscriptions/setup-intent.ts`](apps/web/src/pages/api/subscriptions/setup-intent.ts)

### Step 2: Payment Method Collection & Confirmation

**Component:** `PaymentStep` in [`PremiumUpgradeFlow.tsx`](apps/web/src/components/PremiumUpgradeFlow.tsx)

**Purpose:**
- Displays Stripe Payment Element for secure card collection
- Validates payment details (handled by Stripe.js)
- Confirms Setup Intent with 3D Secure/SCA authentication
- Extracts confirmed payment method ID

**Key Features:**
- ✅ **3D Secure / SCA Compliance:** Automatically handled by `stripe.confirmSetup()`
- ✅ **PCI Compliance:** Card data never touches our servers
- ✅ **Real-time Validation:** Stripe validates card details client-side
- ✅ **Error Handling:** Clear user feedback for payment issues

**Code Snippet:**
```typescript
const { error: confirmError, setupIntent } = await stripe.confirmSetup({
  elements,
  confirmParams: {
    return_url: `${window.location.origin}/dashboard?subscription=success`,
  },
  redirect: 'if_required'
})

if (setupIntent.status === 'succeeded') {
  const paymentMethodId = setupIntent.payment_method
  // Proceed to create subscription...
}
```

### Step 3: Subscription Creation

**Endpoint:** `POST /api/subscriptions/create-with-payment`

**Purpose:**
- Attaches confirmed payment method to customer
- Creates subscription with the payment method
- Returns subscription details

**Request:**
```typescript
{
  priceId: string
  userId: string
  customerId: string
  paymentMethodId: string  // From confirmed Setup Intent
}
```

**Response:**
```typescript
{
  subscriptionId: string
  customerId: string
  status: string  // 'active', 'trialing', etc.
  success: boolean
}
```

**Code Location:** [`apps/web/src/pages/api/subscriptions/create-with-payment.ts`](apps/web/src/pages/api/subscriptions/create-with-payment.ts)

### Step 4: Webhook Event Processing

**Endpoint:** `POST /api/subscriptions/webhook`

**Purpose:**
- Handles Stripe webhook events
- Updates database with subscription status changes
- Manages premium feature access

**Key Events Handled:**
- `customer.subscription.created` - Enable premium features
- `customer.subscription.updated` - Update subscription status
- `customer.subscription.deleted` - Gracefully disable features
- `invoice.payment_succeeded` - Record successful payment
- `invoice.payment_failed` - Handle payment failures with grace period

**Code Location:** [`apps/web/src/pages/api/subscriptions/webhook.ts`](apps/web/src/pages/api/subscriptions/webhook.ts)

## Security & Compliance Features

### 1. **PCI DSS Compliance**
- ✅ Card data collected directly by Stripe Elements
- ✅ No sensitive payment data touches our servers
- ✅ Stripe.js handles tokenization and encryption
- ✅ Level 1 PCI DSS certified infrastructure

### 2. **3D Secure / SCA Compliance**
- ✅ Automatic 3D Secure authentication via `confirmSetup()`
- ✅ Supports SCA for European payments (PSD2)
- ✅ Fallback handling for unsupported cards
- ✅ Redirect-based authentication when required

### 3. **HIPAA Compliance**
- ✅ Healthcare metadata attached to customers
- ✅ Audit trail for subscription changes
- ✅ Graceful feature degradation for payment failures
- ✅ Data retention consent tracked

### 4. **Authentication & Authorization**
- ✅ JWT token validation on all API endpoints
- ✅ User ID verification against authenticated session
- ✅ Server-side Supabase authentication
- ✅ Role-based access control ready

## Error Handling

### Payment Errors

| Error Type | Handling | User Message |
|------------|----------|--------------|
| Card Declined | Show error, allow retry | "Your card was declined. Please try another payment method." |
| Insufficient Funds | Show error, allow retry | "Insufficient funds. Please use a different card." |
| Invalid Card | Real-time validation | "Please check your card details." |
| 3DS Failed | Show error, allow retry | "Payment authentication failed. Please try again." |
| Network Error | Retry logic, error message | "Connection error. Please check your internet and try again." |

### Subscription Creation Errors

| Error Type | Handling | User Message |
|------------|----------|--------------|
| Price ID Invalid | Prevent submission | "Selected plan is invalid. Please contact support." |
| Customer Not Found | Re-create customer | "Setup error. Please try again." |
| Payment Method Detached | Show error | "Payment method error. Please re-enter your card." |
| Stripe API Error | Log & show generic message | "Unable to process subscription. Please contact support." |

## Testing

### Test Card Numbers (Stripe Test Mode)

```
Success:
4242 4242 4242 4242 - Default success
4000 0025 0000 3155 - 3D Secure required

Declined:
4000 0000 0000 0002 - Card declined
4000 0000 0000 9995 - Insufficient funds
4000 0000 0000 0069 - Expired card

3D Secure:
4000 0027 6000 3184 - 3DS required, succeeds
4000 0082 6000 3178 - 3DS required, fails
```

### Testing Workflow

1. **Setup Intent Creation:**
   ```bash
   curl -X POST http://localhost:3000/api/subscriptions/setup-intent \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"userId":"user_123","email":"test@example.com"}'
   ```

2. **Test Payment Flow:**
   - Use test card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

3. **Test 3D Secure:**
   - Use card: 4000 0027 6000 3184
   - Click "Complete" in 3DS modal

4. **Verify Webhook:**
   ```bash
   stripe listen --forward-to localhost:3000/api/subscriptions/webhook
   ```

## Subscription Management

### Customer Portal

**Endpoint:** `POST /api/subscriptions/portal`

**Purpose:**
- Creates Stripe Customer Portal session
- Allows users to self-manage subscriptions
- Update payment methods
- View billing history
- Cancel subscriptions

**Usage:**
```typescript
const response = await fetch('/api/subscriptions/portal', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customerId: 'cus_xxx',
    returnUrl: window.location.href
  })
})

const { url } = await response.json()
window.location.href = url
```

**Code Location:** [`apps/web/src/pages/api/subscriptions/portal.ts`](apps/web/src/pages/api/subscriptions/portal.ts)

## Database Schema

### user_subscriptions Table

```sql
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### subscription_payments Table

```sql
CREATE TABLE subscription_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_invoice_id TEXT NOT NULL UNIQUE,
  stripe_subscription_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  attempt_count INTEGER,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_premium_features Table

```sql
CREATE TABLE user_premium_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  ai_companion_unlimited BOOLEAN DEFAULT false,
  advanced_analytics BOOLEAN DEFAULT false,
  premium_content_library BOOLEAN DEFAULT false,
  priority_crisis_support BOOLEAN DEFAULT false,
  personalized_wellness_plans BOOLEAN DEFAULT false,
  data_export_enabled BOOLEAN DEFAULT false,
  enabled_at TIMESTAMP WITH TIME ZONE,
  disabled_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Benefits of This Implementation

### For Users
- ✅ **Secure:** Industry-standard payment security
- ✅ **Fast:** Streamlined checkout process
- ✅ **Transparent:** Clear pricing and billing information
- ✅ **Convenient:** Self-service subscription management
- ✅ **Compliant:** Meets banking regulations (SCA/PSD2)

### For Developers
- ✅ **Maintainable:** Clear separation of concerns
- ✅ **Testable:** Easy to test with Stripe test mode
- ✅ **Scalable:** Handles high volume of transactions
- ✅ **Observable:** Comprehensive logging and error tracking
- ✅ **Documented:** Well-documented codebase

### For Business
- ✅ **Compliant:** PCI DSS, HIPAA, SCA compliant
- ✅ **Reliable:** Built-in retry and error handling
- ✅ **Flexible:** Easy to add new plans and features
- ✅ **Auditable:** Complete transaction history
- ✅ **Recoverable:** Graceful handling of payment failures

## Migration from Old Flow

If you were using the old `/api/subscriptions/create` endpoint, here's how to migrate:

### Old Flow (deprecated)
```typescript
// ❌ Old way - creates subscription without payment method
const response = await fetch('/api/subscriptions/create', {
  method: 'POST',
  body: JSON.stringify({ priceId, userId, email })
})
```

### New Flow (recommended)
```typescript
// ✅ New way - Setup Intent then subscription
// Step 1: Create Setup Intent
const setupResponse = await fetch('/api/subscriptions/setup-intent', {
  method: 'POST',
  body: JSON.stringify({ userId, email })
})
const { clientSecret, customerId } = await setupResponse.json()

// Step 2: Collect payment method with Stripe Elements
const { setupIntent } = await stripe.confirmSetup({
  elements,
  redirect: 'if_required'
})

// Step 3: Create subscription with payment method
const subResponse = await fetch('/api/subscriptions/create-with-payment', {
  method: 'POST',
  body: JSON.stringify({
    priceId,
    userId,
    customerId,
    paymentMethodId: setupIntent.payment_method
  })
})
```

## Support & Troubleshooting

### Common Issues

**Issue:** "This customer has no attached payment source"
- **Cause:** Using old create endpoint without payment method
- **Fix:** Use new 2-step flow with Setup Intent

**Issue:** 3D Secure modal doesn't appear
- **Cause:** Missing `redirect: 'if_required'` parameter
- **Fix:** Add parameter to `confirmSetup()` call

**Issue:** Subscription created but payment failed
- **Cause:** Webhook not handling payment failures
- **Fix:** Check webhook handler logs and retry logic

### Monitoring

Monitor these metrics:
- Setup Intent success rate
- Payment confirmation success rate
- 3D Secure completion rate
- Subscription activation rate
- Payment failure rate
- Webhook processing time

## Additional Resources

- [Stripe Setup Intents Documentation](https://stripe.com/docs/payments/setup-intents)
- [Strong Customer Authentication](https://stripe.com/docs/strong-customer-authentication)
- [Stripe Subscriptions Best Practices](https://stripe.com/docs/billing/subscriptions/overview)
- [PCI DSS Compliance](https://stripe.com/docs/security/guide)

---

**Last Updated:** 2025-10-17
**Maintained By:** Mental Wellness App Team
**Version:** 2.0.0
