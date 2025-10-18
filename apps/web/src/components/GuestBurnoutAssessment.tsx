import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AssessmentQuestion {
  id: string
  question: string
  options: { label: string; score: number }[]
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'mood',
    question: 'How would you describe your overall mood this week?',
    options: [
      { label: 'Very positive and energized', score: 10 },
      { label: 'Generally good', score: 7 },
      { label: 'Neutral or mixed', score: 5 },
      { label: 'Often low or sad', score: 3 },
      { label: 'Consistently negative', score: 1 }
    ]
  },
  {
    id: 'stress',
    question: 'How often do you feel overwhelmed by stress?',
    options: [
      { label: 'Rarely or never', score: 10 },
      { label: 'Occasionally', score: 7 },
      { label: 'Several times a week', score: 5 },
      { label: 'Daily', score: 2 },
      { label: 'Constantly', score: 1 }
    ]
  },
  {
    id: 'sleep',
    question: 'How would you rate your sleep quality recently?',
    options: [
      { label: 'Excellent - well rested', score: 10 },
      { label: 'Good most nights', score: 7 },
      { label: 'Fair - some restless nights', score: 5 },
      { label: 'Poor - frequently restless', score: 3 },
      { label: 'Very poor - barely sleeping', score: 1 }
    ]
  },
  {
    id: 'energy',
    question: 'How are your energy levels throughout the day?',
    options: [
      { label: 'High and sustained', score: 10 },
      { label: 'Good with occasional dips', score: 7 },
      { label: 'Moderate but manageable', score: 5 },
      { label: 'Low most of the time', score: 3 },
      { label: 'Exhausted constantly', score: 1 }
    ]
  },
  {
    id: 'workload',
    question: 'How do you feel about your current responsibilities?',
    options: [
      { label: 'Manageable and balanced', score: 10 },
      { label: 'Busy but under control', score: 7 },
      { label: 'Challenging but coping', score: 5 },
      { label: 'Overwhelming often', score: 3 },
      { label: 'Completely unmanageable', score: 1 }
    ]
  },
  {
    id: 'motivation',
    question: 'How motivated do you feel about your daily activities?',
    options: [
      { label: 'Very motivated and engaged', score: 10 },
      { label: 'Generally motivated', score: 7 },
      { label: 'Neutral - just going through motions', score: 5 },
      { label: 'Frequently unmotivated', score: 3 },
      { label: 'No motivation at all', score: 1 }
    ]
  },
  {
    id: 'recovery',
    question: 'Do you have time to rest and recover?',
    options: [
      { label: 'Yes, regularly', score: 10 },
      { label: 'Sometimes', score: 7 },
      { label: 'Rarely', score: 5 },
      { label: 'Almost never', score: 2 },
      { label: 'Never - no time at all', score: 1 }
    ]
  }
]

interface GuestBurnoutAssessmentProps {
  onComplete?: () => void
  className?: string
}

