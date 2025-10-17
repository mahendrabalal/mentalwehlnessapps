import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { createCustomerPortalSession } from '@/lib/stripe'

/**
 * BMad Method: Customer Portal Session API
 *
 * Creates a Stripe Customer Portal session where users can:
 * - Update payment methods
 * - Cancel subscriptions
 * - View billing history
 * - Download invoices
 *
 * This is a Stripe best practice for self-service subscription management.
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
    const { customerId, returnUrl } = req.body

    if (!customerId) {
      return res.status(400).json({
        error: 'Missing required field: customerId'
      })
    }

    // BMad Method: Authentication
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: 'Server configuration error'
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({
        error: 'Authentication required'
      })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({
        error: 'Authentication required'
      })
    }

    // Create customer portal session
    const portalUrl = await createCustomerPortalSession(
      customerId,
      returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    )

    console.log('BMad Method: Customer portal session created', {
      customerId,
      userId: user.id
    })

    return res.status(200).json({
      url: portalUrl
    })

  } catch (error) {
    console.error('BMad Method: Customer portal API error:', error)

    return res.status(500).json({
      error: 'Failed to create customer portal session',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}
