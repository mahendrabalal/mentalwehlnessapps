import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { createSubscriptionWithPaymentMethod, SUBSCRIPTION_PLANS } from '@/lib/stripe'

/**
 * BMad Method: Create Subscription with Payment Method API
 *
 * This endpoint creates a subscription after payment method has been collected
 * via Setup Intent. This is the industry best practice payment flow.
 *
 * Flow:
 * 1. Frontend: Create Setup Intent (via /api/subscriptions/setup-intent)
 * 2. Frontend: Collect payment method using Stripe Elements
 * 3. Frontend: Confirm Setup Intent with 3D Secure if needed
 * 4. Backend: Create subscription with confirmed payment method (this endpoint)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, userId, customerId, paymentMethodId } = req.body

    // BMad Method: Validate required fields
    if (!priceId || !userId || !customerId || !paymentMethodId) {
      return res.status(400).json({
        error: 'Missing required fields: priceId, userId, customerId, and paymentMethodId are required'
      })
    }

    // Validate price ID against allowed plans
    const validPriceIds = Object.values(SUBSCRIPTION_PLANS).map(plan => plan.priceId)
    if (!validPriceIds.includes(priceId)) {
      return res.status(400).json({
        error: 'Invalid price ID provided'
      })
    }

    // BMad Method: Create server-side Supabase client for authentication
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('BMad Method: Missing Supabase credentials')
      return res.status(500).json({
        error: 'Server configuration error: Supabase credentials missing'
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Extract token from Authorization header
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'Authentication required. Please provide access token.'
      })
    }

    // Verify user authentication using JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({
        error: 'Authentication required. Please log in to subscribe to premium features.'
      })
    }

    // Verify user ID matches authenticated user
    if (user.id !== userId) {
      return res.status(403).json({
        error: 'Unauthorized: User ID mismatch'
      })
    }

    // Create subscription with payment method
    const subscription = await createSubscriptionWithPaymentMethod({
      userId,
      priceId,
      customerId,
      paymentMethodId,
      trialPeriodDays: 0, // No trial - immediate paid subscription
      metadata: {
        mentalWellnessApp: 'true',
        clinicalAssessmentAccess: 'premium',
        crisisInterventionLevel: 'enhanced',
        dataRetentionConsent: 'true',
        hipaaAcknowledged: 'true'
      }
    })

    // BMad Method: Log subscription creation for monitoring
    console.log('BMad Method: Subscription created successfully', {
      subscriptionId: subscription.subscriptionId,
      userId: userId,
      email: user.email,
      planType: getPlanTypeFromPriceId(priceId),
      status: subscription.status
    })

    return res.status(200).json({
      subscriptionId: subscription.subscriptionId,
      customerId: subscription.customerId,
      status: subscription.status,
      success: true
    })

  } catch (error) {
    console.error('BMad Method: Subscription creation with payment method API error:', error)

    return res.status(500).json({
      error: 'Failed to create subscription',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}

function getPlanTypeFromPriceId(priceId: string): string {
  if (priceId === SUBSCRIPTION_PLANS.PREMIUM_MONTHLY.priceId) return 'premium_monthly'
  if (priceId === SUBSCRIPTION_PLANS.PREMIUM_YEARLY.priceId) return 'premium_yearly'
  return 'unknown'
}
