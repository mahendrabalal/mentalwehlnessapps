import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function AffordableMentalHealthCarePage() {
  const faqs = [
    {
      question: 'How can I find affordable mental health therapy near me?',
      answer: 'Start by searching for community mental health centers in your area, which often offer sliding scale fees based on income. Check if local universities have counseling programs where graduate students provide supervised therapy at reduced rates. Online therapy platforms like BetterHelp, Talkspace, or our free app can also provide more affordable options than traditional in-person therapy.'
    },
    {
      question: 'What are sliding scale therapy fees?',
      answer: 'Sliding scale fees mean therapists adjust their rates based on your income level. You typically provide proof of income, and the therapist charges what you can afford. Many community clinics and private practice therapists offer sliding scale options—always ask when calling to inquire about services.'
    },
    {
      question: 'Can I get mental health support without insurance?',
      answer: 'Yes! Many resources exist for uninsured individuals: Community mental health centers (often income-based fees), University counseling centers, Support groups (free), Crisis hotlines (24/7 free support), Our app (100% free AI therapy companion and tools), and some therapists offer pro bono (free) sessions on a limited basis.'
    },
    {
      question: 'What free mental health resources are available?',
      answer: 'Free resources include: 988 Suicide & Crisis Lifeline (call or text), SAMHSA National Helpline (1-800-662-4357), NAMI (National Alliance on Mental Illness) support groups, Crisis Text Line (text HOME to 741741), Our Mental Wellness App (100% free), MentalHealth.gov resource directory, and local support groups through churches or community centers.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Finding Affordable Mental Health Care - Free & Low-Cost Therapy Options',
      description: 'Comprehensive guide to affordable mental health care. Find free therapy resources, sliding scale therapists, and low-cost mental health support without insurance.',
      slug: '/support/affordable-mental-health-care',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/affordable-mental-health-care' },
      { name: 'Affordable Mental Health Care', url: '/support/affordable-mental-health-care' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Affordable Mental Health Care - Free & Low-Cost"
        description="Break financial barriers to mental health care. Free therapy resources, sliding scale options, insurance alternatives, and 100% free tools."
        publishedTime={SUPPORT_PAGES_DATES['affordable-mental-health-care'].published}
        modifiedTime={SUPPORT_PAGES_DATES['affordable-mental-health-care'].modified}
        keywords={[
          'affordable mental health therapy',
          'finding affordable therapy near me',
          'low cost therapy options',
          'sliding scale therapist',
          'free mental health resources',
          'therapy without insurance',
          'community mental health centers',
          'affordable therapy alternatives'
        ]}
        ogImage="/og-affordable-care.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-therapy-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Mental Health Support
                <span className="block bg-gradient-to-r from-therapy-600 to-blue-600 bg-clip-text text-transparent">
                  Shouldn't Break the Bank
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Financial barriers shouldn't prevent you from getting the mental health support you deserve.
                Discover free and affordable therapy options that fit your budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Start Free Now
                </Link>
                <Link
                  href="#resources"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Browse Free Resources
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
                How Our Free App Helps You Access Mental Health Care
              </h2>
              <p className="text-xl text-gray-600">
                We believe mental wellness should be accessible to everyone—no exceptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-therapy-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-therapy-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free Forever</h3>
                <p className="text-gray-600">
                  No subscriptions, no hidden fees, no premium tiers. All features are completely free for everyone.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clinical-Grade Tools</h3>
                <p className="text-gray-600">
                  Free access to PHQ-9 and GAD-7 assessments that typically cost $50-150 at clinics.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 AI Companion</h3>
                <p className="text-gray-600">
                  Get unlimited support whenever you need it. No appointment scheduling or waiting rooms.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center text-therapy-600 hover:text-therapy-700 font-semibold text-lg"
              >
                Get started with our free app
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Free & Low-Cost Mental Health Resources
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive directory of affordable mental health care options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Resources */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Completely Free</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Our Mental Wellness App</strong>
                      <p className="text-gray-600 text-sm">AI therapy companion, mood tracking, assessments, crisis support</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">988 Suicide & Crisis Lifeline</strong>
                      <p className="text-gray-600 text-sm">Call or text 988 for 24/7 free crisis support</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">SAMHSA National Helpline</strong>
                      <p className="text-gray-600 text-sm">1-800-662-4357 - Free treatment referral service</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Crisis Text Line</strong>
                      <p className="text-gray-600 text-sm">Text HOME to 741741 for free crisis counseling</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">NAMI Support Groups</strong>
                      <p className="text-gray-600 text-sm">Free peer-led support groups nationwide</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Low-Cost Options */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💙</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Affordable Options</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Community Mental Health Centers</strong>
                      <p className="text-gray-600 text-sm">Sliding scale fees based on income (often $10-50/session)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">University Counseling Programs</strong>
                      <p className="text-gray-600 text-sm">Supervised graduate students provide therapy at reduced rates ($20-40)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Open Path Collective</strong>
                      <p className="text-gray-600 text-sm">Network of therapists offering sessions for $30-80</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Medicaid</strong>
                      <p className="text-gray-600 text-sm">Covers mental health services in all states (income-based eligibility)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-gray-900">Employee Assistance Programs (EAP)</strong>
                      <p className="text-gray-600 text-sm">Many employers offer 3-8 free therapy sessions</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about accessing affordable mental health care
              </p>
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

        {/* Related Articles Section */}
        <section className="py-16 bg-therapy-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Affordable Mental Health Care
              </h2>
              <p className="text-xl text-gray-600">
                Expert guides to help you navigate mental health care options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Finding Affordable Therapy Near Me: Complete Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step guide to finding low-cost therapy options in your area
                  </p>
                  <span className="text-therapy-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    7 Ways to Access Mental Health Care Without Insurance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Practical alternatives when you don't have health insurance
                  </p>
                  <span className="text-therapy-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sliding Scale Therapy: How It Works
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Everything you need to know about income-based therapy fees
                  </p>
                  <span className="text-therapy-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-therapy-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Free Mental Wellness Journey Today
            </h2>
            <p className="text-xl text-therapy-50 mb-8 max-w-2xl mx-auto">
              No cost. No credit card. No barriers. Get the mental health support you deserve.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-therapy-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-therapy-100 mt-4 text-sm">
              Join thousands already using our free mental health support
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
