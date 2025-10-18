import { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabase'
import { sendAssessmentResultsEmail } from '@/lib/email'

interface SaveEmailRequest {
  email: string
  toolName: string
  assessmentType: string
  assessmentResults?: {
    score?: number
    level?: string
    maxScore?: number
    recommendations?: string[]
    [key: string]: any
  }
  currentPath?: string
}

interface SaveEmailResponse {
  success: boolean
  message: string
  data?: {
    id: string
    email: string
  }
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveEmailResponse>
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
    const { email, toolName, assessmentType, assessmentResults, currentPath }: SaveEmailRequest = req.body

    // Validate required fields
    if (!email || !toolName || !assessmentType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'Email, toolName, and assessmentType are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'Please provide a valid email address'
      })
    }

    // Get client IP and user agent
    const userAgent = req.headers['user-agent'] || 'Unknown'
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      'Unknown'

    // Create Supabase server client (uses service role key to bypass RLS)
    const supabase = createServerClient()

    // Check if email already exists for this assessment type
    const { data: existingEmail } = await supabase
      .from('guest_assessment_emails')
      .select('id, email, email_sent')
      .eq('email', email.toLowerCase())
      .eq('assessment_type', assessmentType)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // If email exists and was recently submitted (within 24 hours), update it
    if (existingEmail) {
      const { data: updatedData, error: updateError } = await supabase
        .from('guest_assessment_emails')
        .update({
          assessment_results: assessmentResults,
          current_path: currentPath,
          user_agent: userAgent,
          ip_address: ipAddress,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingEmail.id)
        .select('id, email')
        .single()

      if (updateError) {
        console.error('Error updating guest email:', updateError)
        return res.status(500).json({
          success: false,
          message: 'Failed to update email',
          error: updateError.message
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Email updated successfully. We\'ll send your results shortly.',
        data: updatedData
      })
    }

    // Insert new email capture
    const { data, error } = await supabase
      .from('guest_assessment_emails')
      .insert({
        email: email.toLowerCase(),
        tool_name: toolName,
        assessment_type: assessmentType,
        assessment_results: assessmentResults,
        current_path: currentPath,
        user_agent: userAgent,
        ip_address: ipAddress,
        email_sent: false
      })
      .select('id, email')
      .single()

    if (error) {
      console.error('Error saving guest email:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to save email',
        error: error.message
      })
    }

    // Send assessment results email (async, don't wait for it)
    // We do this in the background to avoid slowing down the API response
    sendAssessmentResultsEmail(email.toLowerCase(), toolName, assessmentResults || {})
      .then(async (emailResult) => {
        if (emailResult.success) {
          // Update the record to mark email as sent
          await supabase
            .from('guest_assessment_emails')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id)
        } else {
          console.error('Failed to send email:', emailResult.error)
        }
      })
      .catch((err) => {
        console.error('Error sending assessment email:', err)
      })

    return res.status(201).json({
      success: true,
      message: 'Email saved successfully. Check your inbox for your results!',
      data
    })

  } catch (error) {
    console.error('Unexpected error in save-email API:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
