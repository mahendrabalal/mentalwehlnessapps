import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { SaveResultsPrompt } from '@/components/SaveResultsPrompt'

interface SocialConnectionAssessmentProps {
  className?: string
}

type ResponseOption = 1 | 2 | 3

interface Question {
  id: string
  text: string
}

const UCLA_QUESTIONS: Question[] = [
  {
    id: 'companionship',
    text: 'How often do you feel that you lack companionship?'
  },
  {
    id: 'left_out',
    text: 'How often do you feel left out?'
  },
  {
    id: 'isolated',
    text: 'How often do you feel isolated from others?'
  }
]

type LonelinessLevel = 'not-lonely' | 'moderate' | 'significant'

export function SocialConnectionAssessment({ className = '' }: SocialConnectionAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, ResponseOption>>({})
  const [showResults, setShowResults] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [scoreChange, setScoreChange] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    } catch (error) {
      console.error('Error checking user:', error)
    }
  }

  const saveAssessmentResult = async (assessmentResponses: Record<string, ResponseOption>) => {
    if (!user) return

    setIsSaving(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) {
        console.log('No auth token available')
        return
      }

      const totalScore = calculateScore()
      const lonelinessLevel = getLonelinessLevel(totalScore)

      const response = await fetch('/api/assessments/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          assessmentType: 'loneliness',
          toolName: 'Social Connection Assessment (UCLA Loneliness Scale)',
          score: totalScore,
          maxScore: 9,
          level: lonelinessLevel,
          severityScore: totalScore,
          results: {
            totalScore: totalScore,
            lonelinessLevel: lonelinessLevel,
            responses: assessmentResponses
          },
          recommendations: getLevelConfig(lonelinessLevel).tips
        })
      })

      const data = await response.json()

      if (data.success && data.assessment.scoreChange !== null && data.assessment.scoreChange !== undefined) {
        setScoreChange(data.assessment.scoreChange)
      }
    } catch (error) {
      console.error('Failed to save assessment:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleResponse = (score: ResponseOption) => {
    const questionId = UCLA_QUESTIONS[currentQuestion].id
    const newResponses = { ...responses, [questionId]: score }
    setResponses(newResponses)

    // Move to next question or show results
    if (currentQuestion < UCLA_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      // Auto-save for logged-in users
      if (user) {
        saveAssessmentResult(newResponses)
      }
    }
  }

  const calculateScore = (): number => {
    return Object.values(responses).reduce((sum, score) => sum + score, 0)
  }

  const getLonelinessLevel = (score: number): LonelinessLevel => {
    if (score >= 6) return 'significant'
    if (score >= 4) return 'moderate'
    return 'not-lonely'
  }

  const resetAssessment = () => {
    setResponses({})
    setCurrentQuestion(0)
    setShowResults(false)
  }

  const score = calculateScore()
  const level = getLonelinessLevel(score)

  const getLevelConfig = (level: LonelinessLevel) => {
    const configs = {
      'not-lonely': {
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconBg: 'bg-green-100',
        icon: '💚',
        label: 'Strong Social Connections',
        message: 'Your responses suggest you have healthy social connections. Keep nurturing these relationships!',
        tips: [
          'Continue maintaining regular contact with friends and family',
          'Consider deepening existing relationships through meaningful conversations',
          'Share your social wellness strategies with others who might benefit',
          'Explore new social activities or hobbies to expand your network'
        ]
      },
      'moderate': {
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-800',
        iconBg: 'bg-yellow-100',
        icon: '💛',
        label: 'Moderate Loneliness',
        message: 'You\'re experiencing some feelings of loneliness. This is common and there are effective strategies to improve your connections.',
        tips: [
          'Schedule regular check-ins with friends or family (even brief texts count)',
          'Join a group or class based on your interests',
          'Volunteer for a cause you care about to meet like-minded people',
          'Reach out to one person this week you\'ve been meaning to connect with',
          'Consider therapy to explore relationship patterns and build connection skills'
        ]
      },
      'significant': {
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-800',
        iconBg: 'bg-red-100',
        icon: '❤️',
        label: 'Significant Loneliness',
        message: 'You\'re experiencing significant loneliness. This is a health concern, but there are proven interventions that can help.',
        tips: [
          'Reach out for professional support - loneliness is treatable',
          'Start small: one social interaction per day (even with a cashier)',
          'Join an online community around a specific interest',
          'Consider group therapy or support groups',
          'Practice self-compassion - loneliness doesn\'t mean something is wrong with you',
          'Look into local community centers, libraries, or religious organizations',
          'Try our mindfulness tools to manage difficult emotions while building connections'
        ]
      }
    }
    return configs[level]
  }

  const config = getLevelConfig(level)

  if (showResults) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Social Connection Results</h2>
          <p className="text-gray-600 text-sm">
            Based on the UCLA Loneliness Scale (ULS-3) - a clinically validated assessment
          </p>
        </div>

        {/* Score change indicator for logged-in users */}
        {user && scoreChange !== null && scoreChange !== 0 && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            scoreChange < 0
              ? 'bg-green-50 border-green-500'
              : 'bg-orange-50 border-orange-500'
          }`}>
            <div className="flex items-center gap-2">
              {scoreChange < 0 ? (
                <>
                  <span className="text-2xl">📈</span>
                  <span className="font-semibold text-green-700">
                    Excellent! Your social connection score improved by {Math.abs(scoreChange)} points. You're building stronger connections!
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📉</span>
                  <span className="font-semibold text-orange-700">
                    Your loneliness score increased by {scoreChange} points. Consider reaching out to build new connections.
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`${config.iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{config.label}</h3>
              <p className="text-sm text-gray-600">Score: {score}/9</p>
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                level === 'not-lonely' ? 'bg-green-500' :
                level === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(score / 9) * 100}%` }}
            ></div>
          </div>

          <p className={`${config.textColor} font-medium mb-4`}>
            {config.message}
          </p>
        </div>

        {/* Understanding Your Score */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            Understanding Loneliness
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            Loneliness is the gap between desired and actual social connections. It's a signal that your social needs aren't being met - similar to how hunger signals nutritional needs.
          </p>
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> Loneliness affects {level === 'significant' ? '20-45%' : 'up to 60%'} of adults at some point.
            It's associated with health risks similar to smoking 15 cigarettes/day, making it crucial to address.
          </p>
        </div>

        {/* Action Steps */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Recommended Actions:</h4>
          <div className="space-y-2">
            {config.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={config.textColor}>✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 text-sm mb-3">Helpful Resources:</h4>
          <div className="space-y-2">
            <Link
              href="/support/combat-loneliness-isolation"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Complete guide to combating loneliness and isolation
            </Link>
            {level === 'significant' && (
              <Link
                href="/support/affordable-mental-health-care"
                className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                → Find affordable therapy options for connection issues
              </Link>
            )}
            <Link
              href="/support/emotional-regulation-skills"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Emotional regulation skills for managing loneliness
            </Link>
            <Link
              href="/tools/anxiety-relief"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Anxiety relief techniques for social situations
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        {level !== 'not-lonely' && (
          <div className={`${level === 'significant' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'} border-l-4 p-4 rounded mb-6`}>
            <p className="text-sm text-gray-800">
              <strong>Take Action Today:</strong> Social connection is crucial for mental and physical health.
              {level === 'significant'
                ? ' Consider reaching out to a mental health professional who can provide personalized support.'
                : ' Small steps toward connection can make a big difference over time.'}
            </p>
          </div>
        )}

        {/* Save Results Prompt - Shows only for unauthenticated users */}
        {!user && (
          <SaveResultsPrompt
            toolName="Loneliness Assessment"
            assessmentType="ucla-loneliness"
            assessmentResults={{
              score,
              maxScore: 9,
              level,
              recommendations: config.tips
            }}
            className="mb-6"
          />
        )}

        {/* Logged-in user actions */}
        {user && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Your Assessment is Saved</h4>
            <p className="text-sm text-blue-800 mb-3">
              Your social connection assessment has been automatically saved to your dashboard. Track how your social wellness improves over time!
            </p>
            {isSaving && (
              <p className="text-sm text-gray-600 italic">Saving your progress...</p>
            )}
          </div>
        )}

        {/* Retake Button */}
        <button
          onClick={resetAssessment}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Retake Assessment
        </button>

        {/* Clinical Note */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          This assessment is based on the UCLA Loneliness Scale (Version 3), a validated clinical tool.
          Results are for educational purposes and do not constitute medical diagnosis.
        </p>
      </div>
    )
  }

  // Assessment Questions View
  const progress = ((currentQuestion + 1) / UCLA_QUESTIONS.length) * 100

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Connection Assessment</h2>
        <p className="text-gray-600 text-sm">
          Answer 3 brief questions to assess your current level of social connection
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {UCLA_QUESTIONS.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-therapy-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {UCLA_QUESTIONS[currentQuestion].text}
        </h3>

        {/* Response Options */}
        <div className="space-y-3">
          <button
            onClick={() => handleResponse(1)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Hardly ever</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>

          <button
            onClick={() => handleResponse(2)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Some of the time</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>

          <button
            onClick={() => handleResponse(3)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Often</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Back Button (if not first question) */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
        >
          <span>←</span> Previous Question
        </button>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong className="text-blue-900">📊 About this assessment:</strong> This is the UCLA Loneliness Scale (ULS-3),
          a clinically validated 3-item measure used worldwide to assess loneliness and social isolation.
        </p>
      </div>
    </div>
  )
}
