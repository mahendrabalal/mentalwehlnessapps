/**
 * RecommendationEngine Service
 *
 * Provides context-aware recommendations based on:
 * - Latest assessment scores
 * - Risk levels (high/moderate/low)
 * - User persona
 * - Time patterns
 */

export interface Assessment {
  id: string
  assessment_type: string
  score: number
  max_score: number
  level: string
  severity_score: number | null
  completed_at: string
  crisis_level: string | null
}

export type RiskLevel = 'high' | 'moderate' | 'low' | 'insufficient_data'

export interface RiskAssessment {
  level: RiskLevel
  phqScore?: number
  gadScore?: number
  burnoutScore?: number
  crisisLevel?: string | null
}

export interface Recommendation {
  id: string
  title: string
  description: string
  icon: string
  action: {
    label: string
    href: string
  }
  urgency: 'critical' | 'high' | 'normal'
  color: string
  emoji: string
}

/**
 * Assess overall risk level based on latest assessments
 */
export function assessRiskLevel(assessments: Assessment[]): RiskAssessment {
  if (!assessments || assessments.length === 0) {
    return { level: 'insufficient_data' }
  }

  // Get latest assessment of each type (within 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const recentAssessments = assessments.filter(
    (a) => new Date(a.completed_at) >= sevenDaysAgo
  )

  if (recentAssessments.length === 0) {
    return { level: 'insufficient_data' }
  }

  let phqScore: number | undefined
  let gadScore: number | undefined
  let burnoutScore: number | undefined
  let highestCrisisLevel: string | null = null

  recentAssessments.forEach((assessment) => {
    if (assessment.crisis_level && assessment.crisis_level !== 'none') {
      const crisisRank: Record<string, number> = {
        imminent: 3,
        severe: 2,
        moderate: 1,
        mild: 0,
        none: -1,
      }
      const currentRank = crisisRank[highestCrisisLevel?.toLowerCase() || 'none'] || -1
      const newRank = crisisRank[assessment.crisis_level.toLowerCase()] || -1

      if (newRank > currentRank) {
        highestCrisisLevel = assessment.crisis_level
      }
    }

    if (assessment.assessment_type === 'phq9') {
      phqScore = assessment.score
    } else if (assessment.assessment_type === 'gad7') {
      gadScore = assessment.score
    } else if (assessment.assessment_type === 'burnout') {
      burnoutScore = assessment.score
    }
  })

  // Determine risk level
  let riskLevel: RiskLevel = 'low'

  // HIGH RISK: Severe scores or crisis indicators
  if (highestCrisisLevel === 'imminent' || highestCrisisLevel === 'severe') {
    riskLevel = 'high'
  } else if (
    (phqScore !== undefined && phqScore >= 20) ||
    (gadScore !== undefined && gadScore >= 15) ||
    (burnoutScore !== undefined && burnoutScore >= 50)
  ) {
    riskLevel = 'high'
  }
  // MODERATE RISK: Elevated scores
  else if (
    (phqScore !== undefined && phqScore >= 10 && phqScore < 20) ||
    (gadScore !== undefined && gadScore >= 8 && gadScore < 15) ||
    (burnoutScore !== undefined && burnoutScore >= 30 && burnoutScore < 50)
  ) {
    riskLevel = 'moderate'
  }
  // LOW RISK: Healthy range
  else {
    riskLevel = 'low'
  }

  return {
    level: riskLevel,
    phqScore,
    gadScore,
    burnoutScore,
    crisisLevel: highestCrisisLevel,
  }
}

/**
 * Generate contextual recommendation based on risk level and assessments
 */
