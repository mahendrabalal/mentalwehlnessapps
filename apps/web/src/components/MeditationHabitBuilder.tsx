import { useState } from 'react'
import Link from 'next/link'

interface MeditationHabitBuilderProps {
  className?: string
}

type HabitStage = 'pre-intention' | 'preparation' | 'action' | 'maintenance'

interface Assessment {
  currentlyMeditates: boolean
  meditationFrequency: number // days per week
  consistency: number // weeks maintained
  barriers: string[]
}

export function MeditationHabitBuilder({ className = '' }: MeditationHabitBuilderProps) {
  const [step, setStep] = useState<'assessment' | 'results'>('assessment')
  const [assessment, setAssessment] = useState<Partial<Assessment>>({})

  const determineStage = (): HabitStage => {
    if (!assessment.currentlyMeditates) return 'pre-intention'
    if (assessment.meditationFrequency! < 4) return 'preparation'
    if (assessment.consistency! < 4) return 'action'
    return 'maintenance'
  }

  const getStageConfig = (stage: HabitStage) => {
    const configs = {
      'pre-intention': {
        label: 'Pre-Intention Stage',
        icon: '💭',
        color: 'gray',
        bgColor: 'bg-gray-50',
        description: 'You\'re curious about meditation but haven\'t started a regular practice yet.',
        timeline: '0-2 weeks to move to next stage',
        focus: 'Building awareness and motivation',
        strategies: [
          'Start with just 2 minutes per day - seriously, that\'s it',
          'Learn about the science: meditation physically changes your brain',
          'Try guided meditations on our app to reduce intimidation',
          'Set a specific time: link it to existing habit (after coffee, before bed)',
          'Expect it to feel awkward initially - completely normal',
          'Focus on consistency over duration: 2 min daily beats 20 min once'
        ],
        milestones: ['Complete first meditation', 'Learn basic breathing technique', 'Understand realistic expectations']
      },
      'preparation': {
        label: 'Preparation Stage',
        icon: '🌱',
        color: 'blue',
        bgColor: 'bg-blue-50',
        description: 'You\'re starting to practice but haven\'t established consistency yet (practicing less than 4 days/week).',
        timeline: '2-4 weeks with focused effort',
        focus: 'Building consistency through habit stacking',
        strategies: [
          'Aim for 4-7 days per week - research shows this is the sweet spot',
          'Same time, same place: consistency comes from routine',
          'Track your streak - visual progress is motivating',
          'Prepare the night before: set out cushion, queue app',
          'Have a backup plan for missed days (5-min version)',
          'Join a community or find an accountability partner',
          'Reframe "I don\'t have time" to "It\'s not a priority" (honest assessment)'
        ],
        milestones: ['Meditate 4 days in one week', 'Overcome first major barrier', 'Notice small benefits']
      },
      'action': {
        label: 'Action Stage',
        icon: '🎯',
        color: 'orange',
        bgColor: 'bg-orange-50',
        description: 'You\'re practicing 4+ days per week but haven\'t sustained it for 4+ weeks yet.',
        timeline: '4-8 weeks to solidify habit',
        focus: 'Maintaining consistency through obstacles',
        strategies: [
          'Consistency matters more than perfection: missing 1 day won\'t break your habit',
          'Develop a missed-day recovery protocol: resume next day, no guilt',
          'Gradually increase duration: add 1 min every 2 weeks',
          'Experiment with times: morning for calm, evening for stress relief',
          'Use "urge surfing" when you want to skip: notice the resistance, do it anyway',
          'Track your mood before/after to see concrete benefits',
          'Prepare for common obstacles: travel, illness, schedule changes'
        ],
        milestones: ['4-week consistent streak', 'Meditate through a difficult week', 'Crave meditation when you miss it']
      },
      'maintenance': {
        label: 'Maintenance Stage',
        icon: '⭐',
        color: 'green',
        bgColor: 'bg-green-50',
        description: 'Congratulations! You\'ve built a sustainable habit (4+ weeks of 4+ days/week).',
        timeline: 'Ongoing - focus on deepening practice',
        focus: 'Deepening and varying your practice',
        strategies: [
          'You\'ve succeeded! Now maintain through variety to prevent boredom',
          'Explore different techniques: body scan, loving-kindness, noting',
          'Gradually extend duration: 15-20 minutes for deeper benefits',
          'Attend a retreat or join a meditation group for community',
          'Apply mindfulness throughout the day, not just during sessions',
          'Mentor others - teaching reinforces your own practice',
          'Prepare for life disruptions: have a minimal viable practice (2 min)'
        ],
        milestones: ['3-month streak', 'Meditation becomes automatic', 'Notice mindfulness in daily life']
      }
    }
    return configs[stage]
  }

  if (step === 'results') {
    const stage = determineStage()
    const config = getStageConfig(stage)

    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Meditation Habit Stage</h2>

        <div className={`${config.bgColor} border-2 border-${config.color}-200 rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{config.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{config.label}</h3>
              <p className="text-sm text-gray-600">{config.timeline}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{config.description}</p>
          <div className="bg-white rounded-lg p-3 text-sm">
            <strong className="text-gray-900">Your Focus:</strong> {config.focus}
          </div>
        </div>

        {/* Evidence-Based Timeline */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-600">
          <h4 className="font-bold text-gray-900 mb-2">📊 Research-Based Timeline</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Weeks 1-2:</strong> Feels difficult, restless (80% quit here - you\'re not alone!)</p>
            <p><strong>Weeks 3-4:</strong> Slightly easier to settle, still challenging</p>
            <p><strong>Months 2-3:</strong> Genuine moments of calm, noticeable stress reduction</p>
            <p><strong>Months 4-6:</strong> Habit formed, mindfulness becomes natural</p>
            <p className="pt-2 border-t border-blue-200"><strong>Key finding:</strong> 4-7 days/week practice = best outcomes for mood stability and resilience</p>
          </div>
        </div>

        {/* Personalized Strategies */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Your Action Plan:</h4>
          <div className="space-y-2">
            {config.strategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`text-${config.color}-600`}>✓</span>
                <span>{strategy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Next Milestones to Achieve:</h4>
          <div className="space-y-2">
            {config.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-gray-400">☐</span>
                <span>{milestone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Barriers */}
        <div className="bg-yellow-50 rounded-lg p-4 mb-6 border-l-4 border-yellow-600">
          <h4 className="font-bold text-gray-900 mb-2">💡 Overcoming Common Barriers</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>"I don't have time":</strong> Try 2 min. Seriously. Everyone has 2 min. Build from there.</p>
            <p><strong>"My mind won't stop":</strong> That's meditation! Noticing thoughts IS the practice.</p>
            <p><strong>"I'm doing it wrong":</strong> If you're trying, you're doing it right. There's no perfect meditation.</p>
            <p><strong>"I keep forgetting":</strong> Set an alarm. Put your cushion in the middle of the floor. Make it unavoidable.</p>
            <p><strong>"I don't feel anything":</strong> Benefits are subtle and cumulative. Track your mood weekly, not daily.</p>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 text-sm mb-3">Helpful Resources:</h4>
          <div className="space-y-2">
            <Link href="/support/meditation-consistency" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
              → Complete guide to building meditation consistency
            </Link>
            <Link href="/support/mindfulness-for-beginners" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
              → Mindfulness for beginners: step-by-step guide
            </Link>
            <Link href="/support/emotional-resistance-meditation" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
              → Managing anxiety and resistance during meditation
            </Link>
            <Link href="/tools/mindfulness" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
              → Free guided mindfulness exercises
            </Link>
          </div>
        </div>

        <button
          onClick={() => { setStep('assessment'); setAssessment({}); }}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Retake Assessment
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Based on the Sussex Mindfulness Meditation (SuMMed) model and 2025 research on habit formation.
        </p>
      </div>
    )
  }

  // Assessment Questions
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Meditation Habit Assessment</h2>
      <p className="text-gray-600 text-sm mb-6">
        Discover your current stage and get personalized strategies for consistency
      </p>

      <div className="space-y-6">
        {/* Question 1 */}
        <div>
          <label className="block font-medium text-gray-900 mb-3">
            Do you currently have a meditation practice?
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setAssessment({ ...assessment, currentlyMeditates: true })}
              className={`w-full p-4 text-left border-2 rounded-lg transition ${
                assessment.currentlyMeditates === true
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              Yes, I meditate regularly
            </button>
            <button
              onClick={() => setAssessment({ ...assessment, currentlyMeditates: false })}
              className={`w-full p-4 text-left border-2 rounded-lg transition ${
                assessment.currentlyMeditates === false
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              No, I'm interested but haven't started
            </button>
          </div>
        </div>

        {/* Question 2 - Only if meditating */}
        {assessment.currentlyMeditates && (
          <>
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                How many days per week do you meditate?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map(days => (
                  <button
                    key={days}
                    onClick={() => setAssessment({ ...assessment, meditationFrequency: days })}
                    className={`p-3 text-center border-2 rounded-lg transition ${
                      assessment.meditationFrequency === days
                        ? 'border-therapy-600 bg-therapy-50 font-bold'
                        : 'border-gray-200 hover:border-therapy-300'
                    }`}
                  >
                    {days}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-3">
                How many weeks have you maintained this frequency?
              </label>
              <div className="space-y-2">
                {[
                  { value: 1, label: 'Less than 2 weeks' },
                  { value: 2, label: '2-4 weeks' },
                  { value: 4, label: '4-8 weeks' },
                  { value: 8, label: '2+ months' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAssessment({ ...assessment, consistency: option.value })}
                    className={`w-full p-3 text-left border-2 rounded-lg transition ${
                      assessment.consistency === option.value
                        ? 'border-therapy-600 bg-therapy-50'
                        : 'border-gray-200 hover:border-therapy-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          onClick={() => setStep('results')}
          disabled={assessment.currentlyMeditates === undefined ||
                   (assessment.currentlyMeditates && (!assessment.meditationFrequency || !assessment.consistency))}
          className="w-full bg-therapy-600 hover:bg-therapy-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          Get My Personalized Plan
        </button>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
        <p className="text-sm text-gray-700">
          <strong className="text-blue-900">📊 Research shows:</strong> Consistency (4-7 days/week) matters more than duration. People who meditate consistently show better mood stability, faster emotional recovery, and increased resilience.
        </p>
      </div>
    </div>
  )
}
