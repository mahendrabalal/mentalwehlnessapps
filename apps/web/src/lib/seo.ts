type StructuredData = Record<string, unknown>

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mentalwellnessapp.com'

export function buildAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildBreadcrumbList(items: Array<{ name: string; url: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.url),
    })),
  }
}

export function buildFaqStructuredData(faqs: Array<{ question: string; answer: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function websiteStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'Mental Wellness App',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationStructuredData({ includeContext = true }: { includeContext?: boolean } = {}): StructuredData {
  const data: StructuredData = {
    '@type': 'Organization',
    name: 'Mental Wellness App',
    url: SITE_URL,
    logo: buildAbsoluteUrl('/og-default.png'),
    sameAs: [
      'https://www.linkedin.com/company/mentalwellnessapp',
      'https://www.youtube.com/@mentalwellnessapp',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-800-555-0100',
        contactType: 'customer support',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  }

  if (includeContext) {
    data['@context'] = 'https://schema.org'
  }

  return data
}

export function medicalWebPageStructuredData({
  name,
  description,
  slug,
}: {
  name: string
  description: string
  slug: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url: buildAbsoluteUrl(slug),
    name,
    description,
    publisher: organizationStructuredData({ includeContext: false }),
  }
}
