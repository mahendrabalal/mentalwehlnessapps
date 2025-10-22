type TimeRange = '7days' | '30days' | '90days'

interface SnapshotStats {
  totalAssessments: number
  avgMoodRating: number
  avgAnxietyLevel: number
  avgEnergyLevel: number
  avgSleepQuality: number
  avgStressLevel: number
  lastAssessmentDate: string | null
  currentStreak: number
}

interface SnapshotMoodEntry {
  mood_score: number
  created_at: string
}

interface WellnessSnapshotProps {
  stats: SnapshotStats | null
  latestMoodEntry?: SnapshotMoodEntry
  timeRange: TimeRange
  onTimeRangeChange: (value: TimeRange) => void
  moodTrend: 'up' | 'down' | 'stable'
}

const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '7days', label: '7 Days' },
  { value: '30days', label: '30 Days' },
  { value: '90days', label: '90 Days' },
]

function getTrendCopy(trend: 'up' | 'down' | 'stable'): { icon: string; copy: string; tone: string } {
  if (trend === 'up') return { icon: '📈', copy: 'On the rise', tone: 'text-emerald-600' }
  if (trend === 'down') return { icon: '📉', copy: 'Needs attention', tone: 'text-rose-600' }
  return { icon: '➖', copy: 'Holding steady', tone: 'text-slate-500' }
}

export function WellnessSnapshot({
  stats,
  latestMoodEntry,
  timeRange,
  onTimeRangeChange,
  moodTrend,
}: WellnessSnapshotProps) {
  const trend = getTrendCopy(moodTrend)
  const highlightCards = [
    {
      label: 'Current streak',
      value: stats ? `${stats.currentStreak} days` : '—',
      helper: 'Daily check-ins completed in a row.',
      icon: '🔥',
    },
    {
      label: 'Mood average',
      value: stats ? `${stats.avgMoodRating}/10` : '—',
      helper: trend.copy,
      icon: trend.icon,
      helperTone: trend.tone,
    },
    {
      label: 'Assessments',
      value: stats ? `${stats.totalAssessments}` : '—',
      helper: stats?.lastAssessmentDate
        ? `Last on ${new Date(stats.lastAssessmentDate).toLocaleDateString()}`
        : 'No recent assessments logged.',
      icon: '📋',
    },
    {
      label: 'Last mood',
      value: latestMoodEntry ? `${latestMoodEntry.mood_score}/10` : '—',
      helper: latestMoodEntry
        ? new Date(latestMoodEntry.created_at).toLocaleString()
        : 'Log a check-in to see history.',
      icon: '😊',
    },
  ]

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Wellness snapshot</h2>
          <p className="text-sm text-slate-500">
            Quick look at your momentum across the last selected time window.
          </p>
        </div>
        <div className="flex w-full gap-2 rounded-full bg-slate-100 p-1 sm:w-auto">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onTimeRangeChange(option.value)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                option.value === timeRange
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlightCards.map((card) => (
          <article
            key={card.label}
            className="rounded-xl border border-slate-100 bg-slate-50/40 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {card.label}
              </div>
              <div className="text-lg">{card.icon}</div>
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</div>
            <p
              className={`mt-1 text-sm ${
                card.helperTone ? card.helperTone : 'text-slate-500'
              }`}
            >
              {card.helper}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
