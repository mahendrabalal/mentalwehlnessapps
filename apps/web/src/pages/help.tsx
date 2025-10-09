import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'features', name: 'Features & Usage', icon: '⚡' },
    { id: 'account', name: 'Account & Billing', icon: '👤' },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
    { id: 'technical', name: 'Technical Issues', icon: '🛠️' },
    { id: 'crisis', name: 'Crisis Support', icon: '🆘' }
  ]

  const faqs = {
    'getting-started': [
      {
        question: 'How do I create my first safety plan?',
        answer: 'Navigate to the Safety Plan section from your dashboard. Follow the guided prompts to identify warning signs, coping strategies, and emergency contacts. Save your plan and update it regularly as your needs change.'
      },
      {
        question: 'What is the AI therapy companion?',
        answer: 'Our AI companion is a 24/7 support system that uses evidence-based therapeutic techniques to provide personalized guidance. It learns from your interactions to offer increasingly relevant support for your mental wellness journey.'
      },
      {
        question: 'How do I track my mood effectively?',
        answer: 'Use the daily mood tracking feature to log your emotional state, energy levels, and any notes. Consistency is key - try to log your mood at the same time each day for the most accurate insights.'
      }
    ],
    features: [
      {
        question: 'What\'s the difference between free and premium features?',
        answer: 'Free features include basic mood tracking, safety planning, and limited AI interactions. Premium unlocks unlimited AI conversations, advanced analytics, daily briefings, and the complete content library.'
      },
      {
        question: 'How does the smart analytics work?',
        answer: 'Our analytics use machine learning to identify patterns in your mood, activities, and wellness data. It provides insights like mood trends, trigger identification, and personalized recommendations based on your unique patterns.'
      },
      {
        question: 'Can I export my data?',
        answer: 'Yes, premium users can export their complete wellness data including mood history, AI conversation summaries, and progress reports in multiple formats for personal records or sharing with healthcare providers.'
      }
    ],
    account: [
      {
        question: 'How do I cancel my premium subscription?',
        answer: 'Go to Profile Settings > Subscription and click "Cancel Subscription." Your premium features will remain active until the end of your current billing period, then you\'ll automatically switch to the free plan.'
      },
      {
        question: 'Can I change my subscription plan?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time from your profile settings. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.'
      },
      {
        question: 'How do I update my payment information?',
        answer: 'Navigate to Profile Settings > Billing Information to update your payment method, billing address, or download invoices. All payment data is securely processed and encrypted.'
      }
    ],
    privacy: [
      {
        question: 'How is my data protected?',
        answer: 'We use enterprise-grade encryption, are HIPAA compliant, and follow strict privacy protocols. Your data is never shared with third parties, and you maintain full control over your information.'
      },
      {
        question: 'Who can see my AI conversations?',
        answer: 'Your AI conversations are completely private and encrypted. Only you can access them. Our staff cannot read your conversations, and they are never used for training or shared purposes.'
      },
      {
        question: 'Can I delete my account and data?',
        answer: 'Yes, you can permanently delete your account and all associated data at any time from your profile settings. This action is irreversible and will remove all your information from our systems.'
      }
    ],
    technical: [
      {
        question: 'The app is running slowly, what can I do?',
        answer: 'Try clearing your browser cache, ensuring you have a stable internet connection, and closing other browser tabs. If issues persist, try accessing the app from an incognito/private browsing window.'
      },
      {
        question: 'I\'m not receiving notifications, how do I fix this?',
        answer: 'Check your notification settings in your profile, ensure notifications are enabled in your browser settings, and verify that our domain isn\'t blocked by your browser or security software.'
      },
      {
        question: 'My AI companion isn\'t responding properly',
        answer: 'Refresh the page and try again. If the issue persists, check your internet connection and try rephrasing your message. Contact support if the AI continues to be unresponsive.'
      }
    ],
    crisis: [
      {
        question: 'What should I do in a mental health emergency?',
        answer: 'If you\'re in immediate danger, call 911. For mental health crises, contact the 988 Suicide & Crisis Lifeline (call or text 988) for 24/7 support. Our app also has built-in crisis resources accessible from any page.'
      },
      {
        question: 'Does the AI detect crisis situations?',
        answer: 'Yes, our AI is trained to recognize potential crisis indicators and will immediately provide crisis resources and encourage you to seek professional help. However, it should never replace professional emergency services.'
      },
      {
        question: 'How do I access crisis resources quickly?',
        answer: 'Crisis resources are available from every page of the app in the top navigation. You can also type "crisis" or "help" to the AI companion for immediate access to emergency contacts and resources.'
      }
    ]
  }

  const filteredFAQs = faqs[activeCategory as keyof typeof faqs].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const faqList = Object.values(faqs).flat()
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Wellness App Help Center',
      description: 'Find answers to common questions about subscriptions, crisis support, privacy, and technical troubleshooting.',
      slug: '/help',
    }),
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Help Center', url: '/help' },
    ]),
    buildFaqStructuredData(faqList),
  ]

  return (
    <>
      <SEOHead
        title="Help Center - Mental Wellness App"
        description="Browse the Mental Wellness App help center for account, privacy, crisis support, and troubleshooting guidance."
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Search our knowledge base or browse categories to find answers
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-therapy-500 focus:border-therapy-500 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <nav className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeCategory === category.id
                            ? 'bg-therapy-100 text-therapy-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {categories.find(cat => cat.id === activeCategory)?.icon}{' '}
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>

                  {filteredFAQs.length > 0 ? (
                    <div className="space-y-6">
                      {filteredFAQs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No articles found matching your search.</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-therapy-600 hover:text-therapy-700"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need More Help?
              </h2>
              <p className="text-xl text-gray-600">
                We're here to support you every step of the way
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-therapy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-therapy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-gray-600 mb-4">Get personalized help from our support team</p>
                <Link
                  href="/contact"
                  className="text-therapy-600 hover:text-therapy-700 font-medium"
                >
                  Send a Message →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25V6M12 18v3.75M3.75 12H7.5M16.5 12h3.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600 mb-4">Immediate help for mental health emergencies</p>
                <Link
                  href="/crisis-support"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Get Help Now →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4">Detailed guides and technical documentation</p>
                <Link
                  href="/documentation"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse Docs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
