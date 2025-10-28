import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, howToStructuredData, faqStructuredData } from '@/lib/seo'

export default function FreeMentalHealthTools() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Mental Health Tools - Evidence-Based Resources',
      description: 'Access 10+ free mental health tools for anxiety, burnout, loneliness, and emotional regulation. No signup required, clinically-reviewed, instant results.',
      slug: '/tools/free-mental-health-tools',
    }),
    howToStructuredData({
      name: 'How to Use Free Mental Health Tools for Wellness',
      description: 'Step-by-step guide to using our free mental health tools for immediate relief and long-term wellness',
      steps: [
        {
          name: 'Choose Your Tool',
          text: 'Select from burnout assessment, anxiety relief, mindfulness exercises, or other specialized tools'
        },
        {
          name: 'Complete Assessment',
          text: 'Answer questions honestly - most tools take 2-5 minutes to complete'
        },
        {
          name: 'Get Instant Results',
          text: 'Receive immediate insights, risk assessments, or personalized recommendations'
        },
        {
          name: 'Access Resources',
          text: 'Explore coping strategies, recovery guides, and next steps tailored to your results'
        }
      ]
    }),
    faqStructuredData([
      {
        question: 'Are these mental health tools really free?',
        answer: 'Yes, all our mental health tools are 100% free with no hidden costs, subscriptions, or credit card requirements. You can use them unlimited times.'
      },
      {
        question: 'Are the tools clinically validated?',
        answer: 'Our tools are based on evidence-based clinical frameworks like PHQ-9, GAD-7, and Maslach Burnout Inventory. They provide educational insights and are not substitutes for professional diagnosis.'
      },
      {
        question: 'Do I need to create an account?',
        answer: 'No account required for immediate access. However, creating a free account allows you to save progress, track mood changes over time, and access personalized features.'
      },
      {
        question: 'Which tool should I start with?',
        answer: 'Start with what resonates most: Burnout Assessment for work stress, Anxiety Relief for immediate calming techniques, or Loneliness Assessment if you feel isolated.'
      }
    ])
  ]

  const tools = [
    {
      href: '/tools/depression-screening',
      emoji: '🧠',
      title: 'Depression Screening',
      description: 'Free PHQ-9 test for depression symptoms',
      category: 'Assessment',
      time: '2 minutes',
      color: 'indigo'
    },
    {
      href: '/tools/burnout-assessment',
      emoji: '🔥',
      title: 'Burnout Assessment',
      description: 'Check your workplace burnout risk level',
      category: 'Assessment',
      time: '5 minutes',
      color: 'orange'
    },
    {
      href: '/tools/anxiety-relief',
      emoji: '😌',
      title: 'Anxiety Relief',
      description: 'Immediate techniques for anxiety symptoms',
      category: 'Relief Tool',
      time: '2 minutes',
      color: 'blue'
    },
    {
      href: '/tools/stress-management-techniques',
      emoji: '💪',
      title: 'Stress Management',
      description: 'Coping skills and relaxation techniques',
      category: 'Relief Tool',
      time: '5-20 minutes',
      color: 'yellow'
    },
    {
      href: '/tools/loneliness-assessment',
      emoji: '🤝',
      title: 'Loneliness Assessment',
      description: 'Understand your social connection patterns',
      category: 'Assessment',
      time: '3 minutes',
      color: 'purple'
    },
    {
      href: '/tools/mindfulness',
      emoji: '🧘',
      title: 'Mindfulness Exercises',
      description: 'Guided meditation and grounding techniques',
      category: 'Practice Tool',
      time: '5-10 minutes',
      color: 'green'
    },
    {
      href: '/tools/emotional-regulation',
      emoji: '🎯',
      title: 'Emotional Regulation',
      description: 'Skills for managing difficult emotions',
      category: 'Skill Building',
      time: '5 minutes',
      color: 'pink'
    },
    {
      href: '/tools/stigma-assessment',
      emoji: '🛡️',
      title: 'Mental Health Stigma Test',
      description: 'Identify barriers to seeking help',
      category: 'Assessment',
      time: '3 minutes',
      color: 'indigo'
    }
  ]

  const categories = [
    {
      title: 'Stress & Burnout',
      description: 'Tools for work stress and emotional exhaustion',
      tools: tools.filter(t => t.category === 'Assessment' && t.color === 'orange')
    },
    {
      title: 'Anxiety & Mood',
      description: 'Immediate relief and mood management',
      tools: tools.filter(t => t.color === 'blue' || t.color === 'pink')
    },
    {
      title: 'Social Connection',
      description: 'Combat loneliness and build relationships',
      tools: tools.filter(t => t.color === 'purple')
    },
    {
      title: 'Mindfulness & Coping',
      description: 'Grounding techniques and daily practices',
      tools: tools.filter(t => t.category === 'Practice Tool' || t.color === 'green')
    }
  ]

  return (
    <>
      <SEOHead
        title="Free Mental Health Tools - 10+ Evidence-Based Resources | No Signup Required"
        description="Access 10+ free mental health tools for anxiety relief, burnout assessment, mindfulness, and emotional regulation. Instant results, clinically-reviewed, 100% free forever."
        keywords={[
          'free mental health tools',
          'free anxiety relief',
          'free burnout test',
          'free mindfulness exercises',
          'free emotional regulation',
          'mental health assessment free',
          'evidence-based mental health tools',
          'no cost mental health resources',
          'free therapy tools',
          'mental wellness tools free',
          'mental wellness test',
          'free mental wellness test',
          'mental health assessment tools'
        ]}
        ogImage="/og-free-mental-health-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Free Mental Health Tools" />

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
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/tools" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Free Mental Health Tools</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Free Mental Health Tools
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Access 10+ evidence-based mental health tools for anxiety, burnout, loneliness, and emotional wellness.
              No signup required, instant results, completely free forever.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ 100% Free Forever
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ No Signup Required
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Clinically-Reviewed
              </span>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Instant Results
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">2-5</div>
              <div className="text-sm text-gray-600">Minutes Per Tool</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-therapy-600 mb-2">$0</div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>

          {/* Featured Tools Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Free Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{tool.emoji}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${tool.color}-100 text-${tool.color}-800`}>
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-therapy-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {tool.time}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Use These Free Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Choose Your Tool</h3>
                <p className="text-sm text-gray-600">Select from burnout assessment, anxiety relief, mindfulness exercises, or other specialized tools</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Complete Assessment</h3>
                <p className="text-sm text-gray-600">Answer questions honestly - most tools take 2-5 minutes to complete</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Instant Results</h3>
                <p className="text-sm text-gray-600">Receive immediate insights, risk assessments, or personalized recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-therapy-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Access Resources</h3>
                <p className="text-sm text-gray-600">Explore coping strategies, recovery guides, and next steps tailored to your results</p>
              </div>
            </div>
          </div>

  {/* Mental Wellness Tests Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mental Wellness Tests & Assessments</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Our evidence-based mental wellness tests help you understand your emotional health, identify areas for improvement, and get personalized recommendations for your wellbeing journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tools.filter(t => t.category === 'Assessment').map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="bg-gradient-to-br from-therapy-50 to-blue-50 border border-therapy-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{tool.emoji}</span>
                    <div>
                      <span className="bg-therapy-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Mental Wellness Test
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-therapy-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center text-sm text-therapy-600 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {tool.time} • Instant Results
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tools by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <Link
                        key={toolIndex}
                        href={tool.href}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-xl">{tool.emoji}</span>
                        <div>
                          <div className="font-medium text-gray-900">{tool.title}</div>
                          <div className="text-sm text-gray-500">{tool.time}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are these mental health tools really free?</h3>
                <p className="text-gray-600">Yes, all our mental health tools are 100% free with no hidden costs, subscriptions, or credit card requirements. You can use them unlimited times.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are the tools clinically validated?</h3>
                <p className="text-gray-600">Our tools are based on evidence-based clinical frameworks like PHQ-9, GAD-7, and Maslach Burnout Inventory. They provide educational insights and are not substitutes for professional diagnosis.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do I need to create an account?</h3>
                <p className="text-gray-600">No account required for immediate access. However, creating a free account allows you to save progress, track mood changes over time, and access personalized features.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Which tool should I start with?</h3>
                <p className="text-gray-600">Start with what resonates most: Burnout Assessment for work stress, Anxiety Relief for immediate calming techniques, or Loneliness Assessment if you feel isolated.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-therapy-600 rounded-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Mental Wellness Journey Today</h2>
            <p className="text-xl mb-6 opacity-90">Take the first step with our free burnout assessment or explore anxiety relief techniques.</p>
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