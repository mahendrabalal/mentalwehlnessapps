import { CmsArticle, CmsSiteSettings } from '@mental-wellness/shared'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { fetchArticles, fetchSiteSettings } from '@/lib/cms/articleService'
import { SEOHead, SEO_CONFIG } from '@/components/SEOHead'
import { buildAbsoluteUrl, buildBreadcrumbList } from '@/lib/seo'
import { BLOG_PAGES_DATES } from '@/lib/seo-constants'

interface BlogIndexProps {
  articles: CmsArticle[]
  siteSettings: CmsSiteSettings | null
  preview?: boolean
}

export default function BlogIndexPage({
  articles,
  siteSettings,
  preview,
}: BlogIndexProps) {
  const title = siteSettings?.title ?? SEO_CONFIG.blog.title
  const description =
    siteSettings?.description ?? SEO_CONFIG.blog.description
  const ogDescription =
    siteSettings?.socialSharing?.metaDescription ?? description

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      url: buildAbsoluteUrl('/blog'),
      name: title,
      description,
      blogPost: articles.slice(0, 10).map((article) => ({
        '@type': 'BlogPosting',
        headline: article.seo?.metaTitle ?? article.title,
        description: article.seo?.metaDescription ?? article.excerpt,
        url: buildAbsoluteUrl(`/blog/${article.slug.current}`),
        datePublished: article.publishedAt ?? article._createdAt,
        dateModified: article.updatedAt ?? article._updatedAt ?? article.publishedAt ?? article._createdAt,
      })),
    },
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'Resource Library', url: '/blog' },
    ]),
  ]

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={SEO_CONFIG.blog.keywords}
        ogImage="/og-default.png"
        publishedTime={BLOG_PAGES_DATES.index.published}
        modifiedTime={BLOG_PAGES_DATES.index.modified}
        structuredData={structuredData}
      >
        <meta
          property="og:description"
          content={ogDescription}
        />
      </SEOHead>
      <Navbar variant="default" />

      <BlogHeader
        title="Mental Wellness Library"
        subtitle="Expert education and coping strategies for your mental health journey."
      />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-16 text-center text-gray-600">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Articles coming soon
            </h2>
            <p className="max-w-md mx-auto text-lg mb-8">
              We're currently preparing high-quality content for our resource library. Check back soon!
            </p>
            {preview ? (
              <span className="font-semibold text-wellness-700">
                Preview mode active
              </span>
            ) : (
              <Link className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors" href="/admin">
                Open Studio
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}


export const getStaticProps: GetStaticProps<BlogIndexProps> = async ({
  preview = false,
}) => {
  const [articles, siteSettings] = await Promise.all([
    fetchArticles({ includeDrafts: preview, preview }),
    fetchSiteSettings({ preview }),
  ])

  return {
    props: {
      articles,
      siteSettings,
      preview,
    },
    revalidate: 60,
  }
}
