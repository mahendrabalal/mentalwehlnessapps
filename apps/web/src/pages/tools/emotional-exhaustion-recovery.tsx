import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, howToStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function EmotionalExhaustionRecovery() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Emotional Exhaustion Recovery Guide - Free Burnout Treatment',
      description: 'Comprehensive guide to recover from emotional exhaustion and burnout. Evidence-based strategies, recovery timeline, and practical steps for mental wellness.',
      slug: '/tools/emotional-exhaustion-recovery',
    }),
    howToStructuredData({
      name: 'How to Recover from Emotional Exhaustion',
      description: 'Step-by-step recovery process for overcoming burnout and emotional exhaustion',
      steps: [
        {
          name: 'Recognize the Signs',
          text: 'Identify symptoms of emotional exhaustion including fatigue, cynicism, and reduced effectiveness'
        },
        {
          name: 'Immediate Self-Care',
          text: 'Implement basic self-care practices: sleep, nutrition, and stress reduction techniques'
        },
        {
          name: 'Set Boundaries',
          text: 'Establish clear work-life boundaries and learn to say no to excessive demands'
        },
        {
          name: 'Reconnect with Values',
          text: 'Identify what matters most to you and align your activities with your core values'
        },
        {
          name: 'Build Support Systems',
          text: 'Connect with friends, family, or professionals who can support your recovery journey'
        }
      ]
    })
  ]

  const recoveryStrategies = [
    {
      title: 'Immediate Relief (First 24-72 Hours)',
      strategies: [
        {
          name: 'Complete Rest',
          description: 'Take 1-2 days off completely. No work emails, no obligations. Just rest.',
          action: 'Schedule immediate time off and inform necessary contacts'
        },
        {
          name: 'Basic Needs Reset',
          description: 'Focus on sleep (8+ hours), hydration, and nutritious meals.',
          action: 'Set reminders for water, meals, and bedtime'
        },
        {
          name: 'Gentle Movement',
          description: 'Light walking or stretching for 10-15 minutes to reduce physical tension.',
          action: 'Take a short walk outside without your phone'
        }
      ]
    },
    {
      title: 'Short-Term Recovery (1-4 Weeks)',
      strategies: [
        {
          name: 'Establish Boundaries',
          description: 'Set clear work hours and learn to say no to non-essential requests.',
          action: 'Create a written list of your boundaries and communicate them'
        },
        {
          name: 'Stress Management',
          description: 'Practice daily relaxation techniques like deep breathing or meditation.',
          action: 'Schedule 10 minutes of mindfulness practice daily'
        },
        {
          name: 'Social Connection',
          description: 'Reconnect with supportive friends and family members.',
          action: 'Reach out to one supportive person this week'
        }
      ]
    },
    {
      title: 'Long-Term Prevention (1-6+ Months)',
      strategies: [
        {
          name: 'Values Alignment',
          description: 'Evaluate and align your work and life with core values.',
          action: 'Write down your top 5 values and assess current alignment'
        },
        {
          name: 'Skill Development',
          description: 'Build emotional regulation and stress resilience skills.',
          action: 'Practice one new coping skill weekly using our tools'
        },
        {
          name: 'Regular Check-ins',
          description: 'Monitor energy levels and stress indicators regularly.',
          action: 'Use our mood tracker to identify patterns'
        }
      ]
    }
  ]

  const warningSigns = [
    'Chronic fatigue and lack of energy',
    'Cynicism or detachment from work',
    'Reduced performance and effectiveness',
    'Physical symptoms (headaches, digestive issues)',
    'Irritability and mood swings',
    'Difficulty concentrating',
    'Sleep disturbances',
    'Loss of motivation',
    'Feeling overwhelmed or trapped',
    'Social withdrawal'
  ]

  const recoveryTimeline = [
    { phase: 'Acute Phase', duration: '1-2 weeks', focus: 'Rest and basic stabilization' },
    { phase: 'Early Recovery', duration: '2-6 weeks', focus: 'Establishing boundaries and self-care' },
    { phase: 'Active Recovery', duration: '1-3 months', focus: 'Building resilience and coping skills' },
    { phase: 'Maintenance', duration: '3-6+ months', focus: 'Prevention and sustainable practices' }
  ]

  return (
    <>
      <SEOHead
        title="Emotional Exhaustion Recovery - Burnout Treatment Guide"
        description="Complete guide to recover from emotional exhaustion and burnout. Evidence-based strategies, recovery timeline, and practical steps. Free resources."
        publishedTime={TOOLS_PAGES_DATES['emotional-exhaustion-recovery'].published}
        modifiedTime={TOOLS_PAGES_DATES['emotional-exhaustion-recovery'].modified}
        keywords={[
          'emotional exhaustion recovery',
          'burnout recovery guide',
          'how to recover from burnout',
          'emotional exhaustion treatment',
          'burnout recovery timeline',
          'work burnout recovery',
          'stress recovery strategies',
          'mental health recovery',
          'burnout prevention',
          'emotional wellness recovery'
        ]}
        ogImage="/og-emotional-exhaustion-recovery.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Emotional Exhaustion Recovery Guide" />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
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
                  <span className="text-gray-500">Emotional Exhaustion Recovery</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Emotional Exhaustion Recovery
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              A comprehensive guide to recovering from burnout and emotional exhaustion.
              Learn evidence-based strategies to reclaim your energy, motivation, and well-being.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Evidence-Based Recovery
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Step-by-Step Guide
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Free Resources
              </span>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Recovery Timeline
              </span>
            </div>
          </div>

          {/* Quick Assessment */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Are You Experiencing Emotional Exhaustion?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Check if you recognize these common warning signs:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{sign}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                If you checked several of these signs, you may be experiencing emotional exhaustion.
              </p>
              <Link
                href="/tools/burnout-assessment"
                className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Take Our Free Burnout Assessment
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recovery Timeline */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Recovery Timeline</h2>
            <div className="space-y-6">
              {recoveryTimeline.map((phase, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-3 bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-gray-700">{phase.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Strategies */}
          <div className="space-y-8 mb-12">
            {recoveryStrategies.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{phase.title}</h2>
                <div className="space-y-6">
                  {phase.strategies.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className="border-l-4 border-orange-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{strategy.name}</h3>
                      <p className="text-gray-600 mb-3">{strategy.description}</p>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-orange-800">
                          <strong>Action Step:</strong> {strategy.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Essential Recovery Practices */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Recovery Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🌙 Sleep & Rest</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Aim for 7-9 hours of quality sleep</li>
                  <li>• Establish a consistent sleep schedule</li>
                  <li>• Create a relaxing bedtime routine</li>
                  <li>• Take regular breaks during the day</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🥗 Nutrition & Hydration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Eat regular, balanced meals</li>
                  <li>• Stay hydrated throughout the day</li>
                  <li>• Limit caffeine and processed foods</li>
                  <li>• Consider nutritional supplements (consult doctor)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🏃 Movement & Exercise</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Start with gentle walks (10-15 minutes)</li>
                  <li>• Gradually increase activity level</li>
                  <li>• Include stretching and flexibility</li>
                  <li>• Avoid overexertion initially</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🧘 Mindfulness & Stress Relief</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Practice deep breathing exercises</li>
                  <li>• Try meditation or guided imagery</li>
                  <li>• Use grounding techniques</li>
                  <li>• Journal thoughts and feelings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tools & Resources */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Supporting Tools & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/tools/burnout-assessment"
                className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-3">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-2">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Track your recovery progress</p>
              </Link>
              <Link
                href="/grounding/54321-grounding-script"
                className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-3">🎯</span>
                <h3 className="font-semibold text-gray-900 mb-2">Grounding Script</h3>
                <p className="text-sm text-gray-600">Immediate stress relief</p>
              </Link>
              <Link
                href="/tools/anxiety-relief"
                className="bg-white p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-3">😌</span>
                <h3 className="font-semibold text-gray-900 mb-2">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Managing overwhelm</p>
              </Link>
            </div>
          </div>

          {/* When to Seek Professional Help */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-red-900 mb-4">When to Seek Professional Help</h2>
            <div className="text-red-800">
              <p className="mb-4">
                While self-care is essential, professional support may be needed if you experience:
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Symptoms persisting more than 4-6 weeks despite self-care</li>
                <li>• Severe depression or suicidal thoughts</li>
                <li>• Inability to perform daily functions</li>
                <li>• Physical health complications</li>
                <li>• Substance abuse as coping mechanism</li>
              </ul>
              <div className="text-center">
                <Link
                  href="/crisis-support"
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700"
                >
                  Get Professional Support →
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-orange-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Start Your Recovery Journey Today</h2>
            <p className="text-xl mb-6 opacity-90">
              Recovery is possible. Take the first step with our free burnout assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/burnout-assessment"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Assess Your Burnout Level
              </Link>
              <Link
                href="/grounding/54321-grounding-script"
                className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
              >
                Try Grounding Technique
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