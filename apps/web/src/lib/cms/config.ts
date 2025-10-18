const DEFAULT_SANITY_PROJECT_ID = '4t9s1x2a'
const DEFAULT_SANITY_DATASET = 'production'
const DEFAULT_SANITY_API_VERSION = '2023-10-25'

export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? DEFAULT_SANITY_API_VERSION

const resolvedSanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  DEFAULT_SANITY_DATASET

const resolvedSanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  (process.env.NODE_ENV === 'production' ? DEFAULT_SANITY_PROJECT_ID : '')

const isUsingFallbackProjectId =
  resolvedSanityProjectId === DEFAULT_SANITY_PROJECT_ID &&
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  !process.env.SANITY_PROJECT_ID

if (isUsingFallbackProjectId && typeof window === 'undefined') {
  console.warn(
    '[cms] Falling back to default Sanity project id. Configure NEXT_PUBLIC_SANITY_PROJECT_ID for environment-specific data.'
  )
}

export const SANITY_DATASET = resolvedSanityDataset

export const SANITY_PROJECT_ID = resolvedSanityProjectId

export const SANITY_PREVIEW_TOKEN = process.env.SANITY_PREVIEW_TOKEN

export const isSanityConfigured =
  Boolean(SANITY_PROJECT_ID) && Boolean(SANITY_DATASET)

export const sanityConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
}

export function assertSanityConfig() {
  if (!SANITY_PROJECT_ID) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID. Did you forget to copy apps/cms/.env.local.example?'
    )
  }
  if (!SANITY_DATASET) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET. Did you forget to copy apps/cms/.env.local.example?'
    )
  }
}
