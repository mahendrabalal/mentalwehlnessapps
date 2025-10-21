import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CollapsibleSection } from './CollapsibleSection'

export interface MoodEntry {
  id: string
  mood_score: number
  created_at: string
}

export interface Assessment {
  id: string
  assessment_type: string
  score: number
  max_score: number
  level: string
  completed_at: string
}

export interface ProgressSummaryProps {
  moodEntries: MoodEntry[]
  assessments: Assessment[]
  currentStreak: number
  className?: string
}

export function ProgressSummaryCollapsible({
  moodEntries,
  assessments,
  currentStreak,
  className = '',
}: ProgressSummaryProps) {
  const [sparklineData, setSparklineData] = useState<number[]>([])
  const [recentAssessment, setRecentAssessment] = useState<Assessment | null>(null)

  useEffect(() => {
    // Generate 7-day mood sparkline
    if (moodEntries.length > 0) {
      const last7Days = moodEntries.slice(0, 7).reverse()
      const scores = last7Days.map((entry) => entry.mood_score)
      setSparklineData(scores)
    }

    // Get most recent assessment
    if (assessments.length > 0) {
      setRecentAssessment(assessments[0])
    }
  }, [moodEntries, assessments])

  const getSparklineVisualization = () => {
    if (sparklineData.length === 0) return '—'

    // Create simple text-based sparkline using blocks
    const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
    return sparklineData
      .map((score) => {
        const index = Math.min(7, Math.max(0, Math.floor((score / 10) * 8) - 1))
        return blocks[index]
      })
      .join('')
  }

  return (
    <CollapsibleSection
      id="progress-summary"
      title={`🔥 Your Streak: ${currentStreak} days`}
      icon="📈"
      summary="Click to see your progress details"
      defaultExpanded={false}
      className={className}
    >
      <div className="space-y-6">
        {/* 7-Day Mood Trend */}
        {sparklineData.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Last 7 Days</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{getSparklineVisualization()}</div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <span key={day}>{idx < sparklineData.length ? day : ''}</span>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Average Mood:</span>{' '}
                  {(
                    sparklineData.reduce((a, b) => a + b, 0) / sparklineData.length
                  ).toFixed(1)}
                  /10
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Assessment */}
        {recentAssessment && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Latest Assessment</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {recentAssessment.assessment_type.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  recentAssessment.level === 'minimal' ? 'bg-green-100 text-green-800' :
                  recentAssessment.level === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                  recentAssessment.level === 'moderate' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recentAssessment.level}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{recentAssessment.score}</span>/
                {recentAssessment.max_score}
              </p>
              <p className="text-xs text-gray-500">
                Taken {new Date(recentAssessment.completed_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* No assessment yet */}
        {recentAssessment === null && (
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-3">No assessment yet</p>
            <Link
              href="/assessment/phq9"
              className="inline-flex items-center gap-2 bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-therapy-500 focus:ring-offset-2"
            >
              Take Your First Assessment
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {/* View Full History Link */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/dashboard/history"
            className="inline-flex items-center gap-2 text-therapy-600 hover:text-therapy-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500 rounded px-2 py-1"
          >
            View Full History
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </CollapsibleSection>
  )
}

/**
 * Simple compact version of progress summary
 */
export function ProgressSummaryCompact({
  currentStreak,
  className = '',
}: {
  currentStreak: number
  className?: string
}) {
  return (
    <div className={`bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Current Streak</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            🔥 {currentStreak} days
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Keep it up!</p>
          <p className="text-2xl mt-2">💪</p>
        </div>
      </div>
    </div>
  )
}
