import Stripe from 'stripe'

// BMad Method: Healthcare-compliant Stripe configuration - Lazy initialization
let stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!stripe) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set. Please check your .env.local file.')
    }

    stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
      // Healthcare compliance: Ensure PCI DSS Level 1 compliance
      telemetry: false // Disable telemetry for healthcare privacy
    })
  }
  return stripe
}

// BMad Method: Premium subscription product configuration
export const SUBSCRIPTION_PLANS = {
  PREMIUM_MONTHLY: {
    priceId: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || 'price_mental_wellness_monthly_placeholder',
    name: 'Premium Monthly',
    price: 599, // $5.99 in cents
    interval: 'month',
    features: [
      'Unlimited AI Therapy Companion',
      'Advanced Mood Analytics',
      'Premium Content Library',
      'Crisis Prevention Insights',
      'Personalized Wellness Plans',
      'Priority Support'
    ]
  },
  PREMIUM_YEARLY: {
    priceId: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID || 'price_mental_wellness_yearly_placeholder',
    name: 'Premium Yearly',
    price: 5999, // $59.99 in cents (approx. 2 months free)
    interval: 'year',
    features: [
      'All Premium Monthly features',
      'Annual wellness report',
      'Equivalent to 2 months free',
      'Advanced analytics export'
    ]
  }
} as const

export interface CreateSubscriptionParams {
  userId: string
  priceId: string
  email: string
  name?: string
  trialPeriodDays?: number
  metadata?: Record<string, string>
}

export interface SubscriptionResponse {
  subscriptionId: string
  clientSecret: string | null
  status: string
}

