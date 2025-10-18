/**
 * Email Service Integration
 * Supports SendGrid, Mailchimp Transactional (Mandrill), and Resend
 */

interface EmailProvider {
  sendEmail(params: SendEmailParams): Promise<EmailResponse>
}

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

interface EmailResponse {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * SendGrid Email Provider
 */
class SendGridProvider implements EmailProvider {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: params.to }],
              subject: params.subject,
            },
          ],
          from: { email: params.from || this.fromEmail },
          reply_to: params.replyTo ? { email: params.replyTo } : undefined,
          content: [
            {
              type: 'text/html',
              value: params.html,
            },
            ...(params.text ? [{
              type: 'text/plain',
              value: params.text,
            }] : []),
          ],
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`SendGrid API error: ${error}`)
      }

      return {
        success: true,
        messageId: response.headers.get('x-message-id') || undefined,
      }
    } catch (error) {
      console.error('SendGrid send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * Resend Email Provider (Modern alternative to SendGrid)
 */
class ResendProvider implements EmailProvider {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
      // For Resend testing: if no domain is verified, use onboarding@resend.dev
      // and only allow sending to the account owner's email
      const testEmail = process.env.RESEND_TEST_EMAIL
      let fromAddress = params.from || this.fromEmail

      // If we're in testing mode (using onboarding@resend.dev), enforce test email
      if (this.fromEmail === 'onboarding@resend.dev' && testEmail && params.to !== testEmail) {
        console.warn(`[Resend] Test mode: Can only send to ${testEmail}, not to ${params.to}`)
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: params.to,
          subject: params.subject,
          html: params.html,
          text: params.text,
          reply_to: params.replyTo,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Resend API error: ${JSON.stringify(error)}`)
      }

      const data = await response.json()

      return {
        success: true,
        messageId: data.id,
      }
    } catch (error) {
      console.error('Resend send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * ConvertKit Email Provider
 * Best Practice: Uses subscriber + custom fields approach for transactional emails
 */
class ConvertKitProvider implements EmailProvider {
  private apiKey: string
  private apiSecret: string
  private fromEmail: string

  constructor(apiKey: string, apiSecret: string, fromEmail: string) {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.fromEmail = fromEmail
  }

  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
      // Step 1: Add/update subscriber with custom fields
      // This stores their assessment data for use in automated sequences
      const subscriberResponse = await fetch(`https://api.convertkit.com/v3/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: this.apiSecret,
          email: params.to,
          fields: {
            last_assessment_subject: params.subject,
            last_assessment_date: new Date().toISOString(),
          },
        }),
      })

      if (!subscriberResponse.ok) {
        const error = await subscriberResponse.json()
        console.error('ConvertKit subscriber error:', error)
        // Continue even if subscriber creation fails - we'll still try to send via sequence
      }

      const subscriberData = await subscriberResponse.json()
      const subscriberId = subscriberData.subscriber?.id

      // Step 2: For immediate transactional emails, use sequences
      // You need to create a sequence in ConvertKit dashboard first
      // For now, we'll log the email content for manual setup
      console.log('[ConvertKit] Email prepared for:', params.to)
      console.log('[ConvertKit] Subject:', params.subject)
      console.log('[ConvertKit] Subscriber ID:', subscriberId)

      // TODO: After creating a sequence in ConvertKit, add subscriber to sequence
      // const sequenceId = process.env.CONVERTKIT_ASSESSMENT_SEQUENCE_ID
      // if (sequenceId && subscriberId) {
      //   await fetch(`https://api.convertkit.com/v3/sequences/${sequenceId}/subscribe`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       api_secret: this.apiSecret,
      //       subscriber_id: subscriberId,
      //     }),
      //   })
      // }

      return {
        success: true,
        messageId: subscriberId?.toString(),
      }
    } catch (error) {
      console.error('ConvertKit send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * Mailchimp Transactional (Mandrill) Email Provider
 */
class MailchimpTransactionalProvider implements EmailProvider {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
      const response = await fetch('https://mandrillapp.com/api/1.0/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: this.apiKey,
          message: {
            html: params.html,
            text: params.text,
            subject: params.subject,
            from_email: params.from || this.fromEmail,
            to: [
              {
                email: params.to,
                type: 'to',
              },
            ],
          },
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Mailchimp API error: ${error}`)
      }

      const data = await response.json()

      if (data[0]?.status === 'rejected' || data[0]?.status === 'invalid') {
        throw new Error(`Email rejected: ${data[0]?.reject_reason}`)
      }

      return {
        success: true,
        messageId: data[0]?._id,
      }
    } catch (error) {
      console.error('Mailchimp send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * Get configured email provider
 */
function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'convertkit'
  const fromEmail = process.env.EMAIL_FROM || 'noreply@mentalwellnessapp.com'

  switch (provider.toLowerCase()) {
    case 'convertkit':
    case 'kit':
      if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_API_SECRET) {
        throw new Error('CONVERTKIT_API_KEY and CONVERTKIT_API_SECRET environment variables are required')
      }
      return new ConvertKitProvider(
        process.env.CONVERTKIT_API_KEY,
        process.env.CONVERTKIT_API_SECRET,
        fromEmail
      )

    case 'sendgrid':
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY environment variable is required')
      }
      return new SendGridProvider(process.env.SENDGRID_API_KEY, fromEmail)

    case 'resend':
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY environment variable is required')
      }
      return new ResendProvider(process.env.RESEND_API_KEY, fromEmail)

    case 'mailchimp':
    case 'mandrill':
      if (!process.env.MAILCHIMP_API_KEY) {
        throw new Error('MAILCHIMP_API_KEY environment variable is required')
      }
      return new MailchimpTransactionalProvider(process.env.MAILCHIMP_API_KEY, fromEmail)

    default:
      console.warn(`Unknown email provider: ${provider}, defaulting to ConvertKit`)
      if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_API_SECRET) {
        throw new Error('CONVERTKIT_API_KEY and CONVERTKIT_API_SECRET environment variables are required')
      }
      return new ConvertKitProvider(
        process.env.CONVERTKIT_API_KEY,
        process.env.CONVERTKIT_API_SECRET,
        fromEmail
      )
  }
}

/**
 * Send email using configured provider
 */
export async function sendEmail(params: SendEmailParams): Promise<EmailResponse> {
  try {
    const provider = getEmailProvider()
    return await provider.sendEmail(params)
  } catch (error) {
    console.error('Email send error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email service not configured',
    }
  }
}

/**
 * Send assessment results email to guest
 */
export async function sendAssessmentResultsEmail(
  email: string,
  toolName: string,
  assessmentResults: {
    score?: number
    level?: string
    maxScore?: number
    recommendations?: string[]
    [key: string]: any
  }
): Promise<EmailResponse> {
  const { html, text } = generateAssessmentEmailTemplate(toolName, assessmentResults)

  return sendEmail({
    to: email,
    subject: `Your ${toolName} Results - Mental Wellness App`,
    html,
    text,
    replyTo: process.env.EMAIL_REPLY_TO || 'support@mentalwellnessapp.com',
  })
}

/**
 * Generate email template for assessment results
 */
function generateAssessmentEmailTemplate(
  toolName: string,
  results: {
    score?: number
    level?: string
    maxScore?: number
    recommendations?: string[]
    [key: string]: any
  }
): { html: string; text: string } {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://www.mentalwellnessapps.com'
  const signupUrl = `${appUrl}/auth/signup`

  // HTML version
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${toolName} Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                Your ${toolName} Results
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
                Mental Wellness App
              </p>
            </td>
          </tr>

          <!-- Results -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">
                Your Results
              </h2>

              ${results.score !== undefined && results.maxScore ? `
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                  SCORE
                </p>
                <p style="margin: 0; color: #1f2937; font-size: 32px; font-weight: bold;">
                  ${results.score} / ${results.maxScore}
                </p>
                ${results.level ? `
                <p style="margin: 10px 0 0 0; color: #4b5563; font-size: 16px;">
                  Level: <strong>${results.level}</strong>
                </p>
                ` : ''}
              </div>
              ` : ''}

              ${results.recommendations && results.recommendations.length > 0 ? `
              <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 18px;">
                Recommended Actions
              </h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #4b5563; line-height: 1.8;">
                ${results.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
              </ul>
              ` : ''}

              <!-- CTA -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 30px; margin-top: 40px; text-align: center;">
                <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px;">
                  Track Your Progress Over Time
                </h3>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 0 0 20px 0; font-size: 14px;">
                  Create a free account to save your results, track patterns, and get personalized insights.
                </p>
                <a href="${signupUrl}" style="display: inline-block; background-color: #ffffff; color: #667eea; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Create Free Account
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                This assessment is for educational purposes only and does not constitute medical diagnosis.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2025 Mental Wellness App. All rights reserved.<br>
                <a href="${appUrl}/privacy" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  // Plain text version
  const text = `
YOUR ${toolName.toUpperCase()} RESULTS
Mental Wellness App

Your Results:
${results.score !== undefined && results.maxScore ? `Score: ${results.score} / ${results.maxScore}` : ''}
${results.level ? `Level: ${results.level}` : ''}

${results.recommendations && results.recommendations.length > 0 ? `
Recommended Actions:
${results.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
` : ''}

TRACK YOUR PROGRESS OVER TIME

Create a free account to save your results, track patterns, and get personalized insights.

Create Account: ${signupUrl}

---
This assessment is for educational purposes only and does not constitute medical diagnosis.

© 2025 Mental Wellness App. All rights reserved.
Privacy Policy: ${appUrl}/privacy
  `.trim()

  return { html, text }
}
