/**
 * TypeScript type definitions for Assessment Features
 * - Assessment History & Progress Tracking
 * - Retake Reminders & Notification Preferences
 * - A/B Testing Framework
 */

// ============================================================================
// Assessment History Types
// ============================================================================

export interface AssessmentHistory {
  id: string
  userId: string
  toolName: string
  assessmentType: string
  assessmentVersion: string
  score: number
  maxScore: number
  percentage: number
  level?: string
  severityScore?: number
  assessmentResults: Record<string, any>
  recommendations?: string[]
  questionResponses?: Record<string, any>
  completedAt: string
  durationSeconds?: number
  deviceType?: 'mobile' | 'tablet' | 'desktop'
  previousAssessmentId?: string
  scoreChange?: number
  improvementPercentage?: number
  isBaseline: boolean
  flaggedForReview: boolean
  crisisLevel: 'none' | 'mild' | 'moderate' | 'severe' | 'imminent'
  providerNotified: boolean
  createdAt: string
  updatedAt: string
}

export interface AssessmentTrend {
  userId: string
  assessmentType: string
  totalAssessments: number
  avgScore: number
  minScore: number
  maxScore: number
  scoreStddev: number
  firstAssessmentDate: string
  lastAssessmentDate: string
  trendDirection: 'improving' | 'declining' | 'stable' | 'insufficient_data'
}

export interface SaveAssessmentRequest {
  toolName: string
  assessmentType: string
  score: number
  maxScore: number
  level?: string
  severityScore?: number
  assessmentResults: {
    score: number
    maxScore: number
    level?: string
    [key: string]: any
  }
  recommendations?: string[]
  questionResponses?: Record<string, any>
  durationSeconds?: number
  deviceType?: 'mobile' | 'tablet' | 'desktop'
}

export interface SaveAssessmentResponse {
  success: boolean
  message: string
  data?: {
    id: string
    score: number
    scoreChange?: number
    isBaseline: boolean
    previousAssessmentId?: string
  }
  error?: string
}

export interface AssessmentHistoryResponse {
  success: boolean
  data?: {
    assessments: AssessmentHistory[]
    trends: AssessmentTrend | AssessmentTrend[]
    totalCount: number
  }
  message?: string
  error?: string
}

// ============================================================================
// Reminder Preferences Types
// ============================================================================

export type ReminderFrequency = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'custom'

export interface ReminderPreference {
  id: string
  userId: string
  assessmentType: string
  enabled: boolean
  frequency: ReminderFrequency
  customIntervalDays?: number
  emailEnabled: boolean
  smsEnabled: boolean
  pushEnabled: boolean
  inAppEnabled: boolean
  reminderEmail?: string
  reminderPhone?: string
  preferredTimeOfDay: string // HH:MM:SS format
  timezone: string
  nextReminderDate?: string
  lastRemindedAt?: string
  totalRemindersSent: number
  totalRemindersOpened: number
  totalRemindersActedOn: number
  openRate: number
  autoAdjustFrequency: boolean
  quietHoursStart: string
  quietHoursEnd: string
  pauseUntil?: string
  createdAt: string
  updatedAt: string
}

