import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, buildHowToStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function MeditationConsistencyPage() {
  const faqs = [
    {
      question: 'How long does it take to form a meditation habit?',
      answer: 'Research shows habit formation typically takes 18-254 days, with an average of 66 days. For meditation specifically, most people start feeling the habit "stick" after 30-40 days of consistent practice. The key is starting small (2-5 minutes daily) rather than attempting long sessions that feel unsustainable.'
    },
    {
      question: 'What if I miss a day of meditation?',
      answer: 'Missing one day won\'t break your habit, but how you respond matters. Avoid the "all or nothing" trap—don\'t let one missed day become a week. Simply restart the next day without guilt. Our app tracks your practice and sends gentle reminders without shame or pressure.'
    },
    {
      question: 'Why do I keep quitting my meditation practice?',
      answer: 'Common reasons include: setting unrealistic goals (30 minutes when 5 is sustainable), lack of immediate results (meditation benefits accrue over time), boring or repetitive practices, no accountability system, and not linking the habit to an existing routine. Addressing these obstacles dramatically improves consistency.'
    },
    {
      question: 'How can I stay motivated to meditate when life gets busy?',
      answer: 'Shorten your practice rather than skip it—even 2 minutes counts. Meditate before your morning coffee (habit stacking). Focus on how you feel after, not during. Use our app\'s streak tracking for visual motivation. Remember: the busier you are, the more you need meditation, not less.'
    }
  ]

  const howToSteps = [
    {
      name: 'Start Ridiculously Small',
      text: 'Begin with just 2 minutes daily. This feels so easy that you won\'t resist doing it, building confidence and consistency before increasing duration.'
    },
    {
      name: 'Stack Your Habit',
      text: 'Link meditation to an existing habit: "After I pour my morning coffee, I will meditate for 2 minutes." This leverages existing neural pathways.'
    },
    {
      name: 'Track Your Streak',
      text: 'Use our app to visualize your streak. Research shows seeing consecutive days motivates continued practice—you won\'t want to "break the chain."'
    },
    {
      name: 'Prepare Your Space',
      text: 'Set up a dedicated meditation spot with a cushion or chair. Lowering friction (not having to "set up") increases likelihood of practice.'
    },
    {
      name: 'Focus on Identity, Not Outcomes',
      text: 'Shift from "I want to be less stressed" to "I am a person who meditates." Identity-based habits are more sustainable than outcome-based ones.'
    },
    {
      name: 'Use Implementation Intentions',
      text: 'Plan exactly when and where: "I will meditate for 5 minutes in my living room at 7am" (not "I\'ll meditate sometime today").'
    },
    {
      name: 'Celebrate Small Wins',
      text: 'After each session, acknowledge it: "I did it!" This positive reinforcement strengthens the neural pathways associated with the habit.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Tips for Maintaining a Daily Mindfulness Meditation Habit',
      description: 'Evidence-based strategies for building and maintaining a consistent meditation practice. Overcome motivation challenges and create a sustainable daily mindfulness routine.',
      slug: '/support/meditation-consistency',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/meditation-consistency' },
      { name: 'Meditation Consistency & Habit Building', url: '/support/meditation-consistency' },
    ]),
    buildFaqStructuredData(faqs),
    buildHowToStructuredData({
      name: 'How to Maintain a Daily Meditation Habit',
      description: 'Step-by-step guide to building a sustainable mindfulness practice',
      steps: howToSteps
    })
  ]

  return (
    <>
      <SEOHead
        title="Tips for Maintaining a Daily Mindfulness Meditation Habit - Free Support"
        description="Struggling to stay consistent with meditation? Learn evidence-based habit formation strategies to build a sustainable daily mindfulness practice. Free habit tracking and reminders."
        keywords={[
          'maintaining daily meditation habit',
          'meditation consistency tips',
          'how to stay consistent with meditation',
          'building mindfulness routine',
          'meditation habit formation',
          'meditation motivation strategies',
          'sustainable meditation practice',
          'daily mindfulness habit tracking'
        ]}
        ogImage="/og-meditation-consistency.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>✅</span>
                <span>Build a Meditation Habit That Actually Sticks</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master
                <span className="block bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Consistency & Motivation
                </span>
                in Your Mindfulness Practice
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop the cycle of starting and quitting. Learn evidence-based strategies from behavioral psychology
                to build a daily meditation habit that feels effortless and sustainable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Start Tracking Your Streak
                </Link>
                <Link
                  href="#strategies"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn the Strategies
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
                How Our Free App Helps You Stay Consistent
              </h2>
              <p className="text-xl text-gray-600">
                Built-in accountability and habit formation tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Streak Tracking</h3>
                <p className="text-gray-600">
                  See your consecutive days of practice. The "don't break the chain" psychology keeps you motivated without pressure.
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Reminders</h3>
                <p className="text-gray-600">
                  Personalized notifications at your optimal time. Our AI learns when you're most likely to practice and adjusts accordingly.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Insights</h3>
                <p className="text-gray-600">
                  Track not just attendance but mood improvements over time. See the correlation between consistent practice and well-being.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg"
              >
                Start building your habit today
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Habits Fail */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Meditation Habits Fail (And How to Prevent It)
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the obstacles helps you design around them
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">❌</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Starting Too Ambitious</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-red-600">The Problem:</span> "I'll meditate 30 minutes every morning!"
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">The Solution:</span> Start with 2-5 minutes. Build confidence first, duration second.
                  Our app's "micro-meditation" mode ensures success from day one.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Vague Intentions</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-red-600">The Problem:</span> "I'll meditate when I have time today."
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">The Solution:</span> Use implementation intentions: "At 7am, after coffee, in my bedroom, I will meditate for 5 minutes."
                  Specificity increases follow-through by 2-3x.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Outcome Fixation</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-red-600">The Problem:</span> "I don't feel calmer yet, what's the point?"
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">The Solution:</span> Focus on the identity ("I am someone who meditates") and process ("I showed up today") rather than immediate results.
                  Benefits accumulate gradually.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">😞</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">All-or-Nothing Thinking</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-red-600">The Problem:</span> Missed one day → "I've failed, why bother continuing?"
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">The Solution:</span> Use the "never miss twice" rule. One missed day is recovery, two is the start of a new bad habit.
                  Our app helps you restart without shame.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Strategies Section */}
        <section id="strategies" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                7 Evidence-Based Strategies for Meditation Consistency
              </h2>
              <p className="text-xl text-gray-600">
                Backed by behavioral psychology and habit formation research
              </p>
            </div>

            <div className="space-y-6">
              {howToSteps.map((step, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.name}</h3>
                      <p className="text-gray-700">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Science of Habit Formation */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Science Behind Sustainable Meditation Habits
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The Habit Loop</h3>
                  <p className="text-gray-700 mb-4">
                    Every habit follows a three-part loop: <span className="font-semibold">Cue</span> (trigger) →{' '}
                    <span className="font-semibold">Routine</span> (behavior) →{' '}
                    <span className="font-semibold">Reward</span> (benefit).
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="text-gray-800">
                      <span className="font-semibold">Example:</span> Wake up (cue) → Meditate for 5 minutes (routine) → Feel calm and accomplished (reward).
                      Our app strengthens this loop with streak visualization (additional reward).
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The 66-Day Rule</h3>
                  <p className="text-gray-700">
                    Research by Dr. Phillippa Lally (University College London) found the average time to form a new habit is 66 days.
                    Some habits took as few as 18 days, others up to 254 days. The key: consistency matters more than perfection.
                    Missing occasionally didn't significantly impact habit formation as long as the overall pattern remained consistent.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Identity-Based Habits</h3>
                  <p className="text-gray-700">
                    James Clear (Atomic Habits) demonstrates that identity change is the deepest level of habit formation.
                    Instead of "I want to meditate more" (outcome-based), shift to "I am a meditator" (identity-based).
                    Each meditation session becomes evidence of this identity, reinforcing the behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Meditation Consistency
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

        {/* 21-Day Challenge */}
        <section className="py-16 bg-gradient-to-r from-green-100 to-teal-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <span>🎯</span>
                  <span>Challenge Yourself</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Take the 21-Day Micro-Meditation Challenge
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Commit to just 2 minutes of meditation daily for 21 days. Research shows this is the minimum time
                  for initial habit formation. Our app will track your progress and celebrate every milestone.
                </p>
                <Link
                  href="/auth/signup"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
                >
                  Start Your 21-Day Challenge
                </Link>
                <p className="text-gray-500 mt-4 text-sm">
                  100% free. No commitment beyond trying for 21 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Mindfulness Practice
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/support/mindfulness-for-beginners" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mindfulness Meditation for Beginners
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start your practice with beginner-friendly techniques
                  </p>
                  <span className="text-green-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/support/emotional-resistance-meditation" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Managing Anxiety in Meditation Practice
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Work with emotional resistance instead of against it
                  </p>
                  <span className="text-green-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    The Science of Habit Formation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Deep dive into behavioral psychology research
                  </p>
                  <span className="text-green-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Build a Meditation Practice That Lasts
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Track your streak, get smart reminders, and see your progress—all the tools you need to stay consistent, completely free.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Your Habit Today
            </Link>
            <p className="text-green-100 mt-4 text-sm">
              No cost. No pressure. Just support for building lasting habits.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
