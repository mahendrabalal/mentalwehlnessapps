import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { AuthGuard } from '@/components/AuthGuard'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { AITherapyCompanion } from '@/components/AITherapyCompanion'
import { DailyWellnessBriefing } from '@/components/DailyWellnessBriefing'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { QuickAnxietyRelief } from '@/components/QuickAnxietyRelief'
import { BurnoutRiskIndicator } from '@/components/BurnoutRiskIndicator'
import { MindfulnessForBeginners } from '@/components/MindfulnessForBeginners'
import { EmotionalRegulationToolkit } from '@/components/EmotionalRegulationToolkit'
import { AffordableCareDirectory } from '@/components/AffordableCareDirectory'
import { MoodCheckInWidget } from '@/components/MoodCheckInWidget'
import { SmartRecommendation } from '@/components/SmartRecommendation'
import { ProgressSummaryCollapsible } from '@/components/ProgressSummaryCollapsible'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import type { User } from '@supabase/supabase-js'

interface MoodEntry {
  id: string
  mood_score: number
  anxiety_level: number
  energy_level: number
  sleep_quality: number
  stress_level: number
  notes: string | null
  created_at: string
}

interface Assessment {
  id: string
  assessment_type: string
  score: number
  max_score: number
  level: string
  severity_score: number | null
  completed_at: string
  score_change: number | null
  improvement_percentage: number | null
  is_baseline: boolean
  crisis_level: string | null
  previous_assessment_id: string | null
}

interface AssessmentTrend {
  user_id: string
  assessment_type: string
  total_assessments: number
  avg_score: number
  min_score: number
  max_score: number
  first_assessment_date: string
  last_assessment_date: string
  trend_direction: 'improving' | 'declining' | 'stable' | 'insufficient_data'
}

interface DashboardStats {
  totalAssessments: number
  avgMoodRating: number
  avgAnxietyLevel: number
  avgEnergyLevel: number
  avgSleepQuality: number
  avgStressLevel: number
  lastAssessmentDate: string | null
  currentStreak: number
}

