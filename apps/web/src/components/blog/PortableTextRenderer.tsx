import { PortableText, type PortableTextBlock } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import clsx from 'clsx'
import { urlFor } from '../../lib/cms/image'

interface PortableTextRendererProps {
  value?: PortableTextBlock[]
  className?: string
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(1600).auto('format').url()
      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          {value.caption ? (
            <figcaption className="px-4 py-3 text-sm text-gray-600">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
    callout: ({ value }) => {
      const tone =
        value.intent === 'critical'
          ? 'bg-red-50 border-red-200 text-red-800'
          : value.intent === 'warning'
            ? 'bg-amber-50 border-amber-200 text-amber-800'
            : value.intent === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
      return (
        <aside
          className={clsx(
            'my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed',
            tone
          )}
        >
          {value.body}
        </aside>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value.nofollow ? 'noopener noreferrer nofollow' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="font-medium text-wellness-600 underline hover:text-wellness-700"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900">{children}</h3>
    ),
  },
}

export function PortableTextRenderer({
  value,
  className,
}: PortableTextRendererProps) {
  if (!value?.length) return null

  return (
    <div className={clsx('prose prose-lg prose-slate max-w-none', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
