import { NextRequest, NextResponse } from 'next/server'
import { MEMORABLE_PHRASE } from './lib/constants'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname, searchParams } = url

  // Redirect non-www to www (canonical domain)
  const hostname = request.headers.get('host') || ''
  if (hostname === 'mentalwellnessapps.com' && process.env.NODE_ENV === 'production') {
    const wwwUrl = new URL(request.url)
    wwwUrl.host = 'www.mentalwellnessapps.com'
    return NextResponse.redirect(wwwUrl, 301)
  }

  // Handle landing=true parameter with 301 redirect
  if (searchParams.has('landing') && searchParams.get('landing') === 'true') {
    // Remove the landing parameter from URL
    searchParams.delete('landing')

    // Build the clean URL using the request's origin
    const cleanUrl = new URL(pathname, request.nextUrl.origin)

    // Add remaining search parameters (if any)
    const remainingParams = searchParams.toString()
    if (remainingParams) {
      cleanUrl.search = remainingParams
    }

    // Create response with 301 redirect and landing page indicator
    const response = NextResponse.redirect(cleanUrl, 301)

    // Set a session cookie to preserve landing page functionality
    response.cookies.set('show_landing_page', 'true', {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return response
  }

  // Remove other duplicate-content creating parameters
  const duplicateParams = ['view', 'sort', 'filter', 'page']
  let hasDuplicateParams = false

  duplicateParams.forEach(param => {
    if (searchParams.has(param)) {
      searchParams.delete(param)
      hasDuplicateParams = true
    }
  })

  if (hasDuplicateParams) {
    const cleanUrl = new URL(pathname, request.nextUrl.origin)
    const remainingParams = searchParams.toString()
    if (remainingParams) {
      cleanUrl.search = remainingParams
    }

    return NextResponse.redirect(cleanUrl, 301)
  }

  // Create response with security headers
  const response = NextResponse.next()
  const nonce = Buffer.from(MEMORABLE_PHRASE).toString('base64')
  response.headers.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'unsafe-eval'; style-src 'self' 'unsafe-inline';`)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}