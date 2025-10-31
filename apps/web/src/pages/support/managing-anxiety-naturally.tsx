import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function ManagingAnxietyNaturallyPage() {
  const faqs = [
    {
      question: 'What mindfulness techniques reduce anxiety symptoms quickly?',
      answer: 'The most effective quick techniques are: 5-4-3-2-1 grounding (interrupts panic), box breathing (calms nervous system in 2 minutes), body scan (releases physical tension), and progressive muscle relaxation. Our app offers guided versions of all these techniques, available 24/7 when anxiety hits.'
    },
    {
      question: 'Can mindfulness really help with anxiety disorders like GAD?',
      answer: 'Yes! Research shows mindfulness-based interventions significantly reduce anxiety symptoms in people with Generalized Anxiety Disorder (GAD). Mindfulness helps by: reducing rumination, increasing present-moment awareness, building tolerance for uncomfortable sensations, and breaking the anxiety-avoidance cycle. It works best when combined with therapy for moderate-severe anxiety.'
    },
    {
      question: 'How do I combine CBT and mindfulness for anxiety?',
      answer: 'CBT and mindfulness complement each other perfectly. CBT helps identify and challenge anxious thoughts, while mindfulness teaches you to observe thoughts without reacting. Together: Use CBT to reframe catastrophic thinking, use mindfulness to notice anxiety without judgment, practice exposure (CBT) with mindful awareness, and apply both during panic attacks (CBT coping statements + mindfulness breathing).'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Managing Anxiety Naturally - Mindfulness Techniques for Quick Relief',
      description: 'Evidence-based mindfulness techniques to reduce anxiety symptoms quickly. Free guided exercises, CBT strategies, and 24/7 support for panic attacks and GAD.',
      slug: '/support/managing-anxiety-naturally',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/managing-anxiety-naturally' },
      { name: 'Managing Anxiety Naturally', url: '/support/managing-anxiety-naturally' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Managing Anxiety Naturally - Quick Relief Tips"
        description="Reduce anxiety fast with mindfulness techniques. Free guided exercises for panic attacks, GAD, and everyday anxiety. CBT + mindfulness strategies."
        publishedTime={SUPPORT_PAGES_DATES['managing-anxiety-naturally'].published}
        modifiedTime={SUPPORT_PAGES_DATES['managing-anxiety-naturally'].modified}
        keywords={[
          'mindfulness techniques to reduce anxiety',
          'quick anxiety relief',
          'anxiety symptoms management',
          'natural anxiety relief',
          'CBT for anxiety',
          'mindfulness for GAD',
          'panic attack relief'
        ]}
        ogImage="/og-anxiety-relief.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage Anxiety
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Naturally & Effectively
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Evidence-based mindfulness techniques for quick anxiety relief. Learn to calm panic attacks, manage GAD symptoms, and reduce everyday anxiety—naturally and at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools/anxiety-relief" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg">
                  Try Free Anxiety Relief Tools →
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No signup required • Evidence-based techniques • Works instantly
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Relief Techniques (2-5 Minutes)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">5-4-3-2-1 Grounding Exercise</h3>
                <p className="text-gray-700 mb-3">Interrupts panic by bringing you to the present moment.</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 5 things you can see</li>
                  <li>• 4 things you can touch</li>
                  <li>• 3 things you can hear</li>
                  <li>• 2 things you can smell</li>
                  <li>• 1 thing you can taste</li>
                </ul>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Box Breathing for Anxiety</h3>
                <p className="text-gray-700 mb-3">Calms nervous system in 2 minutes.</p>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Inhale for 4 counts</li>
                  <li>2. Hold for 4 counts</li>
                  <li>3. Exhale for 6 counts (longer = more calming)</li>
                  <li>4. Hold for 4 counts</li>
                  <li>5. Repeat 5-10 times</li>
                </ol>
              </div>

              <div className="bg-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Progressive Muscle Relaxation</h3>
                <p className="text-gray-700 mb-3">Releases physical tension from anxiety.</p>
                <p className="text-gray-600">Tense each muscle group for 5 seconds, then release: Fists → arms → shoulders → face → stomach → legs → feet. Notice the difference between tension and relaxation.</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Mindful Observation</h3>
                <p className="text-gray-700 mb-3">Interrupts anxious thought spirals.</p>
                <p className="text-gray-600">Pick an object. Observe it for 2 minutes as if you've never seen it before. Notice: color, texture, shape, shadows, details. When anxious thoughts intrude, return to the object.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Our Free App Helps with Anxiety</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-2">📊 Track Anxiety Patterns</h3>
                <p className="text-gray-600">Identify triggers, track severity over time, and see what techniques work best for you.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-2">🚨 Panic Attack Emergency Plan</h3>
                <p className="text-gray-600">Immediate access to grounding exercises and breathing techniques when anxiety spikes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-2">💬 24/7 AI Support</h3>
                <p className="text-gray-600">Talk through anxious thoughts anytime with our AI companion trained in CBT techniques.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">FAQ</h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Try These Techniques?</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Access our interactive anxiety relief tools with guided exercises for breathing, grounding, and panic attacks—all 100% free, no signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/anxiety-relief" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                Try Anxiety Relief Tools →
              </Link>
              <Link href="/auth/signup?redirect=/tools/anxiety-relief" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg border-2 border-white">
                Sign Up to Save Progress
              </Link>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              ✓ No credit card required  •  ✓ Works instantly  •  ✓ Evidence-based
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
