import { CmsArticle } from '@mental-wellness/shared'
import { format } from 'date-fns'
import Link from 'next/link'
import { urlFor } from '../../lib/cms/image'

interface ArticleCardProps {
  article: CmsArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = article.publishedAt || article._createdAt
  const formattedDate = publishedDate
    ? format(new Date(publishedDate), 'MMM d, yyyy')
    : 'Unscheduled'

  const heroUrl = article.heroImage
    ? urlFor(article.heroImage).width(800).height(480).auto('format').url()
    : null

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {heroUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroUrl}
          alt={article.heroImage?.alt ?? article.title}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {formattedDate}
          {article.readingTime ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{article.readingTime} min read</span>
            </>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
        <p className="text-gray-600">{article.excerpt}</p>
        {article.topics?.length ? (
          <div className="flex flex-wrap gap-2">
            {article.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-wellness-50 px-3 py-1 text-xs font-medium text-wellness-700"
              >
                {topic}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto">
          <Link
            href={`/blog/${article.slug.current}`}
            className="inline-flex items-center gap-2 font-semibold text-wellness-600 hover:text-wellness-700"
          >
            Continue reading<span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