export function getRecommendation(
  riskAssessment: RiskAssessment,
  userFirstName?: string
): Recommendation {
  const { level, phqScore, gadScore, burnoutScore, crisisLevel } = riskAssessment

  // HIGH RISK: Crisis Resources
  if (level === 'high') {
    return {
      id: 'crisis-support',
      title: '🚨 Crisis Support Available',
      description:
        crisisLevel === 'imminent'
          ? 'You may be in immediate danger. Please reach out for help right now.'
          : "You're experiencing significant distress. Professional support is available 24/7.",
      icon: '🆘',
      action: {
        label: 'Access Crisis Resources',
        href: '/crisis/support',
      },
      urgency: 'critical',
      color: 'from-red-500 to-red-600',
      emoji: '🚨',
    }
  }

  // MODERATE RISK: Condition-specific support
  if (level === 'moderate') {
    // High anxiety (GAD-7 ≥ 8)
    if (gadScore !== undefined && gadScore >= 8) {
      return {
        id: 'anxiety-support',
        title: '⚠️ Your Anxiety Needs Attention',
        description: `Your anxiety level is elevated (${gadScore}/21). Let's work through this together with proven techniques.`,
        icon: '😰',
        action: {
          label: 'Try Anxiety Relief Exercises',
          href: '/tools/anxiety-relief',
        },
        urgency: 'high',
        color: 'from-orange-500 to-orange-600',
        emoji: '😰',
      }
    }

    // High depression (PHQ-9 ≥ 10)
    if (phqScore !== undefined && phqScore >= 10) {
      return {
        id: 'depression-support',
        title: '💙 Managing Your Mood',
        description: `Your mood has been lower than usual (${phqScore}/27). Let's explore some supportive resources.`,
        icon: '💙',
        action: {
          label: 'Mood Support Tools',
          href: '/tools/mood-support',
        },
        urgency: 'high',
        color: 'from-blue-500 to-blue-600',
        emoji: '💙',
      }
    }

    // High burnout
    if (burnoutScore !== undefined && burnoutScore >= 30) {
      return {
        id: 'burnout-support',
        title: '🔥 Burnout Risk Detected',
        description: `You're showing signs of burnout (${burnoutScore}%). Recovery starts with rest and self-care.`,
        icon: '🔥',
        action: {
          label: 'Burnout Recovery Plan',
          href: '/tools/burnout-recovery',
        },
        urgency: 'high',
        color: 'from-yellow-500 to-yellow-600',
        emoji: '🔥',
      }
    }

    // Fallback for moderate
    return {
      id: 'moderate-support',
      title: '⚠️ You Could Use Some Support',
      description: "Your recent assessment shows room for improvement. Let's explore what might help.",
      icon: '💭',
      action: {
        label: 'Browse Tools',
        href: '/tools',
      },
      urgency: 'high',
      color: 'from-amber-500 to-amber-600',
      emoji: '⚠️',
    }
  }

  // LOW RISK: Maintenance & Prevention
  return {
    id: 'maintenance',
    title: `💪 Keep Up the Good Work${userFirstName ? `, ${userFirstName}` : ''}!`,
    description: 'Your mental wellness is in a good place. Keep building healthy habits.',
    icon: '💚',
    action: {
      label: 'Daily Mindfulness Practice',
      href: '/tools/mindfulness',
    },
    urgency: 'normal',
    color: 'from-green-500 to-green-600',
    emoji: '💚',
  }
}

/**
 * Get recommendation card styling based on urgency
 */
export function getRecommendationStyles(urgency: 'critical' | 'high' | 'normal') {
  switch (urgency) {
    case 'critical':
      return {
        bgClass: 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300',
        textClass: 'text-red-900',
        accentClass: 'text-red-600',
      }
    case 'high':
      return {
        bgClass: 'bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200',
        textClass: 'text-orange-900',
        accentClass: 'text-orange-600',
      }
    default:
      return {
        bgClass: 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200',
        textClass: 'text-green-900',
        accentClass: 'text-green-600',
      }
  }
}

/**
 * Determine if user needs immediate attention
 */
export function requiresImmediateAttention(riskAssessment: RiskAssessment): boolean {
  return riskAssessment.level === 'high' && riskAssessment.crisisLevel === 'imminent'
}

/**
 * Get suggested time to retake assessment
 */
export function getReassessmentSchedule(
  lastAssessmentDate: string | null,
  riskLevel: RiskLevel
): { daysUntilNext: number; message: string } {
  if (!lastAssessmentDate) {
    return { daysUntilNext: 0, message: 'Take your first assessment now' }
  }

  const lastDate = new Date(lastAssessmentDate)
  const today = new Date()
  const daysSinceLast = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Schedule based on risk level
  const scheduleMap: Record<RiskLevel, number> = {
    high: 2, // Every 2 days for high risk
    moderate: 7, // Weekly for moderate
    low: 14, // Every 2 weeks for low
    insufficient_data: 0, // Immediate
  }

  const targetDays = scheduleMap[riskLevel]
  const daysRemaining = Math.max(0, targetDays - daysSinceLast)

  if (daysRemaining === 0) {
    return { daysUntilNext: 0, message: 'Time for a check-up' }
  }

  return {
    daysUntilNext: daysRemaining,
    message: `Next check-up in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`,
  }
}
