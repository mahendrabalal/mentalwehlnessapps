import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { SaveResultsPrompt } from '@/components/SaveResultsPrompt'

interface StigmaAssessmentToolProps {
  className?: string
}

interface Question {
  id: string
  text: string
  dimension: 'awareness' | 'self-application' | 'harm'
}

const STIGMA_QUESTIONS: Question[] = [
  // Stereotype Awareness
  { id: 'q1', text: 'I am aware that many people believe individuals with mental health conditions are dangerous or unpredictable.', dimension: 'awareness' },
  { id: 'q2', text: 'I am aware that many people believe individuals with mental health conditions are to blame for their problems.', dimension: 'awareness' },
  { id: 'q3', text: 'I am aware that many people believe individuals with mental health conditions are weak or incompetent.', dimension: 'awareness' },

  // Self-Application
  { id: 'q4', text: 'Because of my mental health experiences, I believe I am dangerous or unpredictable.', dimension: 'self-application' },
  { id: 'q5', text: 'I believe I am to blame for my mental health challenges.', dimension: 'self-application' },
  { id: 'q6', text: 'I feel I am weak or less capable because of my mental health experiences.', dimension: 'self-application' },
  { id: 'q7', text: 'I think others see me as inferior because of my mental health.', dimension: 'self-application' },

  // Harm to Self
  { id: 'q8', text: 'My mental health experiences have damaged my self-esteem.', dimension: 'harm' },
  { id: 'q9', text: 'I avoid social situations because of stigma related to mental health.', dimension: 'harm' },
  { id: 'q10', text: 'I have delayed seeking help because of what others might think.', dimension: 'harm' }
]

type ResponseValue = 1 | 2 | 3 | 4

type StigmaLevel = 'low' | 'moderate' | 'high' | 'severe'

