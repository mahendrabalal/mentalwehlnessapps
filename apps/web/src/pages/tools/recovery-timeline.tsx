import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'

export default function RecoveryTimelineTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Health Recovery Timeline - Realistic Expectations',
      description: 'Understand realistic timelines for mental health recovery. Evidence-based expectations for therapy, medication, and lifestyle changes to stay motivated on your healing journey.',
      slug: '/tools/recovery-timeline',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Mental Health Recovery Timeline Tool - Realistic Expectations | Mental Wellness App"
        description="Set realistic recovery expectations with our evidence-based timeline tool. Learn what to expect from therapy, medication, and lifestyle changes at each stage of your mental health journey."
        keywords={["recovery timeline", "mental health recovery", "therapy timeline", "how long therapy takes", "recovery expectations", "mental health healing", "realistic expectations"]}
        ogImage="/og-recovery-timeline.png"
        structuredData={structuredData}
      />

      <Navbar />
      <GuestToolBanner toolName="Recovery Timeline" />

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
                  <span className="text-gray-500">Recovery Timeline</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mental Health Recovery Timeline
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Understand realistic timelines for mental health recovery. Evidence-based expectations to help you stay motivated and measure progress accurately on your healing journey.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">✓ Evidence-based</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">✓ Realistic timelines</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">✓ Condition-specific</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">General Recovery Timeline</h2>

            <div className="space-y-6">
              {[
                {
                  period: 'Weeks 1-2',
                  icon: '🌱',
                  color: 'blue',
                  title: 'Initial Changes',
                  description: 'Early adjustments and awareness building',
                  expectations: [
                    'Starting to notice patterns in mood and behavior',
                    'Learning new coping skills (if in therapy)',
                    'Possible medication side effects (if applicable)',
                    'Building awareness of triggers',
                    'May feel overwhelming - this is normal'
                  ]
                },
                {
                  period: 'Weeks 4-8',
                  icon: '🌿',
                  color: 'green',
                  title: 'Early Improvements',
                  description: 'Small but meaningful progress',
                  expectations: [
                    'Therapy: Beginning to see benefit from new skills',
                    'Medication: Starting to feel effects (typically 4-6 weeks)',
                    'Lifestyle changes: Sleep/exercise starting to help',
                    'Some good days mixed with difficult days',
                    'Progress is not linear - expect setbacks'
                  ]
                },
                {
                  period: 'Months 3-6',
                  icon: '🌳',
                  color: 'purple',
                  title: 'Significant Progress',
                  description: 'Noticeable improvements and skills application',
                  expectations: [
                    'Applying coping skills more naturally',
                    'Medication at full effectiveness',
                    'More good days than bad days',
                    'Better at recognizing and managing symptoms',
                    'Building confidence in recovery journey'
                  ]
                },
                {
                  period: 'Months 6-12',
                  icon: '⭐',
                  color: 'orange',
                  title: 'Sustainable Change',
                  description: 'Long-term improvements and maintenance',
                  expectations: [
                    'Skills becoming automatic',
                    'Sustaining improvements with less effort',
                    'Better prepared for life stressors',
                    'May start reducing therapy frequency',
                    'Focus shifts to relapse prevention'
                  ]
                }
              ].map((stage, index) => (
                <div key={index} className={`bg-${stage.color}-50 border-2 border-${stage.color}-200 rounded-xl p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{stage.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{stage.period}: {stage.title}</div>
                      <div className="text-sm text-gray-600">{stage.description}</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 ml-11">
                    {stage.expectations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">⚠️ Important Reminders</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span><strong>Recovery is not linear:</strong> Setbacks don't erase progress. The overall trend over months matters most.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span><strong>Individual variation:</strong> Your timeline may be faster or slower based on many factors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span><strong>"Cured" isn't always the goal:</strong> Focus on management, reduced symptoms, and improved coping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span><strong>Combination is best:</strong> Therapy + medication + lifestyle changes = fastest recovery.</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/support/realistic-mental-health-expectations" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Realistic Recovery Expectations</h3>
                  <p className="text-sm text-gray-600">Complete evidence-based guide</p>
                </div>
              </Link>
              <Link href="/support/emotional-exhaustion-burnout" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Burnout Recovery Timeline</h3>
                  <p className="text-sm text-gray-600">Specific to burnout</p>
                </div>
              </Link>
              <Link href="/support/managing-anxiety-naturally" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Anxiety Recovery Guide</h3>
                  <p className="text-sm text-gray-600">Anxiety-specific timeline</p>
                </div>
              </Link>
              <Link href="/support/affordable-mental-health-care" className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Find Affordable Care</h3>
                  <p className="text-sm text-gray-600">Start your journey</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/tools/burnout-assessment" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your risk level</p>
              </Link>
              <Link href="/tools/anxiety-relief" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate techniques</p>
              </Link>
              <Link href="/tools/meditation-tracker" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900 mb-1">Meditation Tracker</h3>
                <p className="text-sm text-gray-600">Build consistency</p>
              </Link>
            </div>
          </div>
        </div>
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}
