import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { DefaultSEO } from '@/components/DefaultSEO'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { analytics } from '@/lib/analytics'

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize analytics on client side
    if (typeof window !== 'undefined') {
      analytics.initializeAnalytics()
    }
  }, [])

  useEffect(() => {
    // Track page views on route changes
    const handleRouteChange = (url: string) => {
      analytics.trackPageView(url, document.title)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8688786543603411"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <DefaultSEO />
      <AppContent Component={Component} pageProps={pageProps} />
    </>
  )
}
