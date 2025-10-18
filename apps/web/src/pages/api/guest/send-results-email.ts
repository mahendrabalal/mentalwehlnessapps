import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase'
import { sendAssessmentResultsEmail } from '@/lib/email'

interface SendResultsEmailRequest {
  guestEmailId: string
}

interface SendResultsEmailResponse {
  success: boolean
  message: string
  error?: string
}

/**
 * API endpoint to send assessment results email to a guest
 * This can be called manually or triggered by a cron job
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendResultsEmailResponse>
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
    const { guestEmailId }: SendResultsEmailRequest = req.body

    if (!guestEmailId) {
      return res.status(400).json({
        success: false,
        message: 'Missing guest email ID',
        error: 'guestEmailId is required'
      })
    }

    // Create Supabase client
    const supabase = createClient()

    // Fetch the guest email record
    const { data: guestEmail, error: fetchError } = await supabase
      .from('guest_assessment_emails')
      .select('*')
      .eq('id', guestEmailId)
      .single()

    if (fetchError || !guestEmail) {
      return res.status(404).json({
        success: false,
        message: 'Guest email not found',
        error: fetchError?.message || 'Record not found'
      })
    }

    // Check if email was already sent
    if (guestEmail.email_sent) {
      return res.status(200).json({
        success: true,
        message: 'Email was already sent for this record'
      })
    }

    // Send the email
    const emailResult = await sendAssessmentResultsEmail(
      guestEmail.email,
      guestEmail.tool_name,
      guestEmail.assessment_results || {}
    )

    if (!emailResult.success) {
      throw new Error(emailResult.error || 'Failed to send email')
    }

    // Update the record to mark email as sent
    const { error: updateError } = await supabase
      .from('guest_assessment_emails')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', guestEmailId)

    if (updateError) {
      console.error('Error updating email sent status:', updateError)
      // Don't fail the request - email was sent successfully
    }

    return res.status(200).json({
      success: true,
      message: 'Assessment results email sent successfully'
    })

  } catch (error) {
    console.error('Error in send-results-email API:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
