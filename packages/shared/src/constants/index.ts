// Constants for Mental Wellness App

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
  CLINICAL_PLUS: 'clinical_plus'
} as const;

export const MOOD_TYPES = {
  NUMERIC: 'numeric',
  EMOJI: 'emoji',
  COLOR: 'color',
  BINARY: 'binary'
} as const;

export const ASSESSMENT_TYPES = {
  PHQ9: 'PHQ9',
  GAD7: 'GAD7',
  CUSTOM: 'CUSTOM'
} as const;

export const RISK_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  SEVERE: 'severe'
} as const;

export const CRISIS_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  EMERGENCY: 'emergency'
} as const;

export const ORGANIZATION_TYPES = {
  HEALTHCARE: 'healthcare',
  EMPLOYER: 'employer',
  INSURER: 'insurer',
  RESEARCH: 'research'
} as const;

export const SUBSCRIPTION_PLANS = {
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise'
} as const;

// Crisis intervention constants
export const CRISIS_HOTLINES = {
  SUICIDE_PREVENTION: {
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    description: '24/7 free and confidential emotional support'
  },
  CRISIS_TEXT_LINE: {
    name: 'Crisis Text Line',
    phone: '741741',
    description: 'Text HOME to 741741 for crisis support'
  },
  EMERGENCY: {
    name: 'Emergency Services',
    phone: '911',
    description: 'Immediate emergency response'
  }
} as const;

// Assessment scoring thresholds
export const PHQ9_THRESHOLDS = {
  MINIMAL: { min: 0, max: 4, label: 'Minimal depression' },
  MILD: { min: 5, max: 9, label: 'Mild depression' },
  MODERATE: { min: 10, max: 14, label: 'Moderate depression' },
  MODERATELY_SEVERE: { min: 15, max: 19, label: 'Moderately severe depression' },
  SEVERE: { min: 20, max: 27, label: 'Severe depression' }
} as const;

export const GAD7_THRESHOLDS = {
  MINIMAL: { min: 0, max: 4, label: 'Minimal anxiety' },
  MILD: { min: 5, max: 9, label: 'Mild anxiety' },
  MODERATE: { min: 10, max: 14, label: 'Moderate anxiety' },
  SEVERE: { min: 15, max: 21, label: 'Severe anxiety' }
} as const;

// Wellness goal types
export const WELLNESS_GOAL_TYPES = {
  MOOD_TRACKING: 'mood_tracking',
  MEDITATION: 'meditation',
  EXERCISE: 'exercise',
  SLEEP: 'sleep',
  CUSTOM: 'custom'
} as const;

// Time frequencies
export const FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  MOOD_ENTRIES: '/mood_entries',
  CLINICAL_ASSESSMENTS: '/clinical_assessments',
  HEALTHCARE_PROVIDERS: '/healthcare_providers',
  CRISIS_INTERVENTIONS: '/crisis_interventions',
  ORGANIZATIONS: '/organizations'
} as const;

// Supabase Edge Function endpoints
export const EDGE_FUNCTIONS = {
  CRISIS_ASSESSMENT: '/crisis-assessment',
  EMERGENCY_SERVICES: '/emergency-services',
  FHIR_EXPORT: '/fhir-export',
  CLINICAL_SCORING: '/clinical-scoring',
  PROVIDER_NOTIFICATIONS: '/provider-notifications',
  MOOD_ANALYTICS: '/mood-analytics',
  CONTENT_RECOMMENDATIONS: '/content-recommendations',
  RISK_PREDICTION: '/risk-prediction'
} as const;

// App configuration
export const APP_CONFIG = {
  NAME: 'Mental Wellness App',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@mentalwellnessapp.com',
  CRISIS_EMAIL: 'crisis@mentalwellnessapp.com'
} as const;