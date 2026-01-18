import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { SEOHead, SEO_CONFIG } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData, softwareApplicationStructuredData } from '@/lib/seo'
import { HOMEPAGE_LAST_MODIFIED, HOMEPAGE_PUBLISHED } from '@/lib/seo-constants'
import { InternationalCrisisSupport } from '@/components/InternationalCrisisSupport'
import { BrandLogo } from '@/components/BrandLogo'
import { CollapsibleSection } from '@/components/CollapsibleSection'
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

  // Check if user wants to stay on landing page via URL parameter
  const [showLandingPage, setShowLandingPage] = useState(false)

  useEffect(() => {
    // Check for landing page cookie (set by middleware) or URL parameter
    const hasLandingCookie = document.cookie.includes('show_landing_page=true')
    const urlParams = new URLSearchParams(window.location.search)
    const forceLanding = urlParams.get('landing') === 'true'

    if (forceLanding || hasLandingCookie) {
      setShowLandingPage(true)
      // Clear the cookie after reading to prevent automatic landing page on next visit
      if (hasLandingCookie) {
        document.cookie = 'show_landing_page=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
    } else if (user && !loading) {
      // Only redirect if user is authenticated AND not explicitly viewing landing
      router.push('/dashboard')
    }
  }, [user, loading, router])

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

  // Show modern landing page for non-authenticated users OR authenticated users who want to view it
  const structuredData = [
    softwareApplicationStructuredData({
      name: 'Mental Wellness App',
      description: 'Free mental health support with unlimited therapy companion, crisis support, and mood analytics. 100% free forever.',
      price: 0,
    }),
    medicalWebPageStructuredData({
      name: 'Mental Wellness App - Free Mental Health Support Online',
      description: 'Get 100% free, private mental-health tools for stress, anxiety, burnout & loneliness. Evidence-based, HIPAA-compliant support—no cost, ever.',
      slug: '/',
    }),
    buildBreadcrumbList([{ name: 'Mental Wellness App', url: '/' }]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Mental Wellness Apps really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all tools are 100% free with no credit card or subscription required. We believe mental health support should be accessible to everyone, regardless of financial situation."
          }
        },
        {
          "@type": "Question",
          "name": "Are these tools evidence-based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each exercise is grounded in cognitive-behavioral and mindfulness research validated by professionals. Our therapeutic approaches are overseen by licensed mental health experts."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use encrypted, HIPAA-grade storage and never sell user data. Your information is never sold, shared, or used for purposes beyond your care."
          }
        },
        {
          "@type": "Question",
          "name": "Can I access it worldwide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our platform and crisis links are available globally, with localized crisis resources in most countries and languages."
          }
        },
        {
          "@type": "Question",
          "name": "What is mental wellness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mental wellness is a state of well-being where you realize your abilities, can cope with normal life stresses, work productively, and contribute to your community. It's about having emotional resilience, healthy relationships, and the capacity to adapt to change."
          }
        }
      ]
    }
  ]

  return (
    <>
      <SEOHead
        title="Free Mental Health Support Online | Anxiety & Stress Tools"
        description="Get 100% free, private mental-health tools for stress, anxiety, burnout & loneliness. Evidence-based, HIPAA-compliant support—no cost, ever."
        keywords={[
          "free mental health support online",
          "free anxiety relief tools",
          "free burnout assessment",
          "stress management techniques",
          "emotional exhaustion recovery",
          "HIPAA compliant mental health",
          "evidence-based therapy tools",
          "crisis support resources",
          "mental wellness platform",
          "digital mental health support",
          "mental wellness month",
          "insight mental wellness",
          "mental wellness retreat",
          "balanced mental wellness",
          "what is mental wellness",
          "world teen mental wellness day",
          "mindful mental wellness",
          "mental wellness center",
          "mental wellness apps",
          "mental wellness activities",
          "mental wellness in the workplace"
        ]}
        ogImage="/og-default.png"
        ogType="website"
        publishedTime={HOMEPAGE_PUBLISHED}
        modifiedTime={HOMEPAGE_LAST_MODIFIED}
        structuredData={structuredData}
      />

      {/* Dashboard Shortcut for Authenticated Users */}
      {user && showLandingPage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-therapy-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3">
            <span className="text-sm">Welcome back!</span>
            <Link
              href="/dashboard"
              className="bg-white text-therapy-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => setShowLandingPage(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modern Landing Page */}
      <div className="min-h-screen bg-white">
        <Navbar variant="marketing" />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white min-h-[600px] lg:min-h-[700px] flex items-center mt-16 lg:mt-20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.webp"
              alt="Mental wellness hero background"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            {/* Overlay: Stronger on mobile for readability, gradient on desktop */}
            <div className="absolute inset-0 bg-white/90 sm:bg-white/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-white/95 lg:via-white/60 lg:to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Column: Text & CTA */}
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                  <h1 className="font-bold leading-tight tracking-tight">
                    <span className="block text-3xl sm:text-4xl lg:text-5xl text-slate-800 font-serif italic mb-2">
                      Free Mental Wellness Tools & Support
                    </span>
                    <span className="block text-2xl sm:text-3xl lg:text-3xl text-[#00cba9] font-extrabold">
                      Balanced Mental Wellness Retreat, Mindfulness Insight Technique, Exercises & Counseling
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium pt-2 max-w-lg">
                    Evidence-based digital tools for anxiety, stress, burnout & loneliness—100% free, secure, and available worldwide.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/auth/signup"
                      className="inline-block bg-[#bc32b8] hover:bg-[#a92da5] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-md text-center"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="inline-flex items-center justify-center text-gray-700 hover:text-[#bc32b8] px-6 py-4 rounded-lg text-lg font-bold transition-colors"
                    >
                      See How It Works
                    </Link>
                  </div>

                  <div className="text-gray-600 text-lg font-medium">
                    <Link href="#learn-more" className="text-[#00cba9] hover:underline font-semibold flex items-center gap-2">
                      Learn more about mental wellness <span>→</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 font-medium">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#bc32b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Overcome stigma with private support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#bc32b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Combat loneliness 24/7</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#bc32b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Manage anxiety naturally</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#bc32b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>No cost barriers—completely free</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Empty to allow image subject to shine */}
              <div className="hidden lg:block relative h-full">
              </div>
            </div>
          </div>
        </section>

        {/* Thrive Section with Social Proof */}
        <section className="bg-wellness-900 py-16 lg:py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column: Thrive Content */}
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                  Move beyond coping. <span className="italic font-serif text-[#00cba9]">Flourish.</span>
                </h2>
                <p className="text-lg md:text-xl text-wellness-100 leading-relaxed max-w-lg">
                  Mental wellness made simple. Access supportive, private digital tools that are distinctively effective and always 100% free.
                </p>
              </div>

              {/* Right Column: Social Proof Stats */}
              <div>
                <p className="text-wellness-200 text-left mb-8 text-lg font-medium">Trusted by thousands worldwide</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="space-y-2 text-left sm:text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-[#00cba9]">94%</div>
                    <div className="text-wellness-200 font-medium text-sm lg:text-base">Report improved mood awareness</div>
                  </div>
                  <div className="space-y-2 text-left sm:text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-[#00cba9]">24/7</div>
                    <div className="text-wellness-200 font-medium text-sm lg:text-base">Digital support availability</div>
                  </div>
                  <div className="space-y-2 text-left sm:text-center lg:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-[#00cba9]">89%</div>
                    <div className="text-wellness-200 font-medium text-sm lg:text-base">Reduced crisis episodes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section id="features" className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Support for Your
                <span className="block bg-gradient-to-r from-therapy-600 to-blue-600 bg-clip-text text-transparent">
                  Real Struggles
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're battling burnout, fighting loneliness, managing anxiety, or overcoming stigma—
                get personalized support that addresses your specific mental health challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Combat Loneliness */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-therapy-500 to-therapy-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Combat Loneliness & Isolation (24/7 Digital Support)</h3>
                  <p className="text-gray-600 mb-6">Stay connected and calm with guided conversations and evidence-based loneliness-reduction tools. Access our online mental-health resources anytime, anywhere.</p>

                  {/* Mock conversation */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-therapy-600 text-white px-3 py-2 rounded-lg text-sm max-w-xs">
                        I'm feeling anxious about work tomorrow
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border px-3 py-2 rounded-lg text-sm max-w-xs">
                        I can see you're experiencing anxiety, and I know from your recent GAD-7 assessment that this has been challenging. Let's try the 5-4-3-2-1 grounding technique...
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Available 24/7, completely free</span>
                  </div>
                  <Link
                    href="/support/combat-loneliness-isolation"
                    className="mt-4 block text-center bg-therapy-50 hover:bg-therapy-100 text-therapy-700 px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Loneliness Support →
                  </Link>
                </div>
              </div>

              {/* Understand Burnout */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Understand Your Burnout Patterns (Burnout Self-Assessment)</h3>
                  <p className="text-gray-600 mb-6">Track stress, sleep & emotional energy to detect burnout early and prevent relapse. Our mental-wellness tools provide actionable insights for recovery.</p>

                  {/* Mock analytics */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Burnout Risk Level</span>
                      <span className="text-sm text-yellow-600 flex items-center">
                        ⚠️ Medium
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      "Your stress levels have increased 40% this week"
                    </div>
                    <div className="text-xs text-gray-600">
                      "Sleep quality down 2 points—may affect mood"
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Early warning system</span>
                  </div>
                  <Link
                    href="/tools/burnout-assessment"
                    className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-md"
                  >
                    Burnout Assessment →
                  </Link>
                </div>
              </div>

              {/* Manage Anxiety */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Manage Anxiety Naturally (Free Anxiety Relief Tools)</h3>
                  <p className="text-gray-600 mb-6">Access grounding exercises, breathing techniques & journaling to manage anxiety anytime. Our free mental-health tools are clinically validated for immediate relief.</p>

                  {/* Mock anxiety tools */}
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">😰➡️😌</span>
                      <span className="text-sm font-medium text-gray-700">Quick Relief</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      "Try the 5-4-3-2-1 grounding exercise"
                    </div>
                    <div className="text-xs text-gray-600">
                      "Box breathing: 4 counts in, hold 4, out 6"
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Instant relief techniques</span>
                  </div>
                  <Link
                    href="/tools/anxiety-relief"
                    className="mt-4 block text-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-md"
                  >
                    Free Anxiety Tools →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Trust & Safety Section */}
        <section id="about" className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Safety & Privacy Matter
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                HIPAA-compliant, research-validated, and overseen by licensed professionals.
                Our clinicians and mental-health advisors ensure every tool follows clinical-grade standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
                <p className="text-gray-600 text-sm">Healthcare-grade data protection and privacy standards</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence-Based</h3>
                <p className="text-gray-600 text-sm">Clinical assessments and therapeutic techniques validated by research</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crisis Prevention</h3>
                <p className="text-gray-600 text-sm">24/7 monitoring with immediate escalation to emergency resources</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Support</h3>
                <p className="text-gray-600 text-sm">Licensed mental health professionals oversee our therapeutic approaches</p>
              </div>
            </div>

            {/* International Crisis Resources */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Immediate Crisis Support Worldwide</h3>
                <p className="text-gray-600">If you're experiencing a mental health crisis, help is available immediately in your country:</p>
              </div>

              <InternationalCrisisSupport variant="compact" showCountrySelector={true} />

              <div className="mt-8 text-center">
                <Link
                  href="/crisis-support"
                  className="inline-flex items-center text-therapy-600 hover:text-therapy-700 font-medium"
                >
                  View all crisis resources
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  <strong>Medical Disclaimer:</strong> This app is not a substitute for professional medical advice.
                  Always consult qualified mental health professionals for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Progressive Disclosure */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked
                <span className="block bg-gradient-to-r from-therapy-600 to-blue-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about our free mental health support platform.
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 - Default Expanded */}
              <CollapsibleSection
                id="faq-free"
                title="Is Mental Wellness Apps really free?"
                icon="💰"
                summary="100% free, no subscriptions or credit card required"
                defaultExpanded={true}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Yes. All tools are completely free—no subscriptions or credit card required. We believe mental health support should be accessible to everyone, regardless of financial situation.
                  </p>
                </div>
              </CollapsibleSection>

              {/* FAQ 2 */}
              <CollapsibleSection
                id="faq-evidence"
                title="Are these tools evidence-based?"
                icon="🔬"
                summary="Grounded in CBT and mindfulness research, validated by professionals"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Every exercise is grounded in cognitive-behavioral and mindfulness research validated by professionals. Our therapeutic approaches are overseen by licensed mental health experts.
                  </p>
                </div>
              </CollapsibleSection>

              {/* FAQ 3 */}
              <CollapsibleSection
                id="faq-privacy"
                title="Is my data private?"
                icon="🔒"
                summary="Encrypted, HIPAA-grade storage — never sold or shared"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Absolutely. We use encrypted, HIPAA-grade storage to keep your personal health data secure. Your information is never sold, shared, or used for purposes beyond your care.
                  </p>
                </div>
              </CollapsibleSection>

              {/* FAQ 4 */}
              <CollapsibleSection
                id="faq-worldwide"
                title="Can I access it worldwide?"
                icon="🌍"
                summary="Available in most countries with localized crisis resources"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Yes. Our digital tools and crisis links work in most countries and languages. We're committed to making mental health support accessible globally, with localized crisis resources available.
                  </p>
                </div>
              </CollapsibleSection>

              {/* FAQ 5 */}
              <CollapsibleSection
                id="faq-mental-wellness"
                title="What is mental wellness?"
                icon="🧠"
                summary="A state of well-being with emotional resilience and healthy coping"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Mental wellness is a state of well-being where you realize your abilities, can cope with normal life stresses, work productively, and contribute to your community. It's about having emotional resilience, healthy relationships, and the capacity to adapt to change and thrive.
                  </p>
                </div>
              </CollapsibleSection>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Have more questions? Our comprehensive help center has detailed answers.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center text-therapy-600 hover:text-therapy-700 font-medium transition-colors"
              >
                Visit Mental Health Help Center
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="w-full max-w-[220px]">
                  <BrandLogo variant="onDark" className="w-full h-auto" />
                </div>
                <p className="text-gray-400 text-sm">
                  Intelligence that moves your mental wellness forward.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/free-trial" className="hover:text-white transition-colors">Free Trial</Link></li>
                  <li><Link href="/premium/features" className="hover:text-white transition-colors">Premium</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/crisis-support" className="hover:text-white transition-colors">Crisis Support</Link></li>
                  <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/hipaa-notice" className="hover:text-white transition-colors">HIPAA Notice</Link></li>
                  <li><Link href="/medical-disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 MentalWellnessApps. All rights reserved. Built with 🤍 for mental wellness.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
