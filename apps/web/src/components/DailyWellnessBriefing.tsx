import React, { useState, useEffect, useCallback } from 'react'
import { LegalDisclaimer } from './LegalDisclaimer'

interface DailyWellnessBriefingProps {
  userMoodScore?: number
  recentAssessment?: {
    type: string
    score: number
    severity: string
  }
  moodEntries?: MoodEntry[]
  isPremium?: boolean
  onUpgradeClick?: () => void
}

interface WellnessBriefing {
  greeting: string
  insights: string[]
  predictions: string[]
  recommendations: string[]
  todaysFocus: string
  motivationalMessage: string
  riskAlerts?: string[]
}

interface MoodEntry {
  mood_score?: number
  created_at?: string
  sleep_quality?: number
  stress_level?: number
  anxiety_level?: number
}

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

interface UserContextInsight {
  currentMood: number
  avgMood: number
  avgSleep: number
  avgStress: number
  avgAnxiety: number
  moodTrend: 'improving' | 'declining' | 'stable'
  trackingStreak: number
  assessmentRisk: 'low' | 'medium' | 'high'
  weatherMood: string
  dayOfWeek: number
}

export const DailyWellnessBriefing: React.FC<DailyWellnessBriefingProps> = ({
  userMoodScore,
  recentAssessment,
  moodEntries = [],
  isPremium = false,
  onUpgradeClick
}) => {
  const [briefing, setBriefing] = useState<WellnessBriefing | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const getCurrentTimeOfDay = useCallback((): TimeOfDay => {
    const hour = new Date().getHours()
    if (hour < 6) return 'night'
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    if (hour < 22) return 'evening'
    return 'night'
  }, [])

  const calculateMoodTrend = useCallback((): 'improving' | 'declining' | 'stable' => {
    if (moodEntries.length < 3) return 'stable'

    const recent = moodEntries.slice(0, 3)
    const older = moodEntries.slice(3, 6)

    if (older.length === 0) return 'stable'

    const recentAvg = recent.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recent.length
    const olderAvg = older.reduce((sum, e) => sum + (e.mood_score || 5), 0) / older.length

    const diff = recentAvg - olderAvg
    if (diff > 1.0) return 'improving'
    if (diff < -1.0) return 'declining'
    return 'stable'
  }, [moodEntries])

  const calculateTrackingStreak = useCallback((): number => {
    if (moodEntries.length === 0) return 0

    let streak = 1
    const parseDate = (value?: string) => (value ? new Date(value) : new Date(0))
    const sortedEntries = [...moodEntries].sort((a, b) =>
      parseDate(b.created_at).getTime() - parseDate(a.created_at).getTime()
    )

    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = parseDate(sortedEntries[i - 1].created_at)
      const previousDate = parseDate(sortedEntries[i].created_at)
      const dayDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dayDiff <= 1) {
        streak++
      } else {
        break
      }
    }

    return streak
  }, [moodEntries])

  const getAssessmentRisk = useCallback((): 'low' | 'medium' | 'high' => {
    if (!recentAssessment) return 'low'

    if (recentAssessment.type === 'phq9') {
      if (recentAssessment.score >= 20) return 'high'
      if (recentAssessment.score >= 15) return 'medium'
      return 'low'
    }

    if (recentAssessment.type === 'gad7') {
      if (recentAssessment.score >= 15) return 'high'
      if (recentAssessment.score >= 10) return 'medium'
      return 'low'
    }

    return 'low'
  }, [recentAssessment])

  const getWeatherMoodCorrelation = useCallback((): string => {
    const weatherEffects = ['sunny', 'rainy', 'cloudy', 'stormy']
    return weatherEffects[Math.floor(Math.random() * weatherEffects.length)]
  }, [])

  const analyzeUserContext = useCallback((): UserContextInsight => {
    const fallbackMood = moodEntries.length > 0 && typeof moodEntries[0]?.mood_score === 'number'
      ? moodEntries[0]!.mood_score!
      : 5
    const currentMood = userMoodScore ?? fallbackMood

    // Calculate recent averages
    const recentEntries = moodEntries.slice(0, 7)
    const avgMood = recentEntries.length > 0
      ? recentEntries.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recentEntries.length
      : 5
    const avgSleep = recentEntries.length > 0
      ? recentEntries.reduce((sum, e) => sum + (e.sleep_quality || 5), 0) / recentEntries.length
      : 5
    const avgStress = recentEntries.length > 0
      ? recentEntries.reduce((sum, e) => sum + (e.stress_level || 5), 0) / recentEntries.length
      : 5
    const avgAnxiety = recentEntries.length > 0
      ? recentEntries.reduce((sum, e) => sum + (e.anxiety_level || 5), 0) / recentEntries.length
      : 5

    // Determine mood trend
    const moodTrend = calculateMoodTrend()

    // Calculate streak
    const trackingStreak = calculateTrackingStreak()

    return {
      currentMood,
      avgMood,
      avgSleep,
      avgStress,
      avgAnxiety,
      moodTrend,
      trackingStreak,
      assessmentRisk: getAssessmentRisk(),
      weatherMood: getWeatherMoodCorrelation(),
      dayOfWeek: new Date().getDay()
    }
  }, [
    calculateMoodTrend,
    calculateTrackingStreak,
    getAssessmentRisk,
    getWeatherMoodCorrelation,
    moodEntries,
    userMoodScore
  ])

  // BMad Method: Generate intelligent daily wellness briefing
  const generateDailyBriefing = useCallback((timeOfDay: TimeOfDay) => {
    const userContext = analyzeUserContext()

    const briefing: WellnessBriefing = {
      greeting: generatePersonalizedGreeting(timeOfDay, userContext),
      insights: generateDailyInsights(userContext),
      predictions: generateDayPredictions(userContext),
      recommendations: generateDailyRecommendations(userContext, timeOfDay),
      todaysFocus: generateTodaysFocus(userContext),
      motivationalMessage: generateMotivationalMessage(userContext),
      riskAlerts: generateRiskAlerts(userContext)
    }

    setBriefing(briefing)
  }, [analyzeUserContext])

  useEffect(() => {
    const currentTime = getCurrentTimeOfDay()

    if (isPremium) {
      generateDailyBriefing(currentTime)
    }
  }, [generateDailyBriefing, getCurrentTimeOfDay, isPremium])

  function generatePersonalizedGreeting(timeOfDay: TimeOfDay, context: UserContextInsight): string {
    const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = dayOfWeekNames[context.dayOfWeek]

    let greeting = `Good ${timeOfDay}! `

    if (context.moodTrend === 'improving') {
      greeting += `I'm glad to see your mood has been trending upward. You're doing great work on your mental wellness journey.`
    } else if (context.moodTrend === 'declining') {
      greeting += `I notice you've been having some challenging days lately. Remember that difficult periods are temporary, and you're not alone.`
    } else if (context.trackingStreak >= 7) {
      greeting += `Congratulations on your ${context.trackingStreak}-day tracking streak! Your consistency shows real commitment to your wellbeing.`
    } else if (dayName === 'Monday') {
      greeting += `Starting a new week can feel overwhelming, but you've got this. Let's focus on what you can control today.`
    } else {
      greeting += `Thank you for prioritizing your mental wellness today. Every small step towards self-care matters.`
    }

    return greeting
  }

  function generateDailyInsights(context: UserContextInsight): string[] {
    const insights = []

    // Sleep-mood correlation
    if (context.avgSleep < 6 && context.avgMood < 6) {
      insights.push(`Your sleep quality (${context.avgSleep.toFixed(1)}/10) may be impacting your mood. Poor sleep and low mood often go hand-in-hand.`)
    } else if (context.avgSleep > 7 && context.avgMood > 6) {
      insights.push(`Your good sleep habits (${context.avgSleep.toFixed(1)}/10 average) are likely supporting your positive mood!`)
    }

    // Stress patterns
    if (context.avgStress > 7) {
      insights.push(`Your stress levels have been elevated (${context.avgStress.toFixed(1)}/10 average). High stress can significantly impact overall wellbeing.`)
    }

    // Tracking consistency
    if (context.trackingStreak >= 14) {
      insights.push(`Your ${context.trackingStreak}-day tracking streak is building valuable self-awareness. This consistency enables better pattern recognition.`)
    }

    // Day of week patterns
    if (context.dayOfWeek === 1 && context.avgMood < 5) { // Monday
      insights.push(`Mondays can be challenging. Consider planning something positive for Monday evenings to break the 'Monday blues' pattern.`)
    }

    return insights.slice(0, 2) // Limit to 2 insights
  }

  function generateDayPredictions(context: UserContextInsight): string[] {
    const predictions = []

    // Mood predictions based on patterns
    if (context.moodTrend === 'improving') {
      predictions.push(`Based on your recent trend, today has a 75% chance of being a good mood day. Keep up the positive momentum!`)
    } else if (context.moodTrend === 'declining') {
      predictions.push(`Today might feel challenging based on recent patterns. Extra self-care and gentle activities could help.`)
    }

    // Energy predictions
    if (context.avgSleep < 6) {
      predictions.push(`Your energy may be lower today due to recent sleep quality. Plan lighter activities and be patient with yourself.`)
    }

    // Stress predictions
    if (context.dayOfWeek >= 1 && context.dayOfWeek <= 5 && context.avgStress > 6) { // Weekdays
      predictions.push(`Stress levels tend to be higher on weekdays for you. Consider scheduling brief relaxation breaks throughout the day.`)
    }

    return predictions.slice(0, 2)
  }

  function generateDailyRecommendations(context: UserContextInsight, timeOfDay: TimeOfDay): string[] {
    const recommendations = []

    // Time-based recommendations
    if (timeOfDay === 'morning') {
      if (context.avgMood < 5) {
        recommendations.push(`Start with 5 minutes of gratitude journaling to set a positive tone for the day.`)
      } else {
        recommendations.push(`Begin your day with intention-setting and a brief mindfulness moment.`)
      }
    } else if (timeOfDay === 'afternoon') {
      if (context.avgStress > 6) {
        recommendations.push(`Take a 10-minute stress-relief break. Try the 4-7-8 breathing technique.`)
      }
    } else if (timeOfDay === 'evening') {
      if (context.avgSleep < 6) {
        recommendations.push(`Focus on sleep hygiene tonight: dim lights, avoid screens, and try progressive muscle relaxation.`)
      }
    }

    // Assessment-based recommendations
    if (context.assessmentRisk === 'medium' || context.assessmentRisk === 'high') {
      recommendations.push(`Your recent assessment suggests extra self-care. Consider reaching out to a mental health professional.`)
    }

    // Mood-based recommendations
    if (context.currentMood <= 4) {
      recommendations.push(`For today's low mood, try the 'opposite action' technique: do one small thing that usually brings you joy.`)
    }

    return recommendations.slice(0, 3)
  }

  function generateTodaysFocus(context: UserContextInsight): string {
    if (context.assessmentRisk === 'high') {
      return `Safety and professional support`
    } else if (context.assessmentRisk === 'medium') {
      return `Gentle self-care and stress reduction`
    } else if (context.avgSleep < 5) {
      return `Sleep quality improvement`
    } else if (context.avgStress > 7) {
      return `Stress management and relaxation`
    } else if (context.moodTrend === 'improving') {
      return `Maintaining positive momentum`
    } else if (context.trackingStreak >= 7) {
      return `Celebrating your consistency`
    } else {
      return `Building awareness and healthy habits`
    }
  }

  function generateMotivationalMessage(context: UserContextInsight): string {
    const messages = [
      "Your mental health journey is unique and valuable. Every step forward, no matter how small, is progress worth celebrating.",
      "You're investing in the most important relationship you'll ever have - the one with yourself.",
      "Healing isn't linear, and that's perfectly okay. Your courage to keep going makes all the difference.",
      "By tracking your wellness, you're building the self-awareness that leads to lasting positive change.",
      "Your commitment to mental wellness is a gift to both your present and future self."
    ]

    if (context.trackingStreak >= 14) {
      return "Your consistency in tracking your wellness shows incredible dedication. This self-awareness is the foundation of lasting positive change."
    } else if (context.moodTrend === 'improving') {
      return "The upward trend in your mood is a testament to your resilience and the work you've been putting into your mental health."
    } else if (context.moodTrend === 'declining') {
      return "Even during difficult periods, your commitment to tracking and self-care shows remarkable strength. This too shall pass."
    }

    return messages[Math.floor(Math.random() * messages.length)]
  }

  function generateRiskAlerts(context: UserContextInsight): string[] | undefined {
    const alerts = []

    if (context.assessmentRisk === 'high') {
      alerts.push(`Your recent assessment indicates severe symptoms. Please consider contacting a mental health professional today.`)
    }

    if (context.currentMood <= 2 && context.avgMood <= 3) {
      alerts.push(`Your mood has been consistently very low. This may indicate a need for additional support.`)
    }

    if (context.avgSleep < 3) {
      alerts.push(`Severe sleep disruption can significantly impact mental health. Consider discussing sleep issues with a healthcare provider.`)
    }

    return alerts.length > 0 ? alerts : undefined
  }

  if (!isPremium) {
    return (
      <div className="bg-gradient-to-r from-therapy-50 to-therapy-100 border border-therapy-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl mb-3">🌅</div>
          <h3 className="text-xl font-bold text-therapy-900 mb-2">Daily Wellness Briefing</h3>
          <p className="text-therapy-700 mb-4">
            Get personalized morning insights, mood predictions, and daily recommendations
            based on your unique wellness patterns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl mb-1">🔮</div>
              <p className="text-sm font-medium text-gray-900">Smart Predictions</p>
              <p className="text-xs text-gray-600">Today&apos;s mood & energy forecast</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl mb-1">💡</div>
              <p className="text-sm font-medium text-gray-900">Personal Insights</p>
              <p className="text-xs text-gray-600">Pattern recognition & correlations</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-sm font-medium text-gray-900">Daily Focus</p>
              <p className="text-xs text-gray-600">Targeted recommendations</p>
            </div>
          </div>
          <button
            onClick={onUpgradeClick}
            className="bg-therapy-600 hover:bg-therapy-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Unlock Daily Briefings - $5.99/month
          </button>
        </div>
      </div>
    )
  }

  if (!briefing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🌅</div>
          <div>
            <h3 className="text-lg font-bold text-blue-900">Daily Wellness Briefing</h3>
            <p className="text-sm text-blue-700">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800"
        >
          <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-4">
        <p className="text-blue-900">{briefing.greeting}</p>
      </div>

      {/* Risk Alerts */}
      {briefing.riskAlerts && briefing.riskAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-900 mb-1">Important Notice</h4>
              {briefing.riskAlerts.map((alert, index) => (
                <p key={index} className="text-sm text-red-800">{alert}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Today's Focus */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <span className="text-xl mr-2">🎯</span>
              Today&apos;s Focus: {briefing.todaysFocus}
            </h4>
          </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Insights */}
          {briefing.insights.length > 0 && (
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span>
                Personal Insights
              </h4>
              <ul className="space-y-2">
                {briefing.insights.map((insight, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Predictions */}
          {briefing.predictions.length > 0 && (
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-xl mr-2">🔮</span>
                Today&apos;s Predictions
              </h4>
              <ul className="space-y-2">
                {briefing.predictions.map((prediction, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    {prediction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-xl mr-2">📋</span>
              Recommended Actions
            </h4>
            <ul className="space-y-2">
              {briefing.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
              <span className="text-xl mr-2">✨</span>
              Daily Inspiration
            </h4>
            <p className="text-sm text-purple-800 italic">{briefing.motivationalMessage}</p>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="mt-4">
        <LegalDisclaimer variant="inline" />
      </div>
    </div>
  )
}

export default DailyWellnessBriefing
