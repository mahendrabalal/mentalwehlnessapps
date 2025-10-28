import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'
import { useToolTracking } from '@/hooks/useAnalytics'

export default function StressManagementTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('immediate')

  const { startTool, completeTool, shareTool } = useToolTracking('Stress Management Techniques', 'coping_skills')

  const handleTechniqueSelect = (techniqueId: string) => {
    if (!selectedTechnique) {
      startTool()
    }
    setSelectedTechnique(techniqueId)
  }

  const handleShare = () => {
    shareTool('copy')
    navigator.clipboard.writeText('Check out these free stress management techniques: ' + window.location.href)
  }

  const techniques = {
    immediate: [
      {
        id: 'deep-breathing',
        title: 'Deep Breathing',
        description: 'Slow, deep breathing activates the parasympathetic nervous system to reduce stress hormones.',
        instructions: [
          'Sit comfortably with your back straight',
          'Inhale through your nose for 4 counts',
          'Hold your breath for 4 counts',
          'Exhale through your mouth for 6 counts',
          'Repeat for 2-5 minutes'
        ],
        duration: '2-5 minutes',
        difficulty: 'Easy',
        icon: '🌬️'
      },
      {
        id: 'progressive-muscle',
        title: 'Progressive Muscle Relaxation',
        description: 'Systematically tense and relax muscle groups to release physical tension.',
        instructions: [
          'Start with your toes, tense for 5 seconds',
          'Release tension completely for 10 seconds',
          'Work up through your body: feet, legs, torso, arms, neck, face',
          'Notice the difference between tension and relaxation',
          'Complete 2 full cycles'
        ],
        duration: '10-15 minutes',
        difficulty: 'Easy',
        icon: '💪'
      },
      {
        id: '5-4-3-2-1',
        title: '5-4-3-2-1 Grounding',
        description: 'Engage all senses to bring yourself to the present moment during stress.',
        instructions: [
          'Name 5 things you can SEE around you',
          'Name 4 things you can physically FEEL',
          'Name 3 things you can HEAR',
          'Name 2 things you can SMELL',
          'Name 1 thing you can TASTE'
        ],
        duration: '2-3 minutes',
        difficulty: 'Easy',
        icon: '🔢'
      }
    ],
    shortTerm: [
      {
        id: 'mindful-walking',
        title: 'Mindful Walking',
        description: 'Focus on physical sensations of walking to reduce mental stress.',
        instructions: [
          'Walk at a comfortable pace',
          'Notice your feet touching the ground',
          'Feel the movement in your legs and hips',
          'Observe your surroundings without judgment',
          'Walk for 10-15 minutes mindfully'
        ],
        duration: '10-15 minutes',
        difficulty: 'Easy',
        icon: '🚶'
      },
      {
        id: 'journaling',
        title: 'Stress Journaling',
        description: 'Write down your thoughts and feelings to process stress and gain perspective.',
        instructions: [
          'Write about what\'s causing you stress',
          'Describe your physical and emotional feelings',
          'Identify any patterns or triggers',
          'Brainstorm possible solutions',
          'Write down things you\'re grateful for'
        ],
        duration: '10-20 minutes',
        difficulty: 'Easy',
        icon: '📝'
      },
      {
        id: 'visualization',
        title: 'Guided Visualization',
        description: 'Create a mental image of a peaceful place to reduce stress hormones.',
        instructions: [
          'Close your eyes and imagine a peaceful place',
          'Use all your senses to make it vivid',
          'Notice sights, sounds, smells, and feelings',
          'Stay in this place for 5-10 minutes',
          'Return to the present when ready'
        ],
        duration: '5-10 minutes',
        difficulty: 'Medium',
        icon: '🏞️'
      }
    ],
    longTerm: [
      {
        id: 'meditation',
        title: 'Meditation Practice',
        description: 'Regular meditation builds resilience to stress over time.',
        instructions: [
          'Start with 5-10 minutes daily',
          'Sit comfortably and focus on your breath',
          'When thoughts arise, gently return to breath',
          'Gradually increase duration over weeks',
          'Be consistent rather than perfect'
        ],
        duration: '5-30 minutes daily',
        difficulty: 'Medium',
        icon: '🧘'
      },
      {
        id: 'exercise',
        title: 'Physical Exercise',
        description: 'Regular physical activity reduces stress hormones and increases endorphins.',
        instructions: [
          'Aim for 30 minutes of moderate activity most days',
          'Choose activities you enjoy: walking, yoga, dancing, swimming',
          'Listen to your body and avoid overexertion',
          'Include both cardio and flexibility exercises',
          'Make it a consistent routine'
        ],
        duration: '30 minutes daily',
        difficulty: 'Medium',
        icon: '🏃'
      },
      {
        id: 'boundaries',
        title: 'Setting Boundaries',
        description: 'Learn to say no and protect your time and energy from stress triggers.',
        instructions: [
          'Identify your main stress triggers and sources',
          'Practice saying "no" to non-essential requests',
          'Schedule regular time for self-care',
          'Communicate your needs clearly and respectfully',
          'Gradually expand your comfort zone with boundaries'
        ],
        duration: 'Ongoing practice',
        difficulty: 'Hard',
        icon: '🚫'
      }
    ]
  }

  const selectedTechniqueData = selectedTechnique
    ? Object.values(techniques).flat().find(t => t.id === selectedTechnique)
    : null

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Stress Management Techniques | Free Coping Skills & Relaxation Methods',
      description: 'Learn evidence-based stress management techniques and coping skills. Find immediate stress relief methods, long-term stress reduction strategies, and workplace stress management tools.',
      slug: '/tools/stress-management-techniques',
    }),
    medicalEntityStructuredData({
      name: 'Stress',
      description: 'Stress is the body\'s response to pressure from a particular situation or event, causing physical, emotional, and psychological reactions.',
      alternateName: ['Chronic Stress', 'Workplace Stress', 'Acute Stress', 'Stress Response'],
      cause: ['Work pressure', 'Life changes', 'Relationship issues', 'Financial problems', 'Health concerns', 'Major life events'],
      symptom: ['Headaches', 'Muscle tension', 'Fatigue', 'Sleep problems', 'Anxiety', 'Irritability', 'Digestive issues', 'Difficulty concentrating'],
      riskFactor: ['High-pressure job', 'Lack of support system', 'Major life changes', 'Perfectionism', 'Poor time management', 'Lack of self-care'],
      treatment: ['Stress management techniques', 'Mindfulness practices', 'Regular exercise', 'Adequate sleep', 'Social support', 'Professional counseling'],
      typicalTest: ['Perceived Stress Scale', 'Stress Assessment Questionnaire'],
      medicalSpecialty: 'Psychology'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Emily Rodriguez',
        credentials: 'Ph.D., Clinical Psychologist',
        expertise: 'Stress management, workplace psychology, behavioral health'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'American Psychological Association'
    })
  ]

  return (
    <>
      <SEOHead
        title="Stress Management Techniques | Free Coping Skills & Relaxation Methods"
        description="Learn evidence-based stress management techniques and coping skills. Find immediate stress relief methods, long-term stress reduction strategies, and workplace stress management tools. Free, evidence-based resources."
        keywords={[
          "stress management techniques",
          "stress reduction methods",
          "coping skills for stress",
          "stress relief strategies",
          "workplace stress management",
          "stress relaxation techniques",
          "stress coping mechanisms",
          "stress management tools",
          "stress reduction activities",
          "mindfulness stress relief",
          "stress management exercises",
          "breathing exercises for stress",
          "progressive muscle relaxation",
          "stress management activities",
          "stress management skills"
        ]}
        ogImage="/og-stress-management.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Stress Management Techniques" />

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
                  <Link href="/tools/free-mental-health-tools" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Tools
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Stress Management</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Stress Management Techniques & Coping Skills
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn evidence-based stress management techniques to reduce anxiety, improve mental health, and build resilience. Find immediate relief methods and long-term strategies for workplace and daily stress.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based Techniques
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Immediate & Long-Term
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Free Resources
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Workplace Ready
              </span>
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
                  These stress management techniques are based on cognitive-behavioral therapy, mindfulness-based stress reduction, and occupational health research, reviewed by Dr. Emily Rodriguez, Ph.D., Clinical Psychologist.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Ph.D. Clinical Psychology</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Stress Management Expert</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Evidence-Based</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveCategory('immediate')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeCategory === 'immediate'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Immediate Relief (2-5 min)
                </button>
                <button
                  onClick={() => setActiveCategory('shortTerm')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeCategory === 'shortTerm'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Short-Term Strategies (10-20 min)
                </button>
                <button
                  onClick={() => setActiveCategory('longTerm')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeCategory === 'longTerm'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Long-Term Resilience
                </button>
              </nav>
            </div>

            {/* Techniques Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techniques[activeCategory as keyof typeof techniques].map((technique) => (
                <div
                  key={technique.id}
                  onClick={() => handleTechniqueSelect(technique.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedTechnique === technique.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="text-3xl mb-3">{technique.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{technique.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{technique.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {technique.duration}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {technique.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Technique Details */}
          {selectedTechniqueData && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedTechniqueData.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTechniqueData.title}</h2>
                    <p className="text-gray-600">{selectedTechniqueData.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Instructions:</h3>
                <ol className="space-y-3">
                  {selectedTechniqueData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => completeTool(5)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Mark as Complete
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Share Technique
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Duration:</span>
                  <span className="font-medium">{selectedTechniqueData.duration}</span>
                  <span>•</span>
                  <span>Difficulty:</span>
                  <span className="font-medium">{selectedTechniqueData.difficulty}</span>
                </div>
              </div>
            </div>
          )}

          {/* Stress Management Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Stress Management Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">🎯 Identify Your Stress Triggers</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Keep a stress journal to identify patterns</li>
                  <li>• Notice physical symptoms of stress early</li>
                  <li>• Track situations that increase your stress</li>
                  <li>• Identify people or environments that affect you</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">⏰ Timing Matters</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Use quick techniques during immediate stress</li>
                  <li>• Schedule regular stress management practice</li>
                  <li>• Practice techniques when you're calm first</li>
                  <li>• Build stress management into daily routines</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">🧘 Mind-Body Connection</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Physical relaxation calms mental stress</li>
                  <li>• Deep breathing affects your nervous system</li>
                  <li>• Movement helps release tension</li>
                  <li>• Body awareness reduces mental racing</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-3">💪 Build Resilience</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Practice techniques when not stressed</li>
                  <li>• Start with easier techniques first</li>
                  <li>• Gradually increase practice duration</li>
                  <li>• Be patient with your progress</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Workplace Stress Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Workplace Stress Management</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700 mb-4">
                Work-related stress is one of the most common sources of chronic stress. These techniques are specifically designed for the workplace environment:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">💻 Desk-Based Techniques</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Desk stretches and shoulder rolls</li>
                    <li>• 2-minute breathing exercises</li>
                    <li>• Quick grounding techniques</li>
                    <li>• Micro-breaks every hour</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🏢 Environmental Strategies</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Organize your workspace</li>
                    <li>• Use noise-canceling headphones</li>
                    <li>• Take regular walking breaks</li>
                    <li>• Practice assertive communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">😌</span>
                <h3 className="font-semibold text-gray-900">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate calming</p>
              </Link>
              <Link
                href="/tools/burnout-assessment"
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900">Burnout Test</h3>
                <p className="text-sm text-gray-600">Work stress check</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900">Mindfulness</h3>
                <p className="text-sm text-gray-600">Meditation practice</p>
              </Link>
              <Link
                href="/support/sleep-mental-health"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">😴</span>
                <h3 className="font-semibold text-gray-900">Sleep Health</h3>
                <p className="text-sm text-gray-600">Better rest</p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the fastest way to reduce stress?</h3>
                <p className="text-gray-600">
                  Deep breathing exercises and the 5-4-3-2-1 grounding technique are the fastest ways to reduce stress, often working within 1-2 minutes by activating your parasympathetic nervous system.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should I practice stress management?</h3>
                <p className="text-gray-600">
                  Practice quick techniques daily during stressful moments, and dedicate 10-20 minutes to deeper techniques 3-5 times per week. Consistency is more important than duration.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can stress management techniques help with anxiety?</h3>
                <p className="text-gray-600">
                  Yes, many stress management techniques are also effective for anxiety. Deep breathing, mindfulness, and progressive muscle relaxation are commonly used in anxiety treatment.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I seek professional help for stress?</h3>
                <p className="text-gray-600">
                  If stress interferes with daily functioning, causes physical symptoms, or leads to depression/anxiety, consult a mental health professional. Chronic stress can have serious health consequences.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Start Your Stress Management Journey Today</h2>
            <p className="mb-6">
              Choose one technique to try today, practice it regularly, and gradually build your stress management toolkit. Small, consistent efforts lead to significant improvements in mental health and resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  startTool()
                  setSelectedTechnique('deep-breathing')
                }}
                className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Try Deep Breathing Now
              </button>
              <Link
                href="/tools/free-mental-health-tools"
                className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-900 transition-colors duration-200 text-center"
              >
                Explore More Tools
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