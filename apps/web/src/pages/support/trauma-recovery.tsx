import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function TraumaRecoverySupport() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Trauma Recovery Guide | PTSD Support Resources & Healing Techniques',
      description: 'Comprehensive guide to trauma recovery and PTSD support. Find evidence-based healing techniques, coping strategies, and professional resources for emotional trauma recovery.',
      slug: '/support/trauma-recovery',
    }),
    medicalEntityStructuredData({
      name: 'Post-Traumatic Stress Disorder',
      description: 'PTSD is a mental health condition triggered by experiencing or witnessing a terrifying event, characterized by flashbacks, nightmares, and severe anxiety.',
      alternateName: ['PTSD', 'Trauma Disorder', 'Combat Stress', 'Shell Shock'],
      cause: ['Traumatic events', 'Combat exposure', 'Sexual assault', 'Natural disasters', 'Accidents', 'Childhood trauma'],
      symptom: ['Flashbacks', 'Nightmares', 'Severe anxiety', 'Intrusive memories', 'Avoidance behaviors', 'Emotional numbness', 'Hypervigilance', 'Sleep disturbances'],
      riskFactor: ['Previous trauma exposure', 'Lack of social support', 'History of mental health conditions', 'Severity of trauma', 'Lack of coping skills'],
      treatment: ['Trauma-focused psychotherapy', 'EMDR therapy', 'Cognitive processing therapy', 'Medication', 'Group therapy', 'Mindfulness-based approaches'],
      typicalTest: ['PCL-5', 'CAPS-5', 'Trauma Screening Questionnaire'],
      medicalSpecialty: 'Psychiatry'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Sarah Martinez',
        credentials: 'Ph.D., Clinical Psychologist',
        expertise: 'Trauma psychology, PTSD treatment, EMDR therapy'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'International Society for Traumatic Stress Studies'
    })
  ]

  return (
    <>
      <SEOHead
        title="Trauma Recovery Guide - PTSD Support & Healing"
        description="Comprehensive trauma recovery and PTSD guide. Evidence-based healing techniques, coping strategies, and professional resources."
        publishedTime={SUPPORT_PAGES_DATES['trauma-recovery'].published}
        modifiedTime={SUPPORT_PAGES_DATES['trauma-recovery'].modified}
        keywords={[
          "trauma recovery",
          "PTSD support",
          "trauma healing guide",
          "emotional trauma recovery",
          "post-traumatic stress disorder",
          "trauma therapy techniques",
          "PTSD coping strategies",
          "trauma-informed care",
          "psychological trauma treatment",
          "trauma recovery resources",
          "complex trauma healing",
          "PTSD self-help",
          "trauma processing techniques",
          "emotional healing after trauma",
          "trauma survivor support"
        ]}
        ogImage="/og-trauma-recovery.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Trauma Recovery Guide" />

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
                  <Link href="/support" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Support
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Trauma Recovery</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trauma Recovery & PTSD Support Guide
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Comprehensive guide to healing from trauma and PTSD. Find evidence-based recovery techniques, coping strategies, and professional support resources for your healing journey.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based Techniques
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Professional Reviewed
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Free Resources
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Trauma-Informed
              </span>
            </div>
          </div>

          {/* Crisis Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Need Immediate Support?</h3>
                <p className="text-sm text-red-800 mb-2">
                  If you're experiencing severe distress or having thoughts of self-harm, please reach out for immediate help.
                </p>
                <Link href="/crisis-support" className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-900 underline">
                  Get Crisis Support →
                </Link>
              </div>
            </div>
          </div>

          {/* Medical Review */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-blue-900">Clinically Reviewed</span>
                  <span className="text-sm text-blue-700">•</span>
                  <span className="text-sm text-blue-700">Last updated: October 28, 2025</span>
                </div>
                <p className="text-sm text-blue-800">
                  This trauma recovery guide has been reviewed by Dr. Sarah Martinez, Ph.D., Clinical Psychologist specializing in trauma psychology and PTSD treatment. All techniques are evidence-based and trauma-informed.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Ph.D. Clinical Psychology</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Trauma Specialist</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">EMDR Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Understanding Trauma */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Trauma</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is Trauma?</h3>
                <p className="text-gray-600 mb-3">
                  Trauma is the emotional response to a distressing event that overwhelms your ability to cope. It can result from single events or prolonged experiences and affects people differently.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Common Types of Trauma:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Physical or sexual assault</li>
                    <li>• Combat or military experiences</li>
                    <li>• Natural disasters</li>
                    <li>• Childhood abuse or neglect</li>
                    <li>• Serious accidents or injuries</li>
                    <li>• Medical trauma</li>
                    <li>• Loss of a loved one</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Signs & Symptoms</h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Common PTSD Symptoms:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><strong>Intrusive memories:</strong> Flashbacks, nightmares, unwanted memories</li>
                    <li><strong>Avoidance:</strong> Avoiding people, places, or activities that trigger memories</li>
                    <li><strong>Negative changes:</strong> Hopelessness, memory problems, relationship difficulties</li>
                    <li><strong>Emotional reactivity:</strong> Irritability, hypervigilance, startle response</li>
                    <li><strong>Physical symptoms:</strong> Sleep disturbances, fatigue, chronic pain</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Strategies */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Evidence-Based Recovery Strategies</h2>
            <div className="space-y-6">
              {/* Grounding Techniques */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Grounding Techniques</h3>
                <p className="text-gray-600 mb-3">
                  Grounding helps you stay in the present moment when experiencing intrusive memories or flashbacks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">5-4-3-2-1 Technique</h4>
                    <p className="text-sm text-purple-700">Identify 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Physical Grounding</h4>
                    <p className="text-sm text-purple-700">Hold ice, splash cold water, stomp your feet, or press against a wall</p>
                  </div>
                </div>
              </div>

              {/* Breathing Exercises */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Breathing Exercises</h3>
                <p className="text-gray-600 mb-3">
                  Calming breathing techniques help regulate your nervous system during anxiety or panic.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Box Breathing</h4>
                    <p className="text-sm text-blue-700">Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 4-6 times</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">4-7-8 Breathing</h4>
                    <p className="text-sm text-blue-700">Inhale for 4, hold for 7, exhale for 8. Excellent for sleep and relaxation</p>
                  </div>
                </div>
              </div>

              {/* Mindfulness */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Mindfulness & Meditation</h3>
                <p className="text-gray-600 mb-3">
                  Mindfulness helps you observe thoughts and feelings without judgment, reducing their power over you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Body Scan Meditation</h4>
                    <p className="text-sm text-green-700">Progressively focus on each body part, noticing sensations without judgment</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Mindful Walking</h4>
                    <p className="text-sm text-green-700">Focus on the physical sensations of walking, staying present in your body</p>
                  </div>
                </div>
              </div>

              {/* Building Safety */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Building a Sense of Safety</h3>
                <p className="text-gray-600 mb-3">
                  Creating physical and emotional safety is foundational to trauma recovery.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-1">Safe Space Visualization</h4>
                    <p className="text-sm text-yellow-700">Create a detailed mental image of a place where you feel completely safe</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-1">Coping Skills Box</h4>
                    <p className="text-sm text-yellow-700">Collect physical items that provide comfort and grounding during difficult moments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Treatment Options</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trauma-Focused Psychotherapy</h3>
                <p className="text-gray-600 mb-3">
                  Evidence-based therapies specifically designed for trauma recovery:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>EMDR (Eye Movement Desensitization and Reprocessing):</strong> Uses bilateral stimulation to process traumatic memories</li>
                  <li><strong>Cognitive Processing Therapy (CPT):</strong> Helps identify and challenge trauma-related beliefs</li>
                  <li><strong>Prolonged Exposure Therapy:</strong> Gradually confront trauma-related memories and situations</li>
                  <li><strong>Trauma-Focused CBT:</strong> Combines cognitive techniques with trauma processing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Medication Options</h3>
                <p className="text-gray-600 mb-3">
                  Medications can help manage PTSD symptoms when combined with therapy:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• SSRIs (Selective Serotonin Reuptake Inhibitors)</li>
                  <li>• SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)</li>
                  <li>• Prazosin for nightmares and sleep disturbances</li>
                  <li>• Anti-anxiety medications for short-term use</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Self-Care Strategies */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Self-Care & Lifestyle Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Physical Health</h3>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• Regular exercise (even gentle movement)</li>
                  <li>• Consistent sleep schedule</li>
                  <li>• Balanced nutrition</li>
                  <li>• Limit caffeine and alcohol</li>
                  <li>• Regular medical check-ups</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Emotional Regulation</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Journaling for emotional processing</li>
                  <li>• Creative expression (art, music)</li>
                  <li>• Setting healthy boundaries</li>
                  <li>• Practicing self-compassion</li>
                  <li>• Connecting with nature</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Social Connection</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Support groups</li>
                  <li>• Trusted friends/family</li>
                  <li>• Community involvement</li>
                  <li>• Volunteering (when ready)</li>
                  <li>• Online trauma communities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl">😌</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Anxiety Relief Tools</h3>
                  <p className="text-sm text-gray-600">Immediate calming techniques</p>
                </div>
              </Link>
              <Link
                href="/tools/depression-screening"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Depression Screening</h3>
                  <p className="text-sm text-gray-600">Free PHQ-9 assessment</p>
                </div>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">🧘</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Mindfulness Exercises</h3>
                  <p className="text-sm text-gray-600">Guided meditation practices</p>
                </div>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does trauma recovery take?</h3>
                <p className="text-gray-600">
                  Recovery timelines vary greatly depending on the individual, type of trauma, support system, and treatment approach. Some people see improvement in months, while others may need years of healing. Recovery is not linear - there will be ups and downs.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I recover from trauma without therapy?</h3>
                <p className="text-gray-600">
                  While some people heal from trauma without professional therapy, working with a trauma-informed therapist significantly improves outcomes and can prevent chronic PTSD. Professional help provides structured support and evidence-based techniques that self-help alone may not offer.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I'm not ready to talk about my trauma?</h3>
                <p className="text-gray-600">
                  That's completely normal and valid. Trauma-informed therapists understand this and will work at your pace. You can start with stabilization techniques and building coping skills before addressing the trauma itself. The therapeutic relationship itself can be healing.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I support someone who has experienced trauma?</h3>
                <p className="text-gray-600">
                  Listen without judgment, validate their feelings, respect their boundaries, and encourage professional help. Avoid telling them to "get over it" or comparing their experience to others. Be patient - healing takes time, and your consistent support can make a significant difference.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Start Your Healing Journey Today</h2>
            <p className="mb-6">
              Recovery is possible, and you don't have to go through it alone. Take the first step by exploring our tools or reaching out for professional support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools/free-mental-health-tools"
                className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Explore Mental Health Tools
              </Link>
              <Link
                href="/crisis-support"
                className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-900 transition-colors duration-200 text-center"
              >
                Get Immediate Support
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