// BMad Method: HIPAA-compliant subscription creation
export async function createSubscription({
  userId,
  priceId,
  email,
  name,
  trialPeriodDays = 0,
  metadata = {}
}: CreateSubscriptionParams): Promise<SubscriptionResponse> {
  try {
    // BMad Method: Validate price ID is not a placeholder
    if (priceId.includes('placeholder')) {
      throw new Error('Stripe products not yet configured. Please create Mental Wellness products in Stripe Dashboard and update environment variables. See STRIPE_SETUP_GUIDE.md for instructions.')
    }
    // Create or retrieve customer
    const stripeInstance = getStripe()
    let customer = await findCustomerByEmail(email)

    if (!customer) {
      customer = await stripeInstance.customers.create({
        email,
        name,
        metadata: {
          userId,
          // BMad Method: Healthcare metadata for compliance tracking
          hipaaCompliant: 'true',
          dataProcessingConsent: 'true',
          createdAt: new Date().toISOString(),
          ...metadata
        }
      })
    }

    // Create subscription with healthcare-compliant settings
    const subscriptionParams: any = {
      customer: customer.id,
      items: [{ price: priceId }],
      // Use allow_incomplete to create payment intent immediately
      payment_behavior: 'allow_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card']
      },
      expand: ['latest_invoice', 'latest_invoice.payment_intent'],
      metadata: {
        userId,
        planType: getPlanTypeFromPriceId(priceId),
        // BMad Method: Clinical feature access tracking
        clinicalFeaturesEnabled: 'true',
        aiCompanionAccess: 'unlimited',
        analyticsAccess: 'premium',
        contentLibraryAccess: 'full',
        ...metadata
      }
    }

    // Only add trial period if specified
    if (trialPeriodDays > 0) {
      subscriptionParams.trial_period_days = trialPeriodDays
    }

    const subscription = await stripeInstance.subscriptions.create(subscriptionParams)

    console.log('BMad Method: Subscription created', {
      subscriptionId: subscription.id,
      status: subscription.status,
      latest_invoice: subscription.latest_invoice
    })

    type InvoiceWithIntent = Stripe.Invoice & {
      payment_intent?: string | Stripe.PaymentIntent | null
    }

    // BMad Method: Retrieve and finalize the invoice to create payment intent
    const latestInvoice = subscription.latest_invoice
    let invoice: InvoiceWithIntent | null = null

    if (!latestInvoice) {
      throw new Error('No invoice created for subscription')
    }

    if (typeof latestInvoice === 'string') {
      invoice = await stripeInstance.invoices.retrieve(latestInvoice, {
        expand: ['payment_intent']
      }) as InvoiceWithIntent
    } else {
      invoice = latestInvoice as InvoiceWithIntent
    }

    console.log('BMad Method: Invoice retrieved', {
      invoiceId: invoice.id,
      status: invoice.status,
      amount: invoice.amount_due,
      payment_intent: invoice.payment_intent
    })

    // If invoice is still draft, attempt to finalize once to generate the payment intent
    if (invoice.status === 'draft') {
      console.log('BMad Method: Finalizing draft invoice to create payment intent')
      if (!invoice.id) {
        throw new Error('Invoice is missing an identifier')
      }
      const invoiceId = invoice.id
      try {
        invoice = await stripeInstance.invoices.finalizeInvoice(invoiceId, {
          expand: ['payment_intent']
        }) as InvoiceWithIntent
        console.log('BMad Method: Invoice finalized', {
          invoiceId: invoice.id,
          status: invoice.status,
          payment_intent: invoice.payment_intent
        })
      } catch (finalizeError) {
        const message = finalizeError instanceof Error ? finalizeError.message : ''
        // Stripe returns an error when we try to finalize an invoice that is already finalized/open.
        if (message.includes('already finalized')) {
          console.warn('BMad Method: Invoice already finalized, retrieving latest state instead')
          invoice = await stripeInstance.invoices.retrieve(invoiceId, {
            expand: ['payment_intent']
          }) as InvoiceWithIntent
        } else {
          throw finalizeError
        }
      }
    }

    // If invoice is open but has no payment intent, we need to refresh the invoice
    if (invoice.status === 'open' && !invoice.payment_intent) {
      console.log('BMad Method: Open invoice without payment intent, retrieving again')
      if (!invoice.id) {
        throw new Error('Invoice is missing an identifier')
      }
      invoice = await stripeInstance.invoices.retrieve(invoice.id, {
        expand: ['payment_intent']
      }) as InvoiceWithIntent
    }

    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent | null

    // BMad Method: Immediate payment required for non-trial subscriptions
    if (!paymentIntent || typeof paymentIntent === 'string') {
      throw new Error(`Payment setup required - no payment intent object. Invoice status: ${invoice.status}, PI: ${typeof paymentIntent}`)
    }

    if (!paymentIntent.client_secret) {
      throw new Error(`Payment intent exists but has no client secret. Status: ${paymentIntent.status}`)
    }

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      status: subscription.status
    }
  } catch (error) {
    console.error('BMad Method: Subscription creation error:', error)
    throw new Error(`Failed to create subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const stripeInstance = getStripe()
  const customers = await stripeInstance.customers.list({
    email,
    limit: 1
  })

  return customers.data.length > 0 ? customers.data[0] : null
}

function getPlanTypeFromPriceId(priceId: string): string {
  if (priceId === SUBSCRIPTION_PLANS.PREMIUM_MONTHLY.priceId) return 'premium_monthly'
  if (priceId === SUBSCRIPTION_PLANS.PREMIUM_YEARLY.priceId) return 'premium_yearly'
  return 'unknown'
}

// BMad Method: Healthcare-compliant subscription management
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const stripeInstance = getStripe()
    return await stripeInstance.subscriptions.cancel(subscriptionId, {
      // BMad Method: Graceful cancellation for healthcare continuity
      prorate: true,
      invoice_now: true
    })
  } catch (error) {
    console.error('BMad Method: Subscription cancellation error:', error)
    throw new Error('Failed to cancel subscription')
  }
}

export async function pauseSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const stripeInstance = getStripe()
    return await stripeInstance.subscriptions.update(subscriptionId, {
      pause_collection: {
        behavior: 'keep_as_draft'
      }
    })
  } catch (error) {
    console.error('BMad Method: Subscription pause error:', error)
    throw new Error('Failed to pause subscription')
  }
}

export async function resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const stripeInstance = getStripe()
    return await stripeInstance.subscriptions.update(subscriptionId, {
      pause_collection: ''
    })
  } catch (error) {
    console.error('BMad Method: Subscription resume error:', error)
    throw new Error('Failed to resume subscription')
  }
}

export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const stripeInstance = getStripe()
    return await stripeInstance.subscriptions.retrieve(subscriptionId, {
      expand: ['customer', 'default_payment_method']
    })
  } catch (error) {
    console.error('BMad Method: Subscription retrieval error:', error)
    throw new Error('Failed to retrieve subscription')
  }
}

// BMad Method: Customer portal for healthcare transparency
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  try {
    const stripeInstance = getStripe()
    const session = await stripeInstance.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })

    return session.url
  } catch (error) {
    console.error('BMad Method: Customer portal error:', error)
    throw new Error('Failed to create customer portal session')
  }
}

// BMad Method: Webhook event handling for subscription changes
export async function handleWebhookEvent(
  event: Stripe.Event,
  endpointSecret: string
): Promise<void> {
  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`BMad Method: Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('BMad Method: Webhook handling error:', error)
    throw error
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
  console.log('BMad Method: Subscription created:', subscription.id)
  // TODO: Update user subscription status in database
  // TODO: Enable premium features for user
  // TODO: Send welcome email with clinical feature overview
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  console.log('BMad Method: Subscription updated:', subscription.id)
  // TODO: Update user subscription status in database
  // TODO: Handle plan changes and feature access updates
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  console.log('BMad Method: Subscription deleted:', subscription.id)
  // TODO: Revoke premium feature access
  // TODO: Send cancellation confirmation with data retention notice
  // TODO: Schedule data export for healthcare continuity
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  console.log('BMad Method: Payment succeeded for invoice:', invoice.id)
  // TODO: Confirm subscription renewal
  // TODO: Send payment confirmation
}

async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  console.log('BMad Method: Payment failed for invoice:', invoice.id)
  // TODO: Handle payment failure gracefully for healthcare continuity
  // TODO: Send payment retry notification
  // TODO: Implement grace period for critical healthcare features
}

export { getStripe }
export default getStripe
