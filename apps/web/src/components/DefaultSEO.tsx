import Head from 'next/head'
import { useRouter } from 'next/router'
import { organizationStructuredData, websiteStructuredData, SITE_URL } from '@/lib/seo'

export function DefaultSEO() {
  const router = useRouter()
  const structuredData = [websiteStructuredData(), organizationStructuredData()]
  const canonicalUrl = `${SITE_URL}${router.asPath === '/' ? '' : router.asPath.split('?')[0]}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      {/* Fallback Meta Tags - Will be overridden by page-specific SEOHead component
          Next.js automatically deduplicates <Head> tags by key (name/property)
          These ensure meta tags are always present in server-rendered HTML */}
      <title>Mental Wellness App - Free Mental Health Support</title>
      <meta name="description" content="Free evidence-based mental health tools for anxiety, stress, and burnout. HIPAA-compliant, 100% free support available worldwide." />

      {/* Viewport meta tag - Optimized for Core Web Vitals and mobile performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no, shrink-to-fit=no" />

      {/* Fallback Open Graph - Overridden by page-specific SEOHead */}
      <meta property="og:title" content="Mental Wellness App - Free Mental Health Support" />
      <meta property="og:description" content="Free evidence-based mental health tools for anxiety, stress, and burnout. HIPAA-compliant, 100% free support available worldwide." />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mental Wellness App" />

      {/* Fallback Twitter Card - Overridden by page-specific SEOHead */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mental Wellness App - Free Mental Health Support" />
      <meta name="twitter:description" content="Free evidence-based mental health tools for anxiety, stress, and burnout. HIPAA-compliant, 100% free support available worldwide." />

      {/* Global Structured Data - Organization and Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </Head>
  )
}
