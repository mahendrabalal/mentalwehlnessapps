import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'
import { useToolTracking } from '@/hooks/useAnalytics'

export default function DepressionScreeningTool() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const { startTool, completeTool, shareTool } = useToolTracking('Depression Screening', 'mental_health_assessment')

  // PHQ-9 based depression screening questions
  const questions = [
    "Little interest or pleasure in doing activities",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself—or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed, or the opposite—being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way"
  ]

  const responseOptions = [
    { value: 0, text: "Not at all", color: "bg-green-50 text-green-700 border-green-200" },
    { value: 1, text: "Several days", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { value: 2, text: "More than half the days", color: "bg-orange-50 text-orange-700 border-orange-200" },
    { value: 3, text: "Nearly every day", color: "bg-red-50 text-red-700 border-red-200" }
  ]

  const handleAnswer = (value: number) => {
    if (currentQuestion === 0) {
      startTool()
    }

    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate final score
      const finalScore = newAnswers.reduce((sum, answer) => sum + answer, 0)
      setScore(finalScore)
      setShowResults(true)
      completeTool(finalScore)
    }
  }

  const getSeverityLevel = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", description: "Your responses suggest minimal depressive symptoms." }
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", description: "Your responses suggest mild depressive symptoms." }
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", description: "Your responses suggest moderate depressive symptoms." }
    if (score <= 19) return { level: "Moderately Severe", color: "text-red-600", description: "Your responses suggest moderately severe depressive symptoms." }
    return { level: "Severe", color: "text-red-700", description: "Your responses suggest severe depressive symptoms." }
  }

  const getRecommendations = (score: number) => {
    if (score <= 4) {
      return [
        "Continue monitoring your mental health",
        "Practice self-care and stress management",
        "Maintain healthy sleep and exercise habits",
        "Reach out to friends and family for support"
      ]
    }
    if (score <= 9) {
      return [
        "Consider talking to a mental health professional",
        "Practice regular exercise and healthy eating",
        "Establish consistent sleep routines",
        "Try mindfulness and relaxation techniques",
        "Consider joining a support group"
      ]
    }
    if (score <= 14) {
      return [
        "Recommendation: Consult with a mental health professional",
        "Consider therapy or counseling",
        "Practice stress reduction techniques daily",
        "Reach out to your support system regularly",
        "Consider medication evaluation with a healthcare provider"
      ]
    }
    return [
      "Urgent: Seek professional mental health care immediately",
      "Contact a mental health provider this week",
      "Consider both therapy and medication options",
      "Lean heavily on your support system",
      "If having thoughts of self-harm, contact crisis services immediately"
    ]
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const handleShare = () => {
    shareTool('copy')
    navigator.clipboard.writeText('I just completed a free depression screening test - check your mental health at: ' + window.location.href)
  }

  const severity = getSeverityLevel(score)
  const recommendations = getRecommendations(score)

  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Free Depression Screening Test | PHQ-9 Assessment Online',
      description: 'Take this free depression screening test based on PHQ-9 to assess your mental health. Get instant results and personalized recommendations for depression symptoms and treatment options.',
      slug: '/tools/depression-screening',
    }),
    medicalEntityStructuredData({
      name: 'Depression',
      description: 'Depression is a common but serious mood disorder that causes severe symptoms affecting how you feel, think, and handle daily activities.',
      alternateName: ['Major Depressive Disorder', 'Clinical Depression', 'MDD'],
      cause: ['Genetic factors', 'Biological factors', 'Environmental factors', 'Psychological factors'],
      symptom: ['Persistent sad mood', 'Loss of interest', 'Changes in appetite', 'Sleep disturbances', 'Fatigue', 'Feelings of worthlessness', 'Difficulty concentrating', 'Thoughts of death'],
      riskFactor: ['Family history', 'Trauma', 'Stress', 'Chronic illness', 'Substance abuse', 'Certain medications'],
      treatment: ['Psychotherapy', 'Medication', 'Lifestyle changes', 'Support groups', 'Exercise', 'Mindfulness'],
      typicalTest: ['PHQ-9', 'Beck Depression Inventory', 'Hamilton Depression Rating Scale'],
      medicalSpecialty: 'Psychiatry'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Michael Chen',
        credentials: 'M.D., Psychiatrist',
        expertise: 'Depression treatment, mood disorders, psychopharmacology'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'American Psychiatric Association'
    })
  ]

  return (
    <>
      <SEOHead
        title="Free Depression Screening Test | PHQ-9 Assessment Online - Mental Wellness"
        description="Take this free depression screening test based on the PHQ-9 to assess your mental health. Get instant results, identify depression symptoms, and receive personalized treatment recommendations. 2-minute assessment."
        keywords={[
          "free depression test",
          "depression screening online",
          "PHQ-9 depression test",
          "depression assessment tool",
          "mental health screening",
          "depression symptoms checker",
          "clinical depression test",
          "major depressive disorder test",
          "online depression quiz",
          "depression self-assessment",
          "mood disorder screening",
          "depression severity test",
          "free mental health assessment",
          "depression questionnaire",
          "mental wellness check"
        ]}
        ogImage="/og-depression-tools.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Depression Screening" />

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
                  <span className="text-gray-500">Depression Screening</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Depression Screening Test
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Take this 2-minute depression screening test based on the PHQ-9 to assess your mental health. Get instant results and personalized recommendations for managing depression symptoms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ 100% Free PHQ-9 Test
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Clinically Validated
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Instant Results
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based
              </span>
            </div>
          </div>

          {/* Medical Review & Credentials */}
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
                  This depression screening is based on the PHQ-9 (Patient Health Questionnaire-9), the gold standard for depression assessment reviewed by Dr. Michael Chen, M.D., Psychiatrist with 12+ years in mood disorder treatment.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">M.D. Psychiatry</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">APA Guidelines</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Evidence-Based</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Important: If you're having thoughts of self-harm</h3>
                <p className="text-sm text-red-800 mb-2">
                  If you're having thoughts of hurting yourself, please seek help immediately. This is a medical emergency.
                </p>
                <Link href="/crisis-support" className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-900 underline">
                  Get Immediate Help →
                </Link>
              </div>
            </div>
          </div>

          {!showResults ? (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Over the last 2 weeks, how often have you been bothered by:
                </h2>
                <p className="text-lg text-gray-700">
                  {questions[currentQuestion]}?
                </p>
              </div>

              {/* Response Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {responseOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-4 rounded-lg border-2 ${option.color} hover:opacity-90 transition-opacity duration-200 text-left`}
                  >
                    <div className="font-medium">{option.text}</div>
                  </button>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Instructions:</strong> For each question, select the response that best describes how often you've been bothered by the problem over the last 2 weeks.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              {/* Results Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Depression Screening Results
                </h2>
                <div className="inline-block">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    Score: {score}/27
                  </div>
                  <div className={`text-xl font-semibold ${severity.color}`}>
                    {severity.level} Depression
                  </div>
                </div>
              </div>

              {/* Severity Description */}
              <div className={`p-4 rounded-lg mb-8 ${severity.color.replace('text', 'bg').replace('-600', '-50')}`}>
                <p className="font-medium mb-2">
                  What this means:
                </p>
                <p>
                  {severity.description}
                </p>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recommended Next Steps:
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Help Notice */}
              {score >= 10 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    Professional Help Recommended
                  </h3>
                  <p className="text-orange-800">
                    Based on your responses, we recommend consulting with a mental health professional. A therapist, counselor, or psychiatrist can provide proper evaluation and treatment options.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Retake Test
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Share Results
                </button>
                <Link
                  href="/tools/free-mental-health-tools"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Try Other Tools
                </Link>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the PHQ-9 depression test?</h3>
                <p className="text-gray-600">
                  The PHQ-9 (Patient Health Questionnaire-9) is a clinically validated tool used by healthcare providers to screen for depression. It consists of 9 questions based on DSM-5 criteria for major depressive disorder.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is this depression screening?</h3>
                <p className="text-gray-600">
                  The PHQ-9 has a sensitivity of 88% and specificity of 88% for detecting major depression. While highly accurate, this screening tool is not a substitute for professional diagnosis.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What do the different severity levels mean?</h3>
                <p className="text-gray-600">
                  Scores are categorized as: 0-4 (minimal), 5-9 (mild), 10-14 (moderate), 15-19 (moderately severe), and 20-27 (severe). Higher scores indicate more severe depressive symptoms and stronger recommendations for professional treatment.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I seek professional help?</h3>
                <p className="text-gray-600">
                  If your score is 10 or higher, or if you're having thoughts of self-harm, seek professional help immediately. Even with lower scores, if symptoms persist or interfere with daily life, consider consulting a mental health professional.
                </p>
              </div>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate anxiety techniques</p>
              </Link>
              <Link
                href="/tools/burnout-assessment"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Test</h3>
                <p className="text-sm text-gray-600">Check your burnout level</p>
              </Link>
              <Link
                href="/tools/mindfulness"
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">🧘</span>
                <h3 className="font-semibold text-gray-900 mb-1">Mindfulness</h3>
                <p className="text-sm text-gray-600">Meditation exercises</p>
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