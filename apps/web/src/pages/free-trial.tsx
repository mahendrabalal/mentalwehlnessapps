import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { PremiumUpgradeFlow } from '@/components/PremiumUpgradeFlow'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData } from '@/lib/seo'

export default function FreeTrialPage() {
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false)

  const trialFeatures = [
    {
      icon: '🤖',
      title: 'Unlimited AI Companion',
      description: 'Full access to our 24/7 AI therapy companion with unlimited conversations'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Advanced mood tracking, pattern recognition, and predictive insights'
    },
    {
      icon: '🌅',
      title: 'Daily Briefings',
      description: 'Personalized morning wellness briefings based on your data'
    },
    {
      icon: '📚',
      title: 'Premium Content',
      description: 'Access to our complete library of guided meditations and exercises'
    },
    {
      icon: '🛡️',
      title: 'Crisis Prevention',
      description: 'Advanced crisis detection and prevention system'
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: 'Detailed wellness progress reports and goal tracking'
    }
  ]

  const steps = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your free account in under 2 minutes'
    },
    {
      step: '2',
      title: 'Complete Profile',
      description: 'Add basic information to personalize your experience'
    },
    {
      step: '3',
      title: 'Start Trial',
      description: 'Immediately access all premium features for 7 days'
    },
    {
      step: '4',
      title: 'Decide',
      description: 'Continue with premium or downgrade to free - your choice'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Wellness App Free Trial',
      description: 'Start a free 7-day trial of the Mental Wellness App to access premium AI therapy, analytics, and crisis prevention features.',
      slug: '/free-trial',
    }),
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Free Trial', url: '/free-trial' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Premium Trial Features',
      itemListElement: trialFeatures.map((feature, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: feature.title,
        description: feature.description,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Start your Mental Wellness App free trial',
      step: steps.map((step) => ({
        '@type': 'HowToStep',
        position: Number(step.step),
        name: step.title,
        text: step.description,
      })),
    },
  ]

  return (
    <>
      <SEOHead
        title="7-Day Free Trial - Mental Wellness App"
        description="Experience the full power of Mental Wellness App with a 7-day premium trial—AI therapy, analytics, crisis prevention, and more with no credit card required."
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-therapy-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-therapy-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
                <span className="text-therapy-100 text-sm font-medium">✨ No Credit Card Required</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Try Premium Features
                <span className="block text-therapy-200">Completely Free</span>
              </h1>

              <p className="text-xl lg:text-2xl text-therapy-100 max-w-3xl mx-auto mb-8">
                Experience the full power of AI-driven mental wellness support with our 7-day free trial
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => setShowUpgradeFlow(true)}
                  className="bg-white text-therapy-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Your Free Trial
                </button>
                <Link
                  href="/features"
                  className="border border-therapy-200 text-therapy-100 hover:bg-therapy-500 hover:bg-opacity-20 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  See All Features
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-therapy-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>7 days completely free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Features */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What You'll Get During Your Trial
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Full access to all premium features for 7 days - no limitations, no restrictions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trialFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How Your Free Trial Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started in minutes and experience premium features immediately
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((stepItem, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-therapy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {stepItem.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stepItem.title}</h3>
                  <p className="text-gray-600">{stepItem.description}</p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <svg className="w-6 h-6 text-therapy-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trial Terms */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Free Trial Terms
              </h2>
              <p className="text-xl text-gray-600">
                Complete transparency about your trial experience
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ What's Included</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 7 days of full premium access</li>
                    <li>• All AI features unlocked</li>
                    <li>• Complete analytics dashboard</li>
                    <li>• Premium content library</li>
                    <li>• Priority customer support</li>
                    <li>• Export your data anytime</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Important Details</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• No credit card required to start</li>
                    <li>• Cancel anytime during trial period</li>
                    <li>• Auto-converts to premium at $5.99/month</li>
                    <li>• Downgrade to free plan anytime</li>
                    <li>• Your data is always secure</li>
                    <li>• HIPAA compliant and private</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-therapy-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> If you choose not to continue with premium after your trial,
                  you'll automatically be moved to our free plan with continued access to basic features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Mental Wellness?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands who have discovered the power of AI-driven mental wellness support
            </p>

            <button
              onClick={() => setShowUpgradeFlow(true)}
              className="bg-therapy-600 hover:bg-therapy-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors"
            >
              Start Your Free Trial Today
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Questions? <Link href="/contact" className="text-therapy-600 hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Premium Upgrade Flow Modal */}
      <PremiumUpgradeFlow
        isOpen={showUpgradeFlow}
        onClose={() => setShowUpgradeFlow(false)}
        defaultPlan="monthly"
      />
    </>
  )
}
