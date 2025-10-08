import {
  cmsArticleSchema,
  cmsSiteSettingsSchema,
  CmsArticle,
  CmsSiteSettings,
} from '@mental-wellness/shared'
import { assertSanityConfig, isSanityConfigured } from './config'
import { getPreviewClient, getSanityClient } from './client'
import {
  allArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  latestArticlesQuery,
  siteSettingsQuery,
} from './queries'

const articleArraySchema = cmsArticleSchema.array()

export interface FetchArticlesOptions {
  preview?: boolean
  includeDrafts?: boolean
}

export async function fetchArticles(
  options: FetchArticlesOptions = {}
): Promise<CmsArticle[]> {
  if (!isSanityConfigured) {
    return []
  }
  assertSanityConfig()
  const { preview = false, includeDrafts = false } = options
  const client = preview ? getPreviewClient() : getSanityClient()
  const query = preview || includeDrafts ? allArticlesQuery : latestArticlesQuery

  const data = await client.fetch(query)
  return articleArraySchema.parse(data)
}

export async function fetchArticleBySlug(
  slug: string,
  options: { preview?: boolean } = {}
): Promise<CmsArticle | null> {
  if (!isSanityConfigured) {
    return null
  }
  assertSanityConfig()
  const client = options.preview ? getPreviewClient() : getSanityClient()
  const data = await client.fetch(articleBySlugQuery, { slug })

  if (!data) {
    return null
  }

  return cmsArticleSchema.parse(data)
}

export async function fetchSiteSettings(
  options: { preview?: boolean } = {}
): Promise<CmsSiteSettings | null> {
  if (!isSanityConfigured) {
    return null
  }
  assertSanityConfig()
  const client = options.preview ? getPreviewClient() : getSanityClient()
  const data = await client.fetch(siteSettingsQuery)
  if (!data) {
    return null
  }

  return cmsSiteSettingsSchema.parse(data)
}

export async function fetchArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return []
  }
  assertSanityConfig()
  const data = await getSanityClient().fetch<
    { slug?: string | null }[]
  >(articleSlugsQuery)

  return data
    .map((entry) => entry.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
}
