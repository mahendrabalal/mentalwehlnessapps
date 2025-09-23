// Utility functions for the mental wellness app

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function calculateMoodTrend(scores: number[]): 'improving' | 'declining' | 'stable' {
  if (scores.length < 2) return 'stable'

  const recent = scores.slice(-3)
  const earlier = scores.slice(-6, -3)

  if (recent.length === 0 || earlier.length === 0) return 'stable'

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length

  const threshold = 0.5

  if (recentAvg > earlierAvg + threshold) return 'improving'
  if (recentAvg < earlierAvg - threshold) return 'declining'
  return 'stable'
}