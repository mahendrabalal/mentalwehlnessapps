// Custom hook for analytics tracking
import { useEffect, useRef, useCallback } from 'react'
import { analytics, GA_MEASUREMENT_ID } from '@/lib/analytics'

// Core Web Vitals monitoring
export const useCoreWebVitals = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

    const reportWebVitals = (metric: any) => {
      analytics.trackWebVitals(metric.name, metric.value, metric.id)
    }

    // Dynamically import web-vitals library
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportWebVitals)
      onFID(reportWebVitals)
      onFCP(reportWebVitals)
      onLCP(reportWebVitals)
      onTTFB(reportWebVitals)
    }).catch(() => {
      // Web vitals library not available, skip tracking
      console.log('Web vitals tracking not available')
    })
  }, [])
}

// Page engagement tracking
export const usePageEngagement = (pagePath: string) => {
  const engagementTimerRef = useRef<any>(null)

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Start engagement timer
    engagementTimerRef.current = analytics.startEngagementTimer(pagePath)

    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const scrollDepth = Math.round((currentScroll / scrollHeight) * 100)

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
      }
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true })

    return () => {
      // End engagement timer when component unmounts
      if (engagementTimerRef.current) {
        engagementTimerRef.current.end(maxScrollDepth)
      }
      window.removeEventListener('scroll', trackScrollDepth)
    }
  }, [pagePath])
}

// Tool completion tracking
export const useToolTracking = (toolName: string, toolType: string) => {
  const hasStarted = useRef(false)
  const hasCompleted = useRef(false)

  const startTool = useCallback(() => {
    if (!hasStarted.current) {
      analytics.trackToolStart(toolName, toolType)
      hasStarted.current = true
    }
  }, [toolName, toolType])

  const completeTool = useCallback((score?: number) => {
    if (hasStarted.current && !hasCompleted.current) {
      analytics.trackToolComplete(toolName, toolType, score)
      hasCompleted.current = true
    }
  }, [toolName, toolType])

  const shareTool = useCallback((shareMethod: 'copy' | 'social' | 'email') => {
    analytics.trackToolShare(toolName, shareMethod)
  }, [toolName])

  return {
    startTool,
    completeTool,
    shareTool
  }
}

// Error tracking
export const useErrorTracking = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const handleError = (event: ErrorEvent) => {
      analytics.trackError(
        event.error?.name || 'JavaScript Error',
        event.error?.message || event.message,
        window.location.pathname
      )
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError(
        'Unhandled Promise Rejection',
        event.reason?.message || String(event.reason),
        window.location.pathname
      )
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
}

// Accessibility tracking
export const useAccessibilityTracking = () => {
  const trackAccessibilityUsage = useCallback((feature: string, usage: boolean) => {
    analytics.trackAccessibilityFeature(feature, usage)
  }, [])

  return {
    trackAccessibilityUsage
  }
}

// Search tracking
export const useSearchTracking = () => {
  const trackSearch = useCallback((searchTerm: string, searchCategory: string, resultCount: number) => {
    analytics.trackSearch(searchTerm, searchCategory, resultCount)
  }, [])

  return {
    trackSearch
  }
}

// Crisis resource tracking
export const useCrisisTracking = () => {
  const trackCrisisClick = useCallback((resourceType: string, resourceLocation: string) => {
    analytics.trackCrisisResourceClick(resourceType, resourceLocation)
  }, [])

  return {
    trackCrisisClick
  }
}

// User journey tracking
export const useUserJourney = () => {
  const trackJourney = useCallback((journeyStep: string, fromPage: string, toPage: string) => {
    analytics.trackUserJourney(journeyStep, fromPage, toPage)
  }, [])

  return {
    trackJourney
  }
}

// Consent tracking
export const useConsentTracking = () => {
  const trackConsent = useCallback((consentType: 'analytics' | 'marketing' | 'all', granted: boolean) => {
    analytics.trackConsentUpdate(consentType, granted)
  }, [])

  return {
    trackConsent
  }
}

// Combined analytics hook
export const useAnalytics = () => {
  useCoreWebVitals()
  useErrorTracking()

  return {
    // Tool tracking
    useToolTracking,

    // Page engagement
    usePageEngagement,

    // Specialized tracking
    useAccessibilityTracking,
    useSearchTracking,
    useCrisisTracking,
    useUserJourney,
    useConsentTracking,

    // Direct functions
    trackConditionInterest: analytics.trackConditionInterest,
    trackConversion: analytics.trackConversion,
    trackPageView: analytics.trackPageView
  }
}

export default useAnalytics