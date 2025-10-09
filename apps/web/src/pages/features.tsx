import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead, SEO_CONFIG } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData } from '@/lib/seo'

export default function FeaturesPage() {
  const features = [
    {
      icon: '🤖',
      title: '24/7 AI Therapy Companion',
      description: 'Your personal wellness companion available anytime with intelligent, empathetic conversations.',
      benefits: [
        'Unlimited AI conversations',
        'Crisis detection and intervention',
        'Personalized therapeutic techniques',
        'Evidence-based responses'
      ],
      isPremium: true
    },
    {
      icon: '📊',
      title: 'Smart Analytics & Insights',
      description: 'Advanced pattern recognition and predictive analytics for your mental wellness journey.',
      benefits: [
        'Mood trend analysis',
        'Predictive wellness forecasting',
        'Correlation insights',
        'Progress tracking'
      ],
      isPremium: true
    },
    {
      icon: '🌅',
      title: 'Daily Wellness Briefings',
      description: 'Personalized morning insights based on your data and wellness patterns.',
      benefits: [
        'Personalized daily guidance',
        'Context-aware recommendations',
        'Wellness focus areas',
        'Actionable insights'
      ],
      isPremium: true
    },
    {
      icon: '📱',
      title: 'Mood Tracking',
      description: 'Simple, effective mood tracking with visual insights and trends.',
      benefits: [
        'Quick daily check-ins',
        'Visual mood charts',
        'Historical tracking',
        'Export capabilities'
      ],
      isPremium: false
    },
    {
      icon: '🛡️',
      title: 'Crisis Safety Plan',
      description: 'Comprehensive safety planning tools with emergency resources and contacts.',
      benefits: [
        'Personalized safety plans',
        'Emergency contact management',
        'Crisis resource library',
        '24/7 crisis support links'
      ],
      isPremium: false
    },
    {
      icon: '📚',
      title: 'Content Library',
      description: 'Evidence-based mental wellness content, exercises, and educational materials.',
      benefits: [
        'Guided meditation sessions',
        'Breathing exercises',
        'Educational articles',
        'Self-help resources'
      ],
      isPremium: false
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Wellness App Features',
      description: SEO_CONFIG.features.description,
      slug: '/features',
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: features.map((feature, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: feature.title,
        description: feature.description,
      })),
    },
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Features', url: '/features' },
    ]),
  ]

  return (
    <>
      <SEOHead
        title={SEO_CONFIG.features.title}
        description={SEO_CONFIG.features.description}
        keywords={SEO_CONFIG.features.keywords}
        ogImage="/og-default.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-therapy-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Features That Move Your
                <span className="block text-therapy-200">Mental Wellness Forward</span>
              </h1>
              <p className="text-xl lg:text-2xl text-therapy-100 max-w-3xl mx-auto mb-8">
                Discover how our AI-powered platform provides comprehensive support for your mental health journey
              </p>
              <Link
                href="/auth/signup"
                className="bg-white text-therapy-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete Mental Wellness Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From basic tracking to advanced AI insights, our platform grows with your wellness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                    feature.isPremium ? 'border-2 border-therapy-200' : ''
                  }`}
                >
                  {feature.isPremium && (
                    <div className="bg-gradient-to-r from-therapy-500 to-therapy-600 text-white text-center py-2">
                      <span className="text-sm font-medium">Premium Feature</span>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>

                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-therapy-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Mental Wellness?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start with our free features and upgrade to premium for the full AI-powered experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="border border-therapy-600 text-therapy-600 hover:bg-therapy-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
