import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { BurnoutRiskIndicator } from '@/components/BurnoutRiskIndicator'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'

export default function BurnoutAssessmentTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Burnout Self Test - Free Assessment for Emotional Exhaustion',
      description: 'Take this free burnout self test to check your risk level. Get instant results and personalized recovery recommendations for emotional exhaustion and work-related stress.',
      slug: '/tools/burnout-assessment',
    }),
    medicalEntityStructuredData({
      name: 'Burnout',
      description: 'Burnout is a psychological syndrome characterized by emotional exhaustion, depersonalization, and a reduced sense of personal accomplishment.',
      alternateName: ['Occupational Burnout', 'Work Burnout', 'Professional Burnout'],
      cause: ['Chronic work stress', 'Excessive workload', 'Lack of control', 'Insufficient reward', 'Breakdown in community', 'Absence of fairness', 'Conflicting values'],
      symptom: ['Emotional exhaustion', 'Cynicism and detachment', 'Reduced professional efficacy', 'Physical fatigue', 'Sleep disturbances', 'Irritability'],
      riskFactor: ['High workload', 'Work-life imbalance', 'Lack of social support', 'Perfectionism', 'Type A personality'],
      treatment: ['Stress management techniques', 'Cognitive behavioral therapy', 'Mindfulness practices', 'Work boundary setting', 'Social support building'],
      typicalTest: ['Maslach Burnout Inventory', 'Burnout Assessment Tool', 'Copenhagen Burnout Inventory'],
      medicalSpecialty: 'Occupational Health'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Sarah Johnson',
        credentials: 'Ph.D., Clinical Psychologist',
        expertise: 'Workplace mental health, burnout prevention, occupational psychology'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'American Psychological Association'
    })
  ]

  return (
    <>
      <SEOHead
        title="Burnout Self Test - Free Assessment | Workplace Burnout Quiz & Job Stress Test"
        description="Take this free burnout self test to check your workplace burnout risk level. Get instant results, identify job stress signs, and receive personalized recovery recommendations for emotional exhaustion and professional burnout."
        keywords={[
          "burnout self test",
          "burnout test free",
          "burnout assessment",
          "emotional exhaustion test",
          "work burnout quiz",
          "burnout risk assessment",
          "free burnout check",
          "burnout recovery",
          "job burnout symptoms",
          "professional burnout test",
          "workplace burnout quiz",
          "job stress test",
          "occupational burnout assessment",
          "work-life balance test",
          "career burnout screening",
          "employee burnout evaluation",
          "mental exhaustion quiz"
        ]}
        ogImage="/og-burnout-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Burnout Assessment" />

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
                  <span className="text-gray-500">Burnout Assessment</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Burnout Self Test - Free Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Take this 2-minute burnout self test to identify early warning signs of emotional exhaustion. Get instant results and personalized recovery recommendations based on your current burnout risk level.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ 100% Free Burnout Test
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ 2-Minute Assessment
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Instant Results
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based
              </span>
            </div>
          </div>

          {/* Medical Review & Credentials */}
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
                  This assessment is based on the Maslach Burnout Inventory (MBI) and has been reviewed by Dr. Sarah Johnson, Ph.D., Clinical Psychologist with 15+ years in workplace mental health. Our tools follow evidence-based guidelines from the American Psychological Association (APA).
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Ph.D. Clinical Psychology</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">APA Guidelines</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Evidence-Based</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Component */}
          <BurnoutRiskIndicator className="mb-8" />

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Burnout</h2>
            <p className="text-gray-600 mb-4">
              Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress. Learn how to recognize and recover from it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/support/emotional-exhaustion-burnout"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Burnout Recovery</h3>
                  <p className="text-sm text-gray-600">Complete recovery guide</p>
                </div>
              </Link>
              <Link
                href="/support/realistic-mental-health-expectations"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Realistic Recovery Expectations</h3>
                  <p className="text-sm text-gray-600">Set healthy goals</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Scientific References */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Evidence-Based Research</h2>
            <p className="text-gray-600 mb-4">
              Our burnout assessment is based on peer-reviewed research and clinical guidelines. Here are key studies supporting our approach:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Maslach, C., & Jackson, S. E. (1981). The measurement of experienced burnout.</h4>
                <p className="text-sm text-gray-600 italic">Journal of Organizational Behavior, 2(2), 99-113.</p>
                <p className="text-sm text-gray-700">Original research establishing the Maslach Burnout Inventory (MBI) as the gold standard for burnout assessment.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">Schaufeli, W. B., & Taris, T. W. (2014). A conceptual analysis of the burnout syndrome.</h4>
                <p className="text-sm text-gray-600 italic">Anxiety, Stress, & Coping, 27(3), 249-265.</p>
                <p className="text-sm text-gray-700">Comprehensive review of burnout components and assessment methodologies in occupational health.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">World Health Organization. (2019). Burn-out an "occupational phenomenon".</h4>
                <p className="text-sm text-gray-600 italic">International Classification of Diseases (ICD-11).</p>
                <p className="text-sm text-gray-700">WHO recognition of burnout as an occupational syndrome, validating the importance of early detection and intervention.</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              <strong>Note:</strong> This assessment is for educational purposes and not a substitute for professional medical diagnosis. Always consult with qualified healthcare providers for proper evaluation and treatment.
            </p>
          </div>

          {/* FAQ Section - Progressive Disclosure */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <CollapsibleSection
                id="faq-burnout-difference"
                title="What is the difference between burnout and stress?"
                icon="⚡"
                summary="Stress = over-engagement, Burnout = disengagement"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    While stress is characterized by over-engagement, burnout is characterized by disengagement. Stress feels like you have too much on your plate, while burnout feels like you have nothing left to give. This workplace burnout quiz helps identify both conditions.
                  </p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="faq-burnout-accuracy"
                title="How accurate is this burnout self test?"
                icon="🎯"
                summary="Based on Maslach Burnout Inventory (MBI) with 40+ years of validation"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Our burnout assessment is based on the Maslach Burnout Inventory (MBI), the gold standard in occupational health with over 40 years of research validation. While not a medical diagnosis, it provides reliable insights into your burnout risk level and early warning signs.
                  </p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="faq-burnout-employees"
                title="Can I use this job stress test for my employees?"
                icon="👥"
                summary="Suitable for workplace wellness programs and mental health initiatives"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Yes, this occupational burnout assessment is suitable for workplace wellness programs and employee mental health initiatives. Many organizations use it as part of their mental health screening and prevention strategies to identify at-risk employees early.
                  </p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="faq-burnout-signs"
                title="What are the early signs of workplace burnout?"
                icon="⚠️"
                summary="Chronic fatigue, decreased productivity, cynicism, emotional detachment"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Early warning signs include chronic fatigue, decreased productivity, cynicism about work, emotional detachment, difficulty concentrating, and physical symptoms like headaches or sleep problems. This employee burnout evaluation helps identify these patterns early.
                  </p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="faq-burnout-recovery"
                title="How long does burnout recovery take?"
                icon="⏱️"
                summary="2-4 weeks for mild, 2-6+ months for severe cases"
                defaultExpanded={false}
              >
                <div className="bg-white rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Recovery time varies based on severity and intervention. Mild burnout may improve in 2-4 weeks with proper rest and boundary setting, while severe burnout may require 2-6 months or more. Our burnout recovery recommendations provide a structured approach to healing.
                  </p>
                </div>
              </CollapsibleSection>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Instant anxiety techniques</p>
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
