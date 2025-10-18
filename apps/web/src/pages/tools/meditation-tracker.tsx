import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { MeditationHabitBuilder } from '@/components/MeditationHabitBuilder'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'

export default function MeditationTrackerTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Meditation Habit Tracker & Consistency Builder',
      description: 'Build a sustainable meditation practice with our evidence-based habit tracker. Get personalized strategies based on your current stage. Research shows consistency matters more than duration.',
      slug: '/tools/meditation-tracker',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Free Meditation Habit Tracker - Build Consistency | Mental Wellness App"
        description="Build a lasting meditation habit with our research-based tracker. Identify your stage (Pre-Intention, Preparation, Action, Maintenance) and get personalized strategies. Based on 2025 habit formation science."
        keywords={["meditation habit tracker", "meditation consistency", "build meditation habit", "meditation streak", "mindfulness practice", "meditation schedule", "habit formation", "meditation app"]}
        ogImage="/og-meditation-tracker.png"
        structuredData={structuredData}
      />

      <Navbar />
      <GuestToolBanner toolName="Meditation Habit Tracker" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard" className="text-gray-600 hover:text-therapy-600 transition-colors">Tools</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Meditation Tracker</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meditation Habit Tracker & Builder
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Build a sustainable meditation practice with personalized strategies based on your current stage. Research shows consistency (4-7 days/week) matters more than duration for mental health benefits.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">✓ Evidence-based</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">✓ Personalized plan</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">✓ 2 minutes</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Consistency Matters Most</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">4-7 days</div>
                <div className="text-gray-700">Weekly practice frequency for best outcomes (2025 research)</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">80%</div>
                <div className="text-gray-700">Quit in the first month due to unrealistic expectations</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">4-6 months</div>
                <div className="text-gray-700">Time to form an automatic meditation habit</div>
              </div>
            </div>
          </div>

          <MeditationHabitBuilder className="mb-8" />

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Meditation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/support/meditation-consistency" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Build Meditation Consistency</h3>
                  <p className="text-sm text-gray-600">Complete habit-building guide</p>
                </div>
              </Link>
              <Link href="/support/mindfulness-for-beginners" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-2xl">🧘</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Mindfulness for Beginners</h3>
                  <p className="text-sm text-gray-600">Start your practice</p>
                </div>
              </Link>
              <Link href="/support/emotional-resistance-meditation" className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Meditation Anxiety</h3>
                  <p className="text-sm text-gray-600">Overcome resistance</p>
                </div>
              </Link>
              <Link href="/tools/mindfulness" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Guided Exercises</h3>
                  <p className="text-sm text-gray-600">Free mindfulness tools</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/tools/anxiety-relief" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate techniques</p>
              </Link>
              <Link href="/tools/burnout-assessment" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your risk</p>
              </Link>
              <Link href="/tools/emotional-regulation" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">🎯</span>
                <h3 className="font-semibold text-gray-900 mb-1">Emotional Regulation</h3>
                <p className="text-sm text-gray-600">Master your emotions</p>
              </Link>
            </div>
          </div>
        </div>
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}
