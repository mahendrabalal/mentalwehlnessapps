import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'

interface ReminderPreference {
  id?: string
  assessmentType: string
  enabled: boolean
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'custom'
  customIntervalDays?: number
  emailEnabled: boolean
  smsEnabled: boolean
  pushEnabled: boolean
  inAppEnabled: boolean
  reminderEmail?: string
  reminderPhone?: string
  preferredTimeOfDay?: string
  timezone?: string
  pauseUntil?: string
}

interface PreferencesResponse {
  success: boolean
  data?: ReminderPreference | ReminderPreference[]
  message?: string
  error?: string
}

/**
 * GET /api/reminders/preferences - Get user's reminder preferences
 * POST /api/reminders/preferences - Create/update reminder preferences
 * DELETE /api/reminders/preferences?assessmentType=X - Disable reminders for assessment type
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreferencesResponse>
) {
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

    // Handle GET - Fetch preferences
    if (req.method === 'GET') {
      const { assessmentType } = req.query

      let query = supabase
        .from('assessment_reminder_preferences')
        .select('*')
        .eq('user_id', user.id)

      if (assessmentType) {
        query = query.eq('assessment_type', assessmentType)

        const { data, error } = await query.single()

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error fetching reminder preferences:', error)
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch reminder preferences',
            error: error.message
          })
        }

        return res.status(200).json({
          success: true,
          data: data || null
        })
      } else {
        const { data, error } = await query

        if (error) {
          console.error('Error fetching reminder preferences:', error)
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch reminder preferences',
            error: error.message
          })
        }

        return res.status(200).json({
          success: true,
          data: data || []
        })
      }
    }

    // Handle POST - Create or update preferences
    if (req.method === 'POST') {
      const {
        assessmentType,
        enabled,
        frequency,
        customIntervalDays,
        emailEnabled,
        smsEnabled,
        pushEnabled,
        inAppEnabled,
        reminderEmail,
        reminderPhone,
        preferredTimeOfDay,
        timezone,
        pauseUntil
      }: ReminderPreference = req.body

      // Validate required fields
      if (!assessmentType) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field',
          error: 'assessmentType is required'
        })
      }

      // Validate frequency
      const validFrequencies = ['weekly', 'biweekly', 'monthly', 'quarterly', 'custom']
      if (frequency && !validFrequencies.includes(frequency)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid frequency',
          error: `Frequency must be one of: ${validFrequencies.join(', ')}`
        })
      }

      // Validate custom interval
      if (frequency === 'custom' && (!customIntervalDays || customIntervalDays <= 0)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid custom interval',
          error: 'customIntervalDays must be greater than 0 when frequency is custom'
        })
      }

      // Validate email format if provided
      if (reminderEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(reminderEmail)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format',
            error: 'Please provide a valid email address'
          })
        }
      }

      // Upsert preference (insert or update)
      const { data, error } = await supabase
        .from('assessment_reminder_preferences')
        .upsert({
          user_id: user.id,
          assessment_type: assessmentType,
          enabled: enabled !== undefined ? enabled : true,
          frequency: frequency || 'monthly',
          custom_interval_days: customIntervalDays,
          email_enabled: emailEnabled !== undefined ? emailEnabled : true,
          sms_enabled: smsEnabled !== undefined ? smsEnabled : false,
          push_enabled: pushEnabled !== undefined ? pushEnabled : false,
          in_app_enabled: inAppEnabled !== undefined ? inAppEnabled : true,
          reminder_email: reminderEmail,
          reminder_phone: reminderPhone,
          preferred_time_of_day: preferredTimeOfDay || '09:00:00',
          timezone: timezone || 'UTC',
          pause_until: pauseUntil
        }, {
          onConflict: 'user_id,assessment_type'
        })
        .select()
        .single()

      if (error) {
        console.error('Error saving reminder preferences:', error)
        return res.status(500).json({
          success: false,
          message: 'Failed to save reminder preferences',
          error: error.message
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Reminder preferences saved successfully',
        data
      })
    }

    // Handle DELETE - Disable reminders
    if (req.method === 'DELETE') {
      const { assessmentType } = req.query

      if (!assessmentType) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter',
          error: 'assessmentType is required'
        })
      }

      // Update to disable reminders
      const { error } = await supabase
        .from('assessment_reminder_preferences')
        .update({ enabled: false })
        .eq('user_id', user.id)
        .eq('assessment_type', assessmentType)

      if (error) {
        console.error('Error disabling reminders:', error)
        return res.status(500).json({
          success: false,
          message: 'Failed to disable reminders',
          error: error.message
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Reminders disabled successfully'
      })
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET, POST, and DELETE requests are accepted'
    })

  } catch (error) {
    console.error('Unexpected error in reminder preferences API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
