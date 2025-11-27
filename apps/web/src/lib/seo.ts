type StructuredData = Record<string, unknown>

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentalwellnessapps.com'

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

// Review/Rating structured data for SEO
export function reviewStructuredData({
  name,
  description,
  ratingValue,
  bestRating = 5,
  worstRating = 1,
  reviewCount,
  author,
  datePublished,
}: {
  name: string
  description: string
  ratingValue: number
  bestRating?: number
  worstRating?: number
  reviewCount?: number
  author?: string
  datePublished?: string
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      bestRating: bestRating.toString(),
      worstRating: worstRating.toString(),
      reviewCount: reviewCount?.toString() || '1',
    },
  }

  if (author && datePublished) {
    schema.review = {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: author,
      },
      datePublished,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: ratingValue.toString(),
        bestRating: bestRating.toString(),
        worstRating: worstRating.toString(),
      },
      reviewBody: description,
    }
  }

  return schema
}

// Video structured data for SEO
export function videoStructuredData({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
  duration,
  transcript,
}: {
  name: string
  description: string
  thumbnailUrl: string
  contentUrl?: string
  embedUrl?: string
  uploadDate: string
  duration?: string // ISO 8601 duration format (e.g., "PT5M30S" for 5 minutes 30 seconds)
  transcript?: string
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: buildAbsoluteUrl(thumbnailUrl),
    uploadDate,
    publisher: organizationStructuredData({ includeContext: false }),
  }

  if (contentUrl) {
    schema.contentUrl = buildAbsoluteUrl(contentUrl)
  }

  if (embedUrl) {
    schema.embedUrl = buildAbsoluteUrl(embedUrl)
  }

  if (duration) {
    schema.duration = duration
  }

  if (transcript) {
    schema.transcript = transcript
  }

  return schema
}

// Export aliases for compatibility
export const howToStructuredData = buildHowToStructuredData
export const faqStructuredData = buildFaqStructuredData

export function medicalEntityStructuredData({
  name,
  description,
  alternateName,
  cause,
  symptom,
  riskFactor,
  treatment,
  typicalTest,
  medicalSpecialty
}: {
  name: string
  description: string
  alternateName?: string[]
  cause?: string[]
  symptom?: string[]
  riskFactor?: string[]
  treatment?: string[]
  typicalTest?: string[]
  medicalSpecialty?: string
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalEntity',
    name,
    description,
    medicalSpecialty: medicalSpecialty || 'Mental Health'
  }

  if (alternateName && alternateName.length > 0) {
    schema.alternateName = alternateName
  }

  if (cause && cause.length > 0) {
    schema.cause = cause.map(c => ({
      '@type': 'MedicalCause',
      name: c
    }))
  }

  if (symptom && symptom.length > 0) {
    schema.symptom = symptom.map(s => ({
      '@type': 'MedicalSymptom',
      name: s
    }))
  }

  if (riskFactor && riskFactor.length > 0) {
    schema.riskFactor = riskFactor
  }

  if (treatment && treatment.length > 0) {
    schema.treatment = treatment.map(t => ({
      '@type': 'MedicalTherapy',
      name: t
    }))
  }

  if (typicalTest && typicalTest.length > 0) {
    schema.typicalTest = typicalTest.map(t => ({
      '@type': 'MedicalTest',
      name: t
    }))
  }

  return schema
}

export function reviewedByStructuredData({
  reviewedBy,
  dateReviewed,
  medicalOrganization
}: {
  reviewedBy: {
    name: string
    credentials: string
    expertise?: string
  }
  dateReviewed: string
  medicalOrganization?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ReviewedBy',
    author: {
      '@type': 'Person',
      name: reviewedBy.name,
      jobTitle: reviewedBy.credentials,
      knowsAbout: reviewedBy.expertise
    },
    dateReviewed,
    publisher: medicalOrganization ? {
      '@type': 'Organization',
      name: medicalOrganization
    } : {
      '@type': 'Organization',
      name: 'Mental Wellness Apps Clinical Review Board'
    }
  }
}

// Enhanced medical schemas for healthcare SEO
export function medicalClinicStructuredData({
  name,
  description,
  address,
  phone,
  specialties,
  acceptsNewPatients = true
}: {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  phone: string
  specialties?: string[]
  acceptsNewPatients?: boolean
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name,
    description,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    telephone: phone,
    openingHours: 'Mo-Fr 09:00-17:00',
    acceptsNewPatients,
    medicalSpecialty: specialties || ['Mental Health'],
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    priceRange: '$$'
  }
}

