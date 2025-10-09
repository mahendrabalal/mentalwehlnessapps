import { createClient } from 'next-sanity'
import {
  SANITY_PREVIEW_TOKEN,
  isSanityConfigured,
  sanityConfig,
} from './config'

type SanityClientInstance = ReturnType<typeof createClient>

let cachedClient: SanityClientInstance | null = null

export function getSanityClient(): SanityClientInstance {
  if (!isSanityConfigured) {
    throw new Error('Sanity project configuration is missing.')
  }

  if (!cachedClient) {
    cachedClient = createClient({
      ...sanityConfig,
      useCdn: sanityConfig.useCdn,
      perspective: 'published',
    })
  }

  return cachedClient
}

export function getPreviewClient(): SanityClientInstance {
  if (!isSanityConfigured) {
    throw new Error('Sanity project configuration is missing.')
  }

  if (!SANITY_PREVIEW_TOKEN) {
    throw new Error(
      'Preview mode requested but SANITY_PREVIEW_TOKEN is not set.'
    )
  }

  return createClient({
    ...sanityConfig,
    token: SANITY_PREVIEW_TOKEN,
    useCdn: false,
    perspective: 'previewDrafts',
  })
}
