import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'

export default function SleepMentalHealthSupport() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Sleep and Mental Health | Sleep Hygiene Tips for Better Sleep',
      description: 'Comprehensive guide to the connection between sleep and mental health. Learn evidence-based sleep hygiene tips, insomnia treatments, and how poor sleep affects depression, anxiety, and overall mental wellness.',
      slug: '/support/sleep-mental-health',
    }),
    medicalEntityStructuredData({
      name: 'Sleep Disorders',
      description: 'Sleep disorders are conditions that prevent restful, quality sleep, causing daytime fatigue and affecting mental health, cognitive function, and overall well-being.',
      alternateName: ['Insomnia', 'Sleep Deprivation', 'Circadian Rhythm Disorder', 'Sleep Apnea'],
      cause: ['Stress and anxiety', 'Depression', 'Medical conditions', 'Medications', 'Poor sleep habits', 'Environmental factors'],
      symptom: ['Difficulty falling asleep', 'Waking up frequently', 'Daytime fatigue', 'Irritability', 'Difficulty concentrating', 'Mood changes', 'Memory problems'],
      riskFactor: ['Mental health conditions', 'Irregular work schedule', 'Age', 'Lifestyle factors', 'Chronic pain', 'Substance use'],
      treatment: ['Cognitive behavioral therapy for insomnia', 'Sleep hygiene improvements', 'Medication', 'Light therapy', 'Lifestyle modifications', 'Stress management'],
      typicalTest: ['Polysomnography', 'Sleep study', 'Actigraphy', 'Sleep diaries'],
      medicalSpecialty: 'Sleep Medicine'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Rachel Thompson',
        credentials: 'M.D., Sleep Medicine Specialist',
        expertise: 'Sleep disorders, sleep psychology, circadian rhythm biology'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'American Academy of Sleep Medicine'
    })
  ]

  return (
    <>
      <SEOHead
        title="Sleep and Mental Health | Sleep Hygiene Tips & Insomnia Treatment"
        description="Comprehensive guide to the connection between sleep and mental health. Learn evidence-based sleep hygiene tips, insomnia treatments, and how poor sleep affects depression, anxiety, and mental wellness."
        keywords={[
          "sleep and mental health",
          "sleep hygiene tips",
          "insomnia treatment",
          "sleep deprivation effects",
          "better sleep habits",
          "mental health and sleep quality",
          "sleep anxiety relief",
          "natural sleep remedies",
          "sleep disorder symptoms",
          "sleep psychology",
          "circadian rhythm health",
          "sleep meditation techniques",
          "bedtime routine for mental health",
          "sleep and depression",
          "sleep and anxiety connection"
        ]}
        ogImage="/og-sleep-mental-health.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Sleep & Mental Health Guide" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
                  <Link href="/support" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Support
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Sleep & Mental Health</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sleep and Mental Health: The Essential Connection
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Discover how quality sleep impacts mental wellness and learn evidence-based strategies to improve both. From sleep hygiene tips to insomnia treatments, find everything you need for better rest and mental health.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based Strategies
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Expert Reviewed
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Sleep Science Based
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Mental Health Focus
              </span>
            </div>
          </div>

          {/* Medical Review */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-blue-900">Medically Reviewed</span>
                  <span className="text-sm text-blue-700">•</span>
                  <span className="text-sm text-blue-700">Last updated: October 28, 2025</span>
                </div>
                <p className="text-sm text-blue-800">
                  This guide has been reviewed by Dr. Rachel Thompson, M.D., Sleep Medicine Specialist. All recommendations are based on current sleep science research and clinical practice guidelines.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">M.D. Sleep Medicine</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">AASM Certified</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Evidence-Based</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Sleep-Mental Health Connection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Sleep-Mental Health Connection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How Sleep Affects Mental Health</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Emotional Regulation</h4>
                      <p className="text-sm text-gray-600">Quality sleep helps regulate emotions and reduces reactivity to stress</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Cognitive Function</h4>
                      <p className="text-sm text-gray-600">Sleep supports memory consolidation, problem-solving, and clear thinking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Stress Resilience</h4>
                      <p className="text-sm text-gray-600">Well-rested individuals cope better with daily stressors</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mental Health Conditions & Sleep</h3>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-1">Depression & Sleep</h4>
                    <p className="text-sm text-orange-700">80% of people with depression experience sleep disturbances</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Anxiety & Sleep</h4>
                    <p className="text-sm text-blue-700">Racing thoughts and worry often interfere with falling asleep</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Bipolar Disorder & Sleep</h4>
                    <p className="text-sm text-purple-700">Sleep patterns change dramatically with mood episodes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep Hygiene Strategies */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Sleep Hygiene Strategies</h2>
            <div className="space-y-6">
              {/* Environment */}
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimize Your Sleep Environment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">🌙 Dark & Quiet</h4>
                    <ul className="space-y-1 text-sm text-indigo-700">
                      <li>• Blackout curtains or eye mask</li>
                      <li>• White noise machine or earplugs</li>
                      <li>• Remove electronics from bedroom</li>
                      <li>• Maintain cool temperature (65-68°F)</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">🛏️ Comfort First</h4>
                    <ul className="space-y-1 text-sm text-indigo-700">
                      <li>• Supportive mattress and pillows</li>
                      <li>• Comfortable, breathable bedding</li>
                      <li>• Use bed only for sleep and intimacy</li>
                      <li>• Keep bedroom clean and clutter-free</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Establish a Consistent Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">⏰ Regular Timing</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Same bedtime and wake time daily</li>
                      <li>• Even on weekends (within 1 hour)</li>
                      <li>• Create a 30-minute wind-down routine</li>
                      <li>• Avoid hitting snooze repeatedly</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">☀️ Light Exposure</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Morning sunlight exposure</li>
                      <li>• Dim lights 2 hours before bed</li>
                      <li>• Use blue light filters on devices</li>
                      <li>• Bright light during the day</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifestyle Habits for Better Sleep</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">🍎 Diet & Exercise</h4>
                    <ul className="space-y-1 text-sm text-yellow-700">
                      <li>• Regular exercise (but not close to bedtime)</li>
                      <li>• Avoid caffeine 8+ hours before bed</li>
                      <li>• Limit alcohol, especially in evening</li>
                      <li>• Light dinner 3+ hours before bed</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">🧘 Stress Management</h4>
                    <ul className="space-y-1 text-sm text-yellow-700">
                      <li>• Daily relaxation practice</li>
                      <li>• Journal before bed to clear thoughts</li>
                      <li>• Progressive muscle relaxation</li>
                      <li>• Deep breathing exercises</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bedtime Routine */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating a Mental Health-Friendly Bedtime Routine</h2>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">60-90 Minutes Before Bed</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600">📱</span>
                      <span className="text-sm text-gray-700">Turn off screens and dim lights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600">🌡️</span>
                      <span className="text-sm text-gray-700">Take warm shower or bath</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600">🍵</span>
                      <span className="text-sm text-gray-700">Drink herbal tea (chamomile, lavender)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">30 Minutes Before Bed</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-indigo-600">📖</span>
                      <span className="text-sm text-gray-700">Read physical book or magazine</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-indigo-600">🧘</span>
                      <span className="text-sm text-gray-700">Practice gentle stretching or yoga</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-indigo-600">📝</span>
                      <span className="text-sm text-gray-700">Journal worries and tomorrow's tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specific Sleep Issues */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Sleep Issues & Solutions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Can't Fall Asleep (Sleep Onset Insomnia)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Try These:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 4-7-8 breathing technique</li>
                      <li>• Progressive muscle relaxation</li>
                      <li>• Get out of bed after 20 minutes</li>
                      <li>• Write down racing thoughts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Avoid These:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Checking the clock repeatedly</li>
                      <li>• Using your phone in bed</li>
                      <li>• Watching TV in bedroom</li>
                      <li>• Eating large meals late</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Wake Up During Night (Sleep Maintenance Insomnia)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Immediate Strategies:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Don't check the time</li>
                      <li>• Practice deep breathing</li>
                      <li>• Use relaxation techniques</li>
                      <li>• Stay in bed if you feel sleepy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">If Still Awake After 20 Minutes:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Go to another room</li>
                      <li>• Read in dim light</li>
                      <li>• Listen to calming music</li>
                      <li>• Return to bed when sleepy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Natural Sleep Aids */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Natural Sleep Aids & Supplements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Melatonin</h3>
                <p className="text-sm text-green-700 mb-2">Natural hormone regulating sleep-wake cycles</p>
                <p className="text-xs text-green-600">Start with 0.5-3mg, 30 minutes before bed</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Magnesium</h3>
                <p className="text-sm text-blue-700 mb-2">Calms nervous system and muscle relaxation</p>
                <p className="text-xs text-blue-600">200-400mg magnesium glycinate before bed</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Lavender</h3>
                <p className="text-sm text-purple-700 mb-2">Calming scent promoting relaxation</p>
                <p className="text-xs text-purple-600">Essential oil diffuser or pillow spray</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Chamomile Tea</h3>
                <p className="text-sm text-yellow-700 mb-2">Mild sedative effects and relaxation</p>
                <p className="text-xs text-yellow-600">1-2 cups 1-2 hours before bedtime</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Valerian Root</h3>
                <p className="text-sm text-indigo-700 mb-2">Traditional sleep-promoting herb</p>
                <p className="text-xs text-indigo-600">300-600mg, 30-60 minutes before bed</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Tart Cherry</h3>
                <p className="text-sm text-red-700 mb-2">Natural source of melatonin</p>
                <p className="text-xs text-red-600">8oz juice or supplement before bed</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-100 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Important:</strong> Always consult with healthcare provider before starting supplements, especially if taking medications or have health conditions.
              </p>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">😌</span>
                <h3 className="font-semibold text-gray-900">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Calming techniques</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900">Mindfulness</h3>
                <p className="text-sm text-gray-600">Sleep meditation</p>
              </Link>
              <Link
                href="/tools/depression-screening"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🎯</span>
                <h3 className="font-semibold text-gray-900">Depression Test</h3>
                <p className="text-sm text-gray-600">PHQ-9 screening</p>
              </Link>
              <Link
                href="/tools/burnout-assessment"
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900">Burnout Test</h3>
                <p className="text-sm text-gray-600">Stress assessment</p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How much sleep do I really need?</h3>
                <p className="text-gray-600">
                  Adults need 7-9 hours of quality sleep per night. However, individual needs vary based on genetics, age, activity level, and health status. Focus on how you feel rather than the exact number of hours.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I catch up on lost sleep?</h3>
                <p className="text-gray-600">
                  While you can recover from short-term sleep debt, chronic sleep deprivation has lasting effects. Weekend "catch-up" sleep helps but doesn't fully reverse the negative impacts of regular insufficient sleep.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it bad to take sleep medication?</h3>
                <p className="text-gray-600">
                  Sleep medications can be helpful for short-term use but aren't ideal for long-term solutions. They don't address underlying causes and can cause dependency. Always work with a healthcare provider for proper evaluation and treatment.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I see a doctor about sleep problems?</h3>
                <p className="text-gray-600">
                  If sleep problems persist for more than a few weeks, significantly impact daily functioning, or are accompanied by symptoms like loud snoring, gasping for air, or extreme daytime sleepiness, consult a healthcare provider or sleep specialist.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Start Your Better Sleep Journey Tonight</h2>
            <p className="mb-6">
              Quality sleep is fundamental to mental health and well-being. Begin implementing these strategies tonight and experience the difference better sleep can make in your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools/free-mental-health-tools"
                className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Try Sleep-Friendly Tools
              </Link>
              <Link
                href="/support/trauma-recovery"
                className="bg-indigo-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-900 transition-colors duration-200 text-center"
              >
                More Mental Health Resources
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