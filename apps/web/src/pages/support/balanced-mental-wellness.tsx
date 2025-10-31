import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function BalancedMentalWellnessPage() {
  const faqs = [
    {
      question: 'What does balanced mental wellness mean?',
      answer: 'Balanced mental wellness means maintaining harmony across different life domains: emotional health, physical health, social connections, work-life balance, and personal growth. It doesn\'t mean being happy all the time—it means being able to navigate challenges while maintaining resilience and a sense of purpose.'
    },
    {
      question: 'How do I know if my mental wellness is out of balance?',
      answer: 'Signs of imbalance include: neglecting physical health, withdrawing from relationships, chronic stress or burnout, loss of interest in activities, difficulty concentrating, constant irritability, sleep disruption, or using unhealthy coping mechanisms. Our assessments can help identify which areas need attention.'
    },
    {
      question: 'What are the five pillars of balanced mental wellness?',
      answer: 'The five pillars are: 1) Emotional wellness (understanding and managing emotions), 2) Physical wellness (exercise, nutrition, sleep), 3) Social wellness (meaningful relationships and connection), 4) Professional wellness (fulfilling work and balance), and 5) Spiritual wellness (purpose, meaning, and values). Balance means attention to all five.'
    },
    {
      question: 'How can I achieve work-life balance?',
      answer: 'Work-life balance requires: Setting clear boundaries between work and personal time, Saying no to non-essential commitments, Taking regular breaks and time off, Prioritizing relationships and hobbies, Managing stress effectively, and Seeking support when overwhelmed. Balance looks different for everyone—find what works for you.'
    },
    {
      question: 'Is perfectionism harmful to balanced mental wellness?',
      answer: 'Yes. Perfectionism drives unrealistic standards that lead to burnout, anxiety, and depression. Balanced wellness requires self-compassion and accepting that you\'re enough as you are. You can still have goals without striving for perfection. Our emotional regulation tools help you shift this mindset.'
    },
    {
      question: 'How often should I reassess my mental wellness balance?',
      answer: 'Check your balance monthly through reflection or journaling. After major life changes, check weekly. Our assessments can be taken monthly to track trends. Regular check-ins help you catch imbalances early before they become serious problems.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Balanced Mental Wellness - Holistic Health & Work-Life Balance Guide',
      description: 'Achieve balanced mental wellness through holistic practices. Learn about emotional, physical, social, and professional wellness. Strategies for work-life balance and lasting mental health.',
      slug: '/support/balanced-mental-wellness',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support' },
      { name: 'Balanced Mental Wellness', url: '/support/balanced-mental-wellness' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Balanced Mental Wellness: 5 Pillars & Work-Life Tips"
        description="Achieve balanced mental wellness. Learn the 5 pillars, work-life balance strategies, and practical tips for holistic mental health."
        publishedTime={SUPPORT_PAGES_DATES['balanced-mental-wellness'].published}
        modifiedTime={SUPPORT_PAGES_DATES['balanced-mental-wellness'].modified}
        keywords={[
          'balanced mental wellness',
          'work-life balance',
          'holistic mental health',
          'mental wellness balance',
          'emotional wellness balance',
          'balanced mental health',
          'wellness balance tips',
          'achieve work-life balance',
          'mental health equilibrium'
        ]}
        ogImage="/og-balanced-mental-wellness.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>⚖️</span>
                <span>Finding Your Equilibrium</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Achieve Balanced
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Mental Wellness
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                True wellness isn't about perfection—it's about balance. Learn how to nurture every aspect of your mental health while managing life's demands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/emotional-regulation"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Explore Tools
                </Link>
                <Link
                  href="#pillars"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn the 5 Pillars
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Balance */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Is Balanced Mental Wellness?
              </h2>
              <p className="text-xl text-gray-600">
                It's not about having it all figured out—it's about wholeness
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Balanced mental wellness is a state where you're taking care of all areas of your life in sustainable ways. It means your emotional needs, physical health, relationships, career, and sense of purpose are all receiving adequate attention—not perfectly, but consistently.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                This balance shifts throughout life. During stressful periods, balance might mean survival mode for a season. During calmer times, you can invest more deeply in growth. The key is recognizing when things are out of sync and actively rebalancing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-emerald-50 rounded-xl p-6">
                <div className="text-4xl mb-3">💚</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Not Perfection</h3>
                <p className="text-gray-600">
                  Balanced wellness isn't about perfect harmony every day. It's about managing life's natural ups and downs.
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-6">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dynamic Process</h3>
                <p className="text-gray-600">
                  Your balance will shift with life changes. The goal is awareness and intentional adjustment.
                </p>
              </div>

              <div className="bg-cyan-50 rounded-xl p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Definition</h3>
                <p className="text-gray-600">
                  Balance looks different for everyone. Your version of wellness is unique to your values and needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Five Pillars */}
        <section id="pillars" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Five Pillars of Balanced Mental Wellness
              </h2>
              <p className="text-xl text-gray-600">
                A complete approach to holistic health
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 border-l-4 border-emerald-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">❤️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Emotional Wellness</h3>
                    <p className="text-gray-600 mb-4">
                      Understanding and managing your emotions in healthy ways. This includes recognizing feelings, processing difficult emotions, and maintaining emotional resilience through life's challenges.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-lg text-gray-700 mb-4">
                      <strong>Practice:</strong> Develop emotional awareness through journaling, therapy, or mindfulness. Use healthy coping strategies when stressed.
                    </div>
                    <Link href="/tools/emotional-regulation" className="text-emerald-600 font-semibold hover:underline">
                      Explore Emotional Regulation Tools →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💪</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Physical Wellness</h3>
                    <p className="text-gray-600 mb-4">
                      Taking care of your body through exercise, nutrition, adequate sleep, and medical care. Your physical health directly impacts your mental health—they're deeply connected.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg text-gray-700 mb-4">
                      <strong>Practice:</strong> Aim for 7-9 hours of sleep, 150 minutes of exercise weekly, and nutritious meals. Small consistent habits matter more than perfection.
                    </div>
                    <Link href="/support/sleep-mental-health" className="text-blue-600 font-semibold hover:underline">
                      Learn About Sleep & Mental Health →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-pink-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🤝</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Social Wellness</h3>
                    <p className="text-gray-600 mb-4">
                      Cultivating meaningful relationships and a sense of belonging. Human connection is essential for mental health. This includes family, friends, community, and meaningful social engagement.
                    </p>
                    <div className="bg-pink-50 p-4 rounded-lg text-gray-700 mb-4">
                      <strong>Practice:</strong> Schedule regular time with loved ones, join groups aligned with your interests, and be vulnerable in your connections.
                    </div>
                    <Link href="/support/combat-loneliness-isolation" className="text-pink-600 font-semibold hover:underline">
                      Combat Loneliness & Build Connection →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💼</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Professional Wellness</h3>
                    <p className="text-gray-600 mb-4">
                      Finding work that feels meaningful and maintaining healthy boundaries. This includes career satisfaction, workload management, and preventing burnout. Work-life balance is crucial here.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg text-gray-700 mb-4">
                      <strong>Practice:</strong> Set clear work boundaries, pursue meaningful work, take time off, and don't let work consume your identity or health.
                    </div>
                    <Link href="/support/emotional-exhaustion-burnout" className="text-purple-600 font-semibold hover:underline">
                      Prevent & Recover From Burnout →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-orange-600">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🌟</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">5. Spiritual Wellness</h3>
                    <p className="text-gray-600 mb-4">
                      Living in alignment with your values and finding a sense of purpose. This doesn't require religion—it means knowing what matters to you and living accordingly. Purpose is protective for mental health.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg text-gray-700 mb-4">
                      <strong>Practice:</strong> Reflect on your values, engage in practices that feel meaningful, contribute to causes you believe in, and live authentically.
                    </div>
                    <Link href="/tools/mindfulness" className="text-orange-600 font-semibold hover:underline">
                      Explore Mindfulness & Purpose →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work-Life Balance Strategies */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Practical Strategies for Work-Life Balance
              </h2>
              <p className="text-xl text-gray-600">
                Simple actions to protect your mental wellness
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🎯 Set Clear Boundaries</h3>
                <p className="text-gray-700">Define when work starts and ends. Don't answer emails after 6 PM. Keep weekends protected. Communicate your boundaries clearly to others.</p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">❌ Learn to Say No</h3>
                <p className="text-gray-700">You cannot do everything. Prioritize your mental health by declining non-essential commitments. "No" is a complete sentence.</p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">⏸️ Take Regular Breaks</h3>
                <p className="text-gray-700">Short breaks throughout the day reduce stress. Take your lunch away from your desk. Use vacation time fully. Rest is not laziness—it's essential maintenance.</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🎨 Invest in Personal Time</h3>
                <p className="text-gray-700">Schedule time for hobbies, exercise, socializing, and self-care like you would work meetings. These aren't luxuries—they're necessities.</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">💬 Ask for Support</h3>
                <p className="text-gray-700">Talk to your manager about workload, delegate when possible, and seek help when overwhelmed. You don't have to do it all alone.</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🧘 Practice Stress Management</h3>
                <p className="text-gray-700">Use meditation, exercise, time in nature, or whatever helps you decompress. Regular stress management prevents burnout.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rebalancing When Off Track */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rebalancing When You're Off Track
              </h2>
              <p className="text-xl text-gray-600">
                It's normal to get out of balance—here's how to get back
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Notice Without Judgment</h3>
                <p className="text-gray-600">
                  Observe that you're out of balance. Don't shame yourself—life happens. Many people feel guilty, which only makes things worse. Awareness is the first step.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Identify What's Out of Balance</h3>
                <p className="text-gray-600 mb-4">
                  Which of the five pillars needs attention? Is it work taking over? Are relationships suffering? Is self-care neglected?
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  Use our mental wellness assessment tools to identify specific areas needing support.
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Start Small</h3>
                <p className="text-gray-600">
                  Don't overhaul everything at once. If sleep is suffering, prioritize sleep. If relationships are neglected, schedule one coffee date. Small actions build momentum.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Ask for Support</h3>
                <p className="text-gray-600">
                  Tell trusted people you're working on rebalancing. Get help from friends, family, or a therapist. Use our free tools and resources.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Track Progress</h3>
                <p className="text-gray-600">
                  Monitor how you're doing. Our mood tracker and assessments help you see improvement, which builds motivation to keep going.
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Building Your Balanced Mental Wellness Today
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Get free tools to assess your balance, manage stress, build emotional resilience, and create the life you want.
            </p>
            <Link
              href="/tools/emotional-regulation"
              className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Explore All Tools
            </Link>
            <p className="text-emerald-100 mt-4 text-sm">
              Free • Personalized • Evidence-based • Available 24/7
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
