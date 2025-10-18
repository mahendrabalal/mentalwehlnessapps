import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface GuestToolBannerProps {
  toolName: string
  className?: string
}

export function GuestToolBanner({ toolName, className = '' }: GuestToolBannerProps) {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)
  const [signupUrl, setSignupUrl] = useState('/auth/signup')

  // Check localStorage for dismissed state and build signup URL (client-side only)
  useEffect(() => {
    const isDismissed = localStorage.getItem('guestToolBannerDismissed') === 'true'
    setDismissed(isDismissed)

    // Build redirect URL on client-side to avoid SSR issues
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      setSignupUrl(`/auth/signup?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('guestToolBannerDismissed', 'true')
  }

  // Don't show banner if user is authenticated or banner was dismissed
  if (user || dismissed) {
    return null
  }

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-400 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-blue-800 text-sm">
                <strong>Guest Mode:</strong> Your results won't be saved. Sign up after completing the {toolName.toLowerCase()} to track your progress over time.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