function DashboardContent() {
  const { user, loading: authLoading } = useAuth()
  const { subscription, loading: subscriptionLoading, isPremium } = useSubscription()
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [assessmentTrends, setAssessmentTrends] = useState<Map<string, AssessmentTrend>>(new Map())
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (user && !authLoading) {
      fetchDashboardData()
    } else if (!authLoading) {
      // Guest user - show empty state but allow tool exploration
      setLoading(false)
    }
  }, [user, timeRange, authLoading])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Get user's session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) throw new Error('No session token available')

      // Fetch assessments from new API with auth header
      const assessmentResponse = await fetch('/api/assessments/history?limit=50&includeTrends=true', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!assessmentResponse.ok) {
        throw new Error('Failed to fetch assessment history')
      }

      const assessmentData = await assessmentResponse.json()

      if (assessmentData.success && assessmentData.data) {
        setAssessments(assessmentData.data.assessments || [])

        // Build trends map
        if (assessmentData.data.trends) {
          const trendsMap = new Map<string, AssessmentTrend>()
          assessmentData.data.trends.forEach((trend: AssessmentTrend) => {
            trendsMap.set(trend.assessment_type, trend)
          })
          setAssessmentTrends(trendsMap)
        }
      }

      // Fetch mood entries (unchanged)
      const daysAgo = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90
      const dateFilter = new Date()
      dateFilter.setDate(dateFilter.getDate() - daysAgo)

      const { data: moodData, error: moodError } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', dateFilter.toISOString())
        .order('created_at', { ascending: false })

      if (moodError) throw moodError

      setMoodEntries(moodData || [])

      // Calculate stats
      if (moodData && moodData.length > 0) {
        // Filter out entries with null/undefined values and calculate averages
        const validMoodEntries = moodData.filter(entry =>
          entry.mood_score != null &&
          entry.anxiety_level != null &&
          entry.energy_level != null &&
          entry.sleep_quality != null &&
          entry.stress_level != null
        )

        const avgMoodRating = validMoodEntries.length > 0
          ? validMoodEntries.reduce((sum, entry) => sum + (entry.mood_score || 0), 0) / validMoodEntries.length
          : 0
        const avgAnxietyLevel = validMoodEntries.length > 0
          ? validMoodEntries.reduce((sum, entry) => sum + (entry.anxiety_level || 0), 0) / validMoodEntries.length
          : 0
        const avgEnergyLevel = validMoodEntries.length > 0
          ? validMoodEntries.reduce((sum, entry) => sum + (entry.energy_level || 0), 0) / validMoodEntries.length
          : 0
        const avgSleepQuality = validMoodEntries.length > 0
          ? validMoodEntries.reduce((sum, entry) => sum + (entry.sleep_quality || 0), 0) / validMoodEntries.length
          : 0
        const avgStressLevel = validMoodEntries.length > 0
          ? validMoodEntries.reduce((sum, entry) => sum + (entry.stress_level || 0), 0) / validMoodEntries.length
          : 0

        // Calculate current streak (consecutive days with mood entries)
        const currentStreak = calculateStreakDays(moodData)

        setStats({
          totalAssessments: assessmentData.data?.assessments?.length || 0,
          avgMoodRating: Math.round(avgMoodRating * 10) / 10,
          avgAnxietyLevel: Math.round(avgAnxietyLevel * 10) / 10,
          avgEnergyLevel: Math.round(avgEnergyLevel * 10) / 10,
          avgSleepQuality: Math.round(avgSleepQuality * 10) / 10,
          avgStressLevel: Math.round(avgStressLevel * 10) / 10,
          lastAssessmentDate: assessmentData.data?.assessments && assessmentData.data.assessments.length > 0 ? assessmentData.data.assessments[0].completed_at : null,
          currentStreak
        })
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const calculateStreakDays = (entries: MoodEntry[]): number => {
    if (!entries.length) return 0

    const sortedEntries = [...entries].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.created_at)
      entryDate.setHours(0, 0, 0, 0)

      const dayDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dayDiff === streak) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (dayDiff === streak + 1 && streak === 0) {
        // Allow for missing today if it's the first check
        streak = 1
        currentDate = new Date(entryDate)
      } else {
        break
      }
    }

    return streak
  }

  const getMoodTrendDirection = (entries: MoodEntry[]): 'up' | 'down' | 'stable' => {
    if (entries.length < 2) return 'stable'

    const recent = entries.slice(0, Math.min(7, Math.floor(entries.length / 2)))
    const older = entries.slice(Math.floor(entries.length / 2))

    const recentAvg = recent.reduce((sum, entry) => sum + (entry.mood_score || 0), 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + (entry.mood_score || 0), 0) / older.length

    const diff = recentAvg - olderAvg
    if (diff > 0.3) return 'up'
    if (diff < -0.3) return 'down'
    return 'stable'
  }


  const getSeverityColor = (severity: string | null): string => {
    if (!severity) return 'bg-gray-100 text-gray-800'
    switch (severity.toLowerCase()) {
      case 'minimal': return 'bg-green-100 text-green-800'
      case 'mild': return 'bg-yellow-100 text-yellow-800'
      case 'moderate': return 'bg-orange-100 text-orange-800'
      case 'moderately_severe': return 'bg-red-100 text-red-800'
      case 'severe': return 'bg-red-200 text-red-900'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIndicator = (assessment: Assessment): { icon: string; color: string; text: string } => {
    if (assessment.is_baseline) {
      return { icon: '📌', color: 'text-blue-600', text: 'Baseline' }
    }

    if (assessment.score_change === null || assessment.score_change === undefined) {
      return { icon: '→', color: 'text-gray-600', text: 'No change' }
    }

    if (assessment.score_change > 0) {
      return { icon: '📈', color: 'text-green-600', text: `Improved by ${assessment.score_change}` }
    } else if (assessment.score_change < 0) {
      return { icon: '📉', color: 'text-red-600', text: `Declined by ${Math.abs(assessment.score_change)}` }
    }

    return { icon: '→', color: 'text-gray-600', text: 'Stable' }
  }

  const getAssessmentTypeName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'phq9': 'PHQ-9 Depression',
      'gad7': 'GAD-7 Anxiety',
      'burnout': 'Burnout Risk',
      'stigma': 'Self-Stigma',
      'social_connection': 'Social Connection'
    }
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ')
  }

  const getCrisisLevelColor = (level: string | null): string => {
    if (!level) return ''
    switch (level.toLowerCase()) {
      case 'severe':
      case 'imminent':
        return 'text-red-600 font-semibold'
      case 'moderate':
        return 'text-orange-600'
      case 'mild':
        return 'text-yellow-600'
      default:
        return ''
    }
  }

  if (authLoading || loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const moodTrend = getMoodTrendDirection(moodEntries)

  return (
    <>
      <SEOHead
        title="Dashboard - Mental Wellness App"
        description="Your private mental wellness dashboard with personalized insights, analytics, and crisis planning tools."
        noindex
        nofollow
      />
      <Navbar />

      {/* Guest User Banner - Industry Best Practice: Try Before Signup */}
      {!user && (
        <div className="sticky top-0 z-40 bg-gradient-to-r from-therapy-600 to-blue-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-white font-semibold text-lg">
                  Try our mental wellness tools - no signup required!
                </h3>
                <p className="text-therapy-50 text-sm">
                  Create a free account to save your progress, track mood over time, and unlock personalized insights
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link
                  href="/auth/signup"
                  className="bg-white text-therapy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md whitespace-nowrap"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/auth/login"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-therapy-600 transition-colors whitespace-nowrap"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{user ? 'Your' : 'Explore Our'} Wellness Dashboard</h1>
            <p className="text-gray-600 mt-2">{user ? 'Track your progress and discover insights' : 'Try our tools and see how we can help'}</p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* TIER 1: Progressive Disclosure - Primary Experience */}
          {user ? (
            <>
              {/* Personalized Greeting */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user.email?.split('@')[0]}! 👋
                </h2>
                <p className="text-gray-600 mt-1 text-sm">Check in with yourself right now</p>
              </div>

              {/* Mood Check-In Widget */}
              <MoodCheckInWidget user={user} className="mb-6" />

              {/* Smart Contextual Recommendation */}
              {!loading && assessments.length > 0 && (
                <SmartRecommendation
                  assessments={assessments}
                  userFirstName={user.email?.split('@')[0]}
                  className="mb-6"
                />
              )}

              {/* Collapsed Progress Summary */}
              {!loading && stats && (
                <ProgressSummaryCollapsible
                  moodEntries={moodEntries}
                  assessments={assessments}
                  currentStreak={stats.currentStreak}
                  className="mb-8"
                />
              )}

              {/* Quick Access to Tools - Compact Version */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
                <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">Quick Access</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Link
                    href="/assessment/phq9"
                    className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group min-h-[100px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500"
                    aria-label="Take depression assessment"
                  >
                    <span className="text-3xl mb-1">📊</span>
                    <span className="text-xs font-semibold text-gray-900 text-center">Assess</span>
                  </Link>
                  <Link
                    href="/tools/anxiety-relief"
                    className="flex flex-col items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group min-h-[100px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500"
                    aria-label="Anxiety relief techniques"
                  >
                    <span className="text-3xl mb-1">😌</span>
                    <span className="text-xs font-semibold text-gray-900 text-center">Relief</span>
                  </Link>
                  <Link
                    href="/tools/mindfulness"
                    className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group min-h-[100px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500"
                    aria-label="Mindfulness meditation"
                  >
                    <span className="text-3xl mb-1">🧘</span>
                    <span className="text-xs font-semibold text-gray-900 text-center">Meditate</span>
                  </Link>
                  <Link
                    href="/crisis/support"
                    className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group min-h-[100px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500"
                    aria-label="Crisis support resources"
                  >
                    <span className="text-3xl mb-1">🆘</span>
                    <span className="text-xs font-semibold text-gray-900 text-center">Crisis</span>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-b-2 border-gray-200 my-8" />
            </>
          ) : null}

          {/* Daily Wellness Briefing (Optional - can be hidden by default for authenticated users) */}
          {!user && (
            <DailyWellnessBriefing
              userMoodScore={stats?.avgMoodRating}
              recentAssessment={assessments[0] ? {
                type: assessments[0].assessment_type,
                score: assessments[0].score,
                severity: assessments[0].level
              } : undefined}
              moodEntries={moodEntries}
              isPremium={isPremium}
            />
          )}

          {/* TIER 2: Additional Tools & Resources - PROGRESSIVE DISCLOSURE (COLLAPSED BY DEFAULT) */}
          {user && (
            <CollapsibleSection
              id="explore-more-tools"
              title="Explore More Tools"
              icon="🔍"
              summary="Anxiety relief, burnout resources, mindfulness, and more"
              defaultExpanded={false}
              className="mb-8"
            >
              {/* Pain-Point Focused Tools */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Anxiety Relief */}
                  <QuickAnxietyRelief />

                  {/* Burnout Risk Indicator */}
                  <BurnoutRiskIndicator />
                </div>

                {/* Mindfulness for Beginners - Full width */}
                <MindfulnessForBeginners className="mb-0" />

                {/* Emotional Regulation & Care Directory */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EmotionalRegulationToolkit />
                  <AffordableCareDirectory />
                </div>
              </div>
            </CollapsibleSection>
          )}

          {/* Time Range Selector - Only show for authenticated users */}
          {user && (
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
                {[
                  { key: '7days', label: '7 Days' },
                  { key: '30days', label: '30 Days' },
                  { key: '90days', label: '90 Days' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setTimeRange(option.key as typeof timeRange)}
                    className={`flex-1 sm:flex-none px-6 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] ${
                      timeRange === option.key
                        ? 'bg-white text-therapy-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guest User CTA */}
          {!user && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-8 mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Want to track your progress?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Create a free account to log moods, track patterns over time, get personalized insights, and save your progress.
                All features are 100% free, forever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  Sign Up Free - No Credit Card
                </Link>
                <Link
                  href="/auth/login"
                  className="border-2 border-therapy-600 text-therapy-600 px-8 py-3 rounded-lg font-semibold hover:bg-therapy-50 transition-colors"
                >
                  Already Have an Account?
                </Link>
              </div>
            </div>
          )}

          {stats && user ? (
            <>
              {/* Assessment Trends Overview */}
              {assessmentTrends.size > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-8 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assessment Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Array.from(assessmentTrends.entries()).map(([type, trend]) => {
                      const trendEmoji = trend.trend_direction === 'improving' ? '📈'
                        : trend.trend_direction === 'declining' ? '📉'
                        : trend.trend_direction === 'stable' ? '→'
                        : '❓'

                      const trendColor = trend.trend_direction === 'improving' ? 'text-green-600'
                        : trend.trend_direction === 'declining' ? 'text-red-600'
                        : trend.trend_direction === 'stable' ? 'text-gray-600'
                        : 'text-gray-400'

                      return (
                        <div key={type} className="bg-white rounded-lg p-4 border-l-4 border-therapy-500">
                          <p className="text-sm font-medium text-gray-600 truncate">
                            {getAssessmentTypeName(type)}
                          </p>
                          <div className="flex items-baseline justify-between mt-2">
                            <div>
                              <p className="text-2xl font-bold text-gray-900">{trend.avg_score.toFixed(1)}</p>
                              <p className="text-xs text-gray-500 mt-1">avg score</p>
                            </div>
                            <div className={`text-2xl ${trendColor}`}>
                              {trendEmoji}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-3">
                            {trend.total_assessments} assessment{trend.total_assessments !== 1 ? 's' : ''}
                          </p>
                          <p className={`text-xs font-semibold mt-1 capitalize ${trendColor}`}>
                            {trend.trend_direction === 'insufficient_data' ? 'Need more data' : trend.trend_direction}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TIER 3: Detailed Metrics (Hidden by default in progressive disclosure) */}
              <details className="mb-8">
                <summary className="cursor-pointer flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 mb-4">
                  <span>📊 Detailed Stats & Metrics</span>
                  <span className="text-sm text-gray-500">(Click to expand)</span>
                </summary>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Current Streak</p>
                      <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.currentStreak} days</p>
                    </div>
                    <div className="text-xl sm:text-2xl">🔥</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Mood</p>
                      <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stats.avgMoodRating}/10</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        {moodTrend === 'up' && <span className="text-green-500">↑ Improving</span>}
                        {moodTrend === 'down' && <span className="text-red-500">↓ Declining</span>}
                        {moodTrend === 'stable' && <span className="text-gray-500">→ Stable</span>}
                      </p>
                    </div>
                    <div className="text-2xl">😊</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Avg Energy</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.avgEnergyLevel}/10</p>
                    </div>
                    <div className="text-2xl">⚡</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Assessments</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalAssessments}</p>
                    </div>
                    <div className="text-2xl">📋</div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Mood Rating', value: stats.avgMoodRating, color: 'bg-blue-500', max: 10 },
                      { label: 'Anxiety Level', value: stats.avgAnxietyLevel, color: 'bg-orange-500', max: 10 },
                      { label: 'Energy Level', value: stats.avgEnergyLevel, color: 'bg-green-500', max: 10 },
                      { label: 'Sleep Quality', value: stats.avgSleepQuality, color: 'bg-purple-500', max: 10 },
                      { label: 'Stress Level', value: stats.avgStressLevel, color: 'bg-red-500', max: 10 }
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{metric.label}</span>
                          <span className="font-medium">{metric.value}/{metric.max}</span>
                        </div>
                        <div className="mt-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${metric.color}`}
                            style={{ width: `${(metric.value / metric.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
                  {assessments.length > 0 ? (
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {assessments.slice(0, 5).map((assessment) => {
                        const trend = getTrendIndicator(assessment)
                        return (
                          <div key={assessment.id} className="border-l-4 border-therapy-500 pl-4 pb-4 border-b border-gray-100 last:border-b-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {getAssessmentTypeName(assessment.assessment_type)}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-gray-600">
                                    Score: {assessment.score}/{assessment.max_score}
                                  </span>
                                  {assessment.level && (
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(assessment.level)}`}>
                                      {assessment.level}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  {new Date(assessment.completed_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg ${trend.color}`}>
                                  {trend.icon}
                                </div>
                                <p className={`text-xs ${trend.color} whitespace-nowrap`}>
                                  {trend.text}
                                </p>
                                {assessment.crisis_level && assessment.crisis_level !== 'none' && (
                                  <p className={`text-xs mt-1 ${getCrisisLevelColor(assessment.crisis_level)}`}>
                                    ⚠️ {assessment.crisis_level}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No assessments completed yet</p>
                      <Link href="/assessment/phq9" className="btn-primary mt-4 inline-block">
                        Take Your First Assessment
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Mood Entries */}
              {moodEntries.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Check-ins</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Mood</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Anxiety</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Energy</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Sleep</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {moodEntries.slice(0, 10).map((entry) => (
                          <tr key={entry.id} className="border-b border-gray-100">
                            <td className="py-2 text-sm text-gray-900">
                              {new Date(entry.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-2 text-sm">{entry.mood_score || 'N/A'}/10</td>
                            <td className="py-2 text-sm">{entry.anxiety_level || 'N/A'}/10</td>
                            <td className="py-2 text-sm">{entry.energy_level || 'N/A'}/10</td>
                            <td className="py-2 text-sm">{entry.sleep_quality || 'N/A'}/10</td>
                            <td className="py-2 text-sm text-gray-600 max-w-xs truncate">
                              {entry.notes || 'No notes'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              </details>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Tracking Your Wellness</h3>
              <p className="text-gray-600 mb-6">
                Complete your first mood check-in or assessment to see your progress here.
              </p>
              <div className="space-x-4">
                <Link href="/mood/check-in" className="btn-primary">
                  Daily Check-in
                </Link>
                <Link href="/assessment/phq9" className="btn-secondary">
                  Take Assessment
                </Link>
              </div>
            </div>
          )}

          {/* All Features Free Banner */}
          <div className="rounded-lg shadow-lg p-8 mb-8 text-white bg-gradient-to-r from-green-500 to-green-600">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  ✨ All Features Unlocked - 100% Free
                </h2>
                <p className="text-green-100">
                  You have full access to all wellness features at no cost. Mental health support should be accessible to everyone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <h3 className="font-semibold mb-2">24/7 AI Companion</h3>
                  <p className="text-sm text-green-100">Unlimited personalized wellness support anytime you need it</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold mb-2">Smart Analytics</h3>
                  <p className="text-sm text-green-100">Advanced mood insights and trend predictions</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">🎵</div>
                  <h3 className="font-semibold mb-2">Premium Content</h3>
                  <p className="text-sm text-green-100">Unlimited guided meditations and sleep stories</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-lg p-4 inline-block">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-lg font-semibold text-green-600">All Features Active</p>
                      <p className="text-xs text-gray-500">No subscriptions • No hidden costs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-green-100">
                <p>Disclaimer: AI wellness features provide general support and are not a substitute for professional therapy or medical advice.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/mood/check-in" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900 mb-1">Daily Check-in</h3>
              <p className="text-sm text-gray-600">Track your current mood and wellness</p>
            </Link>

            <Link href="/assessment/phq9" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-semibold text-gray-900 mb-1">Take Assessment</h3>
              <p className="text-sm text-gray-600">Complete PHQ-9 or GAD-7 screening</p>
            </Link>

            <Link href="/safety/plan" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 mb-1">Safety Plan</h3>
              <p className="text-sm text-gray-600">Create your personal safety plan</p>
            </Link>

            <Link href="/crisis/support" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🆘</div>
              <h3 className="font-semibold text-gray-900 mb-1">Crisis Support</h3>
              <p className="text-sm text-gray-600">Get immediate help and resources</p>
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <LegalDisclaimer variant="footer" />

        {/* AI Therapy Companion - Fixed Position */}
        <AITherapyCompanion
          userMoodScore={stats?.avgMoodRating}
          recentAssessment={assessments[0] ? {
            type: assessments[0].assessment_type,
            score: assessments[0].score,
            severity: assessments[0].level
          } : undefined}
          moodEntries={moodEntries}
          isPremium={isPremium}
        />
      </div>
    </>
  )
}

export default function Dashboard() {
  // Allow guest access - no AuthGuard to follow industry best practice
  return <DashboardContent />
}
