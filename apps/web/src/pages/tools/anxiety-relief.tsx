import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { QuickAnxietyRelief } from '@/components/QuickAnxietyRelief'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'

export default function AnxietyReliefTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Anxiety Relief Tools - Immediate Help',
      description: 'Access free, evidence-based anxiety relief techniques including breathing exercises, grounding techniques, and panic attack support. No signup required.',
      slug: '/tools/anxiety-relief',
    }),
    medicalEntityStructuredData({
      name: 'Anxiety',
      description: 'Anxiety is a normal human emotion characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. When anxiety becomes excessive, it can develop into an anxiety disorder.',
      alternateName: ['Anxiety Disorders', 'Generalized Anxiety Disorder', 'Panic Disorder', 'Social Anxiety'],
      cause: ['Genetic factors', 'Brain chemistry', 'Environmental stress', 'Trauma', 'Medical conditions'],
      symptom: ['Excessive worrying', 'Restlessness', 'Fatigue', 'Difficulty concentrating', 'Irritability', 'Sleep disturbances', 'Physical symptoms like rapid heartbeat'],
      riskFactor: ['Family history of anxiety', 'Stressful life events', 'Certain medical conditions', 'Substance use', 'Trauma exposure'],
      treatment: ['Cognitive behavioral therapy', 'Medication', 'Mindfulness and relaxation techniques', 'Exercise', 'Stress management'],
      typicalTest: ['GAD-7 Assessment', 'PHQ-9', 'Anxiety Screening Tools'],
      medicalSpecialty: 'Psychiatry'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Michael Chen',
        credentials: 'M.D., Psychiatrist',
        expertise: 'Anxiety disorders, panic disorders, cognitive behavioral therapy'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'Anxiety and Depression Association of America'
    })
  ]

  return (
    <>
      <SEOHead
        title="Free Anxiety Relief Tools - Immediate Help for Panic & Stress | No Signup"
        description="Get immediate anxiety relief with evidence-based techniques: breathing exercises, grounding methods, and panic attack support. Free tools for instant stress reduction and anxiety management."
        keywords={[
          "free anxiety relief tools",
          "immediate anxiety help",
          "panic attack relief",
          "anxiety breathing exercises",
          "grounding techniques anxiety",
          "stress reduction techniques",
          "anxiety management free",
          "calming anxiety techniques",
          "anxiety coping skills",
          "mental health anxiety tools",
          "mental wellness activities",
          "anxiety wellness activities",
          "mental health activities",
          "stress relief activities"
        ]}
        ogImage="/og-anxiety-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner - Shows only for unauthenticated users */}
      <GuestToolBanner toolName="Anxiety Relief Tools" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Anxiety Relief</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Anxiety Relief Tools
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Get immediate relief when anxiety strikes. All techniques are evidence-based and clinically proven to reduce anxiety symptoms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ No signup required
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-based
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Works instantly
              </span>
            </div>
          </div>

          {/* Medical Review & Credentials */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-green-900">Clinically Reviewed</span>
                  <span className="text-sm text-green-700">•</span>
                  <span className="text-sm text-green-700">Last updated: October 28, 2025</span>
                </div>
                <p className="text-sm text-green-800">
                  These anxiety relief techniques are based on Cognitive Behavioral Therapy (CBT) and mindfulness practices, reviewed by Dr. Michael Chen, M.D., Psychiatrist specializing in anxiety disorders. Tools follow guidelines from the Anxiety and Depression Association of America (ADAA).
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-green-700 text-xs px-2 py-1 rounded">M.D. Psychiatry</span>
                  <span className="bg-white text-green-700 text-xs px-2 py-1 rounded">CBT-Based</span>
                  <span className="bg-white text-green-700 text-xs px-2 py-1 rounded">ADAA Guidelines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Component */}
          <QuickAnxietyRelief className="mb-8" />

          {/* Mental Wellness Activities Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Mental Wellness Activities</h2>
            <p className="text-gray-600 mb-6">
              Beyond immediate anxiety relief, these evidence-based mental wellness activities can help build long-term resilience and emotional wellbeing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🌅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Morning Mindfulness</h3>
                <p className="text-sm text-gray-600">Start your day with 5 minutes of mindful breathing to set a calm tone.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🚶</div>
                <h3 className="font-semibold text-gray-900 mb-2">Movement Breaks</h3>
                <p className="text-sm text-gray-600">Take 10-minute walks throughout the day to reduce tension and clear your mind.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">📓</div>
                <h3 className="font-semibold text-gray-900 mb-2">Gratitude Journaling</h3>
                <p className="text-sm text-gray-600">Write 3 things you're grateful for each day to shift focus to positive thoughts.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Creative Expression</h3>
                <p className="text-sm text-gray-600">Engage in creative activities like drawing, music, or writing to process emotions.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🌿</div>
                <h3 className="font-semibold text-gray-900 mb-2">Nature Connection</h3>
                <p className="text-sm text-gray-600">Spend time outdoors or care for plants to ground yourself and reduce stress.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🧘</div>
                <h3 className="font-semibold text-gray-900 mb-2">Progressive Relaxation</h3>
                <p className="text-sm text-gray-600">Practice tensing and releasing muscle groups to release physical tension.</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-purple-700 font-medium">
                💡 <strong>Tip:</strong> Consistency is key. Choose 2-3 activities that resonate with you and practice them regularly for best results.
              </p>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Anxiety</h2>
            <p className="text-gray-600 mb-4">
              Understanding anxiety is the first step to managing it. Explore our comprehensive guides and resources.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/managing-anxiety-naturally"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Managing Anxiety Naturally</h3>
                  <p className="text-sm text-gray-600">Learn long-term strategies</p>
                </div>
              </Link>
              <Link
                href="/support/emotional-regulation-skills"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Regulation Skills</h3>
                  <p className="text-sm text-gray-600">Build emotional resilience</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/burnout-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your burnout risk level</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900 mb-1">Mindfulness Exercises</h3>
                <p className="text-sm text-gray-600">Start your meditation practice</p>
              </Link>
              <Link
                href="/tools/emotional-regulation"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🎯</span>
                <h3 className="font-semibold text-gray-900 mb-1">Emotional Regulation</h3>
                <p className="text-sm text-gray-600">Master your emotions</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}
