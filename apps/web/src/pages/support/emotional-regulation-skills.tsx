import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function EmotionalRegulationSkillsPage() {
  const faqs = [
    {
      question: 'What are the best emotional regulation skills for managing intense anger?',
      answer: 'For intense anger, try: 1) The STOP skill (Stop, Take a step back, Observe, Proceed mindfully), 2) TIPP technique (Temperature change like cold water on face, Intense exercise, Paced breathing, Paired muscle relaxation), 3) Opposite action (act opposite to the anger urge), 4) Distraction until the intensity reduces. Our app provides guided practice for each technique.'
    },
    {
      question: 'How do DBT skills help with emotional regulation?',
      answer: 'DBT (Dialectical Behavior Therapy) provides concrete, evidence-based skills for emotion regulation: Mindfulness to observe emotions without judgment, Distress tolerance for crisis moments, Emotion regulation to understand and change emotional responses, and Interpersonal effectiveness for managing relationship emotions. These skills are proven to reduce emotional intensity and improve coping.'
    },
    {
      question: 'What is the emotion wheel and how does it help?',
      answer: 'The emotion wheel is a tool that helps you identify and name specific emotions. It starts with basic emotions (happy, sad, angry, scared, etc.) in the center and expands to more nuanced feelings (disappointed, frustrated, anxious, etc.). Naming emotions precisely activates the prefrontal cortex, which reduces emotional intensity—a phenomenon called "affect labeling." Our app includes an interactive emotion wheel.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Emotional Regulation Skills - DBT Techniques for Managing Stress & Anger',
      description: 'Learn evidence-based emotional regulation skills to manage intense emotions. Free DBT techniques including STOP skill, TIPP, distress tolerance, and emotion wheel.',
      slug: '/support/emotional-regulation-skills',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support/emotional-regulation-skills' },
      { name: 'Emotional Regulation Skills', url: '/support/emotional-regulation-skills' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="Emotional Regulation Skills - DBT Techniques"
        description="Learn DBT skills for emotional regulation: STOP, TIPP, distress tolerance, emotion identification. Free tools and guided practice."
        publishedTime={SUPPORT_PAGES_DATES['emotional-regulation-skills'].published}
        modifiedTime={SUPPORT_PAGES_DATES['emotional-regulation-skills'].modified}
        keywords={[
          'best emotional regulation skills',
          'managing stress and anger',
          'DBT skills for emotional control',
          'emotional regulation techniques',
          'distress tolerance skills',
          'TIPP technique',
          'emotion wheel',
          'managing intense emotions'
        ]}
        ogImage="/og-emotion-regulation.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-red-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>Proven DBT Techniques</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Your
                <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Emotional Regulation
                </span>
                Skills
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Feeling overwhelmed by intense anger, stress, or emotional waves? Learn evidence-based DBT skills
                to regulate emotions, tolerate distress, and respond mindfully instead of reactively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/emotional-regulation"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Try Free DBT Skills Tools →
                </Link>
                <Link
                  href="#skills"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Explore Techniques
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
                How Our Free App Teaches Emotional Regulation
              </h2>
              <p className="text-xl text-gray-600">
                DBT-based tools designed for real-world emotional crisis management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-red-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Step-by-Step DBT Skills</h3>
                <p className="text-gray-600">
                  Guided practice through STOP, TIPP, distress tolerance, and emotion identification—exactly when you need them.
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">In-the-Moment Crisis Tools</h3>
                <p className="text-gray-600">
                  Quick access to techniques when emotions spike. Timer-guided breathing, ice-dive counters, and emergency coping cards.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Your Emotional Patterns</h3>
                <p className="text-gray-600">
                  Log emotions with our interactive emotion wheel, identify triggers, and see which regulation strategies work best for you.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-lg"
              >
                Start practicing DBT skills now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* DBT Skills Section */}
        <section id="skills" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Essential Emotional Regulation Skills
              </h2>
              <p className="text-xl text-gray-600">
                Evidence-based DBT techniques you can use immediately
              </p>
            </div>

            <div className="space-y-6">
              {/* STOP Skill */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">The STOP Skill (Crisis Moment De-escalation)</h3>
                    <p className="text-gray-700 mb-4">
                      Use when you feel yourself about to react impulsively or emotionally explode:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">S</span>
                        <div>
                          <strong className="text-gray-900">Stop:</strong>
                          <span className="text-gray-700"> Freeze. Don't move. Don't say anything. Just pause.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">T</span>
                        <div>
                          <strong className="text-gray-900">Take a step back:</strong>
                          <span className="text-gray-700"> Physically or mentally distance yourself from the situation.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">O</span>
                        <div>
                          <strong className="text-gray-900">Observe:</strong>
                          <span className="text-gray-700"> Notice what's happening inside and outside you. Label the emotion.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">P</span>
                        <div>
                          <strong className="text-gray-900">Proceed mindfully:</strong>
                          <span className="text-gray-700"> Act based on your values, not your emotional urge.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIPP Technique */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">TIPP Technique (Emergency Emotion Reduction)</h3>
                    <p className="text-gray-700 mb-4">
                      Use when emotions are at 8/10 or higher intensity and you need rapid relief:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3">T</span>
                        <div>
                          <strong className="text-gray-900">Temperature:</strong>
                          <span className="text-gray-700"> Change body temperature quickly (splash cold water on face, hold ice cube, take cold shower). Activates dive reflex to calm nervous system.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3">I</span>
                        <div>
                          <strong className="text-gray-900">Intense exercise:</strong>
                          <span className="text-gray-700"> Run, do jumping jacks, sprint stairs—burn off adrenaline for 10-15 minutes.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3">P</span>
                        <div>
                          <strong className="text-gray-900">Paced breathing:</strong>
                          <span className="text-gray-700"> Exhale longer than you inhale (breathe in 4 counts, out 6 counts). Slows heart rate.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3">P</span>
                        <div>
                          <strong className="text-gray-900">Paired muscle relaxation:</strong>
                          <span className="text-gray-700"> Tense and release muscle groups while breathing deeply.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distress Tolerance */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Distress Tolerance Skills (Surviving Crisis Without Making It Worse)</h3>
                    <p className="text-gray-700 mb-4">
                      When you can't solve the problem immediately but need to cope:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Distraction:</strong> Engage intensely in activities (puzzles, cleaning, calling a friend) until intensity reduces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Self-soothing:</strong> Use your five senses (light a candle, listen to music, drink tea, soft blanket, look at art)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Radical acceptance:</strong> Acknowledge reality without judgment ("This is painful AND I can handle it")</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Pros and cons:</strong> List consequences of acting on emotion vs. using skills (prevents impulsive action)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emotion Wheel */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Emotion Wheel & Affect Labeling</h3>
                    <p className="text-gray-700 mb-4">
                      Naming emotions precisely reduces their intensity (research shows 30-50% reduction):
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                      <p className="text-gray-800 mb-3">
                        Instead of just "I feel bad," identify the specific emotion:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">→</span>
                          <span className="text-gray-700">Angry: frustrated, resentful, bitter, furious, annoyed, irritated</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">→</span>
                          <span className="text-gray-700">Sad: disappointed, discouraged, hopeless, lonely, depressed, hurt</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">→</span>
                          <span className="text-gray-700">Anxious: worried, overwhelmed, panicked, nervous, stressed, on edge</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">→</span>
                          <span className="text-gray-700">Ashamed: embarrassed, guilty, humiliated, inadequate, worthless</span>
                        </li>
                      </ul>
                      <p className="text-gray-800 mt-3">
                        Our app includes an interactive emotion wheel with 100+ specific emotions to help you identify exactly what you're feeling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opposite Action */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Opposite Action (When Emotions Don't Fit the Facts)</h3>
                    <p className="text-gray-700 mb-4">
                      Act opposite to your emotional urge when the emotion isn't justified or helpful:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Fear urges avoidance → Do the thing</strong> (approach what you fear when it's not actually dangerous)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Anger urges attack → Act kindly</strong> (when someone didn't intentionally harm you)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Sadness urges isolation → Reach out</strong> (connect with others when withdrawal would worsen depression)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700"><strong>Shame urges hiding → Participate</strong> (engage despite embarrassment when you did nothing wrong)</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
                    Important: These skills take practice. Don't expect perfection immediately. Our app provides guided practice
                    and tracks your progress as you build emotional regulation mastery.
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
                Frequently Asked Questions About Emotional Regulation
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn More About Emotional Regulation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    DBT STOP Skill: Step-by-Step Guide with Examples
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Real-world scenarios and practice exercises for the STOP skill
                  </p>
                  <span className="text-red-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    TIPP Technique for Panic Attacks & Intense Anxiety
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Emergency emotional regulation when feelings are overwhelming
                  </p>
                  <span className="text-red-600 font-semibold">Read more →</span>
                </div>
              </Link>

              <Link href="/blog" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    How to Use the Emotion Wheel: Affect Labeling Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Science of naming emotions and how it reduces intensity
                  </p>
                  <span className="text-red-600 font-semibold">Read more →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Master Emotional Regulation Skills—100% Free
            </h2>
            <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
              Get guided DBT practice, in-the-moment crisis tools, and track your emotional patterns with our free app.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <p className="text-red-100 mt-4 text-sm">
              Evidence-based tools used by thousands to manage intense emotions
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