export interface ReminderQueue {
  id: string
  userId: string
  preferenceId: string
  assessmentType: string
  scheduledFor: string
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed' | 'cancelled'
  channel: 'email' | 'sms' | 'push' | 'in_app'
  sentAt?: string
  deliveredAt?: string
  openedAt?: string
  clickedAt?: string
  failedAt?: string
  failureReason?: string
  subject?: string
  messageBody?: string
  ctaUrl?: string
  externalMessageId?: string
  userAgent?: string
  ipAddress?: string
  variantId?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateReminderPreferenceRequest {
  assessmentType: string
  enabled?: boolean
  frequency?: ReminderFrequency
  customIntervalDays?: number
  emailEnabled?: boolean
  smsEnabled?: boolean
  pushEnabled?: boolean
  inAppEnabled?: boolean
  reminderEmail?: string
  reminderPhone?: string
  preferredTimeOfDay?: string
  timezone?: string
  pauseUntil?: string
}

export interface ReminderPreferenceResponse {
  success: boolean
  data?: ReminderPreference | ReminderPreference[]
  message?: string
  error?: string
}

// ============================================================================
// A/B Testing Types
// ============================================================================

export type ExperimentStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived'
export type ExperimentType = 'ab_test' | 'multivariate' | 'multi_armed_bandit'
export type EventType = 'impression' | 'interaction' | 'conversion' | 'custom'
export type AssignmentMethod = 'random' | 'adaptive' | 'sticky' | 'forced'

export interface ABTestExperiment {
  id: string
  name: string
  description?: string
  hypothesis?: string
  status: ExperimentStatus
  type: ExperimentType
  targetMetric: string
  pageUrlPattern?: string
  assessmentType?: string
  userSegment?: Record<string, any>
  trafficAllocationPercentage: number
  startDate?: string
  endDate?: string
  startedAt?: string
  completedAt?: string
  requiredSampleSize: number
  confidenceLevel: number
  minimumDetectableEffect: number
  enableAdaptiveAllocation: boolean
  explorationRate: number
  winnerVariantId?: string
  isStatisticallySignificant: boolean
  primaryMetricImprovement?: number
  createdBy?: string
  createdAt: string
  updatedAt: string
}

export interface ABTestVariant {
  id: string
  experimentId: string
  name: string
  description?: string
  isControl: boolean
  trafficWeight: number
  variantConfig: VariantConfig
  totalImpressions: number
  totalInteractions: number
  totalConversions: number
  conversionRate: number
  interactionRate: number
  confidenceIntervalLower?: number
  confidenceIntervalUpper?: number
  pValue?: number
  createdAt: string
  updatedAt: string
}

export interface VariantConfig {
  ctaText?: string
  ctaColor?: string
  buttonSize?: 'small' | 'medium' | 'large'
  headline?: string
  subheadline?: string
  showSocialProof?: boolean
  urgencyMessage?: string
  formFields?: string[]
  position?: 'inline' | 'modal' | 'sidebar' | 'banner'
  triggerTiming?: 'immediate' | 'on_completion' | 'on_exit_intent' | 'timed'
  [key: string]: any // Allow custom fields
}

export interface ABTestAssignment {
  id: string
  experimentId: string
  variantId: string
  userId?: string
  guestIdentifier?: string
  sessionId?: string
  assignedAt: string
  assignmentMethod: AssignmentMethod
  userAgent?: string
  deviceType?: string
  ipAddress?: string
}

export interface ABTestEvent {
  id: string
  experimentId: string
  variantId: string
  assignmentId?: string
  userId?: string
  guestIdentifier?: string
  eventType: EventType
  eventName?: string
  eventData?: Record<string, any>
  pageUrl?: string
  referrer?: string
  assessmentType?: string
  timestamp: string
  timeOnPageSeconds?: number
  userAgent?: string
  deviceType?: string
  browser?: string
  ipAddress?: string
  conversionValue?: number
  conversionMetadata?: Record<string, any>
}

export interface AssignVariantRequest {
  experimentName: string
  guestIdentifier?: string
  sessionId?: string
}

export interface AssignVariantResponse {
  success: boolean
  data?: {
    experimentId: string
    variantId: string
    variantConfig: VariantConfig | null
    isNewAssignment: boolean
  }
  message?: string
  error?: string
}

export interface TrackEventRequest {
  experimentId: string
  variantId: string
  eventType: EventType
  eventName?: string
  guestIdentifier?: string
  eventData?: Record<string, any>
  conversionValue?: number
  conversionMetadata?: Record<string, any>
}

export interface TrackEventResponse {
  success: boolean
  data?: {
    eventId: string
    tracked: boolean
  }
  message?: string
  error?: string
}

export interface ExperimentSnapshot {
  id: string
  experimentId: string
  snapshotDate: string
  variantsData: Array<{
    variantId: string
    variantName: string
    impressions: number
    interactions: number
    conversions: number
    conversionRate: number
  }>
  experimentConfig: Record<string, any>
  totalParticipants: number
  totalConversions: number
  overallConversionRate: number
  createdAt: string
}

export interface ExperimentResults {
  experimentName: string
  status: ExperimentStatus
  variants: Array<{
    variantId: string
    variantName: string
    isControl: boolean
    conversionRate: number
    pValue?: number
    isSignificant: boolean
  }>
  winner?: {
    variantId: string
    variantName: string
    improvement: number
  }
}

// ============================================================================
// Utility Types
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface AssessmentHistoryParams extends PaginationParams {
  assessmentType?: string
  includeTrends?: boolean
}

// ============================================================================
// Client Helper Types
// ============================================================================

export interface AssessmentFeatures {
  // Assessment History
  saveAssessment: (request: SaveAssessmentRequest) => Promise<SaveAssessmentResponse>
  getHistory: (params?: AssessmentHistoryParams) => Promise<AssessmentHistoryResponse>

  // Reminders
  getReminderPreferences: (assessmentType?: string) => Promise<ReminderPreferenceResponse>
  updateReminderPreferences: (request: UpdateReminderPreferenceRequest) => Promise<ReminderPreferenceResponse>
  disableReminders: (assessmentType: string) => Promise<APIResponse>

  // A/B Testing
  assignVariant: (request: AssignVariantRequest) => Promise<AssignVariantResponse>
  trackEvent: (request: TrackEventRequest) => Promise<TrackEventResponse>
}

// ============================================================================
// Database Function Return Types
// ============================================================================

export interface MigrateGuestAssessmentsResult {
  migratedCount: number
}

export interface ScheduleRemindersResult {
  scheduledCount: number
}

export interface CalculateSignificanceResult {
  variantId: string
  variantName: string
  conversionRate: number
  pValue: number | null
  isSignificant: boolean
}

// ============================================================================
// Event/Message Types for Real-time Features
// ============================================================================

export interface ReminderNotification {
  type: 'reminder'
  assessmentType: string
  message: string
  ctaUrl: string
  scheduledFor: string
}

export interface AssessmentCompletedEvent {
  type: 'assessment_completed'
  userId: string
  assessmentType: string
  score: number
  scoreChange?: number
  crisisLevel: string
}

export interface ExperimentStatusChange {
  type: 'experiment_status_change'
  experimentId: string
  experimentName: string
  oldStatus: ExperimentStatus
  newStatus: ExperimentStatus
}
