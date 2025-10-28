import Head from 'next/head'
import { organizationStructuredData, websiteStructuredData } from '@/lib/seo'

export function DefaultSEO() {
  const structuredData = [websiteStructuredData(), organizationStructuredData()]

  return (
    <Head>
      {/* Default Meta Tags - Fallback for pages without specific SEOHead */}
      <title>Free Mental Health Support - Evidence-Based Tools & Resources</title>
      <meta name="title" content="Free Mental Health Support - Evidence-Based Tools & Resources" />
      <meta name="description" content="Get 100% free, evidence-based mental health tools for anxiety, stress, burnout & loneliness. HIPAA-compliant, clinically-reviewed support available worldwide." />

      {/* Viewport meta tag - Optimized for Core Web Vitals and mobile performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no, shrink-to-fit=no" />

      {/* Default Open Graph */}
      <meta property="og:title" content="Free Mental Health Support - Evidence-Based Tools & Resources" />
      <meta property="og:description" content="Get 100% free, evidence-based mental health tools for anxiety, stress, burnout & loneliness. HIPAA-compliant, clinically-reviewed support available worldwide." />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mental Wellness App" />

      {/* Default Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Mental Health Support - Evidence-Based Tools & Resources" />
      <meta name="twitter:description" content="Get 100% free, evidence-based mental health tools for anxiety, stress, burnout & loneliness. HIPAA-compliant, clinically-reviewed support available worldwide." />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </Head>
  )
}
