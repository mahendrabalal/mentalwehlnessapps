import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function EmotionalExhaustionBurnoutPage() {
  const faqs = [
    {
      question: 'What is emotional exhaustion and how is it different from regular tiredness?',
      answer: 'Emotional exhaustion is a state of feeling emotionally drained and depleted due to accumulated stress. Unlike regular tiredness that improves with rest, emotional exhaustion persists even after sleep and can affect your ability to cope with daily life. It often includes feelings of being emotionally overextended, cynical, and detached from work or relationships.'
    },
    {
      question: 'What are the early warning signs of burnout?',
      answer: 'Early signs include: persistent fatigue that doesn\'t improve with rest, difficulty concentrating, increased irritability, changes in sleep or appetite, withdrawal from responsibilities, feeling cynical or detached, reduced performance at work or school, and physical symptoms like headaches or stomach problems. Catching these signs early is crucial for prevention.'
    },
    {
      question: 'How can I recover from severe emotional burnout naturally?',
      answer: 'Recovery involves: 1) Setting firm boundaries and saying no to additional commitments, 2) Prioritizing rest and sleep, 3) Engaging in activities that restore your energy (not just distract), 4) Practicing self-compassion, 5) Connecting with supportive people, 6) Incorporating daily stress management techniques like mindfulness or gentle exercise, and 7) Considering professional support if symptoms persist.'
    },
    {
      question: 'How long does it take to recover from burnout?',
      answer: 'Recovery time varies based on severity and individual circumstances. Mild burnout may improve in weeks with lifestyle changes. Moderate to severe burnout typically requires 3-6 months of consistent self-care and boundary-setting. Complete recovery can take up to a year, especially if workplace or life circumstances contributed to the burnout. The key is addressing root causes, not just symptoms.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Emotional Exhaustion & Burnout Recovery - Natural Coping Strategies',
      description: 'Comprehensive guide to understanding, preventing, and recovering from emotional exhaustion and burnout. Evidence-based strategies and free support tools.',
      slug: '/support/emotional-exhaustion-burnout',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/emotional-exhaustion-burnout' },
      { name: 'Emotional Exhaustion & Burnout', url: '/support/emotional-exhaustion-burnout' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Emotional Exhaustion & Burnout Recovery - Free Support & Natural Strategies"
        description="Feeling emotionally drained? Learn how to recognize, prevent, and recover from burnout naturally. Free tools for tracking exhaustion, setting boundaries, and restoring your energy."
        keywords={[
          'emotional exhaustion',
          'burnout recovery',
          'cope with emotional exhaustion naturally',
          'burnout symptoms',
          'recovering from severe burnout',
          'workplace burnout',
          'emotional burnout signs',
          'prevent burnout'
        ]}
        ogImage="/og-burnout-recovery.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🔥</span>
                <span>You're Not Alone—Burnout is Real</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Recover from
                <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Emotional Exhaustion
                </span>
                and Burnout
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Feeling emotionally drained, overwhelmed, and depleted? Learn evidence-based strategies to recognize burnout,
                set boundaries, and restore your energy—naturally and at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/burnout-assessment"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Try Free Burnout Assessment →
                </Link>
                <Link
                  href="#symptoms"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Recognize the Signs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Our App Helps with Burnout */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our Free App Helps You Recover from Burnout
              </h2>
              <p className="text-xl text-gray-600">
                Evidence-based tools designed specifically for burnout recovery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Your Burnout Risk</h3>
                <p className="text-gray-600">
                  Daily check-ins monitor emotional exhaustion levels and identify patterns before full burnout occurs.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Early Warning System</h3>
                <p className="text-gray-600">
                  Get alerted when stress levels spike or sleep quality drops—key indicators of impending burnout.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recovery Action Plans</h3>
                <p className="text-gray-600">
                  Personalized recommendations for boundary-setting, rest, and energy restoration based on your patterns.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg"
              >
                Start your burnout recovery journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Burnout Symptoms */}
        <section id="symptoms" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recognizing the Signs of Emotional Burnout
              </h2>
              <p className="text-xl text-gray-600">
                Early detection is key to preventing severe burnout
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Emotional Signs */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">😔</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Emotional Signs</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Feeling emotionally drained or depleted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Increased irritability and impatience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Feeling cynical or detached from work/life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Sense of failure or self-doubt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Loss of motivation and purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Feeling helpless or trapped</span>
                  </li>
                </ul>
              </div>

              {/* Physical & Behavioral Signs */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🤕</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Physical & Behavioral</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Chronic fatigue and exhaustion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Frequent illnesses or lowered immunity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Headaches or muscle tension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Changes in sleep or appetite</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Withdrawing from responsibilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Procrastination and decreased performance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800 font-semibold">
                    Important: If you're experiencing several of these symptoms, especially suicidal thoughts, please seek immediate professional help.
                    Call 988 (Suicide & Crisis Lifeline) or visit your local emergency room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Strategies */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Evidence-Based Burnout Recovery Strategies
              </h2>
              <p className="text-xl text-gray-600">
                Natural approaches to restore your energy and resilience
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Set Firm Boundaries</h3>
                    <p className="text-gray-700">
                      Learn to say "no" to additional commitments. Establish work-life boundaries like no emails after 6pm.
                      Protect your personal time fiercely—it's essential for recovery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Prioritize Rest and Sleep</h3>
                    <p className="text-gray-700">
                      Aim for 7-9 hours of quality sleep. Create a relaxing bedtime routine. Rest isn't lazy—it's a biological necessity for recovery.
                      Our app tracks your sleep patterns to help optimize rest.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Engage in Restorative Activities</h3>
                    <p className="text-gray-700">
                      Do things that genuinely restore your energy, not just distract. Nature walks, creative hobbies, gentle exercise, meditation.
                      Our AI companion helps identify what truly recharges you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Self-Compassion</h3>
                    <p className="text-gray-700">
                      Stop pushing yourself harder. Burnout isn't weakness—it's your body's alarm system.
                      Treat yourself with the same kindness you'd offer a friend going through this.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Connect with Support</h3>
                    <p className="text-gray-700">
                      Don't isolate. Talk to trusted friends, family, or a therapist. Join support groups.
                      Use our free AI companion for 24/7 support when you need someone to talk to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Burnout
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

        {/* Related Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Burnout Recovery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    7 Evidence-Based Ways to Recover from Severe Burnout
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Research-backed strategies for overcoming emotional exhaustion
                  </p>
                  <span className="text-orange-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Workplace Burnout Recovery for Healthcare Workers
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Specialized strategies for high-stress professions
                  </p>
                  <span className="text-orange-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Setting Boundaries to Prevent Burnout
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Practical guide to saying no and protecting your energy
                  </p>
                  <span className="text-orange-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Burnout Recovery Journey Today
            </h2>
            <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              Track your emotional exhaustion, identify patterns, and get personalized recovery recommendations—all completely free.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-orange-100 mt-4 text-sm">
              No cost. No credit card. Just support when you need it most.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
