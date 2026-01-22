import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { Head as NextHead } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Character Encoding */}
          <meta charSet="UTF-8" />

          {/* Viewport meta tag moved to _app.tsx DefaultSEO component to resolve Next.js warnings
          Next.js 14 prefers viewport meta tags in _app.tsx for proper deduplication
          Core Web Vitals optimization maintained through enhanced viewport content */}

          {/* DNS Prefetch for faster loading */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cdn.sanity.io" />

          {/* Favicon and App Icons */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#8B5CF6" />

          {/* PWA Meta Tags */}
          <meta name="application-name" content="Mental Wellness App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Mental Wellness" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* Microsoft Tiles */}
          <meta name="msapplication-TileColor" content="#8B5CF6" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          {/* Global Site Metadata */}
          <meta name="author" content="Mental Wellness App" />
          {/* Meta description removed - handled by page-specific SEOHead component to prevent duplicates */}
          <meta name="keywords" content="mental health, anxiety, burnout, depression, therapy, counseling, stress management, emotional wellness, mental wellness tools, free mental health support" />

          {/* Healthcare & HIPAA Compliance Meta */}
          <meta name="healthcare-platform" content="mental-wellness" />
          <meta name="hipaa-compliant" content="true" />
          <meta name="medical-disclaimer" content="This is not a substitute for professional medical advice" />
          <meta name="content-classification" content="healthcare" />
          <meta name="target-audience" content="general-public" />

          {/* Content Classification */}
          <meta name="rating" content="general" />
          <meta name="distribution" content="global" />
          <meta name="language" content="en" />

          {/* Enhanced Robots Meta */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow" />

          {/* Open Graph/Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Mental Wellness App" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:locale:alternate" content="en" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@mentalwellness" />
          <meta name="twitter:creator" content="@mentalwellness" />

          {/* Pinterest Verification */}
          <meta name="p:domain_verify" content="46335f367d78cc1ae8288663cddfe3d8" />

          {/* Google Site Verification (Add your verification code when available) */}
          {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
            <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
          )}

          {/* Bing Site Verification (Add your verification code when available) */}
          {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
            <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
          )}

          {/* Geo Location */}
          <meta name="geo.region" content="US" />
          <meta name="geo.placename" content="United States" />
          <meta name="icbm" content="40.7128; -74.0060" />

          {/* Language and Regional Settings */}
          <meta httpEquiv="content-language" content="en-US" />
          <meta name="geo.country" content="US" />

          {/* Prevent automatic translation */}
          <meta name="google" content="notranslate" />

          {/* Security and Privacy Headers */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta name="permissions-policy" content="camera=(), microphone=(), geolocation=()" />

          {/* Content Security and HIPAA */}
          <meta name="privacy-policy-url" content="/privacy" />
          <meta name="terms-of-service-url" content="/terms" />
          <meta name="hipaa-compliance-url" content="/hipaa" />

          {/* Performance Optimization */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          {/* Accessibility Improvements */}
          <meta name="accessibility-mode" content="enabled" />
          <meta name="screen-reader-optimized" content="true" />

          {/* Google Analytics - Add when GA4 property is created */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
