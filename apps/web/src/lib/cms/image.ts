import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { isSanityConfigured } from './config'
import { getSanityClient } from './client'

let builder: ReturnType<typeof imageUrlBuilder> | null = null

export function urlFor(source: SanityImageSource) {
  if (!isSanityConfigured) {
    throw new Error('Cannot build Sanity image URL without project configuration.')
  }

  if (!builder) {
    builder = imageUrlBuilder(getSanityClient())
  }

  return builder.image(source)
}
