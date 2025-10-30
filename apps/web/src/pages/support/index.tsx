import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, howToStructuredData, faqStructuredData } from '@/lib/seo'

export default function SupportResourcesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('emotional-health')

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Health Support Resources - Expert Guides & Free Tools',
      description: 'Access comprehensive mental health support resources covering burnout, anxiety, loneliness, mindfulness, and more. Evidence-based guides and free tools.',
      slug: '/support',
    }),
    howToStructuredData({
      name: 'How to Use Mental Health Support Resources',
      description: 'Step-by-step guide to finding the right mental health support for your needs',
      steps: [
        {
          name: 'Identify Your Need',
          text: 'Browse categories to find resources matching your current challenges'
        },
        {
          name: 'Read Expert Guides',
          text: 'Access evidence-based articles with practical strategies and techniques'
        },
        {
          name: 'Try Free Tools',
          text: 'Use interactive assessments and exercises for immediate support'
        },
        {
          name: 'Take Action',
          text: 'Implement coping strategies and track your progress over time'
        }
      ]
    }),
    faqStructuredData([
      {
        question: 'Are these mental health support resources evidence-based?',
        answer: 'Yes, all our support resources are based on evidence-based practices from clinical psychology, including CBT, mindfulness-based interventions, and validated assessment frameworks.'
      },
      {
        question: 'Do I need to pay to access support resources?',
        answer: 'No, all support resources and tools are completely free with no hidden costs or subscriptions required.'
      },
      {
        question: 'Can these resources replace therapy?',
        answer: 'No, these resources are educational and supportive tools. They are not substitutes for professional mental health care. If you\'re experiencing severe symptoms, please consult a licensed mental health professional.'
      },
      {
        question: 'How do I know which resource to start with?',
        answer: 'Start with the category that matches your current primary concern. Each resource includes a clear description to help you decide if it\'s right for you.'
      }
    ])
  ]

  const categories = [
    {
      id: 'emotional-health',
      title: 'Emotional Health & Burnout',
      emoji: '🔥',
      description: 'Resources for managing emotional exhaustion, workplace burnout, and emotional regulation',
      color: 'orange',
      resources: [
        {
          href: '/support/emotional-exhaustion-burnout',
          title: 'Emotional Exhaustion & Burnout Recovery',
          description: 'Recognize early signs of burnout, understand causes, and learn natural recovery strategies.',
          time: '8 min read',
          relatedTool: { href: '/tools/burnout-assessment', name: 'Burnout Assessment' }
        },
        {
          href: '/support/emotional-regulation-skills',
          title: 'Emotional Regulation Skills',
          description: 'Master techniques to manage difficult emotions, reduce reactivity, and increase emotional awareness.',
          time: '7 min read',
          relatedTool: { href: '/tools/emotional-regulation', name: 'Emotional Regulation Tool' }
        },
        {
          href: '/support/emotional-resistance-meditation',
          title: 'Overcome Emotional Resistance in Meditation',
          description: 'Work through discomfort, emotional blocks, and resistance when starting meditation practice.',
          time: '6 min read',
          relatedTool: { href: '/tools/mindfulness', name: 'Mindfulness Exercises' }
        }
      ]
    },
    {
      id: 'anxiety-stress',
      title: 'Anxiety & Stress Management',
      emoji: '😌',
      description: 'Quick relief techniques and long-term strategies for managing anxiety naturally',
      color: 'blue',
      resources: [
        {
          href: '/support/managing-anxiety-naturally',
          title: 'Managing Anxiety Naturally',
          description: 'Evidence-based mindfulness techniques for quick anxiety relief, panic attacks, and GAD.',
          time: '9 min read',
          relatedTool: { href: '/tools/anxiety-relief', name: 'Anxiety Relief Tool' }
        }
      ]
    },
    {
      id: 'social-connection',
      title: 'Social Connection & Relationships',
      emoji: '💙',
      description: 'Combat loneliness, reduce isolation, and build meaningful relationships',
      color: 'purple',
      resources: [
        {
          href: '/support/combat-loneliness-isolation',
          title: 'Combat Loneliness & Social Isolation',
          description: 'Understand types of loneliness, build social connections, and find supportive communities.',
          time: '10 min read',
          relatedTool: { href: '/tools/loneliness-assessment', name: 'Loneliness Assessment' }
        },
        {
          href: '/support/relationships-mental-health',
          title: 'Relationships & Mental Health',
          description: 'Navigate relationships while managing mental health, set boundaries, and communicate needs.',
          time: '8 min read',
          relatedTool: null
        }
      ]
    },
    {
      id: 'mindfulness-practices',
      title: 'Mindfulness & Meditation',
      emoji: '🧘',
      description: 'Beginner-friendly guides and techniques for building a sustainable practice',
      color: 'green',
      resources: [
        {
          href: '/support/mindfulness-for-beginners',
          title: 'Mindfulness for Beginners',
          description: 'Start your mindfulness journey with simple, practical exercises you can do anywhere.',
          time: '7 min read',
          relatedTool: { href: '/tools/mindfulness', name: 'Guided Mindfulness' }
        },
        {
          href: '/support/meditation-consistency',
          title: 'Build a Consistent Meditation Practice',
          description: 'Overcome common obstacles and create a sustainable daily meditation habit.',
          time: '6 min read',
          relatedTool: { href: '/tools/mindfulness', name: 'Mindfulness Exercises' }
        }
      ]
    },
    {
      id: 'mental-health-barriers',
      title: 'Overcoming Barriers to Care',
      emoji: '🛡️',
      description: 'Address stigma, access affordable care, and set realistic expectations',
      color: 'indigo',
      resources: [
        {
          href: '/support/overcome-mental-health-stigma',
          title: 'Overcome Mental Health Stigma',
          description: 'Challenge internalized stigma, advocate for yourself, and find judgment-free support.',
          time: '9 min read',
          relatedTool: { href: '/tools/stigma-assessment', name: 'Stigma Assessment' }
        },
        {
          href: '/support/affordable-mental-health-care',
          title: 'Find Affordable Mental Health Care',
          description: 'Access low-cost therapy, insurance navigation, sliding scale options, and free resources.',
          time: '10 min read',
          relatedTool: null
        },
        {
          href: '/support/realistic-mental-health-expectations',
          title: 'Set Realistic Mental Health Expectations',
          description: 'Understand the recovery timeline, manage expectations, and celebrate small progress.',
          time: '7 min read',
          relatedTool: null
        }
      ]
    },
    {
      id: 'life-wellness',
      title: 'Life & Wellness Foundations',
      emoji: '🌟',
      description: 'Sleep, trauma recovery, and holistic wellness approaches',
      color: 'teal',
      resources: [
        {
          href: '/support/sleep-mental-health',
          title: 'Sleep & Mental Health Connection',
          description: 'Improve sleep quality, address insomnia, and understand the sleep-mood relationship.',
          time: '8 min read',
          relatedTool: null
        },
        {
          href: '/support/trauma-recovery',
          title: 'Trauma Recovery & Healing',
          description: 'Navigate trauma healing with evidence-based approaches and find professional support.',
          time: '11 min read',
          relatedTool: null
        }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <>
      <SEOHead
        title="Mental Health Support Resources - Expert Guides & Free Tools | Evidence-Based"
        description="Access 13+ comprehensive mental health support resources covering burnout, anxiety, loneliness, mindfulness, trauma recovery, and more. Evidence-based guides with free interactive tools."
        keywords={[
          'mental health support resources',
          'mental health guides',
          'burnout recovery resources',
          'anxiety support',
          'loneliness help',
          'mindfulness guides',
          'trauma recovery resources',
          'mental health education',
          'evidence-based mental health',
          'free mental health resources',
          'mental wellness guides'
        ]}
        ogImage="/og-support-resources.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Mental Health Support Resources" />

      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-8 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Support Resources</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Mental Health Support Resources
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Expert-written guides on burnout, anxiety, loneliness, mindfulness, trauma recovery, and more.
              Evidence-based strategies with free interactive tools.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Evidence-Based
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Expert-Written
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ 100% Free
              </span>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Actionable Strategies
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">13+</div>
              <div className="text-sm text-gray-600">Support Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Topic Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">8+</div>
              <div className="text-sm text-gray-600">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Evidence-Based</div>
            </div>
          </div>

          {/* Progressive Disclosure Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Browse by Category</h2>
            <p className="text-center text-gray-600 mb-8">Click any category to explore resources</p>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
                >
                  {/* Category Header - Clickable */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-therapy-500 focus:ring-inset"
                    aria-expanded={expandedCategory === category.id}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-4xl">{category.emoji}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {category.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {category.description}
                          </p>
                          <div className="mt-2">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full bg-${category.color}-100 text-${category.color}-800`}>
                              {category.resources.length} {category.resources.length === 1 ? 'Resource' : 'Resources'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform ${
                            expandedCategory === category.id ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Resources List */}
                  {expandedCategory === category.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="space-y-4">
                        {category.resources.map((resource, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-5 hover:shadow-md transition-all group"
                          >
                            <Link href={resource.href} className="block">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-therapy-600 transition-colors">
                                    {resource.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-3">
                                    {resource.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="text-gray-500 flex items-center">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                      </svg>
                                      {resource.time}
                                    </span>
                                    {resource.relatedTool && (
                                      <span className="text-therapy-600 font-medium flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        + Free Tool Available
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <svg
                                    className="w-6 h-6 text-gray-400 group-hover:text-therapy-600 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                            {resource.relatedTool && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <Link
                                  href={resource.relatedTool.href}
                                  className="text-sm text-therapy-600 hover:text-therapy-700 font-medium inline-flex items-center"
                                >
                                  Try {resource.relatedTool.name} →
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Use These Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Identify Your Need</h3>
                <p className="text-sm text-gray-600">Browse categories to find resources matching your current challenges</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Read Expert Guides</h3>
                <p className="text-sm text-gray-600">Access evidence-based articles with practical strategies and techniques</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Try Free Tools</h3>
                <p className="text-sm text-gray-600">Use interactive assessments and exercises for immediate support</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
                <p className="text-sm text-gray-600">Implement coping strategies and track your progress over time</p>
              </div>
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for Interactive Tools?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Complement these guides with our free assessment tools and exercises
              </p>
              <Link
                href="/tools/free-mental-health-tools"
                className="inline-block bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Explore Free Mental Health Tools →
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are these resources evidence-based?</h3>
                <p className="text-gray-600">Yes, all our support resources are based on evidence-based practices from clinical psychology, including CBT, mindfulness-based interventions, and validated assessment frameworks.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do I need to pay to access these?</h3>
                <p className="text-gray-600">No, all support resources and tools are completely free with no hidden costs or subscriptions required.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can these replace therapy?</h3>
                <p className="text-gray-600">No, these resources are educational and supportive tools. They are not substitutes for professional mental health care. If you're experiencing severe symptoms, please consult a licensed mental health professional.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I know which resource to start with?</h3>
                <p className="text-gray-600">Start with the category that matches your current primary concern. Each resource includes a clear description to help you decide if it's right for you.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-therapy-600 rounded-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-6 opacity-90">Choose a category above or take a free assessment to get personalized recommendations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/burnout-assessment"
                className="bg-white text-therapy-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Take Burnout Assessment
              </Link>
              <Link
                href="/tools/anxiety-relief"
                className="bg-therapy-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-therapy-800 transition-colors"
              >
                Try Anxiety Relief
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
