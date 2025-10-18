import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function MindfulnessForBeginnersPage() {
  const faqs = [
    {
      question: 'How can I stay focused during mindfulness meditation if I have ADHD?',
      answer: 'Start with very short sessions (1-2 minutes), use guided meditations with a voice to follow, try movement-based practices like walking meditation, focus on physical sensations (easier than breath), and be compassionate with yourself when your mind wanders—that\'s normal, especially with ADHD. Our app offers ADHD-friendly short practices designed for wandering minds.'
    },
    {
      question: 'Why does my mind wander so much during meditation?',
      answer: 'Mind wandering is completely normal and happens to everyone, not just beginners. The brain\'s default mode is to think and plan. Meditation isn\'t about stopping thoughts—it\'s about noticing when you\'ve wandered and gently returning to your focus point. Each time you notice and return, you\'re actually succeeding at meditation.'
    },
    {
      question: 'How long should beginners meditate?',
      answer: 'Start with just 2-5 minutes daily. Consistency matters more than duration. It\'s better to meditate for 3 minutes every day than 30 minutes once a week. Once 5 minutes feels manageable, gradually increase by 1-2 minutes per week. Many people find 10-20 minutes daily is their sweet spot.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Mindfulness Meditation for Beginners - How to Stay Focused',
      description: 'Learn mindfulness meditation even if you can\'t focus. ADHD-friendly techniques, short practices, and tips for dealing with a wandering mind. 100% free guided exercises.',
      slug: '/support/mindfulness-for-beginners',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/mindfulness-for-beginners' },
      { name: 'Mindfulness for Beginners', url: '/support/mindfulness-for-beginners' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Mindfulness for Beginners - Stay Focused During Meditation | Free Guide"
        description="Can't focus during meditation? Learn beginner-friendly mindfulness techniques, ADHD-friendly practices, and 2-minute exercises. Free guided meditations and support."
        keywords={[
          'mindfulness meditation for beginners',
          'how to stay focused during meditation',
          'ADHD friendly meditation',
          'short meditation practices',
          'dealing with wandering mind',
          'beginner meditation tips',
          'mindfulness for people who can\'t focus'
        ]}
        ogImage="/og-mindfulness-beginners.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-b from-green-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🧘</span>
                <span>You Don't Need a Quiet Mind to Meditate</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Mindfulness for
                <span className="block bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Beginners & Busy Minds
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Struggling to focus during meditation? Can't sit still? Mind won't stop racing?
                Learn beginner-friendly techniques that work even when your brain feels like a browser with 100 tabs open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/mindfulness"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Try Free Mindfulness Exercises →
                </Link>
                <Link
                  href="#techniques"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn Techniques
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our Free App Helps Beginners Learn Mindfulness
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Super Short</h3>
                <p className="text-gray-600">
                  2-minute guided practices designed for beginners. Build the habit first, extend duration later.
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ADHD-Friendly Options</h3>
                <p className="text-gray-600">
                  Movement-based practices, body scans, and techniques specifically designed for wandering minds.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Your Progress</h3>
                <p className="text-gray-600">
                  See your consistency build over time. Small daily wins lead to lasting mindfulness habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="techniques" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Beginner-Friendly Mindfulness Techniques
              </h2>
              <p className="text-xl text-gray-600">
                No experience needed—just curiosity and 2 minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🫁 Box Breathing (2 minutes)</h3>
                <p className="text-gray-600 mb-4">Perfect for focus issues. Physical and structured.</p>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex"><span className="font-bold mr-2">1.</span> Breathe in for 4 counts</li>
                  <li className="flex"><span className="font-bold mr-2">2.</span> Hold for 4 counts</li>
                  <li className="flex"><span className="font-bold mr-2">3.</span> Breathe out for 4 counts</li>
                  <li className="flex"><span className="font-bold mr-2">4.</span> Hold for 4 counts</li>
                  <li className="flex"><span className="font-bold mr-2">5.</span> Repeat 5 times</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🖐️ 5-4-3-2-1 Grounding (3 minutes)</h3>
                <p className="text-gray-600 mb-4">Great for anxious or racing minds.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex"><span className="mr-2">•</span> Name 5 things you can see</li>
                  <li className="flex"><span className="mr-2">•</span> Name 4 things you can touch</li>
                  <li className="flex"><span className="mr-2">•</span> Name 3 things you can hear</li>
                  <li className="flex"><span className="mr-2">•</span> Name 2 things you can smell</li>
                  <li className="flex"><span className="mr-2">•</span> Name 1 thing you can taste</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🚶 Walking Meditation (5 minutes)</h3>
                <p className="text-gray-600 mb-4">Perfect for people who can't sit still.</p>
                <p className="text-gray-700">
                  Walk slowly, noticing: Feet touching ground, Weight shifting, Legs moving, Air on skin, Sounds around you.
                  When mind wanders (it will!), gently return focus to walking sensations.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🧘 Body Scan (5 minutes)</h3>
                <p className="text-gray-600 mb-4">Easier focus point than breath for beginners.</p>
                <p className="text-gray-700">
                  Lying down or seated, slowly bring attention to each body part: Toes → feet → legs → belly → chest → arms → hands → neck → head.
                  Notice sensations without judgment. Mind will wander—that's okay, return to body.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-green-100 border-l-4 border-green-600 p-6 rounded-r-lg">
              <p className="text-green-900 font-semibold">
                💡 Pro Tip: Your mind WILL wander during meditation. That's not failure—that's literally the practice!
                Each time you notice and return your focus, you're strengthening your mindfulness muscle.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Beginner Mistakes (And How to Fix Them)
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Mistake: "I need to clear my mind completely"</h3>
                <p className="text-gray-700">✅ Fix: Meditation isn't about having zero thoughts. It's about noticing thoughts without getting caught up in them.</p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Mistake: Starting with 20-minute sessions</h3>
                <p className="text-gray-700">✅ Fix: Start with 2-3 minutes. Build consistency first, duration second.</p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Mistake: "My mind wandered, so I failed"</h3>
                <p className="text-gray-700">✅ Fix: Mind wandering is normal! Noticing it and returning to focus IS the meditation.</p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Mistake: Meditating only when calm</h3>
                <p className="text-gray-700">✅ Fix: Practice when anxious, distracted, or upset. That's when you need it most!</p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Mistake: No consistency—meditating randomly</h3>
                <p className="text-gray-700">✅ Fix: Same time, same place daily. Even 2 minutes every morning beats 30 minutes once a week.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
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

        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Mindfulness Journey Today
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              2-minute guided practices, ADHD-friendly techniques, and progress tracking—all completely free.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-green-100 mt-4 text-sm">
              No experience needed. Just 2 minutes a day.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
