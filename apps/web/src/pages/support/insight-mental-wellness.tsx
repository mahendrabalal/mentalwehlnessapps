import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'

export default function InsightMentalWellnessPage() {
  const faqs = [
    {
      question: 'What is mental wellness insight?',
      answer: 'Mental wellness insight is the self-awareness and understanding of your emotional and psychological well-being. It involves recognizing your thoughts, emotions, behaviors, and how they impact your overall health. Gaining insight helps you identify patterns, triggers, and areas where you need support.'
    },
    {
      question: 'How can I develop better insight into my mental health?',
      answer: 'You can develop mental wellness insight through: 1) Regular self-reflection and journaling, 2) Taking mental health assessments to understand your patterns, 3) Practicing mindfulness to observe your thoughts without judgment, 4) Seeking feedback from trusted people, 5) Working with a therapist or counselor, and 6) Tracking your mood and triggers over time.'
    },
    {
      question: 'Why is self-awareness important for mental wellness?',
      answer: 'Self-awareness is foundational to mental wellness because it allows you to: Identify when you\'re struggling early, Make informed decisions about your health, Break negative patterns, Communicate your needs to others, Set realistic goals, and Seek help when needed. Without insight, you may not recognize when you need support.'
    },
    {
      question: 'What are early warning signs I should be aware of?',
      answer: 'Common warning signs include: persistent sadness or anxiety, changes in sleep or appetite, withdrawal from activities you enjoy, difficulty concentrating, increased irritability, unexplained physical symptoms, and using unhealthy coping mechanisms. Our free assessments help you identify these patterns.'
    },
    {
      question: 'How often should I check in with my mental wellness?',
      answer: 'Regular check-ins are essential for maintaining mental wellness insight. Try checking in with yourself daily through a mood journal, weekly through reflection, and monthly through formal assessments. Some people find that weekly check-ins combined with monthly assessments work best.'
    },
    {
      question: 'Can insight alone improve my mental health?',
      answer: 'Insight is the first step—it helps you understand what needs to change. However, lasting improvement requires action: implementing coping strategies, seeking professional support when needed, making lifestyle changes, and consistently practicing mental wellness habits. Insight without action has limited impact.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Gain Mental Wellness Insight - Self-Awareness & Mental Health Assessment',
      description: 'Develop self-awareness about your mental wellness. Learn how to gain insight into your emotional health with free assessments, mindfulness practices, and evidence-based strategies.',
      slug: '/support/insight-mental-wellness',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support' },
      { name: 'Mental Wellness Insight', url: '/support/insight-mental-wellness' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Insight Mental Wellness: Free Assessment & Guide"
        description="Develop deeper insight into your mental wellness with self-awareness tools, assessments, strategies, and real-life examples. Understand your emotions, patterns, and mental health needs. Free guidance inside."
        keywords={[
          'insight mental wellness',
          'mental wellness examples',
          'examples of mental wellness',
          'mental health examples',
          'mental health self-awareness',
          'understanding mental wellness',
          'mental health insight',
          'self-awareness mental health',
          'mental wellness assessment',
          'gain insight mental health',
          'emotional awareness',
          'mental health patterns',
          'good mental wellness examples'
        ]}
        ogImage="/og-mental-wellness-insight.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🔍</span>
                <span>Understanding Yourself Better</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gain Mental Wellness
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Insight Today
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Self-awareness is the foundation of mental wellness. Develop deeper insight into your emotions, patterns, and mental health needs with our free assessments and evidence-based strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/depression-screening"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Take Free Assessment
                </Link>
                <Link
                  href="#benefits"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Insight Matters */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Mental Wellness Insight Matters
              </h2>
              <p className="text-xl text-gray-600">
                Understanding yourself is the first step toward lasting wellness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Early Recognition</h3>
                <p className="text-gray-600">
                  Spot warning signs early so you can take action before problems escalate.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Informed Choices</h3>
                <p className="text-gray-600">
                  Make better decisions about your mental health and choose the right strategies for you.
                </p>
              </div>

              <div className="bg-pink-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Break Patterns</h3>
                <p className="text-gray-600">
                  Identify negative patterns and cycles so you can change them for good.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Areas of Mental Wellness Insight */}
        <section id="benefits" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key Areas to Gain Mental Wellness Insight
              </h2>
              <p className="text-xl text-gray-600">
                Use these dimensions to understand your mental health better
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-8 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Emotional Awareness</h3>
                <p className="text-gray-600 mb-4">
                  Can you identify and name the emotions you're experiencing? Emotional awareness is the first step to managing your feelings. Many people struggle to distinguish between similar emotions like anxiety and excitement. Our mindfulness tools help you develop this skill.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg text-gray-700">
                  <strong>Try this:</strong> Pause three times daily and ask yourself: "What am I feeling right now?" Rate the intensity 1-10.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Thought Patterns</h3>
                <p className="text-gray-600 mb-4">
                  What thoughts trigger your emotions? Do you notice recurring negative thoughts? Recognizing patterns like catastrophizing, all-or-nothing thinking, or rumination helps you challenge them. Many mental health conditions involve distorted thinking patterns.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg text-gray-700">
                  <strong>Try this:</strong> Keep a thought record. When you feel down, write down what triggered it and what you were thinking.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-pink-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Physical Symptoms</h3>
                <p className="text-gray-600 mb-4">
                  How does stress show up in your body? Do you get headaches, stomach issues, or muscle tension? Your body often signals emotional distress before you consciously recognize it. Physical awareness is crucial for early intervention.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg text-gray-700">
                  <strong>Try this:</strong> Do a body scan meditation daily. Notice where you hold tension and what that might mean.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Behavioral Changes</h3>
                <p className="text-gray-600 mb-4">
                  Notice shifts in your behavior—sleeping more/less, withdrawing from activities, or changes in appetite. Behavioral changes often precede emotional awareness. They're key indicators that your mental health needs attention.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-gray-700">
                  <strong>Try this:</strong> Track your daily habits. Look for correlations between behaviors and mood.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">5. Social Impact</h3>
                <p className="text-gray-600 mb-4">
                  How is your mental state affecting your relationships? Do you withdraw or become irritable? Social withdrawal is a major warning sign. Understanding how your mental wellness impacts others helps you recognize when you need support.
                </p>
                <div className="bg-green-50 p-4 rounded-lg text-gray-700">
                  <strong>Try this:</strong> Ask someone you trust how they've noticed changes in you lately. Their perspective matters.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools for Insight */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Free Tools to Gain Mental Wellness Insight
              </h2>
              <p className="text-xl text-gray-600">
                Use these assessments to understand your mental health better
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/tools/depression-screening" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-indigo-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600">Depression Screening</h3>
                  <p className="text-gray-600 mb-4">Understand your mood patterns and depression risk with our PHQ-9 based assessment.</p>
                  <span className="text-indigo-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Take Assessment →</span>
                </div>
              </Link>

              <Link href="/tools/anxiety-relief" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-purple-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600">Anxiety Assessment</h3>
                  <p className="text-gray-600 mb-4">Explore your anxiety patterns and learn relief techniques tailored for you.</p>
                  <span className="text-purple-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Take Assessment →</span>
                </div>
              </Link>

              <Link href="/tools/burnout-assessment" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-pink-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600">Burnout Assessment</h3>
                  <p className="text-gray-600 mb-4">Assess your burnout risk and learn recovery strategies to restore balance.</p>
                  <span className="text-pink-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Take Assessment →</span>
                </div>
              </Link>

              <Link href="/tools/mindfulness" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Mindfulness Practices</h3>
                  <p className="text-gray-600 mb-4">Develop self-awareness through guided mindfulness exercises and meditation.</p>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Explore Practices →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Mental Wellness Examples */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real-Life Mental Wellness Examples
              </h2>
              <p className="text-xl text-gray-600">
                See what good mental wellness looks like in action across different life situations
              </p>
            </div>

            <div className="space-y-8">
              {/* Example 1: Work Stress */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💼 Managing Work Stress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Sarah works 70+ hours weekly, skips meals, ignores burnout symptoms, feels guilty taking breaks, bottles up stress, and can't sleep. She tells herself "I just need to push through."
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Mark works efficiently during set hours, takes lunch breaks, notices early burnout signs, sets boundaries with his manager, uses stress management techniques, and prioritizes sleep. He knows sustainable pace beats burnout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2: Emotional Response */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">😔 Handling Difficult Emotions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      When Lisa feels sad, she immediately distracts herself with social media, numbs feelings with alcohol, avoids thinking about emotions, and pushes away people who notice she's struggling.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      When Tom feels sad, he acknowledges the feeling without judgment, journals about what triggered it, talks to a trusted friend, uses healthy coping skills like walking, and seeks therapy when sadness persists.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3: Social Connections */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 Building Social Connections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Jake feels lonely but cancels plans last minute, scrolls social media comparing himself to others, doesn't reach out when struggling, and convinces himself he's better off alone.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Emma recognizes loneliness as a signal to connect. She reaches out to friends, joins activities aligned with her interests, limits comparison-inducing social media, and is vulnerable about needing connection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 4: Self-Care Routine */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🌿 Daily Self-Care Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Rachel views self-care as selfish, skips meals when busy, sleeps 4-5 hours, never exercises, ignores physical health, and only rests when completely exhausted or sick.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      David treats self-care as essential maintenance. He sleeps 7-8 hours, exercises regularly, eats nutritious meals, takes breaks throughout the day, and knows that caring for himself allows him to show up for others.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 5: Seeking Help */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🆘 Asking for Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Mike struggles with depression for months but avoids therapy due to stigma, tells himself "others have it worse," doesn't tell anyone he's struggling, and waits until crisis before seeking help.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      Ana notices depression symptoms early and schedules therapy, tells close friends she's struggling, uses free mental health resources while waiting for an appointment, and views asking for help as strength, not weakness.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 6: Stress Coping */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">⚡ Responding to Acute Stress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">❌ Poor Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      When stressed about a deadline, Chris catastrophizes ("I'll get fired"), snaps at family members, stress-eats junk food, loses sleep ruminating, and avoids the problem entirely.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="font-bold text-green-900 mb-2">✓ Good Mental Wellness</h4>
                    <p className="text-gray-700 text-sm">
                      When facing a deadline, Maya breaks the project into manageable steps, uses breathing exercises to stay calm, communicates with her team, maintains sleep schedule, and knows one stressful week doesn't define her worth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">See Yourself in These Examples?</h3>
              <p className="text-lg text-gray-700 mb-6">
                Good mental wellness isn't about perfection—it's about having awareness and healthy coping strategies. Our free assessments can help you identify areas where you're doing well and areas to improve.
              </p>
              <Link
                href="/tools/depression-screening"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Take Free Mental Wellness Assessment
              </Link>
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
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Gaining Insight Into Your Mental Wellness Today
            </h2>
            <p className="text-xl text-indigo-50 mb-8 max-w-2xl mx-auto">
              Self-awareness is powerful. Our free assessments help you understand your mental health patterns and take the right steps forward.
            </p>
            <Link
              href="/tools/depression-screening"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Take Your First Assessment
            </Link>
            <p className="text-indigo-100 mt-4 text-sm">
              100% free • Completely confidential • No sign-up required
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
