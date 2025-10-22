import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

interface SaveResultsPromptProps {
  toolName: string
  assessmentType: string
  assessmentResults?: {
    score?: number
    level?: string
    maxScore?: number
    recommendations?: string[]
    [key: string]: any
  }
  className?: string
  onSignupIntent?: () => void
  onEmailIntent?: () => void
  onDismissed?: () => void
}

export function SaveResultsPrompt({
  toolName,
  assessmentType,
  assessmentResults,
  className = '',
  onSignupIntent,
  onEmailIntent,
  onDismissed
}: SaveResultsPromptProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)
  const [emailMode, setEmailMode] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Don't show if user is authenticated
  if (user) {
    return null
  }

  // Don't show if dismissed
  if (dismissed) {
    return null
  }

  const handleEmailSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/guest/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          toolName,
          assessmentType,
          assessmentResults,
          currentPath: router.pathname
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save email')
      }

      // Also store in localStorage as backup
      const savedEmails = JSON.parse(localStorage.getItem('guestAssessmentEmails') || '[]')
      savedEmails.push({
        email,
        toolName,
        assessmentType,
        timestamp: new Date().toISOString(),
        currentPath: router.pathname
      })
      localStorage.setItem('guestAssessmentEmails', JSON.stringify(savedEmails))

      setEmailSaved(true)

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setDismissed(true)
      }, 5000)
    } catch (error) {
      console.error('Error saving email:', error)
      setError(error instanceof Error ? error.message : 'Failed to save email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupClick = () => {
    onSignupIntent?.()
    // Redirect to signup with current page as redirect
    const currentPath = router.pathname
    router.push(`/auth/signup?redirect=${encodeURIComponent(currentPath)}`)
  }

  const handleDismiss = () => {
    onDismissed?.()
    setDismissed(true)
    // Remember dismissal for this session
    sessionStorage.setItem(`savePromptDismissed_${assessmentType}`, 'true')
  }

  if (emailSaved) {
    return (
      <div className={`bg-green-50 border-2 border-green-200 rounded-xl p-6 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
            ✓
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900">Email Saved!</h3>
            <p className="text-sm text-green-700">
              We'll send you a link to access your results. Check your inbox at <strong>{email}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (emailMode) {
    return (
      <div className={`bg-gradient-to-r from-therapy-50 to-blue-50 border-2 border-therapy-200 rounded-xl p-6 ${className}`}>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Save Your Results via Email</h3>
          <p className="text-sm text-gray-600">
            Enter your email to receive a copy of your {toolName.toLowerCase()} results.
          </p>
        </div>

        <form onSubmit={handleEmailSave} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-therapy-600 focus:ring-2 focus:ring-therapy-200 outline-none transition-all"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-therapy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-therapy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Send Results'}
            </button>
            <button
              type="button"
              onClick={() => setEmailMode(false)}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
            >
              Back
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Want to track progress over time?{' '}
            <button
              onClick={handleSignupClick}
              className="text-therapy-600 hover:text-therapy-700 font-semibold underline"
            >
              Create a free account
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-r from-therapy-50 to-blue-50 border-2 border-therapy-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-therapy-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
          💾
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Save Your Results</h3>
          <p className="text-gray-700 mb-4">
            Create a free account to save your {toolName.toLowerCase()} results and track your progress over time.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-therapy-600">✓</span>
              <span>Save all your results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-therapy-600">✓</span>
              <span>Track patterns over time</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-therapy-600">✓</span>
              <span>Get retake reminders</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-therapy-600">✓</span>
              <span>Access personalized insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSignupClick}
          className="flex-1 bg-therapy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-therapy-700 transition-colors shadow-md"
        >
          Create Free Account
        </button>
        <button
          onClick={() => {
            onEmailIntent?.()
            setEmailMode(true)
          }}
          className="flex-1 bg-white text-therapy-600 border-2 border-therapy-600 px-6 py-3 rounded-lg font-semibold hover:bg-therapy-50 transition-colors"
        >
          Just Email Me Results
        </button>
      </div>

      {/* Continue as Guest */}
      <div className="mt-4 text-center">
        <button
          onClick={handleDismiss}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Continue as guest (results won't be saved)
        </button>
      </div>

      {/* Privacy Note */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          🔒 Your data is private and HIPAA-compliant. We'll never share your information.{' '}
          <Link href="/privacy" className="text-therapy-600 hover:text-therapy-700 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
