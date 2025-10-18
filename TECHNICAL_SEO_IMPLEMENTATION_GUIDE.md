# Technical SEO Implementation Guide

This guide provides step-by-step instructions to implement the technical SEO foundation for your Mental Wellness App.

## 1. Create robots.txt File

Create a new file at `apps/web/public/robots.txt` with the following content:

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /preview/
Disallow: /auth/
Disallow: /dashboard/
Disallow: /profile/

# Allow search engines to crawl CSS and JS files
Allow: /_next/static/
Allow: /css/
Allow: /js/

# Sitemap location
Sitemap: https://mentalwellnessapp.com/sitemap.xml

# Crawl delay (optional, be careful with this)
# Crawl-delay: 1
```

### Why this robots.txt configuration:
- Allows crawling of all public content
- Disallows private areas (dashboard, profile, auth)
- Explicitly allows static assets for proper rendering
- Points to your sitemap for complete indexing

## 2. Set Up Google Analytics 4

### Step 2.1: Create Google Analytics 4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Get your Measurement ID (format: G-XXXXXXXXXX)

### Step 2.2: Add Environment Variable
Add your GA Measurement ID to `apps/web/.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 2.3: Create Analytics Component
Create a new file at `apps/web/src/components/Analytics.tsx`:

```tsx
import { useEffect } from 'react'
import Script from 'next/script'

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
      return
    }

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_location: window.location.href,
      cookie_flags: 'SameSite=None;Secure',
    })

    // Make gtag available globally
    window.gtag = gtag
  }, [GA_MEASUREMENT_ID])

  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
```

### Step 2.4: Add Analytics to _app.tsx
Update `apps/web/src/pages/_app.tsx` to include the Analytics component:

```tsx
import { Analytics } from '@/components/Analytics'

// In your App component return statement:
return (
  <>
    <Component {...pageProps} />
    <Analytics />
  </>
)
```

## 3. Add Google Search Console Verification

### Step 3.1: Get Verification Code
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your property (mentalwellnessapp.com)
3. Choose "HTML tag" verification method
4. Copy the meta tag content

### Step 3.2: Add to SEOHead Component
Update `apps/web/src/components/SEOHead.tsx` to include the verification meta tag:

```tsx
// In the return statement, add this before the closing </Head> tag:
{process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
  <meta
    name="google-site-verification"
    content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
  />
)}
```

### Step 3.3: Add Environment Variable
Add to `apps/web/.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

## 4. Implement Core Web Vitals Monitoring

### Step 4.1: Create Web Vitals Reporter
Create `apps/web/src/lib/web-vitals.ts`:

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value)
  }
}

export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

### Step 4.2: Install web-vitals Package
Run in your terminal:
```bash
npm install web-vitals
```

### Step 4.3: Add to _app.tsx
Update `apps/web/src/pages/_app.tsx`:

```tsx
import { reportWebVitals } from '@/lib/web-vitals'

// Add this useEffect to your App component:
useEffect(() => {
  if (process.env.NODE_ENV === 'production') {
    reportWebVitals()
  }
}, [])
```

## 5. Optimize Next.js Configuration for SEO

Update `apps/web/next.config.js` with these SEO optimizations:

```js
const nextConfig = {
  // ... existing config ...

  // Add these SEO optimizations
  compress: true,
  
  // Optimize images
  images: {
    // ... existing image config ...
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Add trailing slash for consistency
  trailingSlash: false,

  // Optimize headers for SEO
  async headers() {
    return [
      // ... existing headers ...
      {
        source: '/(.*)',
        headers: [
          // ... existing headers ...
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ]
      },
      // Cache static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Cache images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      }
    ]
  }
}
```

## 6. Create SEO Monitoring Dashboard

Create `apps/web/src/lib/seo-monitoring.ts`:

```tsx
interface SEOMetrics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{
    path: string
    views: number
    avgTimeOnPage: number
  }>
  topKeywords: Array<{
    keyword: string
    impressions: number
    clicks: number
    ctr: number
    position: number
  }>
}

export async function getSEOMetrics(): Promise<SEOMetrics> {
  // This would typically fetch from Google Analytics API
  // For now, return placeholder data
  return {
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    topKeywords: []
  }
}

export function trackSEOEvent(action: string, category: string, label?: string) {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    })
  }
}
```

## 7. Add Structured Data Testing

Create `apps/web/src/lib/structured-data-testing.ts`:

```tsx
export function validateStructuredData(structuredData: any): boolean {
  try {
    JSON.stringify(structuredData)
    return true
  } catch (error) {
    console.error('Invalid structured data:', error)
    return false
  }
}

export function testStructuredData() {
  // Test in development
  if (process.env.NODE_ENV === 'development') {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    scripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent || '')
        console.log(`✅ Structured data ${index + 1} valid:`, data['@type'])
      } catch (error) {
        console.error(`❌ Structured data ${index + 1} invalid:`, error)
      }
    })
  }
}
```

## 8. Implementation Checklist

### Immediate Actions (Day 1):
- [ ] Create `apps/web/public/robots.txt`
- [ ] Set up Google Analytics 4 property
- [ ] Add GA Measurement ID to environment variables
- [ ] Create Analytics component
- [ ] Add Analytics to _app.tsx

### Short-term Actions (Day 2-3):
- [ ] Set up Google Search Console
- [ ] Add verification meta tag
- [ ] Install web-vitals package
- [ ] Create web vitals reporter
- [ ] Add web vitals monitoring to _app.tsx

### Medium-term Actions (Day 4-5):
- [ ] Update Next.js configuration for SEO
- [ ] Create SEO monitoring utilities
- [ ] Add structured data validation
- [ ] Test all implementations

## 9. Testing Your Implementation

### Test robots.txt:
Visit `https://mentalwellnessapp.com/robots.txt` to verify it's accessible.

### Test Google Analytics:
1. Open your website
2. Open Chrome DevTools → Network tab
3. Look for requests to `www.google-analytics.com`
4. Check Real-time reports in GA dashboard

### Test Search Console:
1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Test your homepage and a few blog posts
3. Verify structured data is correctly implemented

### Test Core Web Vitals:
1. Use PageSpeed Insights: https://pagespeed.web.dev/
2. Test your homepage and key landing pages
3. Aim for scores of 90+ in all categories

## 10. Next Steps

After implementing this technical SEO foundation:

1. **Monitor Performance**: Check Google Analytics and Search Console regularly
2. **Track Rankings**: Monitor your keyword positions in Google Search Console
3. **Optimize Based on Data**: Use the insights to improve your content strategy
4. **Regular Audits**: Perform monthly SEO audits to identify issues

This technical foundation will ensure your website is properly indexed and measured, setting the stage for the content optimization and creation phases of your traffic generation strategy.