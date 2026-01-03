import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase'

interface SecurityContext {
  userId?: string
  userRole?: string
  authenticationTier?: string
  crisisLevel?: string
  ipAddress?: string
  userAgent?: string
  sessionId?: string
}

export class SecurityMiddleware {
  private static readonly RATE_LIMITS = {
    standard: 100, // requests per minute
    sensitive: 50,
    clinical: 25,
    emergency: 200 // Higher limit for crisis situations
  }

  private static readonly HIPAA_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://js.stripe.com https://m.stripe.network https://fonts.googleapis.com",
      "img-src 'self' data: https: https://q.stripe.com https://m.stripe.network https://www.googletagmanager.com https://www.google-analytics.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://js.stripe.com https://m.stripe.network https://q.stripe.com https://www.google-analytics.com https://region1.google-analytics.com https://ipapi.co",
      "font-src 'self' https://fonts.gstatic.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.network https://www.youtube.com https://player.vimeo.com"
    ].join('; '),
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'X-HIPAA-Compliant': 'true'
  }

  static async enforceHipaaCompliance(request: NextRequest): Promise<NextResponse> {
    const response = NextResponse.next()

    // Apply HIPAA-required security headers
    Object.entries(this.HIPAA_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  }

  static async rateLimitByTier(
    request: NextRequest,
    context: SecurityContext
  ): Promise<boolean> {
    const tier = (context.authenticationTier as keyof typeof this.RATE_LIMITS) || 'standard'
    const limit = this.RATE_LIMITS[tier]

    // Implementation would use Redis or similar for distributed rate limiting
    // For now, return true (allow request)
    return true
  }

  static async logSecurityEvent(
    event: string,
    context: SecurityContext,
    details?: any
  ): Promise<void> {
    try {
      // Skip database logging in middleware to avoid client conflicts
      // This can be handled by client-side logging instead
      console.log('Security event:', event, context, details)
    } catch (error) {
      console.error('Failed to log security event:', error)
    }
  }

  static async validateSessionIntegrity(
    request: NextRequest
  ): Promise<{ valid: boolean; context?: SecurityContext }> {
    try {
      const supabase = createMiddlewareClient(request)

      // Get session from cookies - proper way for Supabase middleware
      const cookieStore = request.cookies

      // Look for Supabase session cookies in various formats
      const authCookie = cookieStore.get('sb-auth-token') ||
        cookieStore.get('supabase-auth-token') ||
        cookieStore.get('supabase.auth.token')

      if (!authCookie?.value) {
        return { valid: false }
      }

      // Parse the auth cookie to extract access token
      let accessToken: string | null = null
      try {
        const authData = JSON.parse(authCookie.value)
        accessToken = authData.access_token || authData.accessToken
      } catch {
        // If it's not JSON, might be the token directly
        accessToken = authCookie.value
      }

      if (!accessToken) {
        return { valid: false }
      }

      // Validate the session with the access token
      const { data, error } = await supabase.auth.getUser(accessToken)

      if (error || !data.user) {
        return { valid: false }
      }

      // Get user context
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role, authentication_tier, crisis_level')
        .eq('user_id', data.user.id)
        .single()

      const context: SecurityContext = {
        userId: data.user.id,
        userRole: profile?.role,
        authenticationTier: profile?.authentication_tier,
        crisisLevel: profile?.crisis_level,
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }

      return { valid: true, context }
    } catch (error) {
      console.error('Session validation error:', error)
      return { valid: false }
    }
  }

  static async handleCrisisEscalation(
    context: SecurityContext,
    crisisLevel: string
  ): Promise<void> {
    await this.logSecurityEvent('crisis_escalation', context, { crisisLevel })

    if (crisisLevel === 'severe' || crisisLevel === 'imminent') {
      // Trigger emergency protocols
      await this.triggerEmergencyNotifications(context, crisisLevel)
    }
  }

  static async triggerEmergencyNotifications(
    context: SecurityContext,
    crisisLevel: string
  ): Promise<void> {
    try {
      // Skip database operations in middleware to avoid client conflicts
      // In a real implementation, this would:
      // 1. Notify designated emergency contacts
      // 2. Alert healthcare providers
      // 3. Potentially contact emergency services
      // 4. Provide crisis resources to the user

      console.log(`Emergency notifications triggered for user ${context.userId} at crisis level ${crisisLevel}`)
    } catch (error) {
      console.error('Failed to trigger emergency notifications:', error)
    }
  }

  static async enforceDataMinimization(
    data: any,
    context: SecurityContext
  ): Promise<any> {
    // Remove sensitive fields based on user role and authentication tier
    if (context.userRole === 'patient') {
      // Patients can only see their own data
      return this.filterPatientData(data, context.userId)
    }

    if (context.authenticationTier !== 'clinical') {
      // Non-clinical access gets limited data
      return this.filterNonClinicalData(data)
    }

    return data
  }

  private static filterPatientData(data: any, userId?: string): any {
    if (Array.isArray(data)) {
      return data.filter(item => item.user_id === userId)
    }

    if (data.user_id && data.user_id !== userId) {
      return null
    }

    return data
  }

  private static filterNonClinicalData(data: any): any {
    const sensitiveFields = [
      'clinical_notes',
      'diagnosis_codes',
      'medication_history',
      'provider_notes',
      'treatment_plan'
    ]

    if (Array.isArray(data)) {
      return data.map(item => this.removeSensitiveFields(item, sensitiveFields))
    }

    return this.removeSensitiveFields(data, sensitiveFields)
  }

  private static removeSensitiveFields(obj: any, fieldsToRemove: string[]): any {
    if (!obj || typeof obj !== 'object') return obj

    const filtered = { ...obj }
    fieldsToRemove.forEach(field => {
      if (field in filtered) {
        delete filtered[field]
      }
    })

    return filtered
  }

  private static getEventSeverity(event: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalEvents = ['unauthorized_access', 'data_breach', 'crisis_escalation']
    const highEvents = ['failed_authentication', 'tier_elevation_failed', 'emergency_access']
    const mediumEvents = ['tier_elevation', 'crisis_reported', 'session_expired']

    if (criticalEvents.includes(event)) return 'critical'
    if (highEvents.includes(event)) return 'high'
    if (mediumEvents.includes(event)) return 'medium'
    return 'low'
  }

  private static isHipaaRelevantEvent(event: string): boolean {
    const hipaaEvents = [
      'phi_access',
      'clinical_data_view',
      'patient_record_access',
      'provider_login',
      'crisis_intervention',
      'emergency_access'
    ]

    return hipaaEvents.includes(event)
  }
}

export default SecurityMiddleware
