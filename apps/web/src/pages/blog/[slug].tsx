import {
  CmsArticle,
  CmsAuthor,
  CmsSiteSettings,
} from '@mental-wellness/shared'
import type { PortableTextBlock } from '@portabletext/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { HIPAAContentDisclaimer } from '@/components/blog/HIPAAContentDisclaimer'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'
import {
  fetchArticleBySlug,
  fetchArticleSlugs,
  fetchSiteSettings,
} from '@/lib/cms/articleService'
import { urlFor } from '@/lib/cms/image'
import {
  buildAbsoluteUrl,
  buildBreadcrumbList,
  organizationStructuredData,
} from '@/lib/seo'

interface BlogArticlePageProps {
  article: CmsArticle
  siteSettings: CmsSiteSettings | null
  preview?: boolean
}

export default function BlogArticlePage({
  article,
  siteSettings,
  preview,
}: BlogArticlePageProps) {
  const ogImage =
    article.seo?.metaTitle && article.heroImage
      ? urlFor(article.heroImage).width(1200).height(630).url()
      : null

  const publishedDate = article.publishedAt || article._createdAt
  const formattedDate = publishedDate
    ? format(new Date(publishedDate), 'MMMM d, yyyy')
    : null

  const clinicalReview = article.clinicalReview
  const authors: CmsAuthor[] = article.authors ?? []

  const pageTitle = article.seo?.metaTitle ?? article.title
  const pageDescription = article.seo?.metaDescription ?? article.excerpt

  // Internal keywords for analytics and content tracking (not rendered as meta tag)
  const articleKeywords = [
    ...(article.focusKeyword ? [article.focusKeyword] : []),
    ...(article.relatedKeywords ?? []),
    ...(article.seo?.keywords ?? []),
    ...(article.topics ?? []),
  ]

  const heroImageUrl = useMemo(() => {
    if (!article.heroImage) return null
    return urlFor(article.heroImage).width(1600).auto('format').url()
  }, [article.heroImage])

  const articleUrl = buildAbsoluteUrl(`/blog/${article.slug.current}`)
  const updatedDate = article.updatedAt ?? article._updatedAt ?? publishedDate ?? undefined

  // TODO: Add conditional FAQ/HowTo schema based on article.contentType
  // - If contentType === 'faq', use buildFaqStructuredData()
  // - If contentType === 'howto', use buildHowToStructuredData()
  // - If contentType === 'article', use MedicalScholarlyArticle (current behavior)
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalScholarlyArticle',
      headline: pageTitle,
      description: pageDescription,
      url: articleUrl,
      datePublished: publishedDate,
      dateModified: updatedDate ?? publishedDate,
      image: ogImage ?? heroImageUrl ?? buildAbsoluteUrl('/og-default.png'),
      author: authors.length
        ? authors.map((author) => ({
          '@type': 'Person',
          name: author.name,
        }))
        : undefined,
      publisher: organizationStructuredData({ includeContext: false }),
      isAccessibleForFree: true,
      inLanguage: article.language ?? 'en-US',
    },
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Resource Library', url: '/blog' },
      { name: article.title, url: articleUrl },
    ]),
  ]

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        ogType="article"
        ogImage={ogImage ?? heroImageUrl ?? '/og-default.png'}
        ogImageAlt={article.heroImage?.alt ?? article.title}
        publishedTime={publishedDate ?? undefined}
        modifiedTime={updatedDate}
        author={authors.length ? authors.map((author) => author.name).join(', ') : undefined}
        keywords={articleKeywords}
        structuredData={structuredData}
      />
      <Navbar variant="marketing" />
      <article className="pb-24">
        <header className="bg-gradient-to-b from-wellness-50 via-white to-white">
          <div className="mx-auto max-w-3xl px-4 pt-24 pb-16 sm:px-6 lg:px-0">
            <div className="flex flex-col gap-6">
              {preview ? (
                <span className="w-fit rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Preview mode
                </span>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-wide text-wellness-700">
                Mental Wellness Library
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                {formattedDate ? <span>{formattedDate}</span> : null}
                {article.readingTime ? (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{article.readingTime} min read</span>
                  </>
                ) : null}
                {authors.length ? (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>
                      {authors.map((author) => author.name).join(', ')}
                    </span>
                  </>
                ) : null}
              </div>
              {clinicalReview?.reviewer ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  <p className="font-semibold">
                    Clinically reviewed by {clinicalReview.reviewer}
                    {clinicalReview.credential
                      ? `, ${clinicalReview.credential}`
                      : ''}
                  </p>
                  {clinicalReview.reviewedAt ? (
                    <p>
                      Reviewed on{' '}
                      {format(new Date(clinicalReview.reviewedAt), 'MMMM d, yyyy')}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </header>
        {heroImageUrl ? (
          <div className="mx-auto mb-12 max-w-3xl px-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageUrl}
                alt={article.heroImage?.alt ?? article.title}
                className="max-h-[350px] w-full object-cover bg-gray-50"
              />
            </div>
          </div>
        ) : null}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
          <PortableTextRenderer
            value={article.body as PortableTextBlock[] | undefined}
          />
          <HIPAAContentDisclaimer
            message={
              article.hipaaDisclaimerOverride ?? siteSettings?.hipaaDisclaimer ?? null
            }
            crisisHotline={siteSettings?.crisisHotline ?? null}
          />
          <footer className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
            <p>
              Published by Mental Wellness App.{' '}
              <a className="text-wellness-600 underline" href="/blog">
                Back to articles
              </a>
            </p>
          </footer>
        </div>
      </article>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchArticleSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<BlogArticlePageProps> = async ({
  params,
  preview = false,
}) => {
  const slug = params?.slug
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  const [article, siteSettings] = await Promise.all([
    fetchArticleBySlug(slug, { preview }),
    fetchSiteSettings({ preview }),
  ])

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
      siteSettings,
      preview,
    },
    revalidate: 60,
  }
}
