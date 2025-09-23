import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Should be restricted in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
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

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Apply security headers
  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value)
  })

  // Get client IP for rate limiting
  const ip = request.ip ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  // Apply rate limiting to API routes and auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/') ||
      request.nextUrl.pathname.startsWith('/auth/')) {

    // Stricter limits for sensitive endpoints
    const isAuthEndpoint = request.nextUrl.pathname.startsWith('/auth/')
    const limit = isAuthEndpoint ? 5 : 100 // 5 auth attempts per 15 minutes

    if (!rateLimit(ip, limit)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: 900 // 15 minutes in seconds
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '900',
            ...Object.fromEntries(securityHeaders.map(h => [h.key, h.value]))
          }
        }
      )
    }
  }

  // HIPAA compliance: Log access to sensitive routes
  if (request.nextUrl.pathname.startsWith('/assessment/') ||
      request.nextUrl.pathname.startsWith('/profile/') ||
      request.nextUrl.pathname.startsWith('/dashboard/') ||
      request.nextUrl.pathname.startsWith('/safety/')) {

    // In production, this should be sent to a secure logging service
    console.log(`[AUDIT] ${new Date().toISOString()} - IP: ${ip} - Path: ${request.nextUrl.pathname} - User-Agent: ${request.headers.get('user-agent')}`)
  }

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

export const config = {
  matcher: [
    // API routes for rate limiting and security
    '/api/:path*',
    // Auth routes for enhanced security
    '/auth/:path*',
    // Protected app routes for audit logging
    '/dashboard/:path*',
    '/profile/:path*',
    '/assessment/:path*',
    '/safety/:path*',
    // Main app routes (excluding dev files)
    '/((?!_next/static|_next/image|_next/webpack-hmr|__nextjs_original-stack-frame|favicon.ico).*)',
  ],
}