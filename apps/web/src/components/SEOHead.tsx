import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string | null
  ogImageAlt?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  nofollow?: boolean
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  locale?: string
  children?: ReactNode
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/og-default.png',
  ogImageAlt,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  author = 'Mental Wellness App',
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  structuredData,
  locale = 'en_US',
  children,
}: SEOProps) {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentalwellnessapps.com'
  const pathFromRouter = router.asPath.split('?')[0].split('#')[0]

  // Handle duplicate content parameters explicitly for canonical URL
  // Always start with the clean pathname from router
  const pathname = router.pathname
  
  // Parse current query parameters, excluding duplicate content params
  const currentUrl = new URL(router.asPath, baseUrl)
  const duplicateParams = ['landing', 'view', 'sort', 'filter', 'page', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
  
  // Create clean search params by removing duplicate content parameters
  const cleanParams = new URLSearchParams()
  currentUrl.searchParams.forEach((value, key) => {
    if (!duplicateParams.includes(key)) {
      cleanParams.append(key, value)
    }
  })
  
  // Build canonical URL - use clean pathname and filtered search params
  const cleanSearch = cleanParams.toString() ? `?${cleanParams.toString()}` : ''
  const canonicalPath = pathname + cleanSearch
  const canonicalTarget = canonical ?? `${baseUrl}${canonicalPath}`
  
  // Ensure canonical URL is always properly formatted and absolute
  let fullUrl: string
  if (canonicalTarget.startsWith('http')) {
    fullUrl = canonicalTarget
  } else {
    // Ensure no double slashes and proper URL formation
    const cleanPath = canonicalTarget.startsWith('/') ? canonicalTarget : `/${canonicalTarget}`
    fullUrl = `${baseUrl}${cleanPath}`
  }
  
  // Final validation - ensure URL is well-formed
  try {
    const validatedUrl = new URL(fullUrl)
    fullUrl = validatedUrl.toString()
  } catch (error) {
    // Fallback to base URL if canonical URL is malformed
    console.warn('Invalid canonical URL generated, falling back to base URL:', error)
    fullUrl = baseUrl
  }
  const fullImageUrl =
    ogImage && (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)

  // Construct robots meta tag
  const robotsContent: string[] = []
  if (noindex) robotsContent.push('noindex')
  else robotsContent.push('index')
  if (nofollow) robotsContent.push('nofollow')
  else robotsContent.push('follow')
  robotsContent.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1')

  // Internal keywords for content planning (not rendered as meta tag - deprecated since 2009)
  const defaultKeywords = [
    'free mental health app',
    'free therapy support',
    'free anxiety help',
    'free depression support',
    'free crisis support',
    'free mood tracker',
    'burnout assessment',
    'loneliness assessment',
    'mental health stigma',
    'evidence-based mental health tools',
    'clinical-grade assessments',
    'digital mental health',
    'emotional wellness support'
  ]

  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]))

  // Note: Meta keywords tag is deprecated and ignored by Google/Bing/Yahoo since 2009
  // Keywords are kept for internal tracking only and not rendered in HTML

  const pageLocale = locale.replace('-', '_')
  const imageAlt = ogImageAlt || title
  const serializedStructuredData = structuredData
    ? JSON.stringify(structuredData, null, 2)
    : null

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* Meta keywords tag removed - deprecated since 2009, not used by Google/Bing/Yahoo */}
      {author && <meta name="author" content={author} />}

      {/* Robots */}
      <meta name="robots" content={robotsContent.join(', ')} />
      <meta name="googlebot" content={robotsContent.join(', ')} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fullImageUrl ? (
        <>
          <meta property="og:image" content={fullImageUrl} />
          <meta property="og:image:width" content={ogImageWidth.toString()} />
          <meta property="og:image:height" content={ogImageHeight.toString()} />
          <meta property="og:image:alt" content={imageAlt} />
        </>
      ) : null}
      <meta property="og:site_name" content="Mental Wellness App" />
      <meta property="og:locale" content={pageLocale} />

      {/* Article specific OG tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Modified time for website pages (SEO freshness signal) */}
      {ogType === 'website' && modifiedTime && (
        <>
          <meta property="og:updated_time" content={modifiedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta name="last-modified" content={modifiedTime} />
        </>
      )}

      {/* Published time for website pages */}
      {ogType === 'website' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta name="article:published_time" content={publishedTime} />
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImageUrl ? <meta name="twitter:image" content={fullImageUrl} /> : null}
      {fullImageUrl ? <meta name="twitter:image:alt" content={imageAlt} /> : null}
      {/* Add your Twitter handle when available */}
      {process.env.NEXT_PUBLIC_TWITTER_HANDLE && (
        <>
          <meta name="twitter:site" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE} />
          <meta name="twitter:creator" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE} />
        </>
      )}

      {/* Structured Data (JSON-LD) */}
      {serializedStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializedStructuredData,
          }}
        />
      ) : null}

      {children}
    </Head>
  )
}

