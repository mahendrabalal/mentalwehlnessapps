import { GetServerSideProps } from 'next'
import { SITE_URL } from '@/lib/seo'

interface StaticPageEntry {
  url: string
  changefreq: string
  priority: number
  lastmod?: string
}

// Static pages that should be in sitemap
const STATIC_PAGES: StaticPageEntry[] = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/features', changefreq: 'weekly', priority: 0.9 },
  { url: '/crisis-support', changefreq: 'monthly', priority: 1.0 }, // High priority for crisis resources
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/help', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms', changefreq: 'monthly', priority: 0.5 },
  { url: '/medical-disclaimer', changefreq: 'monthly', priority: 0.5 },
  { url: '/hipaa-notice', changefreq: 'monthly', priority: 0.5 },
  { url: '/documentation', changefreq: 'monthly', priority: 0.6 },
  // Support resource pages
  { url: '/support/emotional-exhaustion-burnout', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/affordable-mental-health-care', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/combat-loneliness-isolation', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/mindfulness-for-beginners', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/overcome-mental-health-stigma', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/emotional-regulation-skills', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/managing-anxiety-naturally', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/realistic-mental-health-expectations', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/emotional-resistance-meditation', changefreq: 'monthly', priority: 0.7 },
  { url: '/support/meditation-consistency', changefreq: 'monthly', priority: 0.7 },
  // Interactive Tool Pages
  { url: '/tools/anxiety-relief', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/burnout-assessment', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/mindfulness', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/emotional-regulation', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/loneliness-assessment', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/therapy-cost-calculator', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/stigma-assessment', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/meditation-tracker', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/recovery-timeline', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/substance-screening', changefreq: 'weekly', priority: 0.9 },
]

function formatLastmod(date?: string) {
  if (!date) {
    return undefined
  }

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return undefined
  }

  return parsed.toISOString()
}

function renderUrlEntry({
  loc,
  changefreq,
  priority,
  lastmod,
}: {
  loc: string
  changefreq: string
  priority: number
  lastmod?: string
}) {
  const lines = [
    '  <url>',
    `    <loc>${loc}</loc>`,
  ]

  if (lastmod) {
    lines.push(`    <lastmod>${lastmod}</lastmod>`)
  }

  lines.push(`    <changefreq>${changefreq}</changefreq>`)
  lines.push(`    <priority>${priority}</priority>`)
  lines.push('  </url>')

  return lines.join('\n')
}

function generateSiteMap(
  pages: StaticPageEntry[],
  blogPosts: Array<{ slug: string; updatedAt?: string }>
) {
  const baseUrl = SITE_URL
  const generatedAt = new Date().toISOString()

  const staticEntries = pages
    .map((page) =>
      renderUrlEntry({
        loc: `${baseUrl}${page.url}`,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: formatLastmod(page.lastmod) ?? generatedAt,
      })
    )
    .join('\n')

  const blogEntries = blogPosts
    .map(({ slug, updatedAt }) =>
      renderUrlEntry({
        loc: `${baseUrl}/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: formatLastmod(updatedAt) ?? generatedAt,
      })
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticEntries}
${blogEntries}
</urlset>`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch blog posts from CMS (if available)
  let blogPosts: Array<{ slug: string; updatedAt?: string }> = []

  try {
    // Try to fetch blog posts from Sanity CMS
    const { fetchArticles } = await import('@/lib/cms/articleService')
    const articles = await fetchArticles()

    blogPosts = articles.map((article) => ({
      slug: article.slug.current,
      updatedAt:
        article.updatedAt ||
        article._updatedAt ||
        article.publishedAt ||
        article._createdAt,
    }))
  } catch (error) {
    console.log('Could not fetch blog posts for sitemap:', error)
    // Continue without blog posts
  }

  // Generate the XML sitemap
  const sitemap = generateSiteMap(STATIC_PAGES, blogPosts)

  res.setHeader('Content-Type', 'text/xml')
  // Cache for 1 hour
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
