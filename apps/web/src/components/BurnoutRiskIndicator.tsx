import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

interface BurnoutRiskIndicatorProps {
  className?: string
}

interface MoodEntry {
  mood_score: number
  stress_level: number
  sleep_quality: number
  created_at: string
}

type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export function BurnoutRiskIndicator({ className = '' }: BurnoutRiskIndicatorProps) {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('low')
  const [riskScore, setRiskScore] = useState(0)
  const [insights, setInsights] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    calculateBurnoutRisk()
  }, [])

  const calculateBurnoutRisk = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      // Get last 7 days of mood entries
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: recentEntries, error } = await supabase
        .from('mood_entries')
        .select('mood_score, stress_level, sleep_quality, created_at')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(7)

      if (error) {
        console.error('Error fetching mood entries:', error)
        setLoading(false)
        return
      }

      if (!recentEntries || recentEntries.length === 0) {
        setRiskLevel('low')
        setRiskScore(0)
        setInsights(['Track your mood daily to monitor burnout risk'])
        setLoading(false)
        return
      }

      // Calculate burnout risk factors
      const avgMood = recentEntries.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recentEntries.length
      const avgStress = recentEntries.reduce((sum, e) => sum + (e.stress_level || 5), 0) / recentEntries.length
      const avgSleep = recentEntries.reduce((sum, e) => sum + (e.sleep_quality || 5), 0) / recentEntries.length

      // Calculate trend (comparing recent 3 days vs previous 4 days)
      const recent3 = recentEntries.slice(0, 3)
      const previous4 = recentEntries.slice(3, 7)

      const recent3AvgMood = recent3.length > 0
        ? recent3.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recent3.length
        : avgMood

      const previous4AvgMood = previous4.length > 0
        ? previous4.reduce((sum, e) => sum + (e.mood_score || 5), 0) / previous4.length
        : avgMood

      const moodTrend = recent3AvgMood - previous4AvgMood // Negative = declining

      // Burnout risk scoring (0-100)
      let score = 0
      const generatedInsights: string[] = []

      // Low mood contributes to burnout (weight: 30 points)
      if (avgMood < 4) {
        score += 30
        generatedInsights.push('Your mood has been consistently low this week')
      } else if (avgMood < 5) {
        score += 15
      }

      // High stress is a major burnout factor (weight: 35 points)
      if (avgStress > 7) {
        score += 35
        generatedInsights.push('Your stress levels have been very high')
      } else if (avgStress > 6) {
        score += 20
        generatedInsights.push('Your stress levels are elevated')
      }

      // Poor sleep compounds burnout (weight: 20 points)
      if (avgSleep < 4) {
        score += 20
        generatedInsights.push('Poor sleep quality is affecting your recovery')
      } else if (avgSleep < 5) {
        score += 10
      }

      // Declining mood trend is a warning sign (weight: 15 points)
      if (moodTrend < -1) {
        score += 15
        generatedInsights.push('Your mood has been declining over the past week')
      }

      // Determine risk level
      let level: RiskLevel = 'low'
      if (score >= 70) {
        level = 'critical'
      } else if (score >= 50) {
        level = 'high'
      } else if (score >= 30) {
        level = 'medium'
      }

      // Add positive insights if low risk
      if (level === 'low') {
        generatedInsights.push('Your stress and mood levels are in a healthy range')
        if (avgSleep > 7) {
          generatedInsights.push('Good sleep quality is supporting your wellbeing')
        }
      }

      setRiskScore(score)
      setRiskLevel(level)
      setInsights(generatedInsights.length > 0 ? generatedInsights : ['Continue monitoring your wellbeing'])
      setLoading(false)
    } catch (error) {
      console.error('Error calculating burnout risk:', error)
      setLoading(false)
    }
  }

  const getRiskConfig = (level: RiskLevel) => {
    const configs = {
      low: {
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconBg: 'bg-green-100',
        icon: '✅',
        label: 'Low Risk',
        message: 'Your burnout risk is currently low. Keep up the good self-care!',
        actions: ['Continue daily check-ins', 'Maintain healthy boundaries', 'Keep up good sleep habits']
      },
      medium: {
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-800',
        iconBg: 'bg-yellow-100',
        icon: '⚠️',
        label: 'Medium Risk',
        message: 'You\'re showing some signs of burnout. Time to prioritize self-care.',
        actions: ['Set firm boundaries this week', 'Schedule time for rest', 'Talk to someone about your stress', 'Review your workload']
      },
      high: {
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-800',
        iconBg: 'bg-orange-100',
        icon: '🔥',
        label: 'High Risk',
        message: 'You\'re at high risk for burnout. Immediate action needed.',
        actions: ['Take a break as soon as possible', 'Say no to non-essential commitments', 'Prioritize sleep above all else', 'Consider talking to a therapist', 'Use sick days if needed']
      },
      critical: {
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-800',
        iconBg: 'bg-red-100',
        icon: '🚨',
        label: 'Critical Risk',
        message: 'You\'re experiencing severe burnout symptoms. Please take immediate action.',
        actions: ['Take time off work if possible', 'Speak with a doctor or therapist immediately', 'Reduce all non-essential activities', 'Reach out for support - you don\'t have to do this alone', 'Focus solely on rest and recovery']
      }
    }
    return configs[level]
  }

  const config = getRiskConfig(riskLevel)

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Burnout Risk Level</h2>
          <p className="text-gray-600 text-sm">Based on your last 7 days of data</p>
        </div>
        <Link
          href="/support/emotional-exhaustion-burnout"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Learn more →
        </Link>
      </div>

      {/* Risk Level Display */}
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`${config.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
              {config.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{config.label}</h3>
              <p className="text-sm text-gray-600">Risk Score: {riskScore}/100</p>
            </div>
          </div>
        </div>

        {/* Risk Score Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              riskLevel === 'low' ? 'bg-green-500' :
              riskLevel === 'medium' ? 'bg-yellow-500' :
              riskLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(riskScore, 100)}%` }}
          ></div>
        </div>

        <p className={`${config.textColor} font-medium mb-4`}>
          {config.message}
        </p>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="bg-white rounded-lg p-4 space-y-2">
            <h4 className="font-bold text-gray-900 text-sm mb-2">Key Insights:</h4>
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Actions */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 mb-3">Recommended Actions:</h4>
        <div className="space-y-2">
          {config.actions.map((action, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className={config.textColor}>✓</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Resources */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 text-sm mb-3">Burnout Recovery Resources:</h4>
        <div className="space-y-2">
          <Link
            href="/support/emotional-exhaustion-burnout"
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            → Evidence-based burnout recovery strategies
          </Link>
          <Link
            href="/dashboard"
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            → Create a safety plan for high-stress periods
          </Link>
          {(riskLevel === 'high' || riskLevel === 'critical') && (
            <Link
              href="/support/affordable-mental-health-care"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Find affordable therapy options
            </Link>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      {(riskLevel === 'high' || riskLevel === 'critical') && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-sm text-red-800">
            <strong>Important:</strong> If you're experiencing severe burnout, please consult a mental health professional.
            Burnout is a serious condition that often requires professional support to fully recover.
          </p>
        </div>
      )}
    </div>
  )
}
