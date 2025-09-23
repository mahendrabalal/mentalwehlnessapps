import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

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
        setUser(null) // Clear user state immediately
        router.push('/')
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
      // Fallback: clear local storage and refresh
      localStorage.clear()
      window.location.reload()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Mental Wellness App</title>
        <meta name="description" content="AI-powered mental wellness and therapeutic support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold wellness-gradient bg-clip-text text-transparent mb-4">
              Mental Wellness App
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered therapeutic support with clinical validation and crisis intervention
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            {user ? (
              <div className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
                    <p className="text-gray-600">
                      Logged in as: {user.email}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/profile" className="btn-secondary text-sm">
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="btn-secondary text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <Link href="/dashboard" className="btn-primary">
                    View Dashboard
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Daily Check-in</h3>
                    <p className="text-gray-600 text-sm mb-4">Track your mood and wellness</p>
                    <Link href="/mood/check-in" className="btn-primary w-full inline-block text-center">
                      Start Check-in
                    </Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Assessment</h3>
                    <p className="text-gray-600 text-sm mb-4">Take PHQ-9 or GAD-7 assessment</p>
                    <Link href="/assessment/phq9" className="btn-primary w-full inline-block text-center">
                      Take Assessment
                    </Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Crisis Support</h3>
                    <p className="text-gray-600 text-sm mb-4">Immediate help and resources</p>
                    <Link href="/crisis/support" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg w-full inline-block text-center">
                      Get Help Now
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center">
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <p className="text-gray-600 mb-6">
                  Sign up or log in to begin your mental wellness journey
                </p>
                <div className="space-x-4">
                  <Link href="/auth/signup" className="btn-primary inline-block">
                    Sign Up
                  </Link>
                  <Link href="/auth/login" className="btn-secondary inline-block">
                    Log In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}