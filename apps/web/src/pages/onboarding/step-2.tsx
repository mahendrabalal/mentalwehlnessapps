import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { SEOHead } from '@/components/SEOHead'

const WELLNESS_GOALS = [
  { id: 'mood_tracking', label: 'Track and improve my mood', icon: '😊' },
  { id: 'anxiety_management', label: 'Manage anxiety and stress', icon: '🧘' },
  { id: 'depression_support', label: 'Get support for depression', icon: '🌱' },
  { id: 'crisis_planning', label: 'Create safety plans for crisis situations', icon: '🛡️' },
  { id: 'therapy_support', label: 'Supplement my therapy sessions', icon: '💬' },
  { id: 'medication_tracking', label: 'Track medication and side effects', icon: '💊' },
  { id: 'sleep_improvement', label: 'Improve my sleep quality', icon: '😴' },
  { id: 'mindfulness', label: 'Practice mindfulness and meditation', icon: '🕯️' },
  { id: 'self_awareness', label: 'Increase self-awareness and insight', icon: '🪞' },
  { id: 'progress_monitoring', label: 'Monitor my mental health progress', icon: '📈' }
]

const PRIMARY_CONCERNS = [
  { id: 'depression', label: 'Depression', icon: '🌧️' },
  { id: 'anxiety', label: 'Anxiety', icon: '⚡' },
  { id: 'stress', label: 'Stress', icon: '🌊' },
  { id: 'panic', label: 'Panic attacks', icon: '💨' },
  { id: 'trauma', label: 'Trauma/PTSD', icon: '⛑️' },
  { id: 'grief', label: 'Grief and loss', icon: '🕊️' },
  { id: 'relationships', label: 'Relationship issues', icon: '💔' },
  { id: 'work_stress', label: 'Work/school stress', icon: '📚' },
  { id: 'self_esteem', label: 'Self-esteem issues', icon: '🪞' },
  { id: 'addiction', label: 'Substance use concerns', icon: '🚫' },
  { id: 'eating', label: 'Eating disorders', icon: '🍽️' },
  { id: 'other', label: 'Other concerns', icon: '💭' }
]

export default function OnboardingStep2() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const seoTitle = 'Onboarding Step 2 - Wellness Goals | Mental Wellness App'
  const seoDescription = 'Select your mental wellness goals and primary concerns to personalize recommendations.'

  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [motivation, setMotivation] = useState('')
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
        .select('wellness_goals')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data?.wellness_goals) {
        setSelectedGoals(data.wellness_goals)
      }

      // Try to load from localStorage as fallback
      const stored = localStorage.getItem('onboarding_step_2')
      if (stored) {
        const parsed = JSON.parse(stored)
        setSelectedGoals(parsed.goals || [])
        setSelectedConcerns(parsed.concerns || [])
        setMotivation(parsed.motivation || '')
      }
    } catch (err: any) {
      console.error('Error fetching goals:', err.message)
    }
  }

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleConcernToggle = (concernId: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concernId)
        ? prev.filter(id => id !== concernId)
        : [...prev, concernId]
    )
  }

  const handleNext = async () => {
    if (!session?.user) return

    if (selectedGoals.length === 0) {
      setError('Please select at least one wellness goal')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: session?.user?.id,
          wellness_goals: selectedGoals,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) throw error

      // Store progress in localStorage
      localStorage.setItem('onboarding_step_2', JSON.stringify({
        goals: selectedGoals,
        concerns: selectedConcerns,
        motivation
      }))

      router.push('/onboarding/step-3')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/onboarding/step-3')
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wellness Goals</h1>
                  <p className="text-gray-600 mt-1">Step 2 of 4: What would you like to achieve?</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step 2/4
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-therapy-600 h-2 rounded-full w-2/4 transition-all duration-300" />
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
                {/* Wellness Goals */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    What are your wellness goals? *
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Select all that apply. This helps us customize your experience.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {WELLNESS_GOALS.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => handleGoalToggle(goal.id)}
                        className={`flex items-center p-4 border rounded-lg text-left transition-colors ${
                          selectedGoals.includes(goal.id)
                            ? 'border-therapy-500 bg-therapy-50 text-therapy-900'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <span className="text-2xl mr-3">{goal.icon}</span>
                        <span className="font-medium">{goal.label}</span>
                        {selectedGoals.includes(goal.id) && (
                          <span className="ml-auto text-therapy-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Concerns */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    What are your primary concerns? (Optional)
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    This helps us understand what areas you'd like to focus on.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {PRIMARY_CONCERNS.map((concern) => (
                      <button
                        key={concern.id}
                        onClick={() => handleConcernToggle(concern.id)}
                        className={`flex items-center p-3 border rounded-lg text-left transition-colors ${
                          selectedConcerns.includes(concern.id)
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <span className="text-xl mr-2">{concern.icon}</span>
                        <span className="text-sm font-medium">{concern.label}</span>
                        {selectedConcerns.includes(concern.id) && (
                          <span className="ml-auto text-blue-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    What motivates you to focus on your mental health? (Optional)
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Share what's driving you to prioritize your mental wellness.
                  </p>

                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="e.g., I want to be more present for my family, improve my work performance, feel more confident..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-therapy-500 focus:border-therapy-500"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="text-green-400 mr-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-green-900 font-medium text-sm">Your Goals Matter</h4>
                      <p className="text-green-800 text-sm mt-1">
                        Setting clear goals helps create a personalized experience that's more effective for your mental health journey.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Link href="/onboarding/step-1" className="btn-secondary">
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