// Predefined SEO configurations for common pages
export const SEO_CONFIG = {
  home: {
    title: 'Free Mental Health Support - 100% Free Therapy & Crisis Support',
    description: 'Completely free mental health support for anxiety, depression, burnout, and loneliness. No subscriptions, no paywalls. Get unlimited therapy companion, crisis support, and mood tracking—forever free.',
    keywords: [
      'free mental health app',
      'free therapy',
      'free anxiety support',
      'free depression help',
      'mental health support no cost',
      'free crisis support',
      'free mood tracker',
      'overcome mental health stigma',
      'combat loneliness',
      'emotional burnout recovery'
    ],
  },
  pricing: {
    title: '100% Free Mental Health Support - No Subscriptions | Mental Wellness App',
    description: 'All features completely free forever. Unlimited therapy companion, crisis support, mood analytics, and personalized wellness plans. No credit card, no subscriptions, no hidden costs.',
    keywords: [
      'free mental health support',
      'free therapy app',
      'no cost mental health',
      'free anxiety help',
      'free depression support',
      'free wellness app',
      'mental health no subscription',
      'completely free therapy',
      'free mental wellness tools',
      'no cost crisis support'
    ],
  },
  crisisSupport: {
    title: 'Crisis Support Resources - Immediate Mental Health Help Available 24/7',
    description: 'Get immediate help now. Access crisis hotlines, suicide prevention resources, and emergency mental health support worldwide. Free, confidential, available 24/7.',
    keywords: [
      'crisis support',
      'suicide prevention',
      'mental health emergency',
      'crisis hotline',
      '988 lifeline',
      'emergency mental health',
      'immediate help',
      'crisis intervention',
      'mental health crisis',
      'suicide prevention resources'
    ],
  },
  blog: {
    title: 'Mental Health Resources - Evidence-Based Tools & Support',
    description: 'Clinically-reviewed mental health resources for anxiety, burnout, and stress. Evidence-based coping strategies, mindfulness tools, and therapy guides.',
    keywords: [
      'mental health coping strategies',
      'burnout recovery',
      'anxiety relief techniques',
      'combat loneliness',
      'overcome mental health stigma',
      'free therapy guides',
      'mindfulness for beginners',
      'emotional regulation skills',
      'stress management techniques',
      'mental wellness tips'
    ],
  },
  features: {
    title: 'Free Mental Health Tools - Combat Burnout, Anxiety & Loneliness',
    description: 'Free tools for emotional burnout recovery, anxiety management, loneliness support, and crisis intervention. Therapy companion, mood tracking, safety plans, and 24/7 crisis support—all 100% free.',
    keywords: [
      'free mental health tools',
      'burnout recovery tools',
      'anxiety management app',
      'loneliness support',
      'free mood tracker',
      'crisis intervention',
      'free therapy resources',
      'mental wellness features',
      'free anxiety tools',
      'depression support free'
    ],
  },
}
