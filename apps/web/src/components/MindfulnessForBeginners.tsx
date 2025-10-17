import { useState } from 'react'
import Link from 'next/link'

interface MindfulnessForBeginnersProps {
  className?: string
}

type ExerciseDuration = '2min' | '5min' | '10min'

export function MindfulnessForBeginners({ className = '' }: MindfulnessForBeginnersProps) {
  const [selectedDuration, setSelectedDuration] = useState<ExerciseDuration>('2min')
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const exercises = {
    '2min': [
      {
        id: 'breath-awareness',
        title: 'Simple Breath Awareness',
        icon: '🫁',
        description: 'Perfect first meditation - just notice your breathing',
        steps: [
          'Sit comfortably and close your eyes (or soften your gaze)',
          'Notice your breath without changing it',
          'Count 10 breaths (inhale = 1, exhale = 2, etc.)',
          'When your mind wanders, gently return to counting',
          'After 10 breaths, notice how you feel'
        ]
      },
      {
        id: 'body-check',
        title: 'Quick Body Check-In',
        icon: '🧘',
        description: 'Scan your body for tension in 2 minutes',
        steps: [
          'Close your eyes and take 3 deep breaths',
          'Notice your feet - any tension? Let it release',
          'Move attention to your legs, then stomach',
          'Check your shoulders - let them drop',
          'Relax your jaw and face',
          'Take a final deep breath and open your eyes'
        ]
      },
      {
        id: 'grateful-pause',
        title: 'Grateful Pause',
        icon: '💚',
        description: 'Quick gratitude practice to shift mood',
        steps: [
          'Close your eyes and take a deep breath',
          'Think of one thing you\'re grateful for today',
          'Really feel the gratitude in your body',
          'Think of a second thing, even something small',
          'Take another deep breath with that feeling',
          'Open your eyes and carry this with you'
        ]
      }
    ],
    '5min': [
      {
        id: 'mindful-breathing',
        title: 'Mindful Breathing Practice',
        icon: '🌬️',
        description: 'Classic meditation - breath as your anchor',
        steps: [
          'Sit comfortably with a straight spine',
          'Close your eyes and breathe naturally',
          'Notice where you feel the breath most (nose, chest, belly)',
          'Count each breath: inhale (1), exhale (2), up to 10',
          'When you reach 10, start over at 1',
          'Continue for 5 minutes',
          'If mind wanders (it will!), gently return to 1',
          'End by noticing how your body feels'
        ]
      },
      {
        id: 'body-scan',
        title: 'Gentle Body Scan',
        icon: '✨',
        description: 'Move attention through your whole body',
        steps: [
          'Lie down or sit comfortably',
          'Close your eyes and take 3 deep breaths',
          'Bring attention to your toes - wiggle them, then relax',
          'Move up to feet, ankles, calves (pause at each)',
          'Continue: thighs, hips, stomach, chest',
          'Notice your hands, arms, shoulders',
          'Finally: neck, jaw, face, top of head',
          'Spend 30 seconds noticing your whole body at once'
        ]
      },
      {
        id: 'loving-kindness',
        title: 'Loving-Kindness (Beginner)',
        icon: '💖',
        description: 'Send compassion to yourself and others',
        steps: [
          'Sit comfortably and close your eyes',
          'Think of someone who makes you smile',
          'Silently say: "May you be happy. May you be healthy."',
          'Now bring yourself to mind',
          'Say to yourself: "May I be happy. May I be healthy."',
          'Notice any resistance - that\'s normal, be gentle',
          'Repeat these phrases for 3-4 minutes',
          'End with a deep breath and sense of warmth'
        ]
      }
    ],
    '10min': [
      {
        id: 'full-body-scan',
        title: 'Complete Body Scan',
        icon: '🧘‍♀️',
        description: 'Deep relaxation through detailed body awareness',
        steps: [
          'Lie down in a comfortable position',
          'Take 5 slow, deep breaths to settle',
          'Starting at your toes, notice any sensations',
          'Move slowly up: feet, ankles, calves (1 min each)',
          'Continue through: thighs, hips, lower back',
          'Notice: stomach, chest, upper back',
          'Observe: fingers, hands, arms, shoulders',
          'Finally: neck, jaw, face, scalp',
          'Spend 2 minutes feeling your whole body breathing',
          'Slowly wiggle fingers and toes to come back'
        ]
      },
      {
        id: 'breath-and-body',
        title: 'Breath & Body Awareness',
        icon: '🌊',
        description: 'Combine breath focus with body sensations',
        steps: [
          'Sit with a tall, relaxed spine',
          'Close your eyes and breathe naturally',
          'Spend 2 minutes just following your breath',
          'Now expand awareness to your whole body',
          'Notice: Am I tense anywhere? Just observe.',
          'Return focus to breath for 2 minutes',
          'Expand again to include sounds around you',
          'Notice thoughts without getting caught in them',
          'Last 2 minutes: breath, body, sounds, thoughts - all of it',
          'Gently open eyes and notice how you feel'
        ]
      },
      {
        id: 'walking-meditation',
        title: 'Mindful Walking',
        icon: '🚶',
        description: 'Perfect for people who can\'t sit still',
        steps: [
          'Find a quiet space where you can walk 10-15 steps',
          'Stand still and take 3 breaths to center',
          'Walk very slowly, noticing each step',
          'Feel: heel touching ground, weight shifting, toes pushing off',
          'When you reach the end, pause and breathe',
          'Turn around slowly and walk back',
          'If your mind wanders to thoughts, return to sensations in feet',
          'Continue walking slowly for 10 minutes',
          'Notice: Are you calmer? More present?',
          'End by standing still for 3 more breaths'
        ]
      }
    ]
  }

  const durations = [
    { value: '2min' as ExerciseDuration, label: '2 Minutes', description: 'Quick & easy start' },
    { value: '5min' as ExerciseDuration, label: '5 Minutes', description: 'Building the habit' },
    { value: '10min' as ExerciseDuration, label: '10 Minutes', description: 'Deeper practice' }
  ]

  const handleStartExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const handlePlayGuided = () => {
    setIsPlaying(true)
    // Auto-advance through steps
    const exercise = exercises[selectedDuration].find(e => e.id === activeExercise)
    if (!exercise) return

    let step = 0
    const totalSteps = exercise.steps.length
    const timePerStep = selectedDuration === '2min' ? 20000 : selectedDuration === '5min' ? 37500 : 60000

    const interval = setInterval(() => {
      step++
      if (step >= totalSteps) {
        clearInterval(interval)
        setIsPlaying(false)
        setCurrentStep(totalSteps - 1)
      } else {
        setCurrentStep(step)
      }
    }, timePerStep)

    return () => clearInterval(interval)
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Mindfulness for Beginners</h2>
          <p className="text-gray-600 text-sm">Start with just 2 minutes - build from there</p>
        </div>
        <Link
          href="/support/mindfulness-for-beginners"
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          Full Guide →
        </Link>
      </div>

      {!activeExercise ? (
        <>
          {/* Duration Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Choose Your Duration:</h3>
            <div className="grid grid-cols-3 gap-3">
              {durations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDuration === duration.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="text-lg font-bold text-gray-900 mb-1">{duration.label}</div>
                  <div className="text-xs text-gray-600">{duration.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exercises[selectedDuration].map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleStartExercise(exercise.id)}
                className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-5 text-left hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{exercise.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{exercise.title}</h4>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </button>
            ))}
          </div>

          {/* Tips for Beginners */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Tips for Beginners
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Your mind WILL wander - that's completely normal!</li>
              <li>• Each time you notice and return = success</li>
              <li>• Start with 2 minutes daily rather than 20 minutes once</li>
              <li>• Same time, same place = easier habit formation</li>
              <li>• Be kind to yourself - meditation is a practice, not perfection</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => {
              setActiveExercise(null)
              setIsPlaying(false)
              setCurrentStep(0)
            }}
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to exercises
          </button>

          {(() => {
            const exercise = exercises[selectedDuration].find(e => e.id === activeExercise)
            if (!exercise) return null

            return (
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{exercise.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>Step {currentStep + 1} of {exercise.steps.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / exercise.steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-6">
                  {exercise.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg transition-all ${
                        index === currentStep
                          ? 'bg-white shadow-md border-2 border-green-500'
                          : index < currentStep
                            ? 'bg-white/50 opacity-60'
                            : 'bg-white/30 opacity-40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          index < currentStep
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                              ? 'bg-green-100 text-green-700 border-2 border-green-500'
                              : 'bg-gray-100 text-gray-400'
                        }`}>
                          {index < currentStep ? '✓' : index + 1}
                        </div>
                        <p className={`text-sm ${index === currentStep ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex gap-3">
                  {!isPlaying ? (
                    <>
                      <button
                        onClick={handlePlayGuided}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Start Guided Practice
                      </button>
                      <button
                        onClick={() => setCurrentStep(Math.min(currentStep + 1, exercise.steps.length - 1))}
                        className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                      >
                        Next Step
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      Stop Guided Practice
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  {isPlaying ? 'Following guided practice - steps advance automatically' : 'Start guided mode or click "Next Step" to move through manually'}
                </p>
              </div>
            )
          })()}
        </div>
      )}

      {/* Consistency Tracker */}
      {!activeExercise && (
        <div className="mt-6 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Build Your Streak</h4>
              <p className="text-sm text-gray-600">Track daily practice in your dashboard</p>
            </div>
            <Link
              href="/support/meditation-consistency"
              className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Learn How →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