export function mentalHealthProfessionalStructuredData({
  name,
  credentials,
  specialties,
  languages,
  acceptsNewPatients = true,
  telehealthAvailable = true
}: {
  name: string
  credentials: string
  specialties: string[]
  languages?: string[]
  acceptsNewPatients?: boolean
  telehealthAvailable?: boolean
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'Person'],
    name,
    jobTitle: credentials,
    medicalSpecialty: specialties,
    knowsLanguage: languages || ['English'],
    acceptsNewPatients,
    availableService: telehealthAvailable ? [
      {
        '@type': 'MedicalProcedure',
        name: 'Telehealth Mental Health Consultation'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'In-Person Mental Health Consultation'
      }
    ] : [
      {
        '@type': 'MedicalProcedure',
        name: 'In-Person Mental Health Consultation'
      }
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Licensure',
        recognizedBy: {
          '@type': 'Organization',
          name: 'State Medical Board'
        }
      }
    ]
  }
}

export function healthAndBeautyBusinessStructuredData({
  name,
  description,
  services,
  address,
  phone
}: {
  name: string
  description: string
  services: string[]
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  phone?: string
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name,
    description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mental Health Services',
      itemListElement: services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          category: 'Mental Health Services'
        }
      }))
    }
  }

  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...address
    }
  }

  if (phone) {
    schema.telephone = phone
  }

  return schema
}

// FAQ schema for medical Q&A
export function medicalFAQStructuredData(faqs: Array<{
  question: string
  answer: string
  category?: string
  medicalCondition?: string
}>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'Mental Wellness Apps Medical Review Board'
        }
      },
      about: faq.medicalCondition ? {
        '@type': 'MedicalCondition',
        name: faq.medicalCondition
      } : undefined
    }))
  }
}

// Event schema for mental health workshops/events
export function medicalEventStructuredData({
  name,
  description,
  startDate,
  endDate,
  location,
  attendeeType,
  about
}: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: {
    name: string
    address: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
  attendeeType?: string
  about?: string
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    organizer: organizationStructuredData({ includeContext: false }),
    attendeeType: attendeeType || 'General Public',
    about: about || 'Mental Health and Wellness'
  }

  if (endDate) {
    schema.endDate = endDate
  }

  if (location) {
    schema.location = {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        ...location.address
      }
    }
  } else {
    schema.location = {
      '@type': 'VirtualLocation',
      url: buildAbsoluteUrl('/virtual-events')
    }
  }

  return schema
}

// How-to schema for mental health techniques
export function mentalHealthHowToStructuredData({
  name,
  description,
  steps,
  estimatedTime,
  requiredEquipment,
  benefits
}: {
  name: string
  description: string
  steps: Array<{
    name: string
    text: string
    image?: string
    duration?: string
  }>
  estimatedTime?: string
  requiredEquipment?: string[]
  benefits?: string[]
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? buildAbsoluteUrl(step.image) : undefined,
      time: step.duration ? {
        '@type': 'QuantitativeValue',
        name: 'Duration',
        value: step.duration
      } : undefined
    })),
    tool: requiredEquipment?.map(equipment => ({
      '@type': 'HowToTool',
      name: equipment
    }))
  }

  if (estimatedTime) {
    schema.totalTime = {
      '@type': 'QuantitativeValue',
      name: 'Total time',
      value: estimatedTime
    }
  }

  if (benefits && benefits.length > 0) {
    schema.result = benefits.map(benefit => ({
      '@type': 'HowToSection',
      name: 'Benefits',
      description: benefit
    }))
  }

  return schema
}

// Local business schema for geographic SEO
export function localHealthBusinessStructuredData({
  name,
  description,
  cities,
  services,
  phone
}: {
  name: string
  description: string
  cities: Array<{
    name: string
    state: string
    country?: string
  }>
  services: string[]
  phone?: string
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
    name,
    description,
    telephone: phone,
    areaServed: cities.map(city => ({
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: city.state,
        containedInPlace: city.country ? {
          '@type': 'Country',
          name: city.country
        } : undefined
      }
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mental Health Services',
      itemListElement: services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          category: 'Mental Health Services'
        },
        areaServed: cities.map(city => ({
          '@type': 'City',
          name: city.name
        }))
      }))
    },
    openingHours: '24/7' // For online services
  }
}
