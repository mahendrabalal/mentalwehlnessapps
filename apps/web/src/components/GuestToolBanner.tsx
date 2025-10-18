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
    <div className={`sticky top-0 z-50 bg-gradient-to-r from-therapy-600 to-blue-600 shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm sm:text-base">
              Try {toolName} free! Sign up to save your progress and track patterns over time.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href={signupUrl}
              className="bg-white text-therapy-600 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md text-sm sm:text-base whitespace-nowrap"
            >
              Sign Up Free
            </Link>
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Dismiss banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
