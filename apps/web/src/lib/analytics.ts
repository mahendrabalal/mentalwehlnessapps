// Google Analytics 4 Enhanced Tracking for Mental Wellness App
// HIPAA-Compliant Analytics Configuration

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: any[]
  }
}

// Initialize Google Analytics 4 with enhanced configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Event types for mental health app tracking
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Tool completion events
export const trackToolStart = (toolName: string, toolType: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'tool_start', {
    event_category: 'mental_health_tools',
    event_label: toolName,
    tool_type: toolType,
    custom_parameter_1: toolType,
    non_interaction: false
  })
}

export const trackToolComplete = (toolName: string, toolType: string, score?: number) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'tool_complete', {
    event_category: 'mental_health_tools',
    event_label: toolName,
    tool_type: toolType,
    score: score,
    custom_parameter_1: toolType,
    value: score || 1,
    non_interaction: false
  })
}

export const trackToolShare = (toolName: string, shareMethod: 'copy' | 'social' | 'email') => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'tool_share', {
    event_category: 'engagement',
    event_label: toolName,
    share_method: shareMethod,
    custom_parameter_1: shareMethod,
    non_interaction: false
  })
}

// Crisis resource tracking
export const trackCrisisResourceClick = (resourceType: string, resourceLocation: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'crisis_resource_click', {
    event_category: 'crisis_support',
    event_label: resourceType,
    resource_type: resourceType,
    resource_location: resourceLocation,
    custom_parameter_1: resourceType,
    non_interaction: false
  })
}

// Page engagement tracking
export const trackPageEngagement = (pagePath: string, timeOnPage: number, scrollDepth: number) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'page_engagement', {
    event_category: 'engagement',
    event_label: pagePath,
    time_on_page: timeOnPage,
    scroll_depth: scrollDepth,
    custom_parameter_1: Math.round(timeOnPage),
    value: Math.round(scrollDepth),
    non_interaction: true
  })
}

// User journey tracking
export const trackUserJourney = (journeyStep: string, fromPage: string, toPage: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'user_journey', {
    event_category: 'navigation',
    event_label: journeyStep,
    from_page: fromPage,
    to_page: toPage,
    journey_step: journeyStep,
    custom_parameter_1: journeyStep,
    non_interaction: false
  })
}

// Search and discovery tracking
export const trackSearch = (searchTerm: string, searchCategory: string, resultCount: number) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'search', {
    event_category: 'search',
    event_label: searchTerm,
    search_term: searchTerm.toLowerCase(),
    search_category: searchCategory,
    result_count: resultCount,
    custom_parameter_1: searchCategory,
    value: resultCount,
    non_interaction: false
  })
}

// Custom dimension tracking for mental health conditions
export const trackConditionInterest = (condition: string, contentType: 'tool' | 'article' | 'resource') => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'condition_interest', {
    event_category: 'content_interest',
    event_label: condition,
    condition_type: condition.toLowerCase(),
    content_type: contentType,
    custom_parameter_1: condition,
    non_interaction: false
  })
}

// Accessibility tracking
export const trackAccessibilityFeature = (feature: string, usage: boolean) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'accessibility_feature', {
    event_category: 'accessibility',
    event_label: feature,
    accessibility_feature: feature,
    feature_usage: usage,
    custom_parameter_1: feature,
    non_interaction: true
  })
}

// Consent and privacy tracking
export const trackConsentUpdate = (consentType: 'analytics' | 'marketing' | 'all', granted: boolean) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'consent_update', {
    event_category: 'privacy',
    event_label: consentType,
    consent_type: consentType,
    consent_granted: granted,
    custom_parameter_1: consentType,
    non_interaction: false
  })
}

// Error tracking for debugging and user experience
export const trackError = (errorType: string, errorMessage: string, pagePath: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'error', {
    event_category: 'error_tracking',
    event_label: errorType,
    error_type: errorType,
    error_message: errorMessage.substring(0, 100), // Truncate for privacy
    page_path: pagePath,
    custom_parameter_1: errorType,
    non_interaction: true
  })
}

// Conversion tracking (for newsletter signups, etc.)
export const trackConversion = (conversionType: string, value: number, currency?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', 'conversion', {
    event_category: 'conversions',
    event_label: conversionType,
    conversion_type: conversionType,
    value: value,
    currency: currency || 'USD',
    custom_parameter_1: conversionType,
    non_interaction: false
  })
}

// Core Web Vitals tracking
export const trackWebVitals = (metric: string, value: number, id: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('event', metric, {
    event_category: 'web_vitals',
    event_label: id,
    value: Math.round(value),
    non_interaction: true,
    custom_parameter_1: metric
  })
}

// Initialize enhanced analytics configuration
export const initializeAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  // Configure GA4 with enhanced settings
  window.gtag('config', GA_MEASUREMENT_ID, {
    // Privacy settings
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',

    // Healthcare-specific settings
    allow_google_signals: false, // Disable Google Signals for HIPAA compliance
    send_page_view: true,

    // Enhanced measurement settings
    page_title: document.title,
    page_location: window.location.href,

    // Content grouping
    content_group1: 'mental_health_platform',

    // Custom dimensions for healthcare
    custom_map: {
      custom_dimension_1: 'tool_type',
      custom_dimension_2: 'condition_type',
      custom_dimension_3: 'content_type',
      custom_dimension_4: 'accessibility_feature',
      custom_dimension_5: 'crisis_resource_type'
    }
  })

  // Set default dimensions for healthcare compliance
  window.gtag('set', 'user_properties', {
    platform_type: 'mental_health_tools',
    content_classification: 'healthcare',
    hipaa_compliant: 'true'
  })
}

// Page view tracking with enhanced context
export const trackPageView = (pagePath: string, pageTitle: string, additionalData?: Record<string, any>) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
    ...additionalData
  })
}

// Time-based engagement tracking
export const startEngagementTimer = (pagePath: string) => {
  if (typeof window === 'undefined') return

  const startTime = Date.now()

  return {
    end: (scrollDepth: number = 0) => {
      const timeOnPage = Date.now() - startTime
      trackPageEngagement(pagePath, timeOnPage, scrollDepth)
    }
  }
}

// Export all tracking functions for easy import
export const analytics = {
  trackToolStart,
  trackToolComplete,
  trackToolShare,
  trackCrisisResourceClick,
  trackPageEngagement,
  trackUserJourney,
  trackSearch,
  trackConditionInterest,
  trackAccessibilityFeature,
  trackConsentUpdate,
  trackError,
  trackConversion,
  trackWebVitals,
  initializeAnalytics,
  trackPageView,
  startEngagementTimer
}

export default analytics