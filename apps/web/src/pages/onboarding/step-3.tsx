import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { SEOHead } from '@/components/SEOHead'

export default function OnboardingStep3() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const seoTitle = 'Onboarding Step 3 - Privacy Preferences | Mental Wellness App'
  const seoDescription = 'Set your privacy, notification, and crisis plan preferences to configure your Mental Wellness App experience.'

  const [preferences, setPreferences] = useState({
    notifications_enabled: true,
    data_sharing_consent: false,
    research_participation_consent: false,
    crisis_plan_enabled: true,
    provider_data_sharing: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const seoMeta = (
    <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
  )

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchExistingData(session.user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const fetchExistingData = async (userId: string) => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('notifications_enabled, data_sharing_consent, research_participation_consent, crisis_plan_enabled, provider_data_sharing')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setPreferences({
          notifications_enabled: data.notifications_enabled ?? true,
          data_sharing_consent: data.data_sharing_consent ?? false,
          research_participation_consent: data.research_participation_consent ?? false,
          crisis_plan_enabled: data.crisis_plan_enabled ?? true,
          provider_data_sharing: data.provider_data_sharing ?? false
        })
      }

      // Try to load from localStorage as fallback
      const stored = localStorage.getItem('onboarding_step_3')
      if (stored) {
        const parsed = JSON.parse(stored)
        setPreferences(prev => ({ ...prev, ...parsed }))
      }
    } catch (err: any) {
      console.error('Error fetching preferences:', err.message)
    }
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleNext = async () => {
    if (!session?.user) return

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: session?.user?.id,
          ...preferences,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) throw error

      // Store progress in localStorage
      localStorage.setItem('onboarding_step_3', JSON.stringify(preferences))

      router.push('/onboarding/step-4')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/onboarding/step-4')
  }

  if (userLoading) {
    return (
      <>
        {seoMeta}
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  if (!session) {
    return (
      <>
        {seoMeta}
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to complete onboarding.</p>
            <Link href="/auth/login" className="btn-primary inline-block">
              Log In
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {seoMeta}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Privacy & Preferences</h1>
                  <p className="text-gray-600 mt-1">Step 3 of 4: Choose your privacy settings</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step 3/4
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-therapy-600 h-2 rounded-full w-3/4 transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="space-y-8">
                {/* Privacy & Security */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔒</span>
                    Privacy & Security
                  </h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-blue-900 mb-2">Your Data is Protected</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• All data is encrypted and HIPAA compliant</li>
                      <li>• We never sell your personal information</li>
                      <li>• You can download or delete your data anytime</li>
                      <li>• Access is restricted to authorized personnel only</li>
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="notifications_enabled"
                        checked={preferences.notifications_enabled}
                        onChange={() => handlePreferenceChange('notifications_enabled')}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="notifications_enabled" className="font-medium text-gray-900">
                          Enable notifications and reminders
                        </label>
                        <p className="text-gray-600 text-sm mt-1">
                          Get gentle reminders for check-ins, assessments, and encouraging messages.
                          You can adjust frequency in settings.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="crisis_plan_enabled"
                        checked={preferences.crisis_plan_enabled}
                        onChange={() => handlePreferenceChange('crisis_plan_enabled')}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="crisis_plan_enabled" className="font-medium text-gray-900">
                          Enable crisis intervention features
                        </label>
                        <p className="text-gray-600 text-sm mt-1">
                          Access safety planning tools and crisis resources. Highly recommended for safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Sharing */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🤝</span>
                    Data Sharing (Optional)
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="data_sharing_consent"
                        checked={preferences.data_sharing_consent}
                        onChange={() => handlePreferenceChange('data_sharing_consent')}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="data_sharing_consent" className="font-medium text-gray-900">
                          Share anonymized data with healthcare providers
                        </label>
                        <p className="text-gray-600 text-sm mt-1">
                          When you authorize it, this helps your healthcare team understand your progress
                          and provide better coordinated care. Data is always anonymized.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="provider_data_sharing"
                        checked={preferences.provider_data_sharing}
                        onChange={() => handlePreferenceChange('provider_data_sharing')}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="provider_data_sharing" className="font-medium text-gray-900">
                          Allow connection with healthcare providers
                        </label>
                        <p className="text-gray-600 text-sm mt-1">
                          Your therapist or doctor can request to connect with your account to view
                          your progress (requires your explicit approval for each connection).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="research_participation_consent"
                        checked={preferences.research_participation_consent}
                        onChange={() => handlePreferenceChange('research_participation_consent')}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="research_participation_consent" className="font-medium text-gray-900">
                          Participate in mental health research
                        </label>
                        <p className="text-gray-600 text-sm mt-1">
                          Help improve mental health treatments by contributing anonymized data to research
                          studies. You can opt out anytime and will be notified of any research use.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="text-yellow-400 mr-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900 text-sm">You're Always in Control</h4>
                      <p className="text-yellow-800 text-sm mt-1">
                        You can change any of these preferences anytime in your profile settings.
                        Your choices don't affect the core functionality of the app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Link href="/onboarding/step-2" className="btn-secondary">
                    Back
                  </Link>

                  <div className="space-x-3">
                    <button
                      onClick={handleSkip}
                      className="text-gray-600 hover:text-gray-700 text-sm underline"
                    >
                      Skip this step
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={loading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
