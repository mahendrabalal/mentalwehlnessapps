import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { SEOHead } from '@/components/SEOHead'

export default function OnboardingStep4() {
  const [session, setSession] = useState<Session | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const { userId } = router.query
  const seoTitle = 'Onboarding Step 4 - Emergency Contact | Mental Wellness App'
  const seoDescription = 'Add an optional emergency contact to enhance your crisis safety plan and completion of onboarding.'

  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [completing, setCompleting] = useState(false)
  const seoMeta = (
    <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
  )

  const fetchExistingData = useCallback(async (
    currentUserId: string | string[] | undefined,
    supabaseClient = supabase
  ) => {
    const userIdToUse = currentUserId || userId || session?.user?.id
    if (!userIdToUse) return

    try {
      const { data, error } = await supabaseClient
        .from('user_profiles')
        .select('emergency_contact_name, emergency_contact_phone, emergency_contact_relationship')
        .eq('id', userIdToUse)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setEmergencyContact({
          name: data.emergency_contact_name || '',
          phone: data.emergency_contact_phone || '',
          relationship: data.emergency_contact_relationship || ''
        })
      }

      // Try to load from localStorage as fallback
      const stored = localStorage.getItem('onboarding_step_4')
      if (stored) {
        const parsed = JSON.parse(stored)
        setEmergencyContact(prev => ({ ...prev, ...parsed }))
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to fetch emergency contact.'
      console.error('Error fetching emergency contact:', message)
    }
  }, [session?.user?.id, supabase, userId])

  useEffect(() => {
    let isActive = true

    const initializeUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        if (!isActive) return

        setSession(session)

        if (session?.user) {
          await fetchExistingData(session.user.id, supabase)
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        if (isActive) {
          setUserLoading(false)
        }
      }
    }

    initializeUser()

    return () => {
      isActive = false
    }
  }, [fetchExistingData, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmergencyContact(prev => ({ ...prev, [name]: value }))
  }

  const handleCompleteOnboarding = async () => {
    const userIdToUse = userId || session?.user?.id
    if (!userIdToUse) return

    setCompleting(true)
    setError('')

    try {
      // Update user profile with emergency contact and mark onboarding as complete
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: userIdToUse,
          emergency_contact_name: emergencyContact.name || null,
          emergency_contact_phone: emergencyContact.phone || null,
          emergency_contact_relationship: emergencyContact.relationship || null,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) throw error

      // Clear localStorage
      localStorage.removeItem('onboarding_step_1')
      localStorage.removeItem('onboarding_step_2')
      localStorage.removeItem('onboarding_step_3')
      localStorage.removeItem('onboarding_step_4')

      // Redirect to dashboard
      router.push('/dashboard?onboarding_complete=true')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to complete onboarding.'
      setError(message)
    } finally {
      setCompleting(false)
    }
  }

  const handleSaveAndContinue = async () => {
    const userIdToUse = userId || session?.user?.id
    if (!userIdToUse) return

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: userIdToUse,
          emergency_contact_name: emergencyContact.name || null,
          emergency_contact_phone: emergencyContact.phone || null,
          emergency_contact_relationship: emergencyContact.relationship || null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) throw error

      // Store progress in localStorage
      localStorage.setItem('onboarding_step_4', JSON.stringify(emergencyContact))

      await handleCompleteOnboarding()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to save emergency contact.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    handleCompleteOnboarding()
  }

  if (userLoading) {
    return (
      <>
        {seoMeta}
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
            <p className="text-gray-600">Please wait while we load your profile.</p>
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
                  <h1 className="text-2xl font-bold text-gray-900">Emergency Contact & Completion</h1>
                  <p className="text-gray-600 mt-1">Step 4 of 4: Almost done!</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step 4/4
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-therapy-600 h-2 rounded-full w-full transition-all duration-300" />
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
                {/* Emergency Contact */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📞</span>
                    Emergency Contact (Optional but Recommended)
                  </h2>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-orange-900 mb-2">Why provide an emergency contact?</h3>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Provides additional support during crisis situations</li>
                      <li>• Can be notified if you indicate severe symptoms (with your permission)</li>
                      <li>• Helps ensure your safety and well-being</li>
                      <li>• You maintain full control over when and how they&apos;re contacted</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={emergencyContact.name}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <select
                        id="relationship"
                        name="relationship"
                        value={emergencyContact.relationship}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Select relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="partner">Partner</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                        <option value="sibling">Sibling</option>
                        <option value="friend">Friend</option>
                        <option value="other_family">Other family member</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={emergencyContact.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Completion Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex">
                    <div className="text-green-400 mr-4">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-2">🎉 You&apos;re All Set!</h3>
                      <p className="text-green-800 mb-4">
                        Congratulations on taking this important step for your mental health. Your personalized
                        mental wellness app is ready to support you on your journey.
                      </p>
                      <div className="text-green-800 text-sm">
                        <h4 className="font-medium mb-2">What happens next:</h4>
                        <ul className="space-y-1">
                          <li>• Explore your personalized dashboard</li>
                          <li>• Take your first assessment when you&apos;re ready</li>
                          <li>• Complete daily check-ins to track your progress</li>
                          <li>• Access crisis support resources anytime</li>
                          <li>• Create your safety plan for additional support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6">
                  <h3 className="font-semibold text-therapy-900 mb-3">Recommended First Steps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <span className="text-xl mr-3">📊</span>
                      <div>
                        <h4 className="font-medium text-therapy-900">Take a Baseline Assessment</h4>
                        <p className="text-therapy-800 text-sm">Complete PHQ-9 or GAD-7 to establish your starting point</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xl mr-3">📝</span>
                      <div>
                        <h4 className="font-medium text-therapy-900">Daily Check-in</h4>
                        <p className="text-therapy-800 text-sm">Track your mood and wellness metrics daily</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xl mr-3">🛡️</span>
                      <div>
                        <h4 className="font-medium text-therapy-900">Create Safety Plan</h4>
                        <p className="text-therapy-800 text-sm">Build your personalized crisis support plan</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xl mr-3">⚙️</span>
                      <div>
                        <h4 className="font-medium text-therapy-900">Customize Settings</h4>
                        <p className="text-therapy-800 text-sm">Adjust notifications and privacy preferences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Link href="/onboarding/step-3" className="btn-secondary">
                    Back
                  </Link>

                  <div className="space-x-3">
                    <button
                      onClick={handleSkip}
                      disabled={completing}
                      className="text-gray-600 hover:text-gray-700 text-sm underline disabled:opacity-50"
                    >
                      Skip emergency contact
                    </button>
                    <button
                      onClick={handleSaveAndContinue}
                      disabled={loading || completing}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8"
                    >
                      {completing ? 'Completing Setup...' : 'Complete Setup'}
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
