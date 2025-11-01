import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { SocialConnectionAssessment } from '@/components/SocialConnectionAssessment'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function LonelinessAssessmentTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Loneliness Assessment - UCLA Loneliness Scale',
      description: 'Take our free, clinically-validated loneliness assessment using the UCLA Loneliness Scale (ULS-3). Get personalized strategies to combat isolation and build meaningful connections.',
      slug: '/tools/loneliness-assessment',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Free Loneliness Test - UCLA Scale Assessment"
        description="Take our free loneliness test using the UCLA Loneliness Scale. Get instant results and personalized strategies to combat isolation and build connections."
        publishedTime={TOOLS_PAGES_DATES['loneliness-assessment'].published}
        modifiedTime={TOOLS_PAGES_DATES['loneliness-assessment'].modified}
        keywords={[
          "free loneliness test",
          "loneliness assessment online",
          "UCLA loneliness scale free",
          "social isolation support",
          "loneliness quiz free",
          "combat loneliness online",
          "social connection assessment",
          "isolation screening tool",
          "loneliness help free",
          "relationship building support"
        ]}
        ogImage="/og-loneliness-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner - Shows only for unauthenticated users */}
      <GuestToolBanner toolName="Loneliness Assessment" />

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
                  <span className="text-gray-500">Loneliness Assessment</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Loneliness Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Measure your level of social connection using the UCLA Loneliness Scale (ULS-3), a clinically validated assessment used by researchers worldwide. Get personalized strategies to combat isolation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Clinically validated
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ 3 questions, 2 minutes
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Instant results
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Actionable strategies
              </span>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Social Connection Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-lg">❤️</span>
                <div>
                  <strong className="text-gray-900">Health Impact:</strong>
                  <p className="text-gray-700">Chronic loneliness has health risks similar to smoking 15 cigarettes/day</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">🧠</span>
                <div>
                  <strong className="text-gray-900">Mental Health:</strong>
                  <p className="text-gray-700">Strong predictor of depression, anxiety, and cognitive decline</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">📊</span>
                <div>
                  <strong className="text-gray-900">Common Issue:</strong>
                  <p className="text-gray-700">46% of adults experience loneliness regularly</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 text-lg">💪</span>
                <div>
                  <strong className="text-gray-900">Treatable:</strong>
                  <p className="text-gray-700">Evidence-based interventions can significantly reduce loneliness</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Component */}
          <SocialConnectionAssessment className="mb-8" />

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Connection</h2>
            <p className="text-gray-600 mb-4">
              Explore our evidence-based resources for building meaningful relationships and combating social isolation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/combat-loneliness-isolation"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">💙</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Combat Loneliness Guide</h3>
                  <p className="text-sm text-gray-600">Complete strategies for connection</p>
                </div>
              </Link>
              <Link
                href="/support/emotional-regulation-skills"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Regulation Skills</h3>
                  <p className="text-sm text-gray-600">Manage loneliness emotions</p>
                </div>
              </Link>
              <Link
                href="/support/affordable-mental-health-care"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Therapy Options</h3>
                  <p className="text-sm text-gray-600">Get professional support</p>
                </div>
              </Link>
              <Link
                href="/tools/anxiety-relief"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Anxiety Relief Techniques</h3>
                  <p className="text-sm text-gray-600">Manage social anxiety</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <Link
                href="/tools/emotional-regulation"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🎯</span>
                <h3 className="font-semibold text-gray-900 mb-1">Emotional Regulation</h3>
                <p className="text-sm text-gray-600">Master your emotions</p>
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
