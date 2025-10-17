import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function RealisticMentalHealthExpectationsPage() {
  const faqs = [
    {
      question: 'How long does therapy typically take to work?',
      answer: 'Most people begin noticing improvements within 4-8 sessions (about 1-2 months) of consistent weekly therapy. Significant, lasting change typically requires 3-6 months of regular sessions. However, timeline varies based on condition severity, therapy type, and individual circumstances. Complex trauma or personality-related issues may require 12-24 months or longer.'
    },
    {
      question: 'What are realistic expectations for mindfulness practice?',
      answer: 'Week 1-2: Expect difficulty focusing and restlessness (normal!). Week 3-4: Slightly easier to settle, still challenging. Month 2-3: Moments of genuine calm, noticeable stress reduction. Month 4-6: Mindfulness becoming more natural, applying skills in daily life. Benefits are gradual, not instant—consistency matters more than perfection.'
    },
    {
      question: 'Will I ever feel "completely better" from my mental health condition?',
      answer: '"Completely better" isn\'t always the right goal. Mental health recovery is better understood as: management rather than cure, reduction in symptom frequency/intensity, increased resilience when symptoms occur, and better coping tools for difficult moments. Like physical health, it requires ongoing maintenance—not a one-time fix.'
    },
    {
      question: 'Why do mental health improvements take so long?',
      answer: 'Your brain needs time to form new neural pathways and unlearn old patterns. This neuroplasticity process happens gradually through repeated practice. Additionally, lifestyle changes (sleep, exercise, stress management) take weeks to show effects. Medication adjustments require 4-6 weeks for full impact. Quick fixes don\'t address root causes—sustainable recovery requires patience.'
    },
    {
      question: 'Is it normal to have setbacks during recovery?',
      answer: 'Absolutely. Mental health recovery is rarely linear—you\'ll have good weeks and bad weeks. Setbacks don\'t erase your progress; they\'re part of the process. What matters is overall trajectory over months, not daily fluctuations. Use our app to visualize long-term trends rather than fixating on day-to-day changes.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Realistic Expectations for Mental Health Recovery and Mindfulness',
      description: 'Evidence-based timelines for therapy and mindfulness progress. Learn what to realistically expect from mental health treatment to stay motivated and measure progress accurately.',
      slug: '/support/realistic-mental-health-expectations',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/realistic-mental-health-expectations' },
      { name: 'Realistic Mental Health Expectations', url: '/support/realistic-mental-health-expectations' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Realistic Expectations for Mental Health Recovery & Mindfulness - Free Guide"
        description="Understand realistic timelines for therapy and mindfulness progress. Evidence-based expectations for mental health recovery to help you stay motivated and measure success accurately."
        keywords={[
          'realistic expectations mental health recovery',
          'how long does therapy take to work',
          'mental health recovery timeline',
          'realistic mindfulness expectations',
          'therapy progress expectations',
          'mental health treatment timeline',
          'setting achievable mental health goals',
          'mindfulness progress tracking'
        ]}
        ogImage="/og-realistic-expectations.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>📊</span>
                <span>Set Realistic Goals—See Real Progress</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Understand
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Realistic Expectations
                </span>
                for Mental Health Recovery
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wondering when you'll "feel better"? Learn evidence-based timelines for therapy and mindfulness progress
                so you can set achievable goals, measure real progress, and stay motivated on your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Track Your Progress
                </Link>
                <Link
                  href="#timelines"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  See Realistic Timelines
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Our App Helps */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our Free App Helps You Track Realistic Progress
              </h2>
              <p className="text-xl text-gray-600">
                Measure what matters with evidence-based progress indicators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Long-Term Trend Analysis</h3>
                <p className="text-gray-600">
                  See monthly and quarterly trends rather than daily fluctuations. Visualize the overall trajectory that matters for recovery.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Milestone Celebrations</h3>
                <p className="text-gray-600">
                  Get recognition for realistic milestones: 2 weeks consistent practice, 1 month of tracking, first mood improvement.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expectation-Setting Guidance</h3>
                <p className="text-gray-600">
                  Our AI provides context: "Most people see improvements around 4-6 weeks" based on your specific goals and practices.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                Start tracking your journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Expectations Matter */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Realistic Expectations Are Crucial for Success
              </h2>
              <p className="text-xl text-gray-600">
                Unrealistic expectations are the #1 reason people quit treatment prematurely
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">❌</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Unrealistic Expectations</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>"I'll feel completely better after one therapy session"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>"Meditation will eliminate all my anxiety immediately"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>"I should never have a bad day once I start treatment"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>"Recovery is linear—I'll improve every single week"</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 italic">
                  Result: Frustration, discouragement, premature treatment abandonment
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Realistic Expectations</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>"I'll see some improvements in 4-8 weeks with consistent practice"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>"Meditation will help me manage anxiety, not eliminate it"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>"I'll have ups and downs—that's normal and expected"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>"Recovery has setbacks, but overall trajectory matters"</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 italic">
                  Result: Patience, persistence, accurate progress measurement, sustained recovery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence-Based Timelines */}
        <section id="timelines" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Evidence-Based Mental Health Recovery Timelines
              </h2>
              <p className="text-xl text-gray-600">
                What research actually shows about therapy and mindfulness progress
              </p>
            </div>

            <div className="space-y-8">
              {/* Therapy Timeline */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Therapy Progress Timeline</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Sessions 1-4 (Weeks 1-4)</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Building rapport with therapist, assessment and goal-setting,
                      learning basic coping skills, starting to feel heard and validated.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      You might not feel "better" yet—that's completely normal. Foundation-building is happening.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Sessions 5-12 (Months 2-3)</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Noticeable improvements in specific symptoms, implementing new strategies
                      in daily life, some challenging sessions as deeper issues surface, beginning to see patterns.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      This is when most people start thinking "therapy is working"—stay consistent!
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Sessions 13-24 (Months 4-6)</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Sustained symptom reduction, behavioral changes solidifying, better emotional
                      regulation, preparing for therapy conclusion or transitioning to maintenance sessions.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      For complex issues (trauma, personality disorders), this is just the beginning of longer-term work.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mindfulness Timeline */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mindfulness Practice Timeline</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Week 1-2: The Struggle Phase</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Mind wanders constantly, feeling restless, questioning if you're "doing it right,"
                      possible anxiety or discomfort, wanting to quit.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      This is normal! You're not failing—your brain is just learning something new.
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Week 3-4: The Adjustment Phase</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Slightly easier to settle into practice, noticing mind-wandering faster,
                      occasional moments of calm, still feels effortful but less overwhelming.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      Progress is happening even though it doesn't feel dramatic yet.
                    </p>
                  </div>

                  <div className="border-l-4 border-cyan-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Month 2-3: The Breakthrough Phase</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Noticeable stress reduction after sessions, fewer racing thoughts,
                      applying mindfulness to daily stressors, habit starting to feel natural.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      This is when people typically report "meditation is actually helping!"
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Month 4-6+: The Integration Phase</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">What to expect:</span> Mindfulness becoming second nature, using techniques instinctively during stress,
                      friends/family noticing you're calmer, sustained improvements in mood and anxiety.
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      Long-term practitioners report continued deepening of benefits even years later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measuring Progress */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How to Measure Mental Health Progress Accurately
              </h2>
              <p className="text-xl text-gray-600">
                Look for these evidence-based indicators, not just "feeling better"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Symptom Frequency</h3>
                <p className="text-gray-600">
                  Are panic attacks, depressive episodes, or anxiety spikes happening less often? Even if they still occur, reduced frequency is real progress.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Recovery Speed</h3>
                <p className="text-gray-600">
                  Do you bounce back faster from difficult emotions? If a bad mood used to last days and now lasts hours, that's significant progress.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Coping Skills</h3>
                <p className="text-gray-600">
                  Can you use strategies (breathing, cognitive reframing, reaching out) during stress? Improved coping means progress even if challenges remain.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Self-Awareness</h3>
                <p className="text-gray-600">
                  Are you recognizing triggers and patterns earlier? Increased self-awareness is a key indicator of mental health improvement.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Relationship Quality</h3>
                <p className="text-gray-600">
                  Are your relationships improving? Less conflict, better communication, and increased connection indicate emotional growth.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Functional Ability</h3>
                <p className="text-gray-600">
                  Can you meet responsibilities better? Going to work, maintaining hygiene, or completing tasks are concrete progress markers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Recovery Expectations
              </h2>
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
        </section>

        {/* Redefining Recovery */}
        <section className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Redefining "Recovery": What It Really Means
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  Mental health recovery isn't about returning to some perfect, symptom-free state. It's about:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">✓</span>
                    <span><span className="font-semibold">Management, not cure:</span> Learning to live well with your condition, not eliminating it entirely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">✓</span>
                    <span><span className="font-semibold">Resilience building:</span> Developing skills to handle difficult emotions when they arise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">✓</span>
                    <span><span className="font-semibold">Symptom reduction:</span> Decreasing frequency, intensity, and duration of symptoms—not total elimination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">✓</span>
                    <span><span className="font-semibold">Quality of life:</span> Living a meaningful, fulfilling life even with occasional struggles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1 text-xl">✓</span>
                    <span><span className="font-semibold">Ongoing practice:</span> Maintaining habits and tools, like physical health maintenance</span>
                  </li>
                </ul>
                <p className="text-lg italic mt-6 border-l-4 border-blue-600 pl-4">
                  "Recovery is not about becoming normal. It's about becoming the best version of yourself, with all your unique experiences and strengths."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Mental Health Recovery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/support/meditation-consistency" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Building a Sustainable Meditation Habit
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Evidence-based strategies for consistent practice
                  </p>
                  <span className="text-blue-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/support/emotional-exhaustion-burnout" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Burnout Recovery Timeline & Strategies
                  </h3>
                  <p className="text-gray-600 mb-4">
                    What to expect during emotional exhaustion recovery
                  </p>
                  <span className="text-blue-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/support/affordable-mental-health-care" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Finding Affordable Mental Health Therapy
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access professional support without cost barriers
                  </p>
                  <span className="text-blue-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Track Your Recovery with Realistic Milestones
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Use our free app to measure progress accurately, celebrate realistic achievements, and stay motivated with evidence-based expectations.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Tracking Progress Today
            </Link>
            <p className="text-blue-100 mt-4 text-sm">
              No cost. No pressure. Just support for your journey to realistic, sustainable recovery.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
