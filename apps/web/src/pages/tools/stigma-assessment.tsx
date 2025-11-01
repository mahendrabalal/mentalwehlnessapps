import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { StigmaAssessmentTool } from '@/components/StigmaAssessmentTool'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function StigmaAssessmentPage() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Mental Health Stigma Self-Assessment',
      description: 'Take our private, confidential self-stigma assessment based on the SSMIS-SF scale. Identify internalized stigma and get personalized strategies to rebuild self-worth.',
      slug: '/tools/stigma-assessment',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Free Mental Health Stigma Assessment - SSMIS-SF Test"
        description="Measure internalized mental health stigma with our private assessment. Based on SSMIS-SF research. Get stigma-reduction strategies. Confidential, no signup."
        publishedTime={TOOLS_PAGES_DATES['stigma-assessment'].published}
        modifiedTime={TOOLS_PAGES_DATES['stigma-assessment'].modified}
        keywords={["mental health stigma assessment", "self-stigma test", "internalized stigma", "mental health shame", "stigma screening", "overcome mental health stigma", "self-stigma scale", "mental illness stigma"]}
        ogImage="/og-stigma-assessment.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Stigma Assessment" />

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
                  <span className="text-gray-500">Stigma Assessment</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mental Health Stigma Self-Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Identify internalized mental health stigma with our private, confidential assessment based on the Self-Stigma of Mental Illness Scale (SSMIS-SF). Get personalized strategies to overcome shame and rebuild your self-worth.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Completely private
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Clinically validated
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ 10 questions, 5 minutes
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Actionable strategies
              </span>
            </div>
          </div>

          {/* Why Stigma Matters */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Addressing Stigma Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-lg">🚫</span>
                <div>
                  <strong className="text-gray-900">Prevents Help-Seeking:</strong>
                  <p className="text-gray-700">60% of people with mental health conditions don't seek treatment due to stigma</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">💔</span>
                <div>
                  <strong className="text-gray-900">Damages Self-Esteem:</strong>
                  <p className="text-gray-700">Internalized stigma linked to lower self-worth and increased hopelessness</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 text-lg">😔</span>
                <div>
                  <strong className="text-gray-900">Worsens Symptoms:</strong>
                  <p className="text-gray-700">Self-stigma predicts worse outcomes and delayed recovery</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✅</span>
                <div>
                  <strong className="text-gray-900">Reversible:</strong>
                  <p className="text-gray-700">Stigma reduction interventions significantly improve self-esteem and treatment engagement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Component */}
          <StigmaAssessmentTool className="mb-8" />

          {/* What is Internalized Stigma */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Internalized Stigma</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                <strong>Internalized stigma</strong> (also called self-stigma) occurs when you internalize negative societal beliefs about mental health and apply them to yourself. It's a three-step process:
              </p>

              <div className="space-y-4 my-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. Stereotype Awareness</h3>
                  <p className="text-sm">You become aware of negative stereotypes (e.g., "people with mental health conditions are weak")</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. Self-Application</h3>
                  <p className="text-sm">You apply these stereotypes to yourself (e.g., "I have depression, so I must be weak")</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. Harm to Self</h3>
                  <p className="text-sm">This damages your self-esteem, prevents help-seeking, and increases shame and isolation</p>
                </div>
              </div>

              <p className="mb-4">
                <strong>The good news:</strong> Internalized stigma is learned—which means it can be unlearned. With awareness, self-compassion,  education, and support, you can challenge these beliefs and rebuild your sense of worth.
              </p>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources for Overcoming Stigma</h2>
            <p className="text-gray-600 mb-4">
              Explore our evidence-based resources for challenging stigma and building self-compassion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/overcome-mental-health-stigma"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Overcome Mental Health Stigma</h3>
                  <p className="text-sm text-gray-600">Complete evidence-based guide</p>
                </div>
              </Link>
              <Link
                href="/support/emotional-regulation-skills"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Regulation Skills</h3>
                  <p className="text-sm text-gray-600">Manage shame and self-criticism</p>
                </div>
              </Link>
              <Link
                href="/support/affordable-mental-health-care"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Therapy Options</h3>
                  <p className="text-sm text-gray-600">Find stigma-focused therapy</p>
                </div>
              </Link>
              <Link
                href="/support/realistic-mental-health-expectations"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Realistic Recovery Expectations</h3>
                  <p className="text-sm text-gray-600">Normalize the healing process</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/loneliness-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">💙</span>
                <h3 className="font-semibold text-gray-900 mb-1">Loneliness Assessment</h3>
                <p className="text-sm text-gray-600">Measure social connection</p>
              </Link>
              <Link
                href="/tools/burnout-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your burnout risk</p>
              </Link>
              <Link
                href="/tools/anxiety-relief"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate relief techniques</p>
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
