import React from 'react'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { SEOHead } from '@/components/SEOHead'

interface ErrorProps {
  statusCode: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <>
      <SEOHead
        title={`${statusCode || 'Error'} - Mental Wellness App`}
        description="An error occurred. We're here to help you find the mental health support you need."
        noindex
        nofollow
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {/* Error Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-purple-600 opacity-20">
              {statusCode || '?'}
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {statusCode === 404
                ? 'Page Not Found'
                : statusCode === 500
                ? 'Server Error'
                : 'Something Went Wrong'}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              {statusCode === 404
                ? "We couldn't find the page you're looking for."
                : 'An unexpected error occurred. We apologize for the inconvenience.'}
            </p>
            <p className="text-gray-500">
              But we're here to help you find the mental health support you need.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 mb-8">
            {/* Crisis Support - High Priority */}
            <Link
              href="/crisis-support"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              🆘 Need Immediate Help? Crisis Support
            </Link>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/"
                className="bg-white hover:bg-purple-50 text-purple-600 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md border border-purple-200"
              >
                ← Go Home
              </Link>
              <Link
                href="/tools/free-mental-health-tools"
                className="bg-white hover:bg-purple-50 text-purple-600 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md border border-purple-200"
              >
                Find Tools
              </Link>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">You might also find these helpful:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/features" className="hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="/blog" className="hover:text-purple-600 transition-colors">
                Blog
              </Link>
              <Link href="/help" className="hover:text-purple-600 transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="hover:text-purple-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage




