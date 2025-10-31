import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function CombatLonelinessIsolationPage() {
  const faqs = [
    {
      question: 'What is the difference between loneliness and being alone?',
      answer: 'Being alone is a physical state—having no one around. Loneliness is an emotional state—feeling disconnected even when surrounded by people. You can feel lonely in a crowd or perfectly content when alone. Loneliness is about the quality of connections, not quantity.'
    },
    {
      question: 'How can mindfulness help with feelings of loneliness?',
      answer: 'Mindfulness helps by: 1) Reducing rumination about feeling lonely, 2) Increasing self-compassion and acceptance, 3) Helping you be present with emotions without judgment, 4) Building awareness of negative thought patterns that worsen loneliness, and 5) Creating space for connection with yourself, which can reduce the pain of isolation.'
    },
    {
      question: 'What are practical ways to combat loneliness when I have no close friends?',
      answer: 'Start small: Join interest-based groups (book clubs, sports, volunteering), take classes, use apps for connecting with others, reach out to acquaintances for coffee, adopt a pet, engage in online communities, use our AI companion for 24/7 support, and consider therapy to work through barriers to connection. Building friendships takes time—be patient with yourself.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Combat Loneliness & Social Isolation - Mindfulness & Self-Care Support',
      description: 'Practical strategies to overcome loneliness using mindfulness, self-care, and connection. Free 24/7 AI companion and evidence-based techniques.',
      slug: '/support/combat-loneliness-isolation',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/combat-loneliness-isolation' },
      { name: 'Combat Loneliness', url: '/support/combat-loneliness-isolation' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Combat Loneliness - Free 24/7 Support & Tips"
        description="Overcome loneliness with mindfulness, self-care, and meaningful connections. Evidence-based strategies with free 24/7 AI companion."
        publishedTime={SUPPORT_PAGES_DATES['combat-loneliness-isolation'].published}
        modifiedTime={SUPPORT_PAGES_DATES['combat-loneliness-isolation'].modified}
        keywords={[
          'combat loneliness',
          'overcoming social isolation',
          'loneliness and mindfulness',
          'ways to combat loneliness',
          'feeling alone',
          'social isolation coping strategies',
          'loneliness self-care',
          'mindfulness for loneliness'
        ]}
        ogImage="/og-loneliness-support.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🤝</span>
                <span>You Are Not Alone in Feeling Alone</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Combat Loneliness
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  and Social Isolation
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Loneliness is a deeply human experience. Learn evidence-based strategies using mindfulness, self-care,
                and connection—plus get 24/7 support from our free AI companion when you need someone to talk to.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/loneliness-assessment"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Get Free 24/7 Support
                </Link>
                <Link
                  href="#strategies"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn Strategies
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
                How Our Free App Helps Combat Loneliness
              </h2>
              <p className="text-xl text-gray-600">
                Always here when you need someone—completely free, 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 AI Companion</h3>
                <p className="text-gray-600">
                  Someone to talk to anytime, day or night. Non-judgmental, always available, completely free.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mindfulness Exercises</h3>
                <p className="text-gray-600">
                  Guided practices specifically designed to ease feelings of loneliness and social isolation.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Resources</h3>
                <p className="text-gray-600">
                  Find local support groups, community events, and ways to build meaningful connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section id="strategies" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10 Mindfulness Practices to Combat Loneliness
              </h2>
              <p className="text-xl text-gray-600">
                Evidence-based techniques for easing social isolation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Loving-Kindness Meditation', description: 'Send compassion to yourself and others, reducing feelings of isolation' },
                { title: 'Body Scan Practice', description: 'Connect with physical sensations to ground yourself in the present moment' },
                { title: 'Gratitude Journaling', description: 'Focus on positive connections, even small ones, to shift perspective' },
                { title: 'Mindful Walking', description: 'Be present during walks, noticing your environment and potential connections' },
                { title: 'Self-Compassion Break', description: 'Treat yourself with kindness when loneliness feels overwhelming' },
                { title: 'Breathing Exercises', description: 'Calm the nervous system activated by feelings of isolation' },
                { title: 'Mindful Listening', description: 'Practice deep listening with our AI companion or in conversations' },
                { title: 'Present Moment Awareness', description: 'Reduce rumination about loneliness by staying in the now' },
                { title: 'Nature Connection', description: 'Mindfully engage with nature to feel part of something larger' },
                { title: 'Creative Expression', description: 'Use art, writing, or music to process and express feelings' }
              ].map((practice, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {practice.title}</h3>
                  <p className="text-gray-600">{practice.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-Care Tips */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Self-Care When You're Feeling Lonely
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🌟 Reach Out (Even When It's Hard)</h3>
                <p className="text-gray-700">Text an old friend, call a family member, or chat with our AI companion. Connection combats isolation.</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🏃 Move Your Body</h3>
                <p className="text-gray-700">Exercise releases endorphins and can lead to social interaction (gym, classes, walking groups).</p>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🤝 Volunteer or Help Others</h3>
                <p className="text-gray-700">Serving others creates connection and gives purpose, both powerful antidotes to loneliness.</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">📚 Join Interest-Based Groups</h3>
                <p className="text-gray-700">Book clubs, sports leagues, art classes—shared interests make connection easier.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🐾 Consider a Pet</h3>
                <p className="text-gray-700">Pets provide companionship and can facilitate social interaction with other pet owners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Questions About Loneliness
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              You Don't Have to Face Loneliness Alone
            </h2>
            <p className="text-xl text-purple-50 mb-8 max-w-2xl mx-auto">
              Get 24/7 support from our AI companion, mindfulness exercises, and connection resources—completely free.
            </p>
            <Link
              href="/tools/loneliness-assessment"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Free Today
            </Link>
            <p className="text-purple-100 mt-4 text-sm">
              No cost. No judgment. Just support when you need it most.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
