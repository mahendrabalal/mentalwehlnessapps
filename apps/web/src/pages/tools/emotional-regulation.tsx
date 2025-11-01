import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { EmotionalRegulationToolkit } from '@/components/EmotionalRegulationToolkit'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function EmotionalRegulationTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Emotional Regulation Tools - Master Your Emotions',
      description: 'Learn evidence-based emotional regulation skills with our free interactive toolkit. Master DBT techniques and build emotional resilience.',
      slug: '/tools/emotional-regulation',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Free Emotional Regulation Tools - Master Your Emotions"
        description="Master your emotions with free emotional regulation tools. Learn DBT skills, manage intense emotions, and build resilience. No signup required."
        publishedTime={TOOLS_PAGES_DATES['emotional-regulation'].published}
        modifiedTime={TOOLS_PAGES_DATES['emotional-regulation'].modified}
        keywords={["emotional regulation", "DBT skills", "emotion management", "emotional control", "free DBT", "emotional resilience", "manage emotions"]}
        ogImage="/og-emotional-regulation-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Emotional Regulation Tools" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Emotional Regulation</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Emotional Regulation Tools
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Master your emotions with evidence-based DBT (Dialectical Behavior Therapy) techniques. Learn to identify, understand, and regulate intense emotions effectively.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ DBT-based techniques
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-based
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Build resilience
              </span>
            </div>
          </div>

          {/* Main Tool Component */}
          <EmotionalRegulationToolkit className="mb-8" />

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Emotional Regulation</h2>
            <p className="text-gray-600 mb-4">
              Deepen your understanding of emotional regulation with our comprehensive guides and evidence-based strategies.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/emotional-regulation-skills"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Regulation Skills</h3>
                  <p className="text-sm text-gray-600">Complete DBT guide</p>
                </div>
              </Link>
              <Link
                href="/support/managing-anxiety-naturally"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Managing Anxiety Naturally</h3>
                  <p className="text-sm text-gray-600">Regulate anxious emotions</p>
                </div>
              </Link>
              <Link
                href="/support/emotional-exhaustion-burnout"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Burnout Recovery</h3>
                  <p className="text-sm text-gray-600">Prevent emotional exhaustion</p>
                </div>
              </Link>
              <Link
                href="/support/realistic-mental-health-expectations"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Realistic Recovery Expectations</h3>
                  <p className="text-sm text-gray-600">Set achievable goals</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Instant anxiety techniques</p>
              </Link>
              <Link
                href="/tools/burnout-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your burnout risk level</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900 mb-1">Mindfulness Exercises</h3>
                <p className="text-sm text-gray-600">Start your meditation practice</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}
