export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-10-25'

export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production'

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  ''

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
