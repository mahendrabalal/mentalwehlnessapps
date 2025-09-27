import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { createClient } from '@/lib/supabase'

export function Navbar() {
  const { user } = useAuth()
  const { isPremium } = useSubscription()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      console.log('Current user:', user)
      console.log('Attempting to sign out...')

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error.message)
        // Even if there's an error, try to refresh the page to clear local state
        window.location.reload()
      } else {
        console.log('Sign out successful')
        router.push('/')
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
      // Fallback: clear local storage and refresh
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <Link
            href={user ? "/dashboard" : "/?landing=true"}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            title={user ? "Go to Dashboard" : "Go to Home"}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-therapy-500 to-therapy-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">MentalWellnessApps</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {/* Authenticated User Navigation */}
                <Link
                  href="/dashboard"
                  className={`transition-colors ${
                    router.pathname === '/dashboard'
                      ? 'text-therapy-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  href="/safety/plan"
                  className={`transition-colors ${
                    router.pathname === '/safety/plan'
                      ? 'text-therapy-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Safety Plan
                </Link>

                <Link
                  href="/profile"
                  className={`transition-colors ${
                    router.pathname === '/profile'
                      ? 'text-therapy-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Profile
                </Link>

                {!isPremium && (
                  <Link
                    href="/premium/features"
                    className="bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Upgrade to Premium
                  </Link>
                )}

                {isPremium && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </span>
                )}

                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {/* Non-authenticated User Navigation */}
                <Link href="/?landing=true" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}