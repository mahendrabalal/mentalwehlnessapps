import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function EmotionalResistanceMeditationPage() {
  const faqs = [
    {
      question: 'Why does meditation make me feel anxious or uncomfortable?',
      answer: 'It\'s completely normal to feel anxiety during meditation, especially when you\'re new to the practice. Meditation brings awareness to thoughts and feelings you may have been avoiding. This increased awareness can temporarily intensify uncomfortable emotions before they begin to ease. Think of it like cleaning a cluttered room—things might look messier at first, but the process leads to greater clarity.'
    },
    {
      question: 'What is emotional resistance in meditation?',
      answer: 'Emotional resistance is your mind\'s natural defense mechanism against uncomfortable feelings that arise during meditation. It can manifest as restlessness, wanting to quit, distracting thoughts, or even physical sensations like tension. This resistance is actually a sign that meditation is working—you\'re becoming aware of emotions that need processing.'
    },
    {
      question: 'How can I manage anxiety that comes up during meditation practice?',
      answer: 'Start with shorter sessions (2-3 minutes), practice with your eyes open if closed eyes feel too intense, use guided meditations with a calming voice, focus on physical sensations (body scan) rather than emotions initially, and remind yourself that feeling uncomfortable is temporary and part of the healing process. Our app offers anxiety-adapted meditation practices specifically designed for this.'
    },
    {
      question: 'Should I stop meditating if it makes me feel worse?',
      answer: 'Not necessarily, but it\'s important to distinguish between temporary discomfort (normal) and overwhelming distress (requires professional support). If meditation brings up trauma responses, panic attacks, or thoughts of self-harm, pause the practice and consult a mental health professional. For mild to moderate anxiety, continuing with gentler approaches usually helps—the key is finding the right technique and pace for you.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Managing Anxiety and Emotional Resistance in Meditation Practice',
      description: 'Learn why meditation can cause anxiety and how to work with emotional resistance. Evidence-based techniques for making meditation more comfortable and sustainable.',
      slug: '/support/emotional-resistance-meditation',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/emotional-resistance-meditation' },
      { name: 'Emotional Resistance in Meditation', url: '/support/emotional-resistance-meditation' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Managing Anxiety & Emotional Resistance in Meditation - Free Support"
        description="Does meditation make you anxious? Learn evidence-based techniques for managing emotional resistance in mindfulness practice. Free guided meditations designed for anxiety and discomfort."
        keywords={[
          'managing anxiety in meditation',
          'emotional resistance meditation',
          'meditation makes me anxious',
          'why meditation feels uncomfortable',
          'overcoming fear of mindfulness',
          'dealing with uncomfortable emotions meditation',
          'meditation anxiety relief',
          'mindfulness for emotional discomfort'
        ]}
        ogImage="/og-meditation-resistance.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🧘</span>
                <span>You're Not Alone—Meditation Can Feel Uncomfortable</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage
                <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Anxiety & Emotional Resistance
                </span>
                in Meditation Practice
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Feeling anxious, restless, or uncomfortable during meditation? Learn evidence-based techniques to work with
                emotional resistance instead of fighting it—making mindfulness accessible and sustainable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Try Anxiety-Adapted Meditation
                </Link>
                <Link
                  href="#why-uncomfortable"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Understand Why This Happens
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
                How Our Free App Helps You Work with Emotional Resistance
              </h2>
              <p className="text-xl text-gray-600">
                Meditation practices designed specifically for anxiety and discomfort
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gentle, Gradual Exposure</h3>
                <p className="text-gray-600">
                  Start with 2-minute sessions and gradually increase as comfort grows. Our AI adjusts practice length based on your anxiety levels.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Resistance-Aware Guidance</h3>
                <p className="text-gray-600">
                  Guided meditations that acknowledge discomfort and teach you to work with it rather than suppress it.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Practice Styles</h3>
                <p className="text-gray-600">
                  Choose from body scans, movement meditation, breathing exercises, or visualization—find what feels safest for you.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg"
              >
                Start practicing with less resistance
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Meditation Feels Uncomfortable */}
        <section id="why-uncomfortable" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Meditation Can Make You Feel Anxious or Uncomfortable
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the psychology behind emotional resistance
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">1</span>
                  Increased Awareness of Suppressed Emotions
                </h3>
                <p className="text-gray-700 ml-11">
                  When you slow down and become quiet, emotions you've been unconsciously avoiding can surface. This isn't meditation
                  "causing" anxiety—it's revealing anxiety that was already there, giving you an opportunity to process it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold">2</span>
                  Loss of Distraction as a Coping Mechanism
                </h3>
                <p className="text-gray-700 ml-11">
                  Many of us stay busy to avoid uncomfortable feelings. Meditation removes this distraction buffer, which can initially
                  feel overwhelming. Your mind might resist by creating restlessness, urgency, or anxiety.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-bold">3</span>
                  The "Relaxation-Induced Anxiety" Paradox
                </h3>
                <p className="text-gray-700 ml-11">
                  Research shows that for people with chronic anxiety, sudden relaxation can trigger anxiety symptoms. Your nervous system
                  is so used to being on high alert that calmness feels dangerous or unfamiliar.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">4</span>
                  Trauma Activation
                </h3>
                <p className="text-gray-700 ml-11">
                  For individuals with trauma history, the vulnerability of meditation can trigger protective responses. If this happens,
                  it's crucial to work with a trauma-informed therapist alongside your meditation practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques for Managing Resistance */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                7 Evidence-Based Techniques for Managing Emotional Resistance
              </h2>
              <p className="text-xl text-gray-600">
                Practical strategies to make meditation more comfortable
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Start with Micro-Meditations</h3>
                    <p className="text-gray-700">
                      Begin with just 1-2 minutes. Anxiety often increases with session length. Shorter practices build tolerance gradually
                      without overwhelming your nervous system. Our app offers ultra-short "anxiety-safe" meditations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Practice with Eyes Open</h3>
                    <p className="text-gray-700">
                      Closed eyes can intensify internal discomfort. Try meditating with a soft gaze directed downward at a 45-degree angle.
                      This "open monitoring" technique is less triggering for anxious minds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Use Body-Focused Meditation</h3>
                    <p className="text-gray-700">
                      Focus on physical sensations (body scan, feeling your feet on the floor) rather than emotions. This provides an anchor
                      that feels more concrete and less threatening than directly observing difficult feelings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Label the Resistance</h3>
                    <p className="text-gray-700">
                      When anxiety arises, mentally note "this is resistance" or "anxiety is here." Labeling creates distance between you
                      and the feeling, reducing its power. You're observing it rather than being consumed by it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Try Movement Meditation</h3>
                    <p className="text-gray-700">
                      Walking meditation, yoga, or tai chi can be less anxiety-provoking than sitting still. Movement provides a release
                      valve for nervous energy while maintaining mindful awareness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                      6
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Use Guided Meditations with Voice</h3>
                    <p className="text-gray-700">
                      A calming voice provides structure and prevents spiraling thoughts. Guided practices feel less isolating and give
                      your mind something external to focus on during difficult moments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                      7
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Self-Compassion</h3>
                    <p className="text-gray-700">
                      Treat yourself kindly when resistance arises. Instead of "I'm bad at this," try "This is challenging right now, and
                      that's okay." Self-compassion reduces the secondary anxiety about feeling anxious.
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
                Frequently Asked Questions About Meditation Anxiety
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

        {/* When to Seek Professional Help */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    When to Seek Professional Support
                  </h3>
                  <div className="text-sm text-red-700 space-y-2">
                    <p>
                      Consult a mental health professional if meditation triggers:
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Panic attacks or severe anxiety that doesn't ease after the session</li>
                      <li>Flashbacks or trauma responses</li>
                      <li>Dissociation or feeling disconnected from reality</li>
                      <li>Thoughts of self-harm or suicide</li>
                      <li>Anxiety that interferes with daily functioning</li>
                    </ul>
                    <p className="font-semibold mt-4">
                      If you're in crisis, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line) immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Mindfulness and Anxiety
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/support/managing-anxiety-naturally" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Managing Anxiety Naturally with Mindfulness
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guide to anxiety-reduction techniques
                  </p>
                  <span className="text-purple-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/support/mindfulness-for-beginners" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mindfulness Meditation for Beginners
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start your practice with beginner-friendly techniques
                  </p>
                  <span className="text-purple-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    The Science Behind Meditation and Anxiety
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Research-backed explanations and clinical insights
                  </p>
                  <span className="text-purple-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Try Meditation Designed for Anxious Minds
            </h2>
            <p className="text-xl text-purple-50 mb-8 max-w-2xl mx-auto">
              Access ultra-short, guided practices that work with resistance instead of against it—completely free.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Practicing Today
            </Link>
            <p className="text-purple-100 mt-4 text-sm">
              No cost. No pressure. Just support when meditation feels hard.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