export function StigmaAssessmentTool({ className = '' }: StigmaAssessmentToolProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({})
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

  const saveAssessmentResult = async (assessmentResponses: Record<string, ResponseValue>) => {
    if (!user) return

    setIsSaving(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) {
        console.log('No auth token available')
        return
      }

      const scores = calculateScores()
      const stigmaLevel = getStigmaLevel(scores.totalScore, scores.maxScore)

      const response = await fetch('/api/assessments/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          assessmentType: 'stigma',
          toolName: 'Mental Health Stigma Assessment',
          score: scores.totalScore,
          maxScore: scores.maxScore,
          level: stigmaLevel,
          severityScore: scores.totalScore,
          results: {
            totalScore: scores.totalScore,
            stigmaLevel: stigmaLevel,
            awarenessScore: scores.awarenessScore,
            applicationScore: scores.applicationScore,
            harmScore: scores.harmScore,
            responses: assessmentResponses
          },
          recommendations: getLevelConfig(stigmaLevel).strategies
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

  const handleResponse = (score: ResponseValue) => {
    const questionId = STIGMA_QUESTIONS[currentQuestion].id
    const newResponses = { ...responses, [questionId]: score }
    setResponses(newResponses)

    if (currentQuestion < STIGMA_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      // Auto-save for logged-in users
      if (user) {
        saveAssessmentResult(newResponses)
      }
    }
  }

  const calculateScores = () => {
    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0)
    const maxScore = STIGMA_QUESTIONS.length * 4

    // Calculate dimension scores
    const awarenessQuestions = STIGMA_QUESTIONS.filter(q => q.dimension === 'awareness')
    const awarenessScore = awarenessQuestions.reduce((sum, q) => sum + (responses[q.id] || 0), 0)

    const applicationQuestions = STIGMA_QUESTIONS.filter(q => q.dimension === 'self-application')
    const applicationScore = applicationQuestions.reduce((sum, q) => sum + (responses[q.id] || 0), 0)

    const harmQuestions = STIGMA_QUESTIONS.filter(q => q.dimension === 'harm')
    const harmScore = harmQuestions.reduce((sum, q) => sum + (responses[q.id] || 0), 0)

    return {
      totalScore,
      maxScore,
      awarenessScore,
      applicationScore,
      harmScore,
      awarenessMax: awarenessQuestions.length * 4,
      applicationMax: applicationQuestions.length * 4,
      harmMax: harmQuestions.length * 4
    }
  }

  const getStigmaLevel = (totalScore: number, maxScore: number): StigmaLevel => {
    const percentage = (totalScore / maxScore) * 100
    if (percentage >= 75) return 'severe'
    if (percentage >= 50) return 'high'
    if (percentage >= 25) return 'moderate'
    return 'low'
  }

  const resetAssessment = () => {
    setResponses({})
    setCurrentQuestion(0)
    setShowResults(false)
  }

  const scores = calculateScores()
  const level = getStigmaLevel(scores.totalScore, scores.maxScore)

  const getLevelConfig = (level: StigmaLevel) => {
    const configs = {
      'low': {
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconBg: 'bg-green-100',
        icon: '✅',
        label: 'Low Internalized Stigma',
        message: 'You show minimal signs of internalized stigma. You\'re not letting negative stereotypes define your self-worth.',
        strategies: [
          'Continue challenging stigmatizing beliefs when you encounter them',
          'Share your positive perspective with others who may be struggling',
          'Advocate for mental health awareness in your community',
          'Support others in their journey without judgment'
        ]
      },
      'moderate': {
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-800',
        iconBg: 'bg-yellow-100',
        icon: '⚠️',
        label: 'Moderate Internalized Stigma',
        message: 'You\'re experiencing some internalized stigma that may be affecting your self-esteem and help-seeking behavior.',
        strategies: [
          'Practice self-compassion: Mental health challenges are not character flaws',
          'Challenge negative self-talk by examining the evidence',
          'Connect with supportive communities (online or in-person)',
          'Educate yourself about your condition to counter misconceptions',
          'Consider therapy focused on self-stigma reduction',
          'Remember: Seeking help is a sign of strength, not weakness'
        ]
      },
      'high': {
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-800',
        iconBg: 'bg-orange-100',
        icon: '🔶',
        label: 'High Internalized Stigma',
        message: 'Internalized stigma is significantly impacting your self-esteem and may be preventing you from seeking help.',
        strategies: [
          'Seek professional support to address self-stigma specifically',
          'Practice separating your identity from your mental health condition',
          'Join peer support groups to reduce isolation and normalize experiences',
          'Keep a self-compassion journal to counter negative self-beliefs',
          'Limit exposure to stigmatizing media or relationships',
          'Learn about the biological/environmental factors in mental health (not personal failure)',
          'Start with small steps: Tell one trusted person about your experiences'
        ]
      },
      'severe': {
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-800',
        iconBg: 'bg-red-100',
        icon: '🚨',
        label: 'Severe Internalized Stigma',
        message: 'You\'re experiencing severe internalized stigma that is likely causing significant distress and may be preventing treatment.',
        strategies: [
          'Prioritize professional mental health support immediately',
          'Consider therapies specifically designed for self-stigma (ACT, CFT, Narrative Therapy)',
          'Work on self-stigma before or alongside other mental health goals',
          'Build a crisis support plan if stigma is causing suicidal ideation',
          'Connect with peer specialists who have overcome stigma',
          'Focus on small acts of self-kindness daily',
          'Understand: The stigma is the problem, not you',
          'Explore anonymous support options if fear of judgment is high'
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Stigma Assessment Results</h2>
          <p className="text-gray-600 text-sm">
            Based on the Self-Stigma of Mental Illness Scale (SSMIS-SF) - adapted for accessibility
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
                    Great progress! Your stigma score improved by {Math.abs(scoreChange)} points since your last assessment.
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📉</span>
                  <span className="font-semibold text-orange-700">
                    Your stigma score increased by {scoreChange} points. Consider working on self-compassion strategies.
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Overall Score */}
        <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`${config.iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{config.label}</h3>
              <p className="text-sm text-gray-600">Total Score: {scores.totalScore}/{scores.maxScore}</p>
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                level === 'low' ? 'bg-green-500' :
                level === 'moderate' ? 'bg-yellow-500' :
                level === 'high' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${(scores.totalScore / scores.maxScore) * 100}%` }}
            ></div>
          </div>

          <p className={`${config.textColor} font-medium mb-4`}>
            {config.message}
          </p>
        </div>

        {/* Dimension Breakdown */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h4 className="font-bold text-gray-900 mb-4">Understanding Your Results:</h4>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Stereotype Awareness</span>
                <span className="text-sm text-gray-600">{scores.awarenessScore}/{scores.awarenessMax}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(scores.awarenessScore / scores.awarenessMax) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Awareness of negative stereotypes about mental health</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Self-Application</span>
                <span className="text-sm text-gray-600">{scores.applicationScore}/{scores.applicationMax}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(scores.applicationScore / scores.applicationMax) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Applying negative stereotypes to yourself</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Harm to Self-Esteem</span>
                <span className="text-sm text-gray-600">{scores.harmScore}/{scores.harmMax}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(scores.harmScore / scores.harmMax) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Impact on self-esteem and behavior</p>
            </div>
          </div>
        </div>

        {/* Understanding Internalized Stigma */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-600">
          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            What is Internalized Stigma?
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            Internalized stigma (or self-stigma) occurs when you internalize negative stereotypes about mental health and apply them to yourself.
            It can lead to shame, secrecy, reduced self-esteem, and delayed help-seeking.
          </p>
          <p className="text-sm text-gray-700">
            <strong>Good news:</strong> Internalized stigma is learned—and can be unlearned. With awareness and the right strategies, you can rebuild your self-worth and seek the support you deserve.
          </p>
        </div>

        {/* Strategies */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Recommended Actions:</h4>
          <div className="space-y-2">
            {config.strategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={config.textColor}>✓</span>
                <span>{strategy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 text-sm mb-3">Helpful Resources:</h4>
          <div className="space-y-2">
            <Link
              href="/support/overcome-mental-health-stigma"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Complete guide to overcoming mental health stigma
            </Link>
            <Link
              href="/support/emotional-regulation-skills"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Emotional regulation skills for shame and self-criticism
            </Link>
            {(level === 'high' || level === 'severe') && (
              <Link
                href="/support/affordable-mental-health-care"
                className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                → Find affordable therapy for stigma-focused treatment
              </Link>
            )}
            <Link
              href="/tools/anxiety-relief"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Anxiety relief for social situations and judgment fears
            </Link>
          </div>
        </div>

        {/* Important Notice */}
        {(level === 'high' || level === 'severe') && (
          <div className={`${level === 'severe' ? 'bg-red-50 border-red-400' : 'bg-orange-50 border-orange-400'} border-l-4 p-4 rounded mb-6`}>
            <p className="text-sm text-gray-800">
              <strong>Important:</strong> Severe internalized stigma can prevent life-saving treatment. If you're avoiding help due to shame or fear of judgment, please reach out to a mental health professional. Many therapists specialize in stigma reduction and offer confidential, non-judgmental support.
            </p>
          </div>
        )}

        {/* Save Results Prompt - Shows only for unauthenticated users */}
        {!user && (
          <SaveResultsPrompt
            toolName="Stigma Assessment"
            assessmentType="mental-health-stigma"
            className="mb-6"
          />
        )}

        {/* Logged-in user actions */}
        {user && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Your Assessment is Saved</h4>
            <p className="text-sm text-blue-800 mb-3">
              Your stigma assessment has been automatically saved to your dashboard. Track your progress as you work on self-compassion!
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

        {/* Privacy Note */}
        <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-green-600 text-lg">🔒</span>
            <span>
              <strong>Your Privacy:</strong> This assessment is completely private. Your responses are not stored or shared.
              You're taking a brave step by examining stigma—that takes courage.
            </span>
          </p>
        </div>

        {/* Clinical Note */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          This assessment is adapted from the Self-Stigma of Mental Illness Scale (SSMIS-SF).
          Results are for educational purposes and do not constitute medical diagnosis. Consult a mental health professional for personalized support.
        </p>
      </div>
    )
  }

  // Assessment Questions View
  const progress = ((currentQuestion + 1) / STIGMA_QUESTIONS.length) * 100

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mental Health Stigma Self-Assessment</h2>
        <p className="text-gray-600 text-sm">
          A private, confidential assessment to measure internalized stigma
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {STIGMA_QUESTIONS.length}
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
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
            {STIGMA_QUESTIONS[currentQuestion].text}
          </h3>
        </div>

        {/* Response Options */}
        <div className="space-y-3">
          <button
            onClick={() => handleResponse(1)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Strongly Disagree</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>

          <button
            onClick={() => handleResponse(2)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Disagree</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>

          <button
            onClick={() => handleResponse(3)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Agree</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>

          <button
            onClick={() => handleResponse(4)}
            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-therapy-600 hover:bg-therapy-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Strongly Agree</span>
              <span className="text-gray-400 group-hover:text-therapy-600">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Back Button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
        >
          <span>←</span> Previous Question
        </button>
      )}

      {/* Privacy Notice */}
      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <span className="text-green-600">🔒</span>
          <span><strong>Private & Confidential:</strong> Your responses are not saved or shared. This assessment is for your personal insight only.</span>
        </p>
      </div>
    </div>
  )
}
