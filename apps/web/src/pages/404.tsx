import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { analytics } from '@/lib/analytics'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    // Track 404 errors for analytics and debugging
    if (typeof window !== 'undefined') {
      analytics.trackError(
        '404 Not Found',
        `Page not found: ${window.location.pathname}`,
        window.location.pathname
      )
    }
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  const handleSearch = () => {
    // Track search intent from 404 page
    analytics.trackSearch('404_help', 'navigation', 0)
    router.push('/tools/free-mental-health-tools')
  }

  const handleCrisisSupport = () => {
    // Track crisis resource access from 404
    analytics.trackCrisisResourceClick('hotline', '404_page')
    router.push('/crisis-support')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-600 opacity-20">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            We couldn't find the page you're looking for.
          </p>
          <p className="text-gray-500">
            But we're here to help you find the mental health support you need.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-8">
          {/* Crisis Support - High Priority */}
          <button
            onClick={handleCrisisSupport}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Crisis Support (24/7)
          </button>

          {/* Browse Tools */}
          <button
            onClick={handleSearch}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Browse Mental Health Tools
          </button>

          {/* Go Back */}
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Popular Tools */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Mental Health Tools:
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tools/anxiety-relief"
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm font-medium text-gray-800 hover:text-purple-600"
            >
              Anxiety Relief
            </Link>
            <Link
              href="/tools/burnout-assessment"
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm font-medium text-gray-800 hover:text-purple-600"
            >
              Burnout Test
            </Link>
            <Link
              href="/tools/mindfulness"
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm font-medium text-gray-800 hover:text-purple-600"
            >
              Mindfulness
            </Link>
            <Link
              href="/tools/loneliness-assessment"
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm font-medium text-gray-800 hover:text-purple-600"
            >
              Loneliness Test
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            Need Help Finding Something?
          </h3>
          <p className="text-purple-700 text-sm mb-3">
            If you can't find what you're looking for, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/help"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-sm"
            >
              Visit Help Center
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-50 text-purple-600 font-medium py-2 px-4 rounded border border-purple-300 transition-colors duration-200 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Looking for free mental health support? We offer evidence-based tools for anxiety,
            burnout, depression, and more. All our resources are 100% free and HIPAA-compliant.
          </p>
        </div>
      </div>
    </div>
  )
}