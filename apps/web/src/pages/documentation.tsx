import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildAbsoluteUrl, buildBreadcrumbList, medicalWebPageStructuredData } from '@/lib/seo'

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'features', title: 'Features Guide', icon: '⚡' },
    { id: 'ai-companion', title: 'AI Companion', icon: '🤖' },
    { id: 'analytics', title: 'Analytics & Insights', icon: '📊' },
    { id: 'safety-planning', title: 'Safety Planning', icon: '🛡️' },
    { id: 'data-privacy', title: 'Data & Privacy', icon: '🔒' },
    { id: 'api', title: 'Developer API', icon: '⚙️' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🛠️' }
  ]

  const content = {
    'getting-started': {
      title: 'Getting Started with MentalWellnessApps',
      sections: [
        {
          title: 'Welcome to Your Mental Wellness Journey',
          content: `
            <p>Welcome to MentalWellnessApps! This guide will help you get started with our platform and make the most of your mental wellness journey.</p>

            <h3>First Steps</h3>
            <ol>
              <li><strong>Create Your Account:</strong> Sign up with your email or continue as a guest to explore basic features</li>
              <li><strong>Complete Your Profile:</strong> Add basic information to personalize your experience</li>
              <li><strong>Take Your First Assessment:</strong> Complete a brief wellness check to establish your baseline</li>
              <li><strong>Explore Features:</strong> Try our mood tracking, AI companion, and safety planning tools</li>
            </ol>

            <h3>Understanding Your Dashboard</h3>
            <p>Your dashboard is your home base for mental wellness tracking:</p>
            <ul>
              <li><strong>Daily Mood Check:</strong> Quick daily assessment of your mental state</li>
              <li><strong>Progress Overview:</strong> Visual representation of your wellness journey</li>
              <li><strong>AI Companion Access:</strong> Chat with your personal wellness companion</li>
              <li><strong>Quick Actions:</strong> Fast access to safety planning and crisis resources</li>
            </ul>
          `
        }
      ]
    },
    'features': {
      title: 'Features Guide',
      sections: [
        {
          title: 'Core Features Overview',
          content: `
            <h3>Free Features</h3>
            <ul>
              <li><strong>Mood Tracking:</strong> Log daily emotions, energy levels, and notes</li>
              <li><strong>Basic AI Chat:</strong> 3 conversations per day with our AI companion</li>
              <li><strong>Safety Planning:</strong> Create and manage your personal safety plan</li>
              <li><strong>Crisis Resources:</strong> Immediate access to mental health emergency contacts</li>
              <li><strong>Basic Content:</strong> Access to guided meditations and breathing exercises</li>
            </ul>

            <h3>Premium Features</h3>
            <ul>
              <li><strong>Unlimited AI Companion:</strong> 24/7 access to personalized therapeutic conversations</li>
              <li><strong>Smart Analytics:</strong> Advanced pattern recognition and mood forecasting</li>
              <li><strong>Daily Briefings:</strong> Personalized morning wellness insights</li>
              <li><strong>Premium Content:</strong> Complete library of therapeutic exercises</li>
              <li><strong>Crisis Prevention:</strong> Advanced warning system and intervention protocols</li>
              <li><strong>Data Export:</strong> Download your complete wellness data</li>
            </ul>
          `
        }
      ]
    },
    'ai-companion': {
      title: 'AI Therapy Companion Guide',
      sections: [
        {
          title: 'Understanding Your AI Companion',
          content: `
            <p>Your AI therapy companion is designed to provide 24/7 emotional support using evidence-based therapeutic techniques.</p>

            <h3>How It Works</h3>
            <ul>
              <li><strong>Natural Conversations:</strong> Chat naturally about your feelings, thoughts, and experiences</li>
              <li><strong>Therapeutic Techniques:</strong> Receives training in CBT, DBT, and mindfulness approaches</li>
              <li><strong>Crisis Detection:</strong> Monitors conversations for signs of crisis and provides immediate resources</li>
              <li><strong>Personalization:</strong> Learns your communication style and preferences over time</li>
            </ul>

            <h3>Best Practices</h3>
            <ul>
              <li>Be honest and open about your feelings</li>
              <li>Ask specific questions about coping strategies</li>
              <li>Use it as a supplement to, not replacement for, professional therapy</li>
              <li>Regular check-ins help build better understanding</li>
            </ul>

            <h3>Example Conversations</h3>
            <p><strong>User:</strong> "I'm feeling overwhelmed with work stress"</p>
            <p><strong>AI:</strong> "I understand work stress can feel overwhelming. Let's explore some strategies together. Can you tell me what specific aspects of work are causing the most stress right now?"</p>
          `
        }
      ]
    },
    'analytics': {
      title: 'Analytics & Insights',
      sections: [
        {
          title: 'Understanding Your Data',
          content: `
            <p>Our analytics system transforms your daily inputs into meaningful insights about your mental wellness patterns.</p>

            <h3>Mood Trends</h3>
            <ul>
              <li><strong>Daily Patterns:</strong> Identify times of day when mood is typically higher or lower</li>
              <li><strong>Weekly Cycles:</strong> Understand how different days of the week affect your wellness</li>
              <li><strong>Seasonal Changes:</strong> Track how seasons and weather impact your mental health</li>
            </ul>

            <h3>Correlation Analysis</h3>
            <p>Premium users get advanced insights that identify connections between:</p>
            <ul>
              <li>Sleep quality and next-day mood</li>
              <li>Exercise frequency and energy levels</li>
              <li>Social interactions and anxiety levels</li>
              <li>Weather patterns and emotional state</li>
            </ul>

            <h3>Predictive Insights</h3>
            <p>Our AI analyzes your patterns to provide:</p>
            <ul>
              <li><strong>Mood Forecasting:</strong> Predictions about upcoming emotional states</li>
              <li><strong>Risk Assessment:</strong> Early warning signs for potential mental health challenges</li>
              <li><strong>Optimization Suggestions:</strong> Personalized recommendations for improving wellness</li>
            </ul>
          `
        }
      ]
    },
    'safety-planning': {
      title: 'Safety Planning Guide',
      sections: [
        {
          title: 'Creating an Effective Safety Plan',
          content: `
            <p>A safety plan is a personalized, practical plan that includes ways to stay safe and cope during suicidal thoughts.</p>

            <h3>Key Components</h3>
            <ul>
              <li><strong>Warning Signs:</strong> Personal signs that a crisis may be developing</li>
              <li><strong>Coping Strategies:</strong> Things you can do to distract yourself and feel better</li>
              <li><strong>Support People:</strong> Friends and family who can provide support</li>
              <li><strong>Professional Contacts:</strong> Mental health professionals and agencies</li>
              <li><strong>Environment Safety:</strong> Ways to make your environment safer</li>
              <li><strong>Emergency Contacts:</strong> People to contact in a crisis</li>
            </ul>

            <h3>Using Your Safety Plan</h3>
            <p>Your safety plan should be:</p>
            <ul>
              <li>Written in your own words</li>
              <li>Easily accessible (saved on your phone, printed copy)</li>
              <li>Shared with trusted support people</li>
              <li>Reviewed and updated regularly</li>
            </ul>

            <h3>Quick Access</h3>
            <p>Our app provides:</p>
            <ul>
              <li>One-tap access to your safety plan from any page</li>
              <li>Quick dial buttons for emergency contacts</li>
              <li>Crisis resources integration</li>
              <li>Sharing capabilities with healthcare providers</li>
            </ul>
          `
        }
      ]
    },
    'data-privacy': {
      title: 'Data & Privacy',
      sections: [
        {
          title: 'Your Data Security',
          content: `
            <p>We take your privacy seriously and follow strict standards to protect your sensitive mental health information.</p>

            <h3>HIPAA Compliance</h3>
            <ul>
              <li><strong>Healthcare Standards:</strong> We follow HIPAA guidelines for protecting health information</li>
              <li><strong>Encryption:</strong> All data is encrypted both in transit and at rest</li>
              <li><strong>Access Controls:</strong> Strict limitations on who can access your data</li>
              <li><strong>Audit Trails:</strong> Complete logs of all data access and changes</li>
            </ul>

            <h3>Data Usage</h3>
            <p>Your data is used only for:</p>
            <ul>
              <li>Providing personalized mental health insights</li>
              <li>Improving AI companion responses</li>
              <li>Generating analytics and trends</li>
              <li>Crisis detection and prevention</li>
            </ul>

            <h3>Data Control</h3>
            <p>You have complete control over your data:</p>
            <ul>
              <li><strong>Export:</strong> Download all your data at any time</li>
              <li><strong>Deletion:</strong> Permanently delete your account and all data</li>
              <li><strong>Sharing:</strong> Control what information is shared and with whom</li>
              <li><strong>Retention:</strong> Set how long data should be kept</li>
            </ul>
          `
        }
      ]
    },
    'api': {
      title: 'Developer API',
      sections: [
        {
          title: 'API Documentation',
          content: `
            <p>Our API allows healthcare providers and developers to integrate with MentalWellnessApps.</p>

            <h3>Authentication</h3>
            <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>

            <h3>Endpoints</h3>
            <h4>Mood Data</h4>
            <pre><code>GET /api/v1/mood-entries
POST /api/v1/mood-entries
PUT /api/v1/mood-entries/:id</code></pre>

            <h4>Assessments</h4>
            <pre><code>GET /api/v1/assessments
POST /api/v1/assessments</code></pre>

            <h3>Webhooks</h3>
            <p>Subscribe to real-time events:</p>
            <ul>
              <li>New mood entries</li>
              <li>Crisis indicators detected</li>
              <li>Assessment completions</li>
              <li>Safety plan updates</li>
            </ul>

            <h3>Rate Limits</h3>
            <ul>
              <li>100 requests per minute per API key</li>
              <li>1000 requests per day for free tier</li>
              <li>Unlimited for enterprise plans</li>
            </ul>
          `
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      sections: [
        {
          title: 'Common Issues and Solutions',
          content: `
            <h3>Login Issues</h3>
            <p><strong>Problem:</strong> Can't log in to my account</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Check that you're using the correct email address</li>
              <li>Try resetting your password</li>
              <li>Clear browser cache and cookies</li>
              <li>Try logging in from an incognito window</li>
            </ul>

            <h3>AI Companion Not Responding</h3>
            <p><strong>Problem:</strong> AI companion is slow or not responding</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Try rephrasing your message</li>
              <li>Contact support if issues persist</li>
            </ul>

            <h3>Data Sync Issues</h3>
            <p><strong>Problem:</strong> Mood entries not saving or syncing</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Ensure stable internet connection</li>
              <li>Force refresh the dashboard</li>
              <li>Log out and log back in</li>
              <li>Check if storage quota is exceeded</li>
            </ul>

            <h3>Performance Issues</h3>
            <p><strong>Problem:</strong> App running slowly</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Close other browser tabs</li>
              <li>Disable browser extensions temporarily</li>
              <li>Clear browser cache</li>
              <li>Use latest browser version</li>
            </ul>
          `
        }
      ]
    }
  }

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mental Wellness App Documentation',
      description: 'Guides for onboarding, analytics, API usage, privacy controls, and crisis workflows within the Mental Wellness App.',
      slug: '/documentation',
    }),
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Documentation', url: '/documentation' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Documentation Sections',
      itemListElement: sections.map((section, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: section.title,
        url: buildAbsoluteUrl(`/documentation#${section.id}`),
      })),
    },
  ]

  const currentContent = content[activeSection as keyof typeof content]

  return (
    <>
      <SEOHead
        title="Documentation - Mental Wellness App"
        description="Explore detailed documentation to master onboarding, analytics, privacy controls, API usage, and crisis workflows within the Mental Wellness App."
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know to make the most of your mental wellness journey
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          activeSection === section.id
                            ? 'bg-therapy-100 text-therapy-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3">{section.icon}</span>
                        {section.title}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
                    <div className="space-y-2 text-sm">
                      <Link href="/help" className="block text-therapy-600 hover:text-therapy-700">
                        Help Center
                      </Link>
                      <Link href="/contact" className="block text-therapy-600 hover:text-therapy-700">
                        Contact Support
                      </Link>
                      <Link href="/crisis-support" className="block text-red-600 hover:text-red-700">
                        Crisis Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-3">
                      {sections.find(s => s.id === activeSection)?.icon}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {currentContent.title}
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {currentContent.sections.map((section, index) => (
                      <div key={index} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {section.title}
                        </h3>
                        <div
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
                    <div>
                      {sections.findIndex(s => s.id === activeSection) > 0 && (
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection)
                            setActiveSection(sections[currentIndex - 1].id)
                          }}
                          className="flex items-center text-therapy-600 hover:text-therapy-700"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous: {sections[sections.findIndex(s => s.id === activeSection) - 1]?.title}
                        </button>
                      )}
                    </div>

                    <div>
                      {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection)
                            setActiveSection(sections[currentIndex + 1].id)
                          }}
                          className="flex items-center text-therapy-600 hover:text-therapy-700"
                        >
                          Next: {sections[sections.findIndex(s => s.id === activeSection) + 1]?.title}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Was this documentation helpful?
            </h2>
            <p className="text-gray-600 mb-6">
              Help us improve our documentation by sharing your feedback
            </p>
            <Link
              href="/contact"
              className="bg-therapy-600 hover:bg-therapy-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Send Feedback
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
