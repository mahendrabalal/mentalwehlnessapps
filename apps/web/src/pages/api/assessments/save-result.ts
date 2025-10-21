import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'

interface SaveResultRequest {
  toolName: string
  assessmentType: string
  score: number
  maxScore: number
  level?: string
  severityScore?: number
  assessmentResults: {
    score: number
    maxScore: number
    level?: string
    [key: string]: any
  }
  recommendations?: string[]
  questionResponses?: any
  durationSeconds?: number
  deviceType?: string
}

interface SaveResultResponse {
  success: boolean
  message: string
  data?: {
    id: string
    score: number
    scoreChange?: number
    isBaseline: boolean
    previousAssessmentId?: string
  }
  error?: string
}

/**
 * POST /api/assessments/save-result
 * Save assessment result for authenticated user with automatic progress tracking
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveResultResponse>
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

    // Parse request body
    const {
      toolName,
      assessmentType,
      score,
      maxScore,
      level,
      severityScore,
      assessmentResults,
      recommendations,
      questionResponses,
      durationSeconds,
      deviceType
    }: SaveResultRequest = req.body

    // Validate required fields
    if (!toolName || !assessmentType || score === undefined || maxScore === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'toolName, assessmentType, score, and maxScore are required'
      })
    }

    // Validate score ranges
    if (score < 0 || score > maxScore) {
      return res.status(400).json({
        success: false,
        message: 'Invalid score',
        error: 'Score must be between 0 and maxScore'
      })
    }

    if (severityScore !== undefined && (severityScore < 0 || severityScore > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid severity score',
        error: 'Severity score must be between 0 and 100'
      })
    }

    // Determine crisis level based on severity score or level
    let crisisLevel = 'none'
    if (severityScore !== undefined) {
      if (severityScore >= 80) crisisLevel = 'imminent'
      else if (severityScore >= 60) crisisLevel = 'severe'
      else if (severityScore >= 40) crisisLevel = 'moderate'
      else if (severityScore >= 20) crisisLevel = 'mild'
    } else if (level) {
      const levelMap: Record<string, string> = {
        'critical': 'imminent',
        'severe': 'severe',
        'high': 'severe',
        'moderate': 'moderate',
        'medium': 'moderate',
        'mild': 'mild',
        'low': 'mild',
        'minimal': 'none',
        'none': 'none'
      }
      crisisLevel = levelMap[level.toLowerCase()] || 'none'
    }

    const flaggedForReview = crisisLevel === 'severe' || crisisLevel === 'imminent'

    // Get device info from user agent
    const userAgent = req.headers['user-agent'] || ''
    const detectedDeviceType = deviceType || (
      /mobile/i.test(userAgent) ? 'mobile' :
      /tablet/i.test(userAgent) ? 'tablet' :
      'desktop'
    )

    // Insert assessment result
    // The database trigger will automatically:
    // - Calculate score_change and improvement_percentage
    // - Set is_baseline flag
    // - Link to previous_assessment_id
    const { data, error } = await supabase
      .from('user_assessment_history')
      .insert({
        user_id: user.id,
        tool_name: toolName,
        assessment_type: assessmentType,
        score,
        max_score: maxScore,
        level,
        severity_score: severityScore,
        assessment_results: assessmentResults,
        recommendations: recommendations || [],
        question_responses: questionResponses,
        duration_seconds: durationSeconds,
        device_type: detectedDeviceType,
        crisis_level: crisisLevel,
        flagged_for_review: flaggedForReview,
        completed_at: new Date().toISOString()
      })
      .select('id, score, score_change, is_baseline, previous_assessment_id, flagged_for_review, crisis_level')
      .single()

    if (error) {
      console.error('Error saving assessment result:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to save assessment result',
        error: error.message
      })
    }

    // If flagged for review, log to security audit
    if (flaggedForReview) {
      await supabase
        .from('security_audit_log')
        .insert({
          event_type: 'high_risk_assessment',
          severity: crisisLevel === 'imminent' ? 'critical' : 'high',
          user_id: user.id,
          event_details: {
            assessment_id: data.id,
            assessment_type: assessmentType,
            score,
            severity_score: severityScore,
            crisis_level: crisisLevel
          },
          hipaa_relevant: true,
          ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          user_agent: userAgent
        }).then(
          () => {},
          (err) => console.error('Failed to log security audit:', err)
        )

      // TODO: Implement provider notification for high-risk assessments
      // This would integrate with your crisis intervention system
    }

    // Refresh materialized view asynchronously (don't wait)
    supabase.rpc('refresh_assessment_trends').then(
      () => {},
      (err) => console.error('Failed to refresh trends:', err)
    )

    return res.status(201).json({
      success: true,
      message: data.is_baseline
        ? 'Assessment saved successfully. This is your baseline assessment.'
        : 'Assessment saved successfully. Progress tracked.',
      data: {
        id: data.id,
        score: data.score,
        scoreChange: data.score_change,
        isBaseline: data.is_baseline,
        previousAssessmentId: data.previous_assessment_id
      }
    })

  } catch (error) {
    console.error('Unexpected error in save-result API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
