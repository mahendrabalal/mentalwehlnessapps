import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function OnboardingStep1() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const [formData, setFormData] = useState({
    preferred_name: '',
    date_of_birth: '',
    timezone: 'America/New_York',
    pronouns: '',
    phone_number: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfileData(session.user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const fetchProfileData = async (userId: string) => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('preferred_name, date_of_birth, timezone, pronouns, phone_number')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setFormData({
          preferred_name: data.preferred_name || '',
          date_of_birth: data.date_of_birth || '',
          timezone: data.timezone || 'America/New_York',
          pronouns: data.pronouns || '',
          phone_number: data.phone_number || ''
        })
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err.message)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    if (!session?.user) return

    // Validate required fields
    if (!formData.preferred_name.trim()) {
      setError('Please enter your preferred name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: session.user.id,
          email: session.user.email,
          preferred_name: formData.preferred_name.trim(),
          date_of_birth: formData.date_of_birth || null,
          timezone: formData.timezone,
          pronouns: formData.pronouns || null,
          phone_number: formData.phone_number || null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) throw error

      // Store progress in localStorage for recovery
      localStorage.setItem('onboarding_step_1', JSON.stringify(formData))

      router.push('/onboarding/step-2')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/onboarding/step-2')
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to complete onboarding.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Personal Information - Mental Wellness App</title>
        <meta name="description" content="Tell us a bit about yourself" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
                  <p className="text-gray-600 mt-1">Step 1 of 4: Tell us a bit about yourself</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step 1/4
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-therapy-600 h-2 rounded-full w-1/4 transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="preferred_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Name *
                  </label>
                  <input
                    type="text"
                    id="preferred_name"
                    name="preferred_name"
                    value={formData.preferred_name}
                    onChange={handleInputChange}
                    placeholder="What would you like us to call you?"
                    className="input-field"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This is how we'll address you throughout the app
                  </p>
                </div>

                <div>
                  <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-1">
                    Pronouns (Optional)
                  </label>
                  <select
                    id="pronouns"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select pronouns (optional)</option>
                    <option value="he/him">he/him</option>
                    <option value="she/her">she/her</option>
                    <option value="they/them">they/them</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Helps us provide age-appropriate resources and insights
                  </p>
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For emergency contact purposes only
                  </p>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="America/Anchorage">Alaska Time</option>
                    <option value="Pacific/Honolulu">Hawaii Time</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Helps us schedule reminders at appropriate times
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="text-blue-400 mr-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-blue-900 font-medium text-sm">Privacy Notice</h4>
                      <p className="text-blue-800 text-sm mt-1">
                        All information is encrypted and stored securely. You can update or delete this information anytime in your profile settings.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Link href="/onboarding" className="btn-secondary">
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