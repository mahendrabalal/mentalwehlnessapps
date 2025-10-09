import { CmsArticle, CmsSiteSettings } from '@mental-wellness/shared'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { fetchArticles, fetchSiteSettings } from '@/lib/cms/articleService'

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
  return (
    <>
      <Head>
        <title>{siteSettings?.title ?? 'Mental Wellness Library'}</title>
        {siteSettings?.description ? (
          <meta name="description" content={siteSettings.description} />
        ) : null}
        <meta
          property="og:title"
          content={siteSettings?.socialSharing?.metaTitle ?? 'Mental Wellness Library'}
        />
        {siteSettings?.socialSharing?.metaDescription ? (
          <meta
            property="og:description"
            content={siteSettings.socialSharing.metaDescription}
          />
        ) : null}
      </Head>
      <Navbar />
      <section className="bg-gradient-to-b from-wellness-50 via-white to-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 text-center sm:gap-8">
            <span className="inline-flex items-center justify-center rounded-full bg-wellness-100 px-4 py-1 text-sm font-semibold text-wellness-700">
              Expert insights for whole-person care
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Mental Wellness Knowledge Hub
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Clinically reviewed education, coping strategies, and stories to support
              members, providers, and families navigating behavioral health care.
            </p>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800">
              Articles coming soon
            </h2>
            <p className="mt-3">
              Sanity Studio is ready—publish your first article to see it here.{' '}
              {preview ? (
                <span className="font-semibold text-wellness-700">
                  Preview mode active
                </span>
              ) : (
                <Link className="text-wellness-600 underline" href="/admin">
                  Open Studio
                </Link>
              )}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
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
