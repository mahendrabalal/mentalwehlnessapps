import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { InternationalCrisisSupport } from '@/components/InternationalCrisisSupport'
import { useUserCountry } from '@/hooks/useUserCountry'
import { SEOHead, SEO_CONFIG } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData } from '@/lib/seo'

export default function CrisisSupportPage() {
  const { countryName } = useUserCountry()

  const warningSignsCategories = [
    {
      title: 'Immediate Warning Signs',
      signs: [
        'Talking about wanting to die or kill oneself',
        'Looking for ways to kill oneself',
        'Talking about feeling hopeless or having no purpose',
        'Talking about feeling trapped or in unbearable pain',
        'Talking about being a burden to others',
        'Increasing use of alcohol or drugs',
        'Acting anxious, agitated, or reckless',
        'Sleeping too little or too much',
        'Withdrawing or feeling isolated',
        'Showing rage or talking about seeking revenge',
        'Displaying extreme mood swings'
      ],
      color: 'red'
    },
    {
      title: 'Behavioral Changes',
      signs: [
        'Giving away prized possessions',
        'Saying goodbye to loved ones',
        'Making a will or funeral arrangements',
        'Taking unusual risks',
        'Sudden improvement after being very depressed',
        'Loss of interest in activities once enjoyed',
        'Neglecting personal hygiene or appearance',
        'Changes in eating or sleeping patterns'
      ],
      color: 'orange'
    }
  ]

  const safetySteps = [
    {
      step: '1',
      title: 'Ensure Immediate Safety',
      description: 'If you\'re in immediate danger, call emergency services. Remove any means of self-harm from your environment.',
      action: 'Call emergency services immediately'
    },
    {
      step: '2',
      title: 'Reach Out for Support',
      description: 'Contact a crisis lifeline, trusted friend, family member, or mental health professional.',
      action: 'Connect with crisis support'
    },
    {
      step: '3',
      title: 'Stay Connected',
      description: 'Don\'t isolate yourself. Stay with someone you trust or go to a safe public place.',
      action: 'Be around supportive people'
    },
    {
      step: '4',
      title: 'Create a Safety Plan',
      description: 'Work with a professional to create a detailed safety plan for future crisis situations.',
      action: 'Develop coping strategies'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Crisis Support Resources',
      description: SEO_CONFIG.crisisSupport.description,
      slug: '/crisis-support',
    }),
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Crisis Support', url: '/crisis-support' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to respond in a mental health crisis',
      description: 'Immediate steps to keep yourself safe and connected during a mental health emergency.',
      step: safetySteps.map((step) => ({
        '@type': 'HowToStep',
        position: Number(step.step),
        name: step.title,
        text: `${step.description} ${step.action}`,
      })),
    },
  ]

  return (
    <>
      <SEOHead
        title={SEO_CONFIG.crisisSupport.title}
        description={SEO_CONFIG.crisisSupport.description}
        keywords={SEO_CONFIG.crisisSupport.keywords}
        ogImage="/og-default.png"
        structuredData={structuredData}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-medium">
                🚨 If you are in immediate danger, call your local emergency number
                {countryName && ` (${countryName})`}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Crisis Support Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              You are not alone. Help is available 24/7, and your life has value.
            </p>
          </div>
        </div>

        {/* International Crisis Support */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Immediate Help {countryName && `in ${countryName}`}
              </h2>
              <p className="text-xl text-gray-600">
                These resources are available for immediate support
              </p>
            </div>

            <InternationalCrisisSupport variant="full" showCountrySelector={true} />
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recognizing Warning Signs
              </h2>
              <p className="text-xl text-gray-600">
                Know the signs that someone may be considering suicide
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {warningSignsCategories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className={`text-xl font-bold mb-4 ${
                    category.color === 'red' ? 'text-red-700' : 'text-orange-700'
                  }`}>
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.signs.map((sign, signIndex) => (
                      <li key={signIndex} className="flex items-start space-x-2">
                        <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          category.color === 'red' ? 'bg-red-500' : 'bg-orange-500'
                        }`}></span>
                        <span className="text-gray-700">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Steps */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What to Do in a Crisis
              </h2>
              <p className="text-xl text-gray-600">
                Steps to take when experiencing thoughts of self-harm
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {safetySteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-therapy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="bg-therapy-50 rounded-lg p-3">
                    <p className="text-therapy-700 font-medium text-sm">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Planning */}
        <div className="bg-therapy-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Create Your Safety Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Having a safety plan can help you cope with difficult situations and keep you safe
            </p>
            <div className="space-y-4">
              <Link
                href="/safety/plan"
                className="inline-block bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Create My Safety Plan
              </Link>
              <p className="text-sm text-gray-500">
                Work with our guided tool to create a personalized crisis safety plan
              </p>
            </div>
          </div>
        </div>

        {/* Remember */}
        <div className="bg-therapy-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Remember</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
              <div>
                <div className="text-4xl mb-4">💝</div>
                <p>You matter and your life has value</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🤝</div>
                <p>You are not alone in your struggles</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🌅</div>
                <p>Help is available and recovery is possible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
