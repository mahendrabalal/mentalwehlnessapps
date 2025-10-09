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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mentalwellnessapp.com'
  const pathFromRouter = router.asPath.split('?')[0].split('#')[0]
  const canonicalTarget = canonical ?? `${baseUrl}${pathFromRouter}`
  const fullUrl = canonicalTarget.startsWith('http') ? canonicalTarget : `${baseUrl}${canonicalTarget}`
  const fullImageUrl =
    ogImage && (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)

  // Construct robots meta tag
  const robotsContent: string[] = []
  if (noindex) robotsContent.push('noindex')
  else robotsContent.push('index')
  if (nofollow) robotsContent.push('nofollow')
  else robotsContent.push('follow')
  robotsContent.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1')

  // Default keywords for mental health/wellness site
  const defaultKeywords = [
    'mental health',
    'mental wellness',
    'therapy',
    'anxiety support',
    'depression help',
    'crisis support',
    'mental health app',
    'online therapy',
    'wellness tracking'
  ]

  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]))

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
      <meta name="keywords" content={allKeywords.join(', ')} />
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

      {/* Additional Meta Tags for Healthcare/Wellness */}
      <meta name="category" content="Health & Wellness" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

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
    title: 'Mental Wellness App - AI-Powered Mental Health Support | $5.99/month',
    description: 'Transform your mental health journey with AI-powered insights, clinical-grade assessments, 24/7 crisis support, and personalized wellness tracking. HIPAA-compliant. Start at $5.99/month.',
    keywords: ['mental health app', 'AI therapy', 'anxiety tracker', 'depression support', 'wellness app', 'mental health tracking', 'crisis support', 'online therapy'],
  },
  pricing: {
    title: 'Affordable Mental Health Support - $5.99/month | Mental Wellness App',
    description: 'Premium mental health features for just $5.99/month. Unlimited AI therapy companion, crisis support, mood analytics, and personalized wellness plans. No trial required.',
    keywords: ['affordable therapy', 'mental health pricing', 'therapy subscription', 'online therapy cost'],
  },
  crisisSupport: {
    title: 'Crisis Support Resources - Immediate Mental Health Help Available 24/7',
    description: 'Get immediate help now. Access crisis hotlines, suicide prevention resources, and emergency mental health support worldwide. Free, confidential, available 24/7.',
    keywords: ['crisis support', 'suicide prevention', 'mental health emergency', 'crisis hotline', '988 lifeline', 'emergency mental health'],
  },
  blog: {
    title: 'Mental Wellness Knowledge Hub - Expert Insights & Coping Strategies',
    description: 'Clinically-reviewed mental health education, evidence-based coping strategies, and wellness tips from licensed professionals. Free mental health resources.',
    keywords: ['mental health tips', 'coping strategies', 'mental wellness blog', 'therapy techniques', 'self-care'],
  },
  features: {
    title: 'Features - AI Therapy, Mood Tracking & Crisis Support | Mental Wellness App',
    description: 'Explore our comprehensive mental health features: AI therapy companion, advanced mood analytics, crisis intervention, personalized wellness plans, and HIPAA-compliant data protection.',
    keywords: ['mental health features', 'mood tracker', 'AI therapy', 'wellness tracking', 'mental health tools'],
  },
}
