import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { SEOHead } from '@/components/SEOHead'

interface OnboardingData {
  currentStep: number
  personalInfo: {
    preferred_name: string
    date_of_birth: string
    timezone: string
    pronouns: string
  }
  healthHistory: {
    mental_health_history: string
    current_treatments: string
    medications: string[]
    previous_therapy: boolean
    crisis_history: boolean
  }
  goals: {
    wellness_goals: string[]
    primary_concerns: string[]
    motivation: string
  }
  preferences: {
    notifications_enabled: boolean
    data_sharing_consent: boolean
    research_participation_consent: boolean
    crisis_plan_enabled: boolean
  }
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export default function OnboardingWelcome() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const seoTitle = 'Onboarding - Mental Wellness App'
  const seoDescription = 'Complete your Mental Wellness App onboarding to personalize support, crisis planning, and analytics.'

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        checkOnboardingStatus(session.user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const checkOnboardingStatus = async (userId: string) => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setProfile(data)

      // If user has already completed onboarding, redirect to dashboard
      if (data?.onboarding_completed) {
        router.push('/dashboard')
        return
      }

    } catch (err: any) {
      console.error('Error checking onboarding status:', err.message)
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) {
    return (
      <>
        <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
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
        <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
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

  if (loading) {
    return (
      <>
        <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} noindex nofollow />
      <div className="min-h-screen bg-gradient-to-b from-therapy-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Welcome Header */}
            <div className="mb-12">
              <div className="text-6xl mb-6">🌱</div>
              <h1 className="text-4xl font-bold wellness-gradient bg-clip-text text-transparent mb-4">
                Welcome to Your Mental Wellness Journey
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're here to support you with clinically-validated tools, personalized insights,
                and compassionate care every step of the way.
              </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Assessments</h3>
                <p className="text-gray-600 text-sm">
                  Take validated PHQ-9 and GAD-7 assessments to track your mental health progress
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Monitor your mood, anxiety, and wellness metrics with beautiful visualizations
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600 text-sm">
                  Access immediate crisis resources and create personalized safety plans
                </p>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12 border border-gray-100">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy & Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🏥 HIPAA Compliant</h4>
                  <p className="text-gray-600 text-sm">
                    Your health information is protected according to healthcare standards
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🔐 Encrypted Data</h4>
                  <p className="text-gray-600 text-sm">
                    All your data is encrypted both in transit and at rest
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">👤 You Control Your Data</h4>
                  <p className="text-gray-600 text-sm">
                    You decide what to share and can delete your account anytime
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🏛️ No Data Selling</h4>
                  <p className="text-gray-600 text-sm">
                    We never sell your personal information to third parties
                  </p>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-therapy-50 rounded-lg p-8 mb-12 border border-therapy-100">
              <h3 className="text-xl font-semibold text-therapy-900 mb-4">Let's Get Started</h3>
              <p className="text-therapy-800 mb-6">
                We'll guide you through a quick setup process to personalize your experience.
                This takes about 5-10 minutes and helps us provide better support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                  href="/onboarding/step-1"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Start Setup (5-10 min)
                </Link>
                <Link
                  href="/dashboard"
                  className="text-therapy-700 hover:text-therapy-800 text-sm underline"
                >
                  Skip for now and explore
                </Link>
              </div>
            </div>

            {/* What to Expect */}
            <div className="text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                What to Expect During Setup
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-therapy-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-therapy-700 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Personal Information</h4>
                    <p className="text-gray-600 text-sm">Basic details to personalize your experience</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-therapy-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-therapy-700 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Wellness Goals</h4>
                    <p className="text-gray-600 text-sm">What you hope to achieve with the app</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-therapy-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-therapy-700 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Privacy Preferences</h4>
                    <p className="text-gray-600 text-sm">Choose how your data is used and shared</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-therapy-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-therapy-700 text-sm font-medium">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                    <p className="text-gray-600 text-sm">Optional contact for crisis situations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crisis Support Notice */}
            <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🆘</div>
                <div className="text-left">
                  <h4 className="font-semibold text-red-900 mb-2">Need Immediate Help?</h4>
                  <p className="text-red-800 text-sm mb-3">
                    If you're having thoughts of suicide or self-harm, please reach out for help immediately:
                  </p>
                  <div className="space-y-1 text-red-800 text-sm">
                    <p><strong>Crisis Hotline:</strong> 988 (Suicide & Crisis Lifeline)</p>
                    <p><strong>Text Support:</strong> Text HOME to 741741</p>
                    <p><strong>Emergency:</strong> Call 911</p>
                  </div>
                  <Link
                    href="/crisis/support"
                    className="inline-block mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
                  >
                    Access Crisis Resources
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
