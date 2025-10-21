import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { InternationalCrisisSupport } from '@/components/InternationalCrisisSupport'
import { SEOHead } from '@/components/SEOHead'

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
]

const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all", description: "0 days" },
  { value: 1, label: "Several days", description: "1-6 days" },
  { value: 2, label: "More than half the days", description: "7+ days" },
  { value: 3, label: "Nearly every day", description: "11+ days" }
]

function calculateSeverity(score: number): string {
  if (score <= 4) return 'minimal'
  if (score <= 9) return 'mild'
  if (score <= 14) return 'moderate'
  return 'severe'
}

function getSeverityDescription(severity: string): string {
  const descriptions = {
    minimal: 'Minimal anxiety symptoms. Continue monitoring your mental health.',
    mild: 'Mild anxiety symptoms. Consider lifestyle changes and continued monitoring.',
    moderate: 'Moderate anxiety symptoms. Consider speaking with a healthcare provider.',
    severe: 'Severe anxiety symptoms. Recommend speaking with a healthcare provider immediately.'
  }
  return descriptions[severity as keyof typeof descriptions] || ''
}

function isCrisisScore(score: number): boolean {
  // Crisis if total score >= 15 (severe anxiety)
  return score >= 15
}

export default function GAD7Assessment() {
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const baseTitle = 'GAD-7 Anxiety Assessment - Mental Wellness App'
  const baseDescription = 'Complete the GAD-7 anxiety assessment to monitor generalized anxiety levels and receive evidence-based guidance.'

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const [responses, setResponses] = useState<number[]>(new Array(7).fill(-1))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [scoreChange, setScoreChange] = useState<number | null>(null)
  const [results, setResults] = useState<{
    totalScore: number
    severity: string
    isCrisis: boolean
  } | null>(null)

  const handleResponse = (questionIndex: number, value: number) => {
    const newResponses = [...responses]
    newResponses[questionIndex] = value
    setResponses(newResponses)
  }

  const canProceed = () => {
    return responses.slice(0, currentQuestion + 1).every(r => r !== -1)
  }

  const isComplete = () => {
    return responses.every(r => r !== -1)
  }

  const handleNext = () => {
    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (!user || !isComplete()) return

    setLoading(true)
    setError('')

    try {
      const totalScore = responses.reduce((sum, score) => sum + score, 0)
      const severity = calculateSeverity(totalScore)
      const isCrisis = isCrisisScore(totalScore)

      // Get auth session for API call
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) {
        setError('Authentication failed. Please log in again.')
        return
      }

      // Use new API endpoint for progress tracking
      const response = await fetch('/api/assessments/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          assessmentType: 'gad7',
          toolName: 'GAD-7 Anxiety Assessment',
          score: totalScore,
          maxScore: 21,
          level: severity,
          severityScore: totalScore,
          crisisLevel: isCrisis ? 'severe' : 'none',
          results: {
            responses,
            severity,
            isCrisis,
            questionCount: GAD7_QUESTIONS.length
          },
          recommendations: [
            getSeverityDescription(severity),
            isCrisis ? 'Please reach out to a mental health professional immediately' : 'Consider speaking with a healthcare provider',
            'Regular relaxation techniques can help manage anxiety symptoms'
          ]
        })
      })

      const apiData = await response.json()

      if (!apiData.success) {
        setError(apiData.error || 'Failed to save assessment')
        return
      }

      // Store score change for display
      if (apiData.data?.scoreChange !== null && apiData.data?.scoreChange !== undefined) {
        setScoreChange(apiData.data.scoreChange)
      }

      setResults({
        totalScore,
        severity,
        isCrisis
      })
      setShowResults(true)
    } catch (err) {
      console.error('Assessment submission error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <SEOHead title={baseTitle} description={baseDescription} noindex nofollow />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to take assessments.</p>
            <Link href="/auth/login" className="btn-primary inline-block">
              Log In
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (showResults && results) {
    return (
      <>
        <SEOHead
          title="GAD-7 Results - Mental Wellness App"
          description="Review your GAD-7 assessment results and next-step recommendations in your secure Mental Wellness App account."
          noindex
          nofollow
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">GAD-7 Assessment Results</h1>

              <div className="space-y-6">
                {/* Score change indicator */}
                {scoreChange !== null && scoreChange !== 0 && (
                  <div className={`p-4 rounded-lg border-l-4 ${
                    scoreChange < 0
                      ? 'bg-green-50 border-green-500'
                      : 'bg-orange-50 border-orange-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      {scoreChange < 0 ? (
                        <>
                          <span className="text-2xl">📈</span>
                          <span className={`font-semibold ${scoreChange < 0 ? 'text-green-700' : 'text-orange-700'}`}>
                            Great progress! Your anxiety score improved by {Math.abs(scoreChange)} points since your last assessment.
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl">📉</span>
                          <span className="font-semibold text-orange-700">
                            Your anxiety score increased by {scoreChange} points. Consider reaching out for support.
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Your Score: {results.totalScore}/21</h3>
                  <p className="text-gray-700 capitalize">
                    Severity Level: <span className="font-semibold">{results.severity}</span>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Interpretation</h4>
                  <p className="text-blue-800">{getSeverityDescription(results.severity)}</p>
                </div>

                {results.isCrisis && (
                  <InternationalCrisisSupport variant="compact" />
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">GAD-7 Scoring Guide</h4>
                  <div className="text-green-800 text-sm space-y-1">
                    <p><strong>0-4:</strong> Minimal anxiety</p>
                    <p><strong>5-9:</strong> Mild anxiety</p>
                    <p><strong>10-14:</strong> Moderate anxiety</p>
                    <p><strong>15-21:</strong> Severe anxiety</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                  <p className="text-yellow-800 text-sm">
                    This assessment is for screening purposes only and is not a substitute for professional diagnosis.
                    Please consult with a qualified healthcare provider for proper evaluation and treatment.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Link href="/" className="btn-secondary">
                    Return to Dashboard
                  </Link>
                  <Link href="/assessment/phq9" className="btn-primary">
                    Take PHQ-9 (Depression)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title={baseTitle}
        description={baseDescription}
        noindex
        nofollow
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">GAD-7 Anxiety Assessment</h1>
              <p className="text-gray-600 mt-1">
                Over the last 2 weeks, how often have you been bothered by the following problems?
              </p>
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-therapy-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {GAD7_QUESTIONS[currentQuestion]}
                </h2>

                <div className="space-y-3">
                  {RESPONSE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        responses[currentQuestion] === option.value
                          ? 'border-therapy-500 bg-therapy-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option.value}
                        checked={responses[currentQuestion] === option.value}
                        onChange={() => handleResponse(currentQuestion, option.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="flex justify-between">
                <div>
                  {currentQuestion > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="btn-secondary"
                    >
                      Previous
                    </button>
                  )}
                </div>

                <div className="space-x-3">
                  <Link href="/" className="btn-secondary">
                    Cancel
                  </Link>

                  {currentQuestion < GAD7_QUESTIONS.length - 1 ? (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!isComplete() || loading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Submitting...' : 'Complete Assessment'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
