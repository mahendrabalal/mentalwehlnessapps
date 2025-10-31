import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, buildFaqStructuredData, medicalWebPageStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function WorldTeenMentalWellnessDayPage() {
  const faqs = [
    {
      question: 'When is World Teen Mental Wellness Day?',
      answer: 'World Teen Mental Wellness Day is observed on October 3rd each year. It\'s part of Mental Illness Awareness Week and focuses specifically on the mental health challenges teens face. The day aims to reduce stigma, increase awareness, and encourage teens to seek help when needed.'
    },
    {
      question: 'Why is mental health awareness important for teens?',
      answer: 'About 1 in 5 teens experience mental health challenges, yet many don\'t seek help due to stigma and lack of awareness. Teen mental health issues can develop into serious adult conditions if untreated. Awareness campaigns help normalize mental health conversations and encourage early intervention.'
    },
    {
      question: 'How can parents support teen mental wellness?',
      answer: 'Parents can: Listen without judgment, Create open communication, Model healthy coping strategies, Monitor for warning signs, Encourage physical activity and sleep, Limit social media pressure, Help them find professional support, and Validate their feelings. Teens need to know their parents care about their mental health as much as their grades.'
    },
    {
      question: 'What are common mental health challenges teens face?',
      answer: 'Teens commonly experience depression, anxiety, social pressures, stress from school/future, body image issues, peer conflict, family problems, and substance use. The transition to adulthood is challenging. Many teens feel isolated without realizing how common these struggles are—which is why awareness is so important.'
    },
    {
      question: 'What should I do if a teen is having a mental health crisis?',
      answer: 'If a teen is having thoughts of suicide or self-harm, take it seriously. Call 988 (Suicide & Crisis Lifeline) immediately or text "HELLO" to 741741 (Crisis Text Line). Go to the nearest emergency room if there\'s immediate danger. Don\'t leave them alone and keep weapons away. Professional help is essential.'
    },
    {
      question: 'How can schools support teen mental wellness?',
      answer: 'Schools can: Provide mental health education and awareness, Reduce stigma through campaigns, Offer counseling services, Train staff to recognize warning signs, Create supportive peer networks, Teach stress management and coping skills, and Connect students with community resources. Schools are critical settings for mental health support since most teens spend significant time there.'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'World Teen Mental Wellness Day - Support & Resources for Teens & Parents',
      description: 'October 3rd is World Teen Mental Wellness Day. Learn about teen mental health, support strategies for parents and teens, and free resources to help teens thrive mentally and emotionally.',
      slug: '/support/world-teen-mental-wellness-day',
    }),
    buildBreadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Find Support', url: '/support' },
      { name: 'Teen Mental Wellness Day', url: '/support/world-teen-mental-wellness-day' },
    ]),
    buildFaqStructuredData(faqs),
  ]

  return (
    <>
      <SEOHead
        title="World Teen Mental Wellness Day: Oct 3 Resources"
        description="October 3rd is World Teen Mental Wellness Day. Learn about teen mental health, support strategies for parents and teens, and free resources."
        publishedTime={SUPPORT_PAGES_DATES['world-teen-mental-wellness-day'].published}
        modifiedTime={SUPPORT_PAGES_DATES['world-teen-mental-wellness-day'].modified}
        keywords={[
          'world teen mental wellness day',
          'teen mental health awareness',
          'teen mental wellness',
          'adolescent mental health',
          'teen mental health resources',
          'supporting teens mental health',
          'teen anxiety and depression',
          'teen mental health day october 3',
          'teen mental wellness support'
        ]}
        ogImage="/og-teen-mental-wellness-day.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>📅</span>
                <span>October 3rd Awareness Campaign</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                World Teen Mental
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Wellness Day
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                October 3rd is World Teen Mental Wellness Day. Join us in raising awareness about teen mental health, reducing stigma, and supporting young people as they navigate the challenges of adolescence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools/depression-screening"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Teen Mental Health Screening
                </Link>
                <Link
                  href="#challenges"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Teen Mental Health Matters */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Teen Mental Health Matters
              </h2>
              <p className="text-xl text-gray-600">
                The foundation for lifelong wellness is built during the teen years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">📊 The Statistics</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• 1 in 5 teens experience a mental health disorder</li>
                  <li>• Suicide is the 2nd leading cause of death in teens</li>
                  <li>• 2 in 3 teens with depression don't receive treatment</li>
                  <li>• Teen anxiety rates have increased significantly</li>
                  <li>• Social media pressure impacts mental health</li>
                </ul>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🎯 The Opportunity</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Early intervention prevents serious mental illness</li>
                  <li>• Teens respond well to support and coping strategies</li>
                  <li>• Mental health skills built now last a lifetime</li>
                  <li>• Peer support reduces isolation and stigma</li>
                  <li>• Resources and awareness save lives</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-8 text-center">
              <p className="text-xl text-gray-900 font-semibold mb-2">
                World Teen Mental Wellness Day exists to amplify this message:
              </p>
              <p className="text-lg text-gray-800 italic">
                "Teen mental health matters. You are not alone. Help is available. Your feelings are valid."
              </p>
            </div>
          </div>
        </section>

        {/* Common Teen Mental Health Challenges */}
        <section id="challenges" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Teen Mental Health Challenges
              </h2>
              <p className="text-xl text-gray-600">
                Understanding what teens face helps us support them better
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Depression & Sadness</h3>
                <p className="text-gray-600 mb-4">
                  Persistent sadness, loss of interest in activities, feelings of worthlessness, and fatigue. Depression is more common in teens than many realize and is treatable with proper support.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Talk therapy, exercise, meaningful activities, connection with others, and sometimes medication.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Anxiety & Worry</h3>
                <p className="text-gray-600 mb-4">
                  Excessive worry about school, social situations, future, or general overwhelm. Teen anxiety can feel paralyzing and impact daily functioning. It's also very treatable.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Breathing exercises, mindfulness, gradual exposure to feared situations, and professional support.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-pink-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Body Image & Self-Esteem</h3>
                <p className="text-gray-600 mb-4">
                  Social media comparison, physical changes, peer pressure, and perfectionism fuel poor body image and low self-worth. This impacts mental health significantly.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Limiting social media, building skills and interests, positive self-talk, and challenging perfectionism.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Stress & Overwhelm</h3>
                <p className="text-gray-600 mb-4">
                  School pressure, college prep, extracurricular overload, and life transitions create chronic stress. Teens often don't know how to manage stress effectively.
                </p>
                <div className="bg-red-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Time management, learning to say no, breaks and rest, exercise, and talking about what's overwhelming.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-teal-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Social Conflict & Isolation</h3>
                <p className="text-gray-600 mb-4">
                  Peer drama, bullying, social rejection, and feeling alone. For teens, social connection is essential, making these challenges particularly painful.
                </p>
                <div className="bg-teal-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Building healthy friendships, finding communities with shared interests, addressing bullying, and building resilience.
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Substance & Unhealthy Coping</h3>
                <p className="text-gray-600 mb-4">
                  Some teens turn to drugs, alcohol, or other unhealthy behaviors to cope with difficult emotions. Early intervention is critical.
                </p>
                <div className="bg-green-50 p-4 rounded-lg text-gray-700">
                  <strong>What helps:</strong> Learning healthy coping skills, addressing underlying issues, family support, and professional treatment when needed.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Parents Can Support */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Parents Can Support Teen Mental Wellness
              </h2>
              <p className="text-xl text-gray-600">
                Your role is more important than you might think
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">👂 Listen Without Judgment</h3>
                <p className="text-gray-700">When teens open up, really listen. Don't immediately offer solutions or criticism. They need to feel heard and understood first.</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">💬 Start Conversations</h3>
                <p className="text-gray-700">Don't wait for them to bring it up. Ask about their feelings, worries, and how they're doing. Normalize mental health conversations.</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🤝 Model Healthy Coping</h3>
                <p className="text-gray-700">Show your teens how you handle stress and emotions. Exercise, talk about your feelings, ask for help, practice self-care. They learn from watching you.</p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">⚠️ Know the Warning Signs</h3>
                <p className="text-gray-700">Look for changes in behavior, mood, sleep, appetite, grades, or social withdrawal. Trust your instinct if something seems off.</p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">💤 Support Healthy Habits</h3>
                <p className="text-gray-700">Encourage sleep (8-10 hours), exercise, limiting social media, eating well, and time outdoors. These foundation habits protect mental health.</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">🏥 Seek Professional Help</h3>
                <p className="text-gray-700">If you're concerned, contact your teen's doctor or a mental health professional. Getting help early is one of the best things you can do.</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">💚 Show Unconditional Love</h3>
                <p className="text-gray-700">Let them know you love them no matter what. Mental health struggles don't define them. Your acceptance is healing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Teens Can Take Care of Mental Health */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Teens Can Take Care of Their Mental Health
              </h2>
              <p className="text-xl text-gray-600">
                You have more power than you realize
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">🗣️ Talk About Your Feelings</h3>
                <p className="text-gray-600">
                  Don't bottle things up. Talk to a trusted adult, friend, therapist, or use our free AI companion. Speaking about struggles makes them feel more manageable.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💪 Take Care of Your Body</h3>
                <p className="text-gray-600">
                  Get enough sleep (8-10 hours), exercise regularly, eat nutritious foods, and limit social media. Your physical health directly impacts your mental health.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🧘 Try Mindfulness & Relaxation</h3>
                <p className="text-gray-600 mb-4">
                  Practice meditation, deep breathing, yoga, or any activity that calms your mind. These aren't just for "chill" people—they help everyone manage stress.
                </p>
                <Link href="/tools/mindfulness" className="text-blue-600 font-semibold hover:underline">
                  Try Our Free Mindfulness Exercises →
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📱 Set Social Media Boundaries</h3>
                <p className="text-gray-600">
                  Limit time scrolling, compare less, follow positive accounts, take breaks. Social media comparison damages mental health—protect yourself.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Focus on What You Can Control</h3>
                <p className="text-gray-600">
                  You can't control everything, but you can control your effort, attitude, and response. Focus there instead of worrying about things beyond your power.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🤝 Build Real Connections</h3>
                <p className="text-gray-600">
                  Spend time with people who support you. Join clubs or activities aligned with your interests. Real connection protects mental health.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Know It's Okay to Ask for Help</h3>
                <p className="text-gray-600">
                  Asking for help is not weakness—it's wisdom. Talk to a parent, school counselor, doctor, or therapist. Use our free tools and assessments to understand what you need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free Resources for Teens */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Free Mental Health Resources for Teens
              </h2>
              <p className="text-xl text-gray-600">
                You're not alone—help is available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link href="/tools/depression-screening" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Teen Depression Screening</h3>
                  <p className="text-gray-600 mb-4">Understand your mood patterns and whether depression might be affecting you.</p>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Take Assessment →</span>
                </div>
              </Link>

              <Link href="/tools/anxiety-relief" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-purple-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600">Anxiety Relief Tools</h3>
                  <p className="text-gray-600 mb-4">Learn techniques to manage anxiety and calm your nervous system.</p>
                  <span className="text-purple-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Explore Tools →</span>
                </div>
              </Link>

              <Link href="/tools/mindfulness" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-green-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600">Mindfulness & Meditation</h3>
                  <p className="text-gray-600 mb-4">Guided practices to help you manage stress and build self-awareness.</p>
                  <span className="text-green-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Start Practicing →</span>
                </div>
              </Link>

              <Link href="/tools/emotional-regulation" className="group">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-pink-300 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600">Emotional Regulation Skills</h3>
                  <p className="text-gray-600 mb-4">Learn healthy ways to manage difficult emotions and reactions.</p>
                  <span className="text-pink-600 font-semibold group-hover:translate-x-1 inline-block transition-transform">Explore Skills →</span>
                </div>
              </Link>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">24/7 Crisis Resources</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">☎️</span>
                  <div>
                    <p className="font-bold text-gray-900">National Suicide Prevention Lifeline</p>
                    <p className="text-gray-600">Call or text 988 • Available 24/7 • Free and confidential</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-bold text-gray-900">Crisis Text Line</p>
                    <p className="text-gray-600">Text HOME to 741741 • Available 24/7 • Trained counselors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🚑</span>
                  <div>
                    <p className="font-bold text-gray-900">If in immediate danger</p>
                    <p className="text-gray-600">Call 911 or go to your nearest emergency room</p>
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Teen Mental Wellness Starts Today
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Whether you're a teen, parent, teacher, or friend—you can make a difference. Access free resources, take assessments, and help reduce stigma around mental health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/depression-screening"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Take Free Assessment
              </Link>
              <Link
                href="/crisis-support"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Crisis Resources
              </Link>
            </div>
            <p className="text-blue-100 mt-6 text-sm">
              Mental health matters. You matter. Help is available. Reach out.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
