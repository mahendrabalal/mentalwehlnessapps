import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'

interface TrackEventRequest {
  experimentId: string
  variantId: string
  eventType: 'impression' | 'interaction' | 'conversion' | 'custom'
  eventName?: string // For custom events
  guestIdentifier?: string
  eventData?: Record<string, any>
  conversionValue?: number
  conversionMetadata?: Record<string, any>
}

interface TrackEventResponse {
  success: boolean
  data?: {
    eventId: string
    tracked: boolean
  }
  message?: string
  error?: string
}

/**
 * POST /api/ab-test/track
 * Track A/B test events (impressions, interactions, conversions)
 * Supports both authenticated and guest users
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackEventResponse>
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
      experimentId,
      variantId,
      eventType,
      eventName,
      guestIdentifier,
      eventData,
      conversionValue,
      conversionMetadata
    }: TrackEventRequest = req.body

    // Validate required fields
    if (!experimentId || !variantId || !eventType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'experimentId, variantId, and eventType are required'
      })
    }

    // Validate event type
    const validEventTypes = ['impression', 'interaction', 'conversion', 'custom']
    if (!validEventTypes.includes(eventType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event type',
        error: `eventType must be one of: ${validEventTypes.join(', ')}`
      })
    }

    // Custom events must have eventName
    if (eventType === 'custom' && !eventName) {
      return res.status(400).json({
        success: false,
        message: 'Missing event name',
        error: 'eventName is required for custom events'
      })
    }

    // Try to get authenticated user (optional)
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
        // Ignore auth errors
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

    // Get additional context
    const userAgent = req.headers['user-agent'] || ''
    const pageUrl = req.headers.referer || eventData?.page_url || ''
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
                      req.socket.remoteAddress

    // Detect device type
    const deviceType = /mobile/i.test(userAgent) ? 'mobile' :
                       /tablet/i.test(userAgent) ? 'tablet' :
                       'desktop'

    // Detect browser
    let browser = 'unknown'
    if (/chrome/i.test(userAgent)) browser = 'chrome'
    else if (/firefox/i.test(userAgent)) browser = 'firefox'
    else if (/safari/i.test(userAgent)) browser = 'safari'
    else if (/edge/i.test(userAgent)) browser = 'edge'

    // Prepare event data
    const enrichedEventData = {
      ...eventData,
      timestamp: new Date().toISOString(),
      page_url: pageUrl,
      user_agent: userAgent,
      device_type: deviceType,
      browser
    }

    // Track event using database function
    const { data: eventId, error: trackError } = await supabase
      .rpc('track_ab_test_event', {
        p_experiment_id: experimentId,
        p_variant_id: variantId,
        p_event_type: eventType,
        p_user_id: userId,
        p_guest_identifier: guestIdentifier,
        p_event_data: enrichedEventData
      })

    if (trackError) {
      console.error('Error tracking event:', trackError)
      return res.status(500).json({
        success: false,
        message: 'Failed to track event',
        error: trackError.message
      })
    }

    // For conversions, also update with conversion-specific data if provided
    if (eventType === 'conversion' && (conversionValue || conversionMetadata)) {
      await supabase
        .from('ab_test_events')
        .update({
          conversion_value: conversionValue,
          conversion_metadata: conversionMetadata
        })
        .eq('id', eventId)
        .catch(err => console.error('Failed to update conversion data:', err))
    }

    return res.status(200).json({
      success: true,
      data: {
        eventId,
        tracked: true
      },
      message: 'Event tracked successfully'
    })

  } catch (error) {
    console.error('Unexpected error in A/B test track API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
