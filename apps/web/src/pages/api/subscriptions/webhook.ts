import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase'
import stripe from '@/lib/stripe'

// BMad Method: Disable bodyParser for webhook raw body processing
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe().webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err) {
    console.error('BMad Method: Webhook signature verification failed:', err)
    return res.status(400).json({ error: 'Webhook signature verification failed' })
  }

  const supabase = createClient()

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription, supabase)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription, supabase)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, supabase)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice, supabase)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice, supabase)
        break

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object as Stripe.Subscription, supabase)
        break

      default:
        console.log(`BMad Method: Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('BMad Method: Webhook processing error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing subscription created:', subscription.id)

  const userId = subscription.metadata?.userId
  if (!userId) {
    console.error('BMad Method: No userId in subscription metadata')
    return
  }

  // Update subscription in database
  const { error } = await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      plan_type: subscription.metadata?.planType || 'premium_monthly',
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      trial_start: (subscription as any).trial_start ? new Date((subscription as any).trial_start * 1000).toISOString() : null,
      trial_end: (subscription as any).trial_end ? new Date((subscription as any).trial_end * 1000).toISOString() : null,
      cancel_at_period_end: (subscription as any).cancel_at_period_end,
      created_at: new Date((subscription as any).created * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.error('BMad Method: Error updating subscription:', error)
  }

  // BMad Method: Enable premium features
  await enablePremiumFeatures(userId, supabase)
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing subscription updated:', subscription.id)

  const userId = subscription.metadata?.userId
  if (!userId) {
    console.error('BMad Method: No userId in subscription metadata')
    return
  }

  // Update subscription status
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      trial_end: (subscription as any).trial_end ? new Date((subscription as any).trial_end * 1000).toISOString() : null,
      cancel_at_period_end: (subscription as any).cancel_at_period_end,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('BMad Method: Error updating subscription:', error)
  }

  // BMad Method: Update feature access based on subscription status
  if (subscription.status === 'active') {
    await enablePremiumFeatures(userId, supabase)
  } else if (['canceled', 'incomplete_expired', 'unpaid'].includes(subscription.status)) {
    await disablePremiumFeatures(userId, supabase)
  }
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing subscription deleted:', subscription.id)

  const userId = subscription.metadata?.userId
  if (!userId) {
    console.error('BMad Method: No userId in subscription metadata')
    return
  }

  // Update subscription status to canceled
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('BMad Method: Error updating canceled subscription:', error)
  }

  // BMad Method: Gracefully disable premium features with healthcare continuity
  await disablePremiumFeatures(userId, supabase, true) // true = graceful transition
}

async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing payment succeeded:', invoice.id)

  if ((invoice as any).subscription) {
    // Update payment history for healthcare billing compliance
    const { error } = await supabase
      .from('subscription_payments')
      .insert({
        stripe_invoice_id: invoice.id,
        stripe_subscription_id: (invoice as any).subscription,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'succeeded',
        paid_at: new Date(invoice.status_transitions.paid_at! * 1000).toISOString(),
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('BMad Method: Error recording payment:', error)
    }
  }
}

async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing payment failed:', invoice.id)

  if ((invoice as any).subscription) {
    // BMad Method: Healthcare continuity - don't immediately disable critical features
    const { error } = await supabase
      .from('subscription_payments')
      .insert({
        stripe_invoice_id: invoice.id,
        stripe_subscription_id: (invoice as any).subscription,
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: 'failed',
        attempt_count: invoice.attempt_count,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('BMad Method: Error recording failed payment:', error)
    }

    // TODO: Implement grace period for healthcare features
    // TODO: Send payment retry notification
  }
}

async function handleTrialWillEnd(
  subscription: Stripe.Subscription,
  supabase: any
): Promise<void> {
  console.log('BMad Method: Processing trial will end:', subscription.id)

  const userId = subscription.metadata?.userId
  if (!userId) return

  // TODO: Send trial ending notification
  // TODO: Encourage subscription conversion with clinical benefit highlights
}

async function enablePremiumFeatures(userId: string, supabase: any): Promise<void> {
  const { error } = await supabase
    .from('user_premium_features')
    .upsert({
      user_id: userId,
      ai_companion_unlimited: true,
      advanced_analytics: true,
      premium_content_library: true,
      priority_crisis_support: true,
      personalized_wellness_plans: true,
      data_export_enabled: true,
      enabled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.error('BMad Method: Error enabling premium features:', error)
  }
}

async function disablePremiumFeatures(
  userId: string,
  supabase: any,
  graceful: boolean = false
): Promise<void> {
  if (graceful) {
    // BMad Method: Graceful transition for healthcare continuity
    // Keep crisis support enabled, disable other features gradually
    const { error } = await supabase
      .from('user_premium_features')
      .update({
        ai_companion_unlimited: false,
        advanced_analytics: false,
        premium_content_library: false,
        personalized_wellness_plans: false,
        data_export_enabled: false,
        // Keep priority_crisis_support: true for 30 days
        disabled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (error) {
      console.error('BMad Method: Error disabling premium features:', error)
    }
  } else {
    // Immediate disable for failed payments after grace period
    const { error } = await supabase
      .from('user_premium_features')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('BMad Method: Error removing premium features:', error)
    }
  }
}