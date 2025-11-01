import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { TherapyCostCalculator } from '@/components/TherapyCostCalculator'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function TherapyCostCalculatorTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Therapy Cost Calculator - Compare Mental Health Costs',
      description: 'Calculate and compare therapy costs across traditional, online, and app-based mental health support. Find affordable options that fit your budget with real 2025 pricing data.',
      slug: '/tools/therapy-cost-calculator',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Free Therapy Cost Calculator - Find Affordable Care"
        description="Compare therapy costs and find affordable mental health support. Calculate costs for traditional therapy, online platforms, and apps. Real 2025 pricing."
        publishedTime={TOOLS_PAGES_DATES['therapy-cost-calculator'].published}
        modifiedTime={TOOLS_PAGES_DATES['therapy-cost-calculator'].modified}
        keywords={["therapy cost calculator", "affordable therapy", "mental health costs", "therapy pricing", "cheap therapy options", "insurance therapy costs", "BetterHelp cost comparison", "affordable mental health care", "therapy budget"]}
        ogImage="/og-therapy-cost-calculator.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Therapy Cost Calculator" />

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
                  <span className="text-gray-500">Therapy Cost Calculator</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Therapy Cost Calculator
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Compare costs across different mental health support options and discover affordable alternatives. Based on real 2025 pricing data from traditional therapy, online platforms, and app-based solutions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Real 2025 pricing
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Insurance estimates
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Compare all options
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Find savings
              </span>
            </div>
          </div>

          {/* Cost Reality Stats */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8 border border-red-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The Cost Reality</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-red-600 mb-1">$174</div>
                <div className="text-gray-700">Average cost per therapy session without insurance (2025)</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-600 mb-1">45%</div>
                <div className="text-gray-700">of Americans cite cost as #1 barrier to mental health care</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600 mb-1">97%</div>
                <div className="text-gray-700">Potential savings with affordable alternatives like apps</div>
              </div>
            </div>
          </div>

          {/* Main Tool Component */}
          <TherapyCostCalculator className="mb-8" />

          {/* Why Cost Matters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Mental Health Affordability Matters</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                Mental health care shouldn't be a luxury. Yet millions of people avoid seeking help because of cost concerns.
                Understanding your options—and their real costs—is the first step toward getting the support you need.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-600">💡</span>
                    Did You Know?
                  </h3>
                  <p className="text-sm">
                    Weekly therapy at $174/session costs <strong>$8,352 per year</strong>. That's more than many people's rent.
                    App-based alternatives at $5.99/month cost just <strong>$71.88/year</strong>—a 99% savings.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Good News
                  </h3>
                  <p className="text-sm">
                    More affordable options exist than ever before: sliding scale therapy, online platforms, community mental health centers,
                    training clinics, and AI-powered apps with clinical-grade tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affordable Mental Health Resources</h2>
            <p className="text-gray-600 mb-4">
              Explore our guides to finding affordable mental health support that fits your budget.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/affordable-mental-health-care"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Therapy Options</h3>
                  <p className="text-sm text-gray-600">Complete guide to low-cost care</p>
                </div>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-3 p-4 bg-therapy-50 rounded-lg hover:bg-therapy-100 transition-colors"
              >
                <span className="text-2xl">💳</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Pricing - $5.99/month</h3>
                  <p className="text-sm text-gray-600">See what's included</p>
                </div>
              </Link>
              <Link
                href="/support/emotional-exhaustion-burnout"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Burnout Recovery Guide</h3>
                  <p className="text-sm text-gray-600">Free evidence-based strategies</p>
                </div>
              </Link>
              <Link
                href="/tools/anxiety-relief"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Anxiety Relief Tools</h3>
                  <p className="text-sm text-gray-600">Immediate techniques</p>
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
                href="/tools/loneliness-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">💙</span>
                <h3 className="font-semibold text-gray-900 mb-1">Loneliness Assessment</h3>
                <p className="text-sm text-gray-600">Measure social connection</p>
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
