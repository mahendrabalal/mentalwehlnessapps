import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function OvercomeMentalHealthStigmaPage() {
  const faqs = [
    {
      question: 'How do I overcome the stigma around mental health in my family?',
      answer: 'Start by educating yourself on mental health facts so you can address misconceptions with confidence. Choose the right time and person to talk to first—perhaps someone more open-minded. Use "I" statements to share your experience without accusing others. Share educational resources, and be patient—changing deeply held beliefs takes time. Remember, you don\'t need everyone\'s approval to seek help.'
    },
    {
      question: 'What are some ways men can overcome mental health stigma?',
      answer: 'Men face unique stigma around mental health, often tied to expectations of being "strong" or "tough." Overcome this by: 1) Reframing help-seeking as strength, not weakness, 2) Finding male role models who talk openly about mental health, 3) Using anonymous resources initially if public disclosure feels too vulnerable, 4) Joining men-specific support groups where these barriers are understood, and 5) Focusing on practical problem-solving aspects of therapy, which resonates with many men.'
    },
    {
      question: 'Can I get mental health support anonymously?',
      answer: 'Yes! Many options exist for anonymous support: Our free app (no real name required), Crisis hotlines (988, Crisis Text Line), Online forums and support groups, Anonymous therapy apps, and Self-help resources. Starting anonymously can help you build confidence before seeking more visible support.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Overcoming Mental Health Stigma - Private Support & Breaking Barriers',
      description: 'Break through mental health stigma and get the support you deserve. Learn how to talk to family, overcome cultural barriers, and access judgment-free help.',
      slug: '/support/overcome-mental-health-stigma',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/overcome-mental-health-stigma' },
      { name: 'Overcome Mental Health Stigma', url: '/support/overcome-mental-health-stigma' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Overcoming Mental Health Stigma - Private, Judgment-Free Support"
        description="Don't let stigma stop you from getting help. Learn how to overcome mental health stigma, talk to family about therapy, and access private, judgment-free support through our free app."
        keywords={[
          'overcoming stigma around mental health',
          'mental health stigma in men',
          'talking about mental health',
          'cultural barriers to mental health',
          'mental health stigma family',
          'anonymous mental health support',
          'breaking mental health stigma',
          'judgment-free therapy'
        ]}
        ogImage="/og-stigma-support.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>You're Not Alone</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Break Free from
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Mental Health Stigma
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fear of judgment shouldn't prevent you from getting help. Learn how to overcome stigma, talk to family,
                and access private, judgment-free mental health support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/stigma-assessment"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Get Private Support Now
                </Link>
                <Link
                  href="#stigma-types"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Understand Stigma
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
                How Our Free App Helps You Overcome Stigma
              </h2>
              <p className="text-xl text-gray-600">
                Private, judgment-free support that breaks down barriers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Private & Confidential</h3>
                <p className="text-gray-600">
                  No one needs to know you're getting help. Use our app completely privately—no real name required, no insurance records.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Judgment Zone</h3>
                <p className="text-gray-600">
                  Our AI companion never judges, never criticizes. Just compassionate support whenever you need it.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build Confidence Privately</h3>
                <p className="text-gray-600">
                  Start your mental health journey in private before deciding if/when to tell others. Take your time.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/tools/stigma-assessment"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold text-lg"
              >
                Start your judgment-free journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Types of Stigma */}
        <section id="stigma-types" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Mental Health Stigma Shows Up
              </h2>
              <p className="text-xl text-gray-600">
                Recognizing stigma is the first step to overcoming it
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Social Stigma */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Social Stigma</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">People viewing mental illness as "weakness"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Family saying "just snap out of it" or "be strong"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Cultural beliefs that therapy is only for "crazy people"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Workplace discrimination against mental health issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Friends avoiding you after disclosure</span>
                  </li>
                </ul>
              </div>

              {/* Self-Stigma */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🪞</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Self-Stigma (Internalized)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Believing you're "broken" or "defective"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Shame about needing help or taking medication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Avoiding treatment to prove you're "strong enough"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Hiding your struggles from everyone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Feeling like you don't deserve help</span>
                  </li>
                </ul>
              </div>

              {/* Cultural Barriers */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Cultural Barriers</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">"Don't air dirty laundry" - keep problems private</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Religious beliefs that prayer alone should be enough</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Masculine norms that discourage emotional expression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Collectivist cultures fearing family shame</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Generational trauma around institutionalization</span>
                  </li>
                </ul>
              </div>

              {/* Structural Stigma */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Structural Barriers</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Mental health not covered equally by insurance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Limited mental health resources in communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Employment discrimination based on mental health history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Media portraying mental illness as violent or dangerous</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Legal restrictions on people with mental health diagnoses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Overcoming Stigma Strategies */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How to Talk About Mental Health & Overcome Stigma
              </h2>
              <p className="text-xl text-gray-600">
                Practical strategies for breaking through stigma barriers
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Start with Trusted, Open-Minded People</h3>
                    <p className="text-gray-700">
                      Don't start by telling the most skeptical family member. Choose someone who has shown empathy or openness in the past.
                      Test the waters first before broader disclosure. You control who knows and when.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Use "I" Statements & Share How You Feel</h3>
                    <p className="text-gray-700">
                      Instead of "You don't understand mental health," try "I've been struggling and I need support."
                      Focus on your experience rather than accusing others. Share specific examples of how you're feeling without shame.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Educate with Facts, Not Defensiveness</h3>
                    <p className="text-gray-700">
                      Share statistics (1 in 5 adults experience mental illness yearly), compare to physical health ("You'd go to the doctor for a broken leg"),
                      and provide reputable resources. Stay calm—you're not responsible for changing everyone's mind.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Use Anonymous Resources While You Build Courage</h3>
                    <p className="text-gray-700">
                      There's no shame in starting anonymously. Our app, online support groups, and crisis lines let you get help
                      without anyone knowing. Build your confidence and skills first, disclose later if you choose.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Remember: You Don't Need Everyone's Approval</h3>
                    <p className="text-gray-700">
                      Some people won't understand, and that's their limitation, not yours. Your mental health is more important than others' opinions.
                      Prioritize your wellbeing over avoiding judgment. Seek help anyway.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                      6
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Challenge Your Own Internalized Stigma</h3>
                    <p className="text-gray-700">
                      Notice when you judge yourself harshly. Would you think a friend with diabetes was "weak" for needing insulin?
                      Mental health conditions are medical conditions. Needing help is human, not shameful.
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
                Frequently Asked Questions About Mental Health Stigma
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
                Learn More About Breaking Mental Health Stigma
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    How to Talk to Your Family About Going to Therapy
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Script templates and conversation starters for difficult discussions
                  </p>
                  <span className="text-indigo-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mental Health Stigma in Men: Why It's Harder for Guys to Ask for Help
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Understanding masculine norms and how to break through them
                  </p>
                  <span className="text-indigo-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Anonymous Mental Health Resources: Getting Help Without Disclosure
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete guide to private, confidential mental health support
                  </p>
                  <span className="text-indigo-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Mental Health Journey Privately—100% Free
            </h2>
            <p className="text-xl text-indigo-50 mb-8 max-w-2xl mx-auto">
              No judgment. No insurance records. No real name required. Get the support you deserve in complete privacy.
            </p>
            <Link
              href="/tools/stigma-assessment"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-indigo-100 mt-4 text-sm">
              Join thousands who've broken through stigma to find support
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
