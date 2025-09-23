import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
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
  total_score: number
  severity_level: string
  crisis_risk_level: string
  completed_at: string
  interpretation: string
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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user, timeRange])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(!session?.user)
    } catch (error) {
      console.error('Error checking user:', error)
      setLoading(false)
    }
  }

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)

      const daysAgo = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90
      const dateFilter = new Date()
      dateFilter.setDate(dateFilter.getDate() - daysAgo)

      // Fetch mood entries
      const { data: moodData, error: moodError } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', dateFilter.toISOString())
        .order('created_at', { ascending: false })

      if (moodError) throw moodError

      // Fetch assessments
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', dateFilter.toISOString())
        .order('completed_at', { ascending: false })

      if (assessmentError) throw assessmentError

      setMoodEntries(moodData || [])
      setAssessments(assessmentData || [])

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
          totalAssessments: assessmentData?.length || 0,
          avgMoodRating: Math.round(avgMoodRating * 10) / 10,
          avgAnxietyLevel: Math.round(avgAnxietyLevel * 10) / 10,
          avgEnergyLevel: Math.round(avgEnergyLevel * 10) / 10,
          avgSleepQuality: Math.round(avgSleepQuality * 10) / 10,
          avgStressLevel: Math.round(avgStressLevel * 10) / 10,
          lastAssessmentDate: assessmentData && assessmentData.length > 0 ? assessmentData[0].completed_at : null,
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

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'minimal': return 'bg-green-100 text-green-800'
      case 'mild': return 'bg-yellow-100 text-yellow-800'
      case 'moderate': return 'bg-orange-100 text-orange-800'
      case 'moderately_severe': return 'bg-red-100 text-red-800'
      case 'severe': return 'bg-red-200 text-red-900'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your dashboard.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
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
      <Head>
        <title>Dashboard - Mental Wellness App</title>
        <meta name="description" content="Your mental wellness progress and insights" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Wellness Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your progress and discover insights</p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Time Range Selector */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              {[
                { key: '7days', label: '7 Days' },
                { key: '30days', label: '30 Days' },
                { key: '90days', label: '90 Days' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setTimeRange(option.key as typeof timeRange)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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

          {stats ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Current Streak</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.currentStreak} days</p>
                    </div>
                    <div className="text-2xl">🔥</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Avg Mood</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.avgMoodRating}/10</p>
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
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {assessments.slice(0, 5).map((assessment) => (
                        <div key={assessment.id} className="border-l-4 border-therapy-500 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900 capitalize">
                                {assessment.assessment_type.replace(/([A-Z])/g, ' $1')} Assessment
                              </p>
                              <p className="text-sm text-gray-600">
                                Score: {assessment.total_score}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(assessment.completed_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getSeverityColor(assessment.severity_level)}`}>
                              {assessment.severity_level}
                            </span>
                          </div>
                        </div>
                      ))}
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
      </div>
    </>
  )
}