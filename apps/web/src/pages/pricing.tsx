import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { PremiumUpgradeFlow } from '@/components/PremiumUpgradeFlow'

export default function PricingPage() {
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false)

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with mental wellness tracking',
      features: [
        'Basic mood tracking',
        'Safety plan creation',
        '3 AI chat messages per day',
        'Crisis resources access',
        'Basic content library',
        'Community support'
      ],
      cta: 'Get Started Free',
      ctaLink: '/auth/signup',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      description: 'Advanced AI-powered wellness intelligence and unlimited support',
      features: [
        'Everything in Free, plus:',
        'Unlimited AI therapy companion',
        'Smart analytics & predictions',
        'Daily wellness briefings',
        'Premium content library',
        'Crisis prevention system',
        'Personalized recommendations',
        'Advanced mood insights',
        'Priority support',
        'Data export capabilities'
      ],
      cta: 'Start 7-Day Free Trial',
      ctaAction: () => setShowUpgradeFlow(true),
      popular: true,
      color: 'therapy'
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, absolutely. You can cancel your premium subscription at any time from your profile settings. Your premium features will remain active until the end of your current billing period.'
    },
    {
      question: 'What happens after my 7-day free trial?',
      answer: 'After your 7-day free trial, you\'ll be automatically enrolled in the premium plan unless you cancel. You can cancel anytime during the trial period without being charged.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take your privacy seriously. We are HIPAA compliant and use enterprise-grade security to protect your data. Your personal information is never shared with third parties.'
    },
    {
      question: 'How does the AI therapy companion work?',
      answer: 'Our AI companion uses advanced natural language processing and evidence-based therapeutic techniques to provide personalized support. It learns from your interactions to offer increasingly relevant guidance.'
    },
    {
      question: 'Can I use this as a replacement for therapy?',
      answer: 'No, our app is designed to supplement, not replace, professional mental health care. For serious mental health concerns, please consult with a licensed mental health professional.'
    }
  ]

  return (
    <>
      <Head>
        <title>Pricing - MentalWellnessApps</title>
        <meta name="description" content="Simple, transparent pricing for your mental wellness journey. Start free or unlock premium AI features." />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Simple, Transparent
                <span className="block bg-gradient-to-r from-therapy-600 to-blue-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                Start free and upgrade to premium when you're ready for advanced AI-powered insights
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                    plan.popular ? 'border-2 border-therapy-500 lg:scale-105' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-therapy-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {plan.price}
                        <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>

                      {plan.name === 'Premium' && (
                        <div className="mt-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            7-day free trial
                          </span>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <svg
                            className={`w-5 h-5 mt-0.5 ${
                              plan.color === 'therapy' ? 'text-therapy-600' : 'text-green-500'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className={`${feature.startsWith('Everything in') ? 'font-semibold' : ''} text-gray-700`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.ctaAction ? (
                      <button
                        onClick={plan.ctaAction}
                        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                          plan.popular
                            ? 'bg-therapy-600 hover:bg-therapy-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        {plan.cta}
                      </button>
                    ) : (
                      <Link
                        href={plan.ctaLink!}
                        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                          plan.popular
                            ? 'bg-therapy-600 hover:bg-therapy-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    )}

                    {plan.name === 'Premium' && (
                      <p className="text-xs text-gray-500 text-center mt-3">
                        No credit card required • Cancel anytime
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing and features
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-600">
                Join the community advancing their mental wellness with our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-therapy-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-therapy-600 mb-2">500,000+</div>
                <div className="text-gray-600">AI Conversations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-therapy-600 mb-2">95%</div>
                <div className="text-gray-600">User Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-therapy-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
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