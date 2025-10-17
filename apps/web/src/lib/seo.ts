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

export function buildHowToStructuredData({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  totalTime?: string // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  image?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: image ? buildAbsoluteUrl(image) : undefined,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? buildAbsoluteUrl(step.image) : undefined,
    })),
  }
}

export function buildMedicalConditionSchema({
  name,
  description,
  symptoms,
  causes,
  riskFactors,
  treatments,
}: {
  name: string
  description: string
  symptoms?: string[]
  causes?: string[]
  riskFactors?: string[]
  treatments?: string[]
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name,
    description,
  }

  if (symptoms && symptoms.length > 0) {
    schema.signOrSymptom = symptoms.map((symptom) => ({
      '@type': 'MedicalSymptom',
      name: symptom,
    }))
  }

  if (causes && causes.length > 0) {
    schema.cause = causes.map((cause) => ({
      '@type': 'MedicalCause',
      name: cause,
    }))
  }

  if (riskFactors && riskFactors.length > 0) {
    schema.riskFactor = riskFactors.map((factor) => ({
      '@type': 'MedicalRiskFactor',
      name: factor,
    }))
  }

  if (treatments && treatments.length > 0) {
    schema.possibleTreatment = treatments.map((treatment) => ({
      '@type': 'MedicalTherapy',
      name: treatment,
    }))
  }

  return schema
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

export function productStructuredData({
  name,
  description,
  price,
  currency = 'USD',
  features,
}: {
  name: string
  description: string
  price: number
  currency?: string
  features: string[]
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'Mental Wellness App',
    },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: buildAbsoluteUrl('/pricing'),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    additionalProperty: features.map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
  }
}

export function softwareApplicationStructuredData({
  name = 'Mental Wellness App',
  description,
  price,
}: {
  name?: string
  description: string
  price?: number
}): StructuredData {
  const baseData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web, iOS, Android',
    description,
    url: SITE_URL,
    author: organizationStructuredData({ includeContext: false }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    screenshot: buildAbsoluteUrl('/og-default.png'),
  }

  if (price !== undefined) {
    baseData.offers = {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    }
  }

  return baseData
}

export function articleStructuredData({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author = 'Mental Wellness Team',
  imageUrl,
}: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author?: string
  imageUrl?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: buildAbsoluteUrl(slug),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: organizationStructuredData({ includeContext: false }),
    image: imageUrl ? buildAbsoluteUrl(imageUrl) : buildAbsoluteUrl('/og-default.png'),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildAbsoluteUrl(slug),
    },
  }
}
