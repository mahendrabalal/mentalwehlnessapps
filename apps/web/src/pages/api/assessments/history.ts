import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'

interface AssessmentHistoryResponse {
  success: boolean
  data?: {
    assessments: any[]
    trends: any
    totalCount: number
  }
  message?: string
  error?: string
}

/**
 * GET /api/assessments/history
 * Fetch authenticated user's assessment history with trend analysis
 *
 * Query params:
 * - assessmentType: Filter by specific assessment type (optional)
 * - limit: Number of records to return (default: 50)
 * - offset: Pagination offset (default: 0)
 * - includeTrends: Include trend analysis (default: true)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssessmentHistoryResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET requests are accepted'
    })
  }

  try {
    const supabase = createServerClient()

    // Get authenticated user
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: 'No authorization header provided'
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: 'Invalid or expired token'
      })
    }

    // Parse query parameters
    const {
      assessmentType,
      limit = '50',
      offset = '0',
      includeTrends = 'true'
    } = req.query

    const limitNum = Math.min(parseInt(limit as string, 10), 100) // Max 100 records
    const offsetNum = parseInt(offset as string, 10)

    // Build query
    let query = supabase
      .from('user_assessment_history')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .range(offsetNum, offsetNum + limitNum - 1)

    // Filter by assessment type if provided
    if (assessmentType) {
      query = query.eq('assessment_type', assessmentType)
    }

    const { data: assessments, error: queryError, count } = await query

    if (queryError) {
      console.error('Error fetching assessment history:', queryError)
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch assessment history',
        error: queryError.message
      })
    }

    // Fetch trend data if requested
    let trends = null
    if (includeTrends === 'true') {
      let trendQuery = supabase
        .from('user_assessment_trends')
        .select('*')
        .eq('user_id', user.id)

      if (assessmentType) {
        trendQuery = trendQuery.eq('assessment_type', assessmentType)
      }

      const { data: trendData, error: trendError } = await trendQuery

      if (!trendError && trendData) {
        trends = trendData
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        assessments: assessments || [],
        trends: trends,
        totalCount: count || 0
      }
    })

  } catch (error) {
    console.error('Unexpected error in assessment history API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
