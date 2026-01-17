import { groq } from 'next-sanity'

const imageFields = `
  ...,
  "alt": coalesce(alt, asset->description),
  caption,
  credit
`

const authorFields = `
  _id,
  name,
  role,
  credentials,
  "slug": slug,
  headshot{
    ${imageFields}
  }
`

const listingFields = `
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  publishedAt,
  readingTime,
  topics,
  status,
  hipaaDisclaimerOverride,
  clinicalReview{
    reviewer,
    credential,
    reviewedAt
  },
  seo{
    metaTitle,
    metaDescription
  },
  authors[]->{${authorFields}},
  heroImage{
    ${imageFields}
  }
`

const articleFields = `
  ${listingFields},
  body
`

export const allArticlesQuery = groq`
*[_type == "article" && defined(slug.current)]
| order(coalesce(publishedAt, _createdAt) desc) {
  ${listingFields}
}
`

export const latestArticlesQuery = groq`
*[_type == "article" && defined(slug.current) && status != "draft"]
| order(coalesce(publishedAt, _createdAt) desc)[0...20] {
  ${listingFields}
}
`

export const articleBySlugQuery = groq`
*[_type == "article" && slug.current == $slug][0]{
  ${articleFields}
}
`

export const articleSlugsQuery = groq`
*[_type == "article" && defined(slug.current)]{
  "slug": slug.current
}
`

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  _id,
  title,
  description,
  hipaaDisclaimer,
  crisisHotline,
  socialSharing{
    metaTitle,
    metaDescription
  }
}
`
