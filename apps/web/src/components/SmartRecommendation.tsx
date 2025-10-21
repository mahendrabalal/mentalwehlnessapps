import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  assessRiskLevel,
  getRecommendation,
  getRecommendationStyles,
  requiresImmediateAttention,
  type Assessment,
  type Recommendation,
} from '@/services/recommendationEngine'

export interface SmartRecommendationProps {
  assessments: Assessment[]
  userFirstName?: string
  className?: string
}

export function SmartRecommendation({
  assessments,
  userFirstName,
  className = '',
}: SmartRecommendationProps) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Calculate risk and get recommendation
    const riskAssessment = assessRiskLevel(assessments)
    const rec = getRecommendation(riskAssessment, userFirstName)
    setRecommendation(rec)
    setLoading(false)
  }, [assessments, userFirstName])

  if (loading || !recommendation) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 mb-8 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse space-y-3 w-full">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  const styles = getRecommendationStyles(recommendation.urgency)
  const isImmediate = requiresImmediateAttention(
    assessRiskLevel(assessments)
  )

  return (
    <div
      className={`${styles.bgClass} rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`Recommendation: ${recommendation.title}`}
    >
      {/* Pulse animation for critical alerts */}
      {isImmediate && (
        <div className="absolute inset-0 rounded-xl animate-pulse bg-gradient-to-r from-red-400/20 to-transparent pointer-events-none" />
      )}

      <div className="relative space-y-4">
        {/* Header with icon and title */}
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0 pt-1">{recommendation.emoji}</div>
          <div className="flex-1">
            <h3 className={`text-xl sm:text-2xl font-bold ${styles.textClass} leading-tight`}>
              {recommendation.title}
            </h3>
          </div>

          {/* Urgency badge */}
          {recommendation.urgency === 'critical' && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                URGENT
              </span>
            </div>
          )}
          {recommendation.urgency === 'high' && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⚠️ Important
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className={`${styles.textClass} text-base leading-relaxed`}>
          {recommendation.description}
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={recommendation.action.href}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              recommendation.urgency === 'critical'
                ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl'
                : recommendation.urgency === 'high'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500 shadow-md hover:shadow-lg'
                  : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-md hover:shadow-lg'
            }`}
            aria-label={`${recommendation.action.label}: ${recommendation.title}`}
          >
            {recommendation.action.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Additional context for crisis situations */}
        {recommendation.urgency === 'critical' && (
          <div className="mt-4 pt-4 border-t-2 border-red-300">
            <p className="text-sm text-red-800 font-medium">
              💙 You're not alone. Help is available 24/7.
            </p>
            <div className="flex gap-2 mt-3">
              <Link
                href="/crisis/support"
                className="flex-1 text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Crisis Resources
              </Link>
              <Link
                href="/safety/plan"
                className="flex-1 text-center px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Safety Plan
              </Link>
            </div>
          </div>
        )}

        {/* Information for high risk */}
        {recommendation.urgency === 'high' && (
          <div className="mt-4 pt-4 border-t border-orange-300">
            <p className="text-xs text-orange-700">
              ℹ️ If you're in immediate danger, call emergency services or visit your nearest
              emergency room.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
