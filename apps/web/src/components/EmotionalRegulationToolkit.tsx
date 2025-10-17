import { useState } from 'react'
import Link from 'next/link'

interface EmotionalRegulationToolkitProps {
  className?: string
}

type Skill = 'stop' | 'tipp' | 'opposite-action' | 'ride-the-wave'

export function EmotionalRegulationToolkit({ className = '' }: EmotionalRegulationToolkitProps) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null)

  const skills = [
    {
      id: 'stop' as Skill,
      title: 'STOP Skill',
      subtitle: 'DBT Crisis Skill',
      icon: '🛑',
      color: 'red',
      shortDesc: 'Interrupt impulsive reactions in heated moments',
      whenToUse: 'When you feel overwhelmed and about to react impulsively',
      steps: [
        {
          letter: 'S',
          word: 'Stop',
          instruction: 'Freeze! Don\'t react. Don\'t move. Just stop.',
          detail: 'Like hitting a pause button. Give yourself a moment before acting.'
        },
        {
          letter: 'T',
          word: 'Take a step back',
          instruction: 'Get unstuck from the situation mentally',
          detail: 'Take a breath. Observe what\'s happening from outside yourself.'
        },
        {
          letter: 'O',
          word: 'Observe',
          instruction: 'Notice what\'s happening inside and outside',
          detail: 'What am I feeling? What am I thinking? What\'s actually happening?'
        },
        {
          letter: 'P',
          word: 'Proceed mindfully',
          instruction: 'Ask: What\'s the effective response here?',
          detail: 'What action will make this better, not worse? Act on values, not emotions.'
        }
      ]
    },
    {
      id: 'tipp' as Skill,
      title: 'TIPP Technique',
      subtitle: 'DBT Distress Tolerance',
      icon: '❄️',
      color: 'blue',
      shortDesc: 'Quickly change your body chemistry to reduce intensity',
      whenToUse: 'When emotions are at 8/10 or higher - too intense to think',
      steps: [
        {
          letter: 'T',
          word: 'Temperature',
          instruction: 'Change your body temperature',
          detail: 'Hold ice cubes, splash cold water on face, or take a cold shower. Cold activates your "dive reflex" and calms intense emotions.'
        },
        {
          letter: 'I',
          word: 'Intense exercise',
          instruction: 'Move your body intensely for 10-15 minutes',
          detail: 'Run, do jumping jacks, dance wildly. Burn off the adrenaline and stress hormones.'
        },
        {
          letter: 'P',
          word: 'Paced breathing',
          instruction: 'Breathe slowly: 5-6 breaths per minute',
          detail: 'Inhale for 5 seconds, exhale for 7 seconds. Slower exhale activates calm response.'
        },
        {
          letter: 'P',
          word: 'Paired muscle relaxation',
          instruction: 'Tense and release muscles while breathing',
          detail: 'Inhale while tensing muscles, exhale while releasing. Repeat 5-10 times.'
        }
      ]
    },
    {
      id: 'opposite-action' as Skill,
      title: 'Opposite Action',
      subtitle: 'DBT Emotion Regulation',
      icon: '↔️',
      color: 'purple',
      shortDesc: 'Do the opposite of your emotional urge when emotion isn\'t helpful',
      whenToUse: 'When your emotion doesn\'t fit the facts or isn\'t effective',
      steps: [
        {
          letter: '1',
          word: 'Identify the emotion',
          instruction: 'What emotion am I feeling right now?',
          detail: 'Anger? Fear? Sadness? Shame? Name it clearly.'
        },
        {
          letter: '2',
          word: 'Check if it fits the facts',
          instruction: 'Is my emotion justified by the situation?',
          detail: 'If someone truly wronged you, anger fits. If you\'re catastrophizing, maybe it doesn\'t.'
        },
        {
          letter: '3',
          word: 'Identify the action urge',
          instruction: 'What does this emotion make me want to do?',
          detail: 'Anger → attack. Fear → avoid. Sadness → withdraw. Shame → hide.'
        },
        {
          letter: '4',
          word: 'Do the opposite',
          instruction: 'Gently do the opposite of the urge',
          detail: 'If emotion doesn\'t fit facts: Anger → be kind. Fear → approach. Sadness → get active. Shame → talk about it.'
        },
        {
          letter: '5',
          word: 'Do it all the way',
          instruction: 'Commit fully - posture, face, voice',
          detail: 'If being kind, smile genuinely. If approaching fear, walk confidently. Body affects emotions.'
        }
      ]
    },
    {
      id: 'ride-the-wave' as Skill,
      title: 'Ride the Wave',
      subtitle: 'Mindful Distress Tolerance',
      icon: '🌊',
      color: 'teal',
      shortDesc: 'Let emotions rise and fall without fighting or acting on them',
      whenToUse: 'When you can\'t change the situation and need to tolerate distress',
      steps: [
        {
          letter: '1',
          word: 'Notice the emotion',
          instruction: 'Acknowledge: "I\'m having a wave of [emotion]"',
          detail: 'Don\'t judge it or push it away. Just notice it\'s there.'
        },
        {
          letter: '2',
          word: 'Observe sensations',
          instruction: 'Where do you feel it in your body?',
          detail: 'Tight chest? Clenched jaw? Hot face? Just observe these sensations.'
        },
        {
          letter: '3',
          word: 'Remember: It\'s a wave',
          instruction: 'Emotions peak and then subside - usually within 90 seconds',
          detail: 'Like a wave in the ocean. It rises, crests, then falls. You don\'t have to do anything.'
        },
        {
          letter: '4',
          word: 'Breathe and wait',
          instruction: 'Breathe slowly and watch the wave rise',
          detail: 'Let it get as intense as it needs to. You can handle it. Keep breathing.'
        },
        {
          letter: '5',
          word: 'Watch it subside',
          instruction: 'Notice as the intensity naturally decreases',
          detail: 'The wave always passes. You rode it without making things worse. You\'re still here.'
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; cardBg: string }> = {
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', cardBg: 'from-red-50 to-orange-50' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', cardBg: 'from-blue-50 to-cyan-50' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', cardBg: 'from-purple-50 to-pink-50' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', cardBg: 'from-teal-50 to-green-50' },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Emotional Regulation Toolkit</h2>
          <p className="text-gray-600 text-sm">DBT skills for managing intense emotions</p>
        </div>
        <Link
          href="/support/emotional-regulation-skills"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Learn more →
        </Link>
      </div>

      {!activeSkill ? (
        <>
          {/* Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {skills.map((skill) => {
              const colors = getColorClasses(skill.color)
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.id)}
                  className={`bg-gradient-to-br ${colors.cardBg} border ${colors.border} rounded-xl p-5 text-left hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl">{skill.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{skill.title}</h3>
                      <p className="text-xs text-gray-500 font-medium">{skill.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{skill.shortDesc}</p>
                  <div className={`text-xs ${colors.text} font-medium`}>
                    When to use: {skill.whenToUse}
                  </div>
                </button>
              )
            })}
          </div>

          {/* What is DBT */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              What is DBT?
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Dialectical Behavior Therapy (DBT)</strong> is an evidence-based therapy that teaches skills for:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Managing intense emotions without making things worse</li>
              <li>• Tolerating distress when you can't immediately solve a problem</li>
              <li>• Improving relationships through better communication</li>
              <li>• Being present and mindful in difficult moments</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              These skills are especially helpful for anger, anxiety, depression, and emotional overwhelm.
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setActiveSkill(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to skills
          </button>

          {(() => {
            const skill = skills.find(s => s.id === activeSkill)
            if (!skill) return null
            const colors = getColorClasses(skill.color)

            return (
              <div className={`bg-gradient-to-br ${colors.cardBg} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{skill.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{skill.title}</h3>
                    <p className="text-sm text-gray-600">{skill.subtitle}</p>
                  </div>
                </div>

                <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 mb-6`}>
                  <p className="text-sm font-semibold text-gray-900 mb-2">When to use this skill:</p>
                  <p className="text-sm text-gray-700">{skill.whenToUse}</p>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {skill.steps.map((step, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${colors.bg} ${colors.border} border-2 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-xl font-bold ${colors.text}`}>{step.letter}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{step.word}</h4>
                          <p className="text-sm text-gray-700 font-medium mb-2">{step.instruction}</p>
                          <p className="text-sm text-gray-600">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Practice Tip */}
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Practice Tip:</strong> These skills work best when practiced regularly, not just in crisis.
                    Try using {skill.title} in small, manageable situations first to build the habit.
                  </p>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Quick Reference */}
      {!activeSkill && (
        <div className="mt-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4">
          <h4 className="font-bold text-gray-900 mb-3">Quick Reference Guide:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="bg-white/70 rounded p-2">
              <strong>In a crisis? →</strong> Use STOP or TIPP
            </div>
            <div className="bg-white/70 rounded p-2">
              <strong>Unhelpful emotion? →</strong> Try Opposite Action
            </div>
            <div className="bg-white/70 rounded p-2">
              <strong>Can't solve it now? →</strong> Ride the Wave
            </div>
            <div className="bg-white/70 rounded p-2">
              <strong>Need more help? →</strong> <Link href="/support/emotional-regulation-skills" className="text-blue-600 underline">Full guide</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
