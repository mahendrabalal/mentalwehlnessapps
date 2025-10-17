import { useState } from 'react'
import Link from 'next/link'

interface QuickAnxietyReliefProps {
  className?: string
}

export function QuickAnxietyRelief({ className = '' }: QuickAnxietyReliefProps) {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [breathCount, setBreathCount] = useState(0)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [isBreathing, setIsBreathing] = useState(false)

  const startBoxBreathing = () => {
    setIsBreathing(true)
    setBreathCount(0)
    setBreathPhase('inhale')

    // Box breathing cycle: 4s inhale, 4s hold, 6s exhale, 4s hold
    const cycle = () => {
      const phases: Array<{ phase: typeof breathPhase; duration: number }> = [
        { phase: 'inhale', duration: 4000 },
        { phase: 'hold', duration: 4000 },
        { phase: 'exhale', duration: 6000 },
        { phase: 'pause', duration: 4000 },
      ]

      let currentIndex = 0
      let cycleCount = 0

      const runPhase = () => {
        if (cycleCount >= 5) {
          setIsBreathing(false)
          return
        }

        const currentPhase = phases[currentIndex]
        setBreathPhase(currentPhase.phase)

        setTimeout(() => {
          currentIndex++
          if (currentIndex >= phases.length) {
            currentIndex = 0
            cycleCount++
            setBreathCount(cycleCount)
          }
          if (cycleCount < 5) {
            runPhase()
          } else {
            setIsBreathing(false)
          }
        }, currentPhase.duration)
      }

      runPhase()
    }

    cycle()
  }

  const stopBreathing = () => {
    setIsBreathing(false)
    setBreathCount(0)
  }

  const exercises = [
    {
      id: '5-4-3-2-1',
      title: '5-4-3-2-1 Grounding',
      icon: '🖐️',
      duration: '3 min',
      description: 'Interrupt panic by bringing awareness to your senses',
      color: 'blue'
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      icon: '🫁',
      duration: '2 min',
      description: 'Calm your nervous system with controlled breathing',
      color: 'green'
    },
    {
      id: 'progressive-muscle',
      title: 'Progressive Muscle Relaxation',
      icon: '💪',
      duration: '5 min',
      description: 'Release physical tension held in your body',
      color: 'purple'
    },
    {
      id: 'emergency-plan',
      title: 'Panic Attack Plan',
      icon: '🚨',
      duration: '1 min',
      description: 'Immediate steps when panic strikes',
      color: 'red'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', hover: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', hover: 'hover:bg-red-100' },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Quick Anxiety Relief</h2>
          <p className="text-gray-600 text-sm">Immediate techniques when anxiety strikes</p>
        </div>
        <Link
          href="/support/managing-anxiety-naturally"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Learn more →
        </Link>
      </div>

      {!activeExercise ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => {
            const colors = getColorClasses(exercise.color)
            return (
              <button
                key={exercise.id}
                onClick={() => setActiveExercise(exercise.id)}
                className={`${colors.bg} ${colors.border} border rounded-lg p-4 text-left transition-all ${colors.hover}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{exercise.icon}</span>
                  <span className={`text-xs ${colors.text} font-medium px-2 py-1 rounded-full bg-white`}>
                    {exercise.duration}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{exercise.title}</h3>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setActiveExercise(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to exercises
          </button>

          {/* 5-4-3-2-1 Grounding */}
          {activeExercise === '5-4-3-2-1' && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">5-4-3-2-1 Grounding Exercise</h3>
              <p className="text-gray-700 mb-4">
                This technique interrupts panic by bringing your attention to the present moment through your senses.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">👀 Name 5 things you can SEE</h4>
                  <p className="text-sm text-gray-600">Look around and identify 5 objects you can see</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">🤚 Name 4 things you can TOUCH</h4>
                  <p className="text-sm text-gray-600">Feel the texture of objects around you</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">👂 Name 3 things you can HEAR</h4>
                  <p className="text-sm text-gray-600">Listen carefully to sounds near and far</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">👃 Name 2 things you can SMELL</h4>
                  <p className="text-sm text-gray-600">Notice any scents in your environment</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">👅 Name 1 thing you can TASTE</h4>
                  <p className="text-sm text-gray-600">What taste is in your mouth right now?</p>
                </div>
              </div>
            </div>
          )}

          {/* Box Breathing */}
          {activeExercise === 'box-breathing' && (
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Box Breathing Exercise</h3>
              <p className="text-gray-700 mb-6">
                Follow the guided breathing pattern to calm your nervous system.
              </p>

              <div className="flex flex-col items-center mb-6">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center mb-4 transition-all duration-1000 ${
                  isBreathing
                    ? breathPhase === 'inhale'
                      ? 'bg-green-200 scale-110'
                      : breathPhase === 'exhale'
                        ? 'bg-green-100 scale-90'
                        : 'bg-green-200 scale-100'
                    : 'bg-green-100'
                }`}>
                  <div className="text-center">
                    {isBreathing ? (
                      <>
                        <div className="text-3xl font-bold text-green-900 mb-2">
                          {breathPhase === 'inhale' && 'Breathe In'}
                          {breathPhase === 'hold' && 'Hold'}
                          {breathPhase === 'exhale' && 'Breathe Out'}
                          {breathPhase === 'pause' && 'Hold'}
                        </div>
                        <div className="text-lg text-green-700">
                          Cycle {breathCount + 1} of 5
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-green-900">Ready</div>
                    )}
                  </div>
                </div>

                {!isBreathing ? (
                  <button
                    onClick={startBoxBreathing}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Breathing Exercise
                  </button>
                ) : (
                  <button
                    onClick={stopBreathing}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Stop
                  </button>
                )}
              </div>

              <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
                <p className="font-semibold mb-2">How it works:</p>
                <ul className="space-y-1">
                  <li>• Inhale for 4 seconds</li>
                  <li>• Hold for 4 seconds</li>
                  <li>• Exhale for 6 seconds (longer exhale = more calming)</li>
                  <li>• Hold for 4 seconds</li>
                  <li>• Repeat 5 times</li>
                </ul>
              </div>
            </div>
          )}

          {/* Progressive Muscle Relaxation */}
          {activeExercise === 'progressive-muscle' && (
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Progressive Muscle Relaxation</h3>
              <p className="text-gray-700 mb-4">
                Tense each muscle group for 5 seconds, then release and notice the difference.
              </p>
              <div className="space-y-3">
                {[
                  { muscle: 'Hands', instruction: 'Make tight fists, then release' },
                  { muscle: 'Arms', instruction: 'Tense biceps, then release' },
                  { muscle: 'Shoulders', instruction: 'Raise shoulders to ears, then drop' },
                  { muscle: 'Face', instruction: 'Scrunch facial muscles, then release' },
                  { muscle: 'Jaw', instruction: 'Clench jaw, then release' },
                  { muscle: 'Stomach', instruction: 'Tighten abs, then release' },
                  { muscle: 'Legs', instruction: 'Tense thighs, then release' },
                  { muscle: 'Feet', instruction: 'Curl toes, then release' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <h4 className="font-bold text-gray-900 text-sm">{index + 1}. {item.muscle}</h4>
                    <p className="text-sm text-gray-600">{item.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Panic Attack Plan */}
          {activeExercise === 'emergency-plan' && (
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚨 Panic Attack Emergency Plan</h3>
              <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-red-500">
                <p className="font-bold text-gray-900 mb-2">Remember: Panic attacks are scary but not dangerous</p>
                <p className="text-sm text-gray-600">They typically peak within 10 minutes and pass within 30 minutes.</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">1. Acknowledge What's Happening</h4>
                  <p className="text-sm text-gray-600">Say to yourself: "This is a panic attack. It will pass. I am safe."</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">2. Control Your Breathing</h4>
                  <p className="text-sm text-gray-600">Breathe in for 4, hold for 4, breathe out for 6. Repeat.</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">3. Use 5-4-3-2-1 Grounding</h4>
                  <p className="text-sm text-gray-600">Name things you can see, touch, hear, smell, taste.</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">4. Find a Safe Space</h4>
                  <p className="text-sm text-gray-600">If possible, move to a quiet, comfortable location.</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">5. Call Someone (If Needed)</h4>
                  <p className="text-sm text-gray-600">
                    Text/call a trusted friend or use Crisis Text Line: Text HOME to 741741
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-yellow-800 font-semibold">
                  If panic attacks are frequent, please consult a mental health professional.
                  They are very treatable with therapy.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Crisis Resources */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">
          <strong>In Crisis?</strong> Get immediate help:
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="tel:988"
            className="inline-flex items-center text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full hover:bg-red-200 transition-colors"
          >
            📞 Call/Text 988
          </a>
          <a
            href="sms:741741&body=HOME"
            className="inline-flex items-center text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
          >
            💬 Text HOME to 741741
          </a>
          <Link
            href="/crisis/support"
            className="inline-flex items-center text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors"
          >
            🆘 More Crisis Resources
          </Link>
        </div>
      </div>
    </div>
  )
}
