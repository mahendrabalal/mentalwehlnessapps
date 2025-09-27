import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

export default function CrisisSupportPage() {
  const emergencyContacts = [
    {
      title: 'Emergency Services',
      number: '911',
      description: 'For immediate danger or medical emergencies',
      color: 'red',
      icon: '🚨'
    },
    {
      title: 'Suicide & Crisis Lifeline',
      number: '988',
      description: 'Call or text for 24/7 free and confidential support',
      color: 'blue',
      icon: '📞'
    },
    {
      title: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: '24/7 crisis support via text message',
      color: 'green',
      icon: '💬'
    }
  ]

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
      description: 'If you\'re in immediate danger, call 911. Remove any means of self-harm from your environment.',
      action: 'Call 911 if in immediate danger'
    },
    {
      step: '2',
      title: 'Reach Out for Support',
      description: 'Contact the crisis lifeline, a trusted friend, family member, or mental health professional.',
      action: 'Call 988 or text HOME to 741741'
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

  const resources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      website: 'suicidepreventionlifeline.org',
      description: '24/7 free and confidential emotional support'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      website: 'crisistextline.org',
      description: 'Free, 24/7 support for those in crisis'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      website: 'samhsa.gov',
      description: 'Treatment referral and information service'
    },
    {
      name: 'The Trevor Project (LGBTQ+ Youth)',
      phone: '1-866-488-7386',
      website: 'thetrevorproject.org',
      description: 'Crisis intervention for LGBTQ+ young people'
    },
    {
      name: 'Trans Lifeline',
      phone: '877-565-8860',
      website: 'translifeline.org',
      description: 'Support for transgender people in crisis'
    },
    {
      name: 'Veterans Crisis Line',
      phone: '1-800-273-8255 (Press 1)',
      website: 'veteranscrisisline.net',
      description: 'Support for veterans and service members'
    }
  ]

  return (
    <>
      <Head>
        <title>Crisis Support - MentalWellnessApps</title>
        <meta name="description" content="Immediate crisis support resources and emergency mental health contacts" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-medium">
                🚨 If you are in immediate danger, call 911 or go to your nearest emergency room
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

        {/* Emergency Contacts */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Immediate Help
              </h2>
              <p className="text-xl text-gray-600">
                These resources are available 24/7 for immediate support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${
                    contact.color === 'red' ? 'border-red-500' :
                    contact.color === 'blue' ? 'border-blue-500' :
                    'border-green-500'
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-4">{contact.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                    <div className={`text-2xl font-bold mb-4 ${
                      contact.color === 'red' ? 'text-red-600' :
                      contact.color === 'blue' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {contact.number}
                    </div>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Additional Resources */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional Support Resources
              </h2>
              <p className="text-xl text-gray-600">
                Specialized support for different communities and needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
                  <div className="text-therapy-600 font-bold text-lg mb-2">{resource.phone}</div>
                  <div className="text-therapy-600 text-sm mb-3">{resource.website}</div>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
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

        {/* International Resources */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                International Crisis Resources
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Americas</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Canada:</strong> 1-833-456-4566</li>
                    <li><strong>Mexico:</strong> 5255-1259</li>
                    <li><strong>Brazil:</strong> 188</li>
                    <li><strong>Argentina:</strong> 135</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Europe</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>UK:</strong> 116 123</li>
                    <li><strong>Germany:</strong> 0800 111 0 111</li>
                    <li><strong>France:</strong> 3114</li>
                    <li><strong>Netherlands:</strong> 113</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Asia-Pacific</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Australia:</strong> 13 11 14</li>
                    <li><strong>Japan:</strong> +81 3-5774-0992</li>
                    <li><strong>South Korea:</strong> 1393</li>
                    <li><strong>India:</strong> +91 9152987821</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Find More</h3>
                  <p className="text-sm text-gray-600">
                    For a comprehensive list of international crisis resources, visit{' '}
                    <a
                      href="https://findahelpline.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-therapy-600 hover:underline"
                    >
                      findahelpline.com
                    </a>
                  </p>
                </div>
              </div>
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