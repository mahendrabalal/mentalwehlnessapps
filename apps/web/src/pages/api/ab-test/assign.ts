import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'

interface AssignVariantRequest {
  experimentName: string
  guestIdentifier?: string // Cookie/fingerprint for guest users
  sessionId?: string
}

interface AssignVariantResponse {
  success: boolean
  data?: {
    experimentId: string
    variantId: string
    variantConfig: any
    isNewAssignment: boolean
  }
  message?: string
  error?: string
}

/**
 * POST /api/ab-test/assign
 * Assign user to A/B test variant with sticky behavior
 * Supports both authenticated and guest users
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssignVariantResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are accepted'
    })
  }

  try {
    const supabase = createServerClient()

    // Parse request body
    const {
      experimentName,
      guestIdentifier,
      sessionId
    }: AssignVariantRequest = req.body

    // Validate required fields
    if (!experimentName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field',
        error: 'experimentName is required'
      })
    }

    // Try to get authenticated user (optional for A/B tests)
    let userId: string | null = null
    const authHeader = req.headers.authorization
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const { data: { user } } = await supabase.auth.getUser(token)
        if (user) {
          userId = user.id
        }
      } catch (err) {
        // Ignore auth errors - user might be guest
        console.log('No authenticated user, treating as guest')
      }
    }

    // Must have either userId or guestIdentifier
    if (!userId && !guestIdentifier) {
      return res.status(400).json({
        success: false,
        message: 'Missing identifier',
        error: 'Either authenticate or provide guestIdentifier'
      })
    }

    // Find active experiment by name
    const { data: experiment, error: experimentError } = await supabase
      .from('ab_test_experiments')
      .select('id, name, status, type')
      .eq('name', experimentName)
      .eq('status', 'active')
      .single()

    if (experimentError || !experiment) {
      // Experiment not found or not active - return null variant (no test running)
      return res.status(200).json({
        success: true,
        data: {
          experimentId: '',
          variantId: '',
          variantConfig: null,
          isNewAssignment: false
        },
        message: 'No active experiment found'
      })
    }

    // Check for existing assignment (sticky behavior)
    let existingAssignment = null
    if (userId) {
      const { data } = await supabase
        .from('ab_test_assignments')
        .select('variant_id')
        .eq('experiment_id', experiment.id)
        .eq('user_id', userId)
        .single()

      existingAssignment = data
    } else if (guestIdentifier) {
      const { data } = await supabase
        .from('ab_test_assignments')
        .select('variant_id')
        .eq('experiment_id', experiment.id)
        .eq('guest_identifier', guestIdentifier)
        .single()

      existingAssignment = data
    }

    let variantId: string
    let isNewAssignment = false

    if (existingAssignment) {
      // Use existing assignment (sticky)
      variantId = existingAssignment.variant_id
    } else {
      // Create new assignment using database function
      const { data: assignmentData, error: assignError } = await supabase
        .rpc('assign_experiment_variant', {
          p_experiment_id: experiment.id,
          p_user_id: userId,
          p_guest_identifier: guestIdentifier,
          p_session_id: sessionId
        })

      if (assignError) {
        console.error('Error assigning variant:', assignError)
        return res.status(500).json({
          success: false,
          message: 'Failed to assign variant',
          error: assignError.message
        })
      }

      variantId = assignmentData
      isNewAssignment = true
    }

    // Fetch variant configuration
    const { data: variant, error: variantError } = await supabase
      .from('ab_test_variants')
      .select('id, name, variant_config')
      .eq('id', variantId)
      .single()

    if (variantError || !variant) {
      console.error('Error fetching variant:', variantError)
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch variant configuration',
        error: variantError?.message || 'Variant not found'
      })
    }

    // Track impression event automatically
    if (isNewAssignment) {
      // Track asynchronously (don't wait)
      supabase.rpc('track_ab_test_event', {
        p_experiment_id: experiment.id,
        p_variant_id: variantId,
        p_event_type: 'impression',
        p_user_id: userId,
        p_guest_identifier: guestIdentifier,
        p_event_data: {
          page_url: req.headers.referer,
          user_agent: req.headers['user-agent'],
          session_id: sessionId
        }
      }).catch(err => console.error('Failed to track impression:', err))
    }

    return res.status(200).json({
      success: true,
      data: {
        experimentId: experiment.id,
        variantId: variant.id,
        variantConfig: variant.variant_config,
        isNewAssignment
      },
      message: isNewAssignment ? 'New variant assigned' : 'Existing assignment returned'
    })

  } catch (error) {
    console.error('Unexpected error in A/B test assign API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