type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export function GuestBurnoutAssessment({ onComplete, className = '' }: GuestBurnoutAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  // Handle router on client-side only to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)

    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateRiskScore = (): { score: number; level: RiskLevel } => {
    const scores = Object.values(answers)
    if (scores.length === 0) return { score: 0, level: 'low' }

    // Average score out of 10, then convert to burnout risk (invert)
    const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length
    // Convert: 10 (perfect) = 0 burnout, 1 (worst) = 100 burnout
    const burnoutScore = Math.round(((10 - avgScore) / 9) * 100)

    let level: RiskLevel = 'low'
    if (burnoutScore >= 70) {
      level = 'critical'
    } else if (burnoutScore >= 50) {
      level = 'high'
    } else if (burnoutScore >= 30) {
      level = 'medium'
    }

    return { score: burnoutScore, level }
  }

  const getRiskConfig = (level: RiskLevel) => {
    const configs = {
      low: {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconBg: 'bg-green-100',
        barColor: 'bg-green-500',
        icon: '✅',
        label: 'Low Risk',
        message: 'Your burnout risk is currently low. Keep up the good self-care!',
        actions: ['Continue maintaining work-life balance', 'Keep prioritizing rest and recovery', 'Stay aware of early warning signs']
      },
      medium: {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-800',
        iconBg: 'bg-yellow-100',
        barColor: 'bg-yellow-500',
        icon: '⚠️',
        label: 'Medium Risk',
        message: 'You\'re showing some signs of burnout. Time to prioritize self-care.',
        actions: ['Set firm boundaries this week', 'Schedule time for rest', 'Talk to someone about your stress', 'Review your workload and responsibilities']
      },
      high: {
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-800',
        iconBg: 'bg-orange-100',
        barColor: 'bg-orange-500',
        icon: '🔥',
        label: 'High Risk',
        message: 'You\'re at high risk for burnout. Immediate action needed.',
        actions: ['Take a break as soon as possible', 'Say no to non-essential commitments', 'Prioritize sleep above all else', 'Consider talking to a therapist', 'Use sick days if needed']
      },
      critical: {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-800',
        iconBg: 'bg-red-100',
        barColor: 'bg-red-500',
        icon: '🚨',
        label: 'Critical Risk',
        message: 'You\'re experiencing severe burnout symptoms. Please take immediate action.',
        actions: ['Take time off work if possible', 'Speak with a doctor or therapist immediately', 'Reduce all non-essential activities', 'Reach out for support - you don\'t have to do this alone', 'Focus solely on rest and recovery']
      }
    }
    return configs[level]
  }

  if (showResults) {
    const { score, level } = calculateRiskScore()
    const config = getRiskConfig(level)
    const signupUrl = currentPath
      ? `/auth/signup?redirect=${encodeURIComponent(currentPath)}`
      : '/auth/signup'

    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Burnout Assessment Results</h2>
          <p className="text-gray-600 text-sm">Based on your responses</p>
        </div>

        {/* Risk Level Display */}
        <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${config.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                {config.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{config.label}</h3>
                <p className="text-sm text-gray-600">Risk Score: {score}/100</p>
              </div>
            </div>
          </div>

          {/* Risk Score Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${config.barColor}`}
              style={{ width: `${Math.min(score, 100)}%` }}
            ></div>
          </div>

          <p className={`${config.textColor} font-medium`}>
            {config.message}
          </p>
        </div>

        {/* Recommended Actions */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Recommended Actions:</h4>
          <div className="space-y-2">
            {config.actions.map((action, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={config.textColor}>✓</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign Up CTA */}
        <div className="bg-gradient-to-r from-therapy-600 to-blue-600 rounded-xl p-6 text-white mb-6">
          <h3 className="text-xl font-bold mb-2">Track Your Progress Over Time</h3>
          <p className="mb-4 text-white/90">
            Sign up free to save your results, track your burnout risk daily, and get personalized insights based on patterns over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={signupUrl}
              className="bg-white text-therapy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center shadow-md"
            >
              Sign Up Free - Track Your Progress
            </Link>
            <button
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Retake Assessment
            </button>
          </div>
        </div>

        {/* Recovery Resources */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-bold text-gray-900 text-sm mb-3">Burnout Recovery Resources:</h4>
          <div className="space-y-2">
            <Link
              href="/support/emotional-exhaustion-burnout"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Evidence-based burnout recovery strategies
            </Link>
            <Link
              href="/support/emotional-resistance-meditation"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Meditation for emotional resilience
            </Link>
            {(level === 'high' || level === 'critical') && (
              <p className="text-sm text-red-800 mt-4 bg-red-50 border-l-4 border-red-400 p-3 rounded">
                <strong>Important:</strong> If you're experiencing severe burnout, please consult a mental health professional. Burnout is a serious condition that often requires professional support to fully recover.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const question = ASSESSMENT_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-therapy-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-therapy-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, option.score)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-therapy-600 hover:bg-therapy-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-therapy-600 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-gray-900 font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {currentQuestion > 0 ? (
          <button
            onClick={handleBack}
            className="text-therapy-600 hover:text-therapy-700 font-medium flex items-center gap-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        ) : (
          <div></div>
        )}
        <p className="text-sm text-gray-500">
          {ASSESSMENT_QUESTIONS.length - currentQuestion - 1} questions remaining
        </p>
      </div>
    </div>
  )
}
