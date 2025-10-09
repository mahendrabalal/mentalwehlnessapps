import { z } from 'zod'

const cmsImageAssetSchema = z.object({
  _ref: z.string(),
  _type: z.literal('reference'),
})

export const cmsImageSchema = z.object({
  _type: z.literal('image'),
  asset: cmsImageAssetSchema,
  alt: z.string().min(1),
  caption: z.string().nullable().optional(),
  credit: z.string().nullable().optional(),
})

export const cmsAuthorSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  role: z.string().nullable().optional(),
  credentials: z.string().nullable().optional(),
  headshot: cmsImageSchema.nullable().optional(),
})

export const cmsArticleSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().optional(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  excerpt: z.string(),
  publishedAt: z.string().nullable().optional(),
  readingTime: z.number().nullable().optional(),
  topics: z.array(z.string()).optional(),
  heroImage: cmsImageSchema.optional(),
  authors: z.array(cmsAuthorSchema).optional(),
  clinicalReview: z
    .object({
      reviewer: z.string().optional(),
      credential: z.string().optional(),
      reviewedAt: z.string().optional(),
    })
    .nullable()
    .optional(),
  hipaaDisclaimerOverride: z.string().nullable().optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional(),
  body: z.array(z.unknown()).optional(),
  status: z.string().optional(),
  language: z.string().optional(),
  updatedAt: z.string().optional(),
  _updatedAt: z.string().optional(),
})

export type CmsImage = z.infer<typeof cmsImageSchema>
export type CmsAuthor = z.infer<typeof cmsAuthorSchema>
export type CmsArticle = z.infer<typeof cmsArticleSchema>

export const cmsSiteSettingsSchema = z.object({
  _id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  hipaaDisclaimer: z.string().optional(),
  crisisHotline: z.string().optional(),
  socialSharing: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional(),
})

export type CmsSiteSettings = z.infer<typeof cmsSiteSettingsSchema>
