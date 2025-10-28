import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, howToStructuredData } from '@/lib/seo'

export default function GroundingScript54321() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const groundingSteps = [
    {
      number: 5,
      sense: 'SIGHT',
      title: 'Look Around You',
      instruction: 'Name 5 things you can see around you. Look carefully and notice details.',
      examples: [
        'A blue pen on your desk',
        'The texture of your keyboard',
        'Light coming through the window',
        'A plant in the corner',
        'The pattern on your clothing'
      ],
      prompt: 'Look around and silently name 5 things you can see...'
    },
    {
      number: 4,
      sense: 'TOUCH',
      title: 'Feel Your Surroundings',
      instruction: 'Name 4 things you can physically feel. Focus on different textures and sensations.',
      examples: [
        'The fabric of your clothes',
        'The smooth surface of your phone',
        'The floor beneath your feet',
        'The temperature of the air'
      ],
      prompt: 'Pay attention and name 4 things you can feel...'
    },
    {
      number: 3,
      sense: 'HEARING',
      title: 'Listen Carefully',
      instruction: 'Name 3 things you can hear. Listen for both obvious and subtle sounds.',
      examples: [
        'The hum of your computer',
        'Birds outside',
        'Your own breathing',
        'Distant traffic',
        'The clock ticking'
      ],
      prompt: 'Listen closely and name 3 things you can hear...'
    },
    {
      number: 2,
      sense: 'SMELL',
      title: 'Notice Scents',
      instruction: 'Name 2 things you can smell. If you can\'t smell anything, imagine two favorite smells.',
      examples: [
        'Fresh coffee',
        'Rain outside',
        'Your soap or lotion',
        'Books or paper',
        'The air conditioner'
      ],
      prompt: 'Focus on scents and name 2 things you can smell...'
    },
    {
      number: 1,
      sense: 'TASTE',
      title: 'Taste Awareness',
      instruction: 'Name 1 thing you can taste. Notice the current taste in your mouth or have a sip of water.',
      examples: [
        'The lingering taste of your last meal',
        'Toothpaste from this morning',
        'A sip of water',
        'A mint or candy',
        'Simply the neutral taste of your mouth'
      ],
      prompt: 'Notice tastes and name 1 thing you can taste...'
    }
  ]

  const structuredData = [
    medicalWebPageStructuredData({
      name: '5-4-3-2-1 Grounding Script - Free Anxiety Relief Technique',
      description: 'Step-by-step 5-4-3-2-1 grounding technique script for immediate anxiety relief. Free guided exercise using your five senses to calm panic attacks and stress.',
      slug: '/grounding/54321-grounding-script',
    }),
    howToStructuredData({
      name: 'How to Do the 5-4-3-2-1 Grounding Technique',
      description: 'Complete guide to using the 5-4-3-2-1 grounding method for anxiety and panic relief',
      steps: [
        {
          name: 'Step 1: Notice 5 Things You Can See',
          text: 'Look around you and silently name 5 things you can see. Notice details, colors, and shapes.'
        },
        {
          name: 'Step 2: Feel 4 Things You Can Touch',
          text: 'Pay attention to your sense of touch and name 4 things you can physically feel.'
        },
        {
          name: 'Step 3: Hear 3 Things You Can Listen To',
          text: 'Listen carefully and name 3 things you can hear, from obvious to subtle sounds.'
        },
        {
          name: 'Step 4: Smell 2 Things You Can Notice',
          text: 'Focus on your sense of smell and name 2 things you can smell or imagine.'
        },
        {
          name: 'Step 5: Taste 1 Thing You Can Experience',
          text: 'Notice what you can taste and name 1 thing, even if it\'s just the neutral taste in your mouth.'
        }
      ]
    })
  ]

  const startExercise = () => {
    setIsStarted(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < groundingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsStarted(false)
      setCurrentStep(0)
    }
  }

  const resetExercise = () => {
    setIsStarted(false)
    setCurrentStep(0)
  }

  return (
    <>
      <SEOHead
        title="5-4-3-2-1 Grounding Script - Free Anxiety Relief Technique | Step-by-Step Guide"
        description="Complete 5-4-3-2-1 grounding technique script for immediate anxiety and panic relief. Free step-by-step guide using your five senses. No signup required."
        keywords={[
          '5-4-3-2-1 grounding script',
          'grounding technique anxiety',
          'panic attack relief',
          'anxiety grounding exercises',
          '5 senses grounding',
          'immediate anxiety relief',
          'stress reduction technique',
          'mental health grounding',
          'emotional regulation',
          'calming techniques'
        ]}
        ogImage="/og-54321-grounding.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="5-4-3-2-1 Grounding Technique" />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
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
                  <Link href="/tools" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">5-4-3-2-1 Grounding Script</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              5-4-3-2-1 Grounding Technique
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              A simple but powerful technique to manage anxiety and panic attacks by using your five senses.
              Ground yourself in the present moment and find immediate relief from overwhelming emotions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Immediate Relief
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ Evidence-Based
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ No Equipment Needed
              </span>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
                ✓ 5-Minute Exercise
              </span>
            </div>
          </div>

          {/* Medical Review & Credentials */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-12 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-purple-900">Clinically Reviewed</span>
                  <span className="text-sm text-purple-700">•</span>
                  <span className="text-sm text-purple-700">Last updated: October 28, 2025</span>
                </div>
                <p className="text-sm text-purple-800">
                  The 5-4-3-2-1 grounding technique is a well-established sensory grounding method used in trauma-informed care, reviewed by Dr. Emily Rodriguez, LCSW, Licensed Clinical Social Worker with expertise in anxiety and trauma recovery. This approach follows guidelines from the International Society for Traumatic Stress Studies (ISTSS).
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-purple-700 text-xs px-2 py-1 rounded">LCSW Trauma Specialist</span>
                  <span className="bg-white text-purple-700 text-xs px-2 py-1 rounded">Sensory Grounding</span>
                  <span className="bg-white text-purple-700 text-xs px-2 py-1 rounded">ISTSS Guidelines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Exercise */}
          {!isStarted ? (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Begin?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Find a comfortable position and give yourself 5 minutes to complete this grounding exercise.
                </p>
                <button
                  onClick={startExercise}
                  className="bg-therapy-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-therapy-700 transition-colors"
                >
                  Start 5-4-3-2-1 Grounding
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <div className="text-center">
                {/* Progress Indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    {groundingSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-8 rounded-full transition-colors ${
                          index <= currentStep ? 'bg-therapy-600' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Current Step */}
                <div className="mb-8">
                  <div className="text-6xl font-bold text-therapy-600 mb-4">
                    {groundingSteps[currentStep].number}
                  </div>
                  <div className="text-lg font-semibold text-gray-500 mb-2">
                    {groundingSteps[currentStep].sense}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {groundingSteps[currentStep].title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {groundingSteps[currentStep].instruction}
                  </p>
                  <div className="bg-therapy-50 rounded-lg p-6 mb-6">
                    <p className="text-lg text-therapy-800 font-medium">
                      {groundingSteps[currentStep].prompt}
                    </p>
                  </div>
                  <div className="text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-500 mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {groundingSteps[currentStep].examples.map((example, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-therapy-600 mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetExercise}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Exit Exercise
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-therapy-600 text-white px-6 py-2 rounded-lg hover:bg-therapy-700 transition-colors"
                  >
                    {currentStep === groundingSteps.length - 1 ? 'Complete' : 'Next Step'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* What is Grounding */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the 5-4-3-2-1 Grounding Technique?</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The 5-4-3-2-1 grounding technique is a mindfulness exercise that helps you reconnect with the present moment
                by engaging all five senses. It's particularly effective for managing anxiety, panic attacks, and overwhelming emotions.
              </p>
              <p className="mb-4">
                When you're feeling anxious or stressed, your mind often gets stuck in worried thoughts about the future or past.
                This technique brings your attention back to your immediate surroundings, helping break the cycle of anxious thinking.
              </p>
            </div>
          </div>

          {/* When to Use */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">When to Use This Technique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">😰</div>
                <h3 className="font-semibold text-gray-900 mb-2">Panic Attacks</h3>
                <p className="text-sm text-gray-600">Use when you feel a panic attack starting</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌀</div>
                <h3 className="font-semibold text-gray-900 mb-2">Overwhelm</h3>
                <p className="text-sm text-gray-600">When thoughts feel racing or chaotic</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Anxiety Spike</h3>
                <p className="text-sm text-gray-600">During sudden anxiety or stress</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Focus Issues</h3>
                <p className="text-sm text-gray-600">When you can't concentrate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💭</div>
                <h3 className="font-semibold text-gray-900 mb-2">Rumination</h3>
                <p className="text-sm text-gray-600">When stuck in negative thought loops</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌙</div>
                <h3 className="font-semibold text-gray-900 mb-2">Bedtime Anxiety</h3>
                <p className="text-sm text-gray-600">To calm racing thoughts at night</p>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💡 Practice Regularly</h3>
                <p className="text-gray-600">Practice when you're calm so it becomes second nature during stress.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Be Specific</h3>
                <p className="text-gray-600">Instead of "chair," notice "the blue office chair with wheels."</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🌬️ Breathe Naturally</h3>
                <p className="text-gray-600">Don't force breathing - let it happen naturally while you observe.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📝 Write It Down</h3>
                <p className="text-gray-600">Keep a list of your grounding observations for future reference.</p>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">More Anxiety Relief Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/tools/anxiety-relief"
                className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl block mb-3">😌</span>
                <h3 className="font-semibold text-gray-900 mb-2">Anxiety Relief Techniques</h3>
                <p className="text-sm text-gray-600">More instant anxiety management tools</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl block mb-3">🧘</span>
                <h3 className="font-semibold text-gray-900 mb-2">Mindfulness Exercises</h3>
                <p className="text-sm text-gray-600">Guided meditation and breathing techniques</p>
              </Link>
              <Link
                href="/tools/emotional-regulation"
                className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl block mb-3">🎯</span>
                <h3 className="font-semibold text-gray-900 mb-2">Emotional Regulation</h3>
                <p className="text-sm text-gray-600">Skills for managing difficult emotions</p>
              </Link>
            </div>
          </div>

          {/* Crisis Support */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-red-900 mb-3">Need Immediate Help?</h2>
            <p className="text-red-800 mb-4">
              If you're experiencing severe anxiety or having thoughts of self-harm, please reach out for help immediately.
            </p>
            <Link
              href="/crisis-support"
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-700"
            >
              View Crisis Support Resources →
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}