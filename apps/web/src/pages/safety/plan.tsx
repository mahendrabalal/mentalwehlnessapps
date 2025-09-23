import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface SafetyPlan {
  id?: string
  user_id: string
  warning_signs: string[]
  coping_strategies: string[]
  support_contacts: string[]
  professional_contacts: string[]
  emergency_services: string[]
  items_to_remove: string[]
  safe_locations: string[]
  reasons_for_living: string[]
  future_goals: string[]
  last_reviewed?: string
  provider_approved?: boolean
  created_at?: string
  updated_at?: string
}

export default function SafetyPlanPage() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>({
    user_id: '',
    warning_signs: [''],
    coping_strategies: [''],
    support_contacts: [''],
    professional_contacts: [''],
    emergency_services: ['988 Suicide & Crisis Lifeline', '911 Emergency Services'],
    items_to_remove: [''],
    safe_locations: [''],
    reasons_for_living: [''],
    future_goals: ['']
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const totalSteps = 9

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        setSafetyPlan(prev => ({ ...prev, user_id: session.user.id }))
        fetchExistingSafetyPlan(session.user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const fetchExistingSafetyPlan = async (userId?: string) => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('safety_plans')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setSafetyPlan(data)
      }
    } catch (err: any) {
      console.error('Error fetching safety plan:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleArrayFieldChange = (field: keyof SafetyPlan, index: number, value: string) => {
    setSafetyPlan(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayField = (field: keyof SafetyPlan) => {
    setSafetyPlan(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }))
  }

  const removeArrayField = (field: keyof SafetyPlan, index: number) => {
    setSafetyPlan(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    if (!session?.user) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      // Filter out empty strings from arrays
      const cleanedPlan = {
        ...safetyPlan,
        warning_signs: safetyPlan.warning_signs.filter(item => item.trim() !== ''),
        coping_strategies: safetyPlan.coping_strategies.filter(item => item.trim() !== ''),
        support_contacts: safetyPlan.support_contacts.filter(item => item.trim() !== ''),
        professional_contacts: safetyPlan.professional_contacts.filter(item => item.trim() !== ''),
        items_to_remove: safetyPlan.items_to_remove.filter(item => item.trim() !== ''),
        safe_locations: safetyPlan.safe_locations.filter(item => item.trim() !== ''),
        reasons_for_living: safetyPlan.reasons_for_living.filter(item => item.trim() !== ''),
        future_goals: safetyPlan.future_goals.filter(item => item.trim() !== ''),
        last_reviewed: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('safety_plans')
        .upsert(cleanedPlan, { onConflict: 'user_id' })

      if (error) throw error

      setSuccess('Safety plan saved successfully!')
      await fetchExistingSafetyPlan()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
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
          <p className="text-gray-600 mb-6">You need to be logged in to create a safety plan.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading safety plan...</p>
        </div>
      </div>
    )
  }

  const renderArrayField = (
    field: keyof SafetyPlan,
    label: string,
    placeholder: string,
    description?: string
  ) => {
    const items = safetyPlan[field] as string[]

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayFieldChange(field, index, e.target.value)}
                placeholder={placeholder}
                className="input-field flex-1"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(field, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField(field)}
            className="text-therapy-600 hover:text-therapy-700 text-sm font-medium"
          >
            + Add another
          </button>
        </div>
      </div>
    )
  }

  const steps = [
    {
      title: "Warning Signs",
      description: "Thoughts, feelings, or behaviors that indicate you may be entering a crisis",
      content: renderArrayField(
        'warning_signs',
        'Personal Warning Signs',
        'e.g., Feeling hopeless, isolating from others, using substances...',
        'List the early warning signs that tell you that you might be approaching a crisis situation.'
      )
    },
    {
      title: "Coping Strategies",
      description: "Things you can do on your own to help yourself feel better",
      content: renderArrayField(
        'coping_strategies',
        'Internal Coping Strategies',
        'e.g., Deep breathing, listening to music, taking a walk...',
        'List healthy activities you can do alone when you start feeling upset or distressed.'
      )
    },
    {
      title: "Support Contacts",
      description: "People you can call or text for support (not professionals)",
      content: renderArrayField(
        'support_contacts',
        'People for Social Contact and Distraction',
        'e.g., Friend - John Smith (555) 123-4567...',
        'Include name, relationship, and phone number for people who can provide support and distraction.'
      )
    },
    {
      title: "Professional Contacts",
      description: "Mental health professionals and healthcare providers",
      content: renderArrayField(
        'professional_contacts',
        'Professional Contacts',
        'e.g., Dr. Smith, Therapist (555) 987-6543...',
        'Include mental health professionals, doctors, counselors, or other healthcare providers.'
      )
    },
    {
      title: "Emergency Services",
      description: "Crisis hotlines and emergency services",
      content: renderArrayField(
        'emergency_services',
        'Emergency Services and Crisis Lines',
        'Add additional emergency contacts...',
        'Crisis hotlines and emergency services you can contact immediately.'
      )
    },
    {
      title: "Environmental Safety",
      description: "Items to remove and safe places to go",
      content: (
        <div className="space-y-6">
          {renderArrayField(
            'items_to_remove',
            'Items to Remove or Secure',
            'e.g., Medications, sharp objects, firearms...',
            'List items that could be used for self-harm and should be removed or secured.'
          )}
          {renderArrayField(
            'safe_locations',
            'Safe Places to Go',
            'e.g., Friend\'s house, library, coffee shop...',
            'Places where you feel safe and can go when in crisis.'
          )}
        </div>
      )
    },
    {
      title: "Reasons for Living",
      description: "Things that are important to you and worth living for",
      content: renderArrayField(
        'reasons_for_living',
        'Reasons for Living',
        'e.g., Family, pets, goals, values...',
        'List the people, values, goals, or things that are important to you and give your life meaning.'
      )
    },
    {
      title: "Future Goals",
      description: "Things you want to accomplish or experience in the future",
      content: renderArrayField(
        'future_goals',
        'Future Goals and Plans',
        'e.g., Graduate college, travel to..., see grandchildren grow up...',
        'Think about things you want to do, see, or accomplish in the future.'
      )
    },
    {
      title: "Review & Save",
      description: "Review your safety plan and save your progress",
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-2">🎉 Great Work!</h4>
            <p className="text-green-800">
              You've created a comprehensive safety plan. This is an important step in taking care of your mental health.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Remember</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Your safety plan is a living document - update it as needed</li>
              <li>• Share it with trusted friends, family, or your therapist</li>
              <li>• Keep copies in easily accessible places</li>
              <li>• Practice using your coping strategies when you're feeling well</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important</h4>
            <p className="text-yellow-800 text-sm">
              If you are having thoughts of suicide or self-harm, please reach out for help immediately:
            </p>
            <div className="mt-3 space-y-2">
              <p className="text-yellow-800 text-sm">
                <strong>Crisis Hotline:</strong> 988 (Suicide & Crisis Lifeline)
              </p>
              <p className="text-yellow-800 text-sm">
                <strong>Text Support:</strong> Text HOME to 741741
              </p>
              <p className="text-yellow-800 text-sm">
                <strong>Emergency:</strong> Call 911
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <>
      <Head>
        <title>Safety Plan - Mental Wellness App</title>
        <meta name="description" content="Create and manage your personal safety plan" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Safety Plan</h1>
                  <p className="text-gray-600 mt-1">
                    Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
                  </p>
                </div>
                <Link href="/crisis/support" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm">
                  Crisis Support
                </Link>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-therapy-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {steps[currentStep - 1].description}
                </p>

                {steps[currentStep - 1].content}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="btn-secondary"
                    >
                      Previous
                    </button>
                  )}

                  <Link href="/" className="btn-secondary">
                    Save & Exit
                  </Link>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Progress'}
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="btn-primary"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Complete Safety Plan'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}