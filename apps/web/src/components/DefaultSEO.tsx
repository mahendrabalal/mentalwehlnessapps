import Head from 'next/head'
import { organizationStructuredData, websiteStructuredData } from '@/lib/seo'

export function DefaultSEO() {
  const structuredData = [websiteStructuredData(), organizationStructuredData()]

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </Head>
  )
}
