import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { createSetupIntent } from '@/lib/stripe'

/**
 * BMad Method: Setup Intent API - Industry best practice for payment method collection
 *
 * This endpoint creates a Setup Intent which allows collecting payment method details
 * before creating a subscription. This follows Stripe's recommended payment flow:
 *
 * 1. Create Setup Intent (this endpoint)
 * 2. Collect payment method details on frontend using Stripe Elements
 * 3. Confirm payment method with 3D Secure/SCA if required
 * 4. Create subscription with confirmed payment method
 *
 * Benefits:
 * - Better SCA/3DS handling
 * - Cleaner separation of payment method collection and subscription creation
 * - Improved error handling
 * - Better user experience
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
    const { userId, email, name } = req.body

    // BMad Method: Validate required fields for healthcare compliance
    if (!userId || !email) {
      return res.status(400).json({
        error: 'Missing required fields: userId and email are required'
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

    // Create Setup Intent for payment method collection
    const setupIntent = await createSetupIntent({
      userId,
      email: user.email!,
      name: name || user.user_metadata?.full_name,
      metadata: {
        mentalWellnessApp: 'true',
        hipaaAcknowledged: 'true'
      }
    })

    console.log('BMad Method: Setup Intent created successfully', {
      setupIntentId: setupIntent.setupIntentId,
      customerId: setupIntent.customerId,
      userId: userId,
      email: user.email
    })

    return res.status(200).json({
      setupIntentId: setupIntent.setupIntentId,
      clientSecret: setupIntent.clientSecret,
      customerId: setupIntent.customerId
    })

  } catch (error) {
    console.error('BMad Method: Setup Intent API error:', error)

    return res.status(500).json({
      error: 'Failed to create setup intent',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}
