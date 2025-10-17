import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SecurityMiddleware } from './middleware/security'

// Security headers for HIPAA compliance and healthcare data protection
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://m.stripe.network", // Note: Should be restricted in production
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://js.stripe.com https://m.stripe.network",
      "img-src 'self' data: https: https://www.googletagmanager.com https://www.google-analytics.com https://q.stripe.com https://m.stripe.network",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://api.stripe.com https://js.stripe.com https://m.stripe.network https://q.stripe.com https://ipapi.co",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.network",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()'
    ].join(', ')
  }
]

// Rate limiting configuration (simple in-memory store for demo)
const rateLimitMap = new Map()

function rateLimit(ip: string, limit: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip)

  // Remove old requests outside the window
  while (requests.length > 0 && requests[0] < windowStart) {
    requests.shift()
  }

  // Check if limit exceeded
  if (requests.length >= limit) {
    return false
  }

  // Add current request
  requests.push(now)
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply HIPAA compliance headers to all requests
  let response = await SecurityMiddleware.enforceHipaaCompliance(request)

  // Legacy security headers (keeping for compatibility)
  securityHeaders.forEach(({ key, value }) => {
    if (!response.headers.get(key)) {
      response.headers.set(key, value)
    }
  })

  // Enhanced session validation for protected routes
  if (isProtectedRoute(pathname)) {
    // Skip middleware session validation for dashboard and other protected routes
    // Let client-side AuthGuard handle authentication instead to avoid redirect loops
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/assessment')) {
      // Just continue to the page, AuthGuard will handle authentication
      return response
    }

    const { valid, context } = await SecurityMiddleware.validateSessionIntegrity(request)

    if (!valid) {
      // Check if this is a crisis bypass scenario
      if (isCrisisRoute(pathname)) {
        // Allow limited access to crisis resources without authentication
        await SecurityMiddleware.logSecurityEvent('crisis_anonymous_access', {
          ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }, { route: pathname })

        response.headers.set('X-Crisis-Support', 'true')
        response.headers.set('X-Emergency-Access', 'true')
        return response
      }

      // Redirect to login for protected routes
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (context) {
      // Enhanced rate limiting based on authentication tier
      const rateLimitPassed = await SecurityMiddleware.rateLimitByTier(request, context)
      if (!rateLimitPassed) {
        return new NextResponse('Rate limit exceeded', { status: 429 })
      }

      // Log access to protected resources
      await SecurityMiddleware.logSecurityEvent('protected_resource_access', context, {
        route: pathname,
        method: request.method
      })

      // Check for clinical data access requirements
      if (isClinicalRoute(pathname)) {
        if (context.authenticationTier !== 'clinical' &&
            context.crisisLevel !== 'severe' &&
            context.crisisLevel !== 'imminent') {
          const upgradeUrl = new URL('/auth/upgrade-tier', request.url)
          upgradeUrl.searchParams.set('required', 'clinical')
          upgradeUrl.searchParams.set('redirect', pathname)
          return NextResponse.redirect(upgradeUrl)
        }

        response.headers.set('X-Clinical-Data', 'true')
        response.headers.set('X-HIPAA-Required', 'true')

        await SecurityMiddleware.logSecurityEvent('clinical_data_access', context, {
          route: pathname
        })
      }

      // Handle crisis escalation
      if (context.crisisLevel === 'severe' || context.crisisLevel === 'imminent') {
        await SecurityMiddleware.handleCrisisEscalation(context, context.crisisLevel)
        response.headers.set('X-Crisis-Level', context.crisisLevel)
      }
    }
  }

  // Legacy rate limiting for API routes
  const ip = request.ip ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (request.nextUrl.pathname.startsWith('/api/')) {
    const limit = 100
    if (!rateLimit(ip, limit)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: 900
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '900'
          }
        }
      )
    }
  }

  // Enhanced audit logging moved to SecurityMiddleware

  // Block common attack patterns
  const userAgent = request.headers.get('user-agent') || ''
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nessus/i,
    /masscan/i,
    /zap/i,
    /gobuster/i,
    /dirb/i
  ]

  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return new NextResponse(
      JSON.stringify({ error: 'Access denied' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(securityHeaders.map(h => [h.key, h.value]))
        }
      }
    )
  }

  return response
}

function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/assessments',
    '/safety',
    '/provider',
    '/admin',
    '/clinical'
  ]

  return protectedPaths.some(path => pathname.startsWith(path))
}

function isCrisisRoute(pathname: string): boolean {
  const crisisPaths = [
    '/crisis',
    '/emergency',
    '/safety/plan',
    '/hotlines',
    '/immediate-help'
  ]

  return crisisPaths.some(path => pathname.startsWith(path))
}

function isClinicalRoute(pathname: string): boolean {
  const clinicalPaths = [
    '/provider',
    '/clinical',
    '/assessments/admin',
    '/patient-records',
    '/treatment-plans'
  ]

  return clinicalPaths.some(path => pathname.startsWith(path))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
