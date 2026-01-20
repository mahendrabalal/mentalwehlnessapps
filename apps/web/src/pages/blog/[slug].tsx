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
import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { AuthorSection } from '@/components/blog/AuthorSection'
import { AmazonProductCard } from '@/components/blog/AmazonProductCard'
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
      <Navbar variant="default" />

      <BlogHeader
        title="Mental Wellness Blog"
        subtitle="Expert education and coping strategies for your journey."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content Area */}
          <article className="lg:col-span-8">
            <header className="mb-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6 sm:text-5xl leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-wellness-600 mb-6 uppercase tracking-wider">
                {formattedDate ? <span>{formattedDate}</span> : null}
                {article.readingTime ? (
                  <>
                    <span aria-hidden="true" className="text-gray-300">•</span>
                    <span>{article.readingTime} min read</span>
                  </>
                ) : null}
                <span>• By {authors.length ? authors.map((a) => a.name).join(', ') : 'Editorial Team'}</span>
              </div>

              {clinicalReview?.reviewer ? (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 mb-8 flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">
                      Clinically reviewed by {clinicalReview.reviewer}
                      {clinicalReview.credential
                        ? `, ${clinicalReview.credential}`
                        : ''}
                    </p>
                    {clinicalReview.reviewedAt ? (
                      <p className="text-emerald-700 opacity-80">
                        Reviewed on{' '}
                        {format(new Date(clinicalReview.reviewedAt), 'MMMM d, yyyy')}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </header>

            {heroImageUrl ? (
              <div className="mb-12">
                <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImageUrl}
                    alt={article.heroImage?.alt ?? article.title}
                    className="aspect-[16/9] w-full object-cover bg-gray-50"
                  />
                </div>
              </div>
            ) : null}

            {/* Amazon Affiliate Integration - Specifically for the Hoodie Blog */}
            {article.slug.current === 'mental-health-matters-hoodie-trend-thats-changing-how-we-heal' && (
              <div className="mb-12">
                <div className="bg-wellness-50 rounded-3xl p-8 border border-wellness-100">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                      <AmazonProductCard
                        imageSrc="https://m.media-amazon.com/images/I/51LEhoIBG3L._AC_SY879_.jpg"
                        productUrl="https://www.amazon.com/garbings-Mental-Matters-Sweatshirt-Pullover/dp/B0FQ2FT5NZ?crid=2QNAU144QDWD9&dib=eyJ2IjoiMSJ9.C-ISoOYqOC8C_1hC8SKzafCL-pw3NYSjC5rl22ElPIwboTlyv1aujcjT0BMbuq5OFUKzmx43VHsfePGJqwmzlT6N-S6uV0x0tIWi-AeCXAZ220VwfaQKywleOWd7aE9jZyv5v1rkvoClXUUhgJOWPd98mhSF7P2caMDPU3LVww6SPr7WY-XakRHnYHqIemreYpDW-d5RZFu6aldEnssPlZJtOxGB1Qfs0ah5k3qxFL9mU-C53i1BxkdmkaFrW72KO3JT2erx-TLhA4mf5kaJTxZ2om4JZHYJsPp3Huk3tXI.nvVKLY08phn4lp_AuEi6VzvKUGDlPI7Y5Fw1Hc5zs_s&dib_tag=se&keywords=mental%2Bhealth%2Bmatters%2Bhoodie&qid=1768870230&sprefix=mental%2Bhealth%2Bmatters%2Bhoodi%2Caps%2C231&sr=8-2&th=1&linkCode=sl1&tag=mahendrabalal-20&linkId=e262408fefcbca9db5e481ad916d6ad5&language=en_US&ref_=as_li_ss_tl&psc=1"
                        title="Mental Health Matters Hoodie - Support Wellness"
                        price="$27.97"
                      />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                        Wear Your Support: The Official "Mental Health Matters" Hoodie
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        This isn't just a hoodie; it's a conversation starter and a symbol of your journey towards mental wellness. Made with ultra-soft cotton and premium fleece, it's designed for comfort and durability.
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        *As an Amazon Associate, we earn from qualifying purchases. This helps support our free mental health resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-lg prose-wellness max-w-none">
              <PortableTextRenderer
                value={article.body as PortableTextBlock[] | undefined}
              />
            </div>

            <HIPAAContentDisclaimer
              message={
                article.hipaaDisclaimerOverride ?? siteSettings?.hipaaDisclaimer ?? null
              }
              crisisHotline={siteSettings?.crisisHotline ?? null}
            />

            {authors.length > 0 && authors.map((author) => (
              <AuthorSection key={author._id} author={author} />
            ))}

            <footer className="mt-16 border-t border-gray-100 pt-10 text-sm text-gray-500">
              <div className="flex items-center justify-between">
                <p>Published by Mental Wellness App.</p>
                <a className="text-wellness-600 font-bold hover:underline" href="/blog">
                  Back to Resource Library
                </a>
              </div>
            </footer>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar topics={article.topics ?? undefined} />
            </div>
          </div>
        </div>
      </div>
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
