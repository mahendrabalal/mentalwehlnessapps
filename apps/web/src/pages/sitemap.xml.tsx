import { GetServerSideProps } from 'next'

// Static pages that should be in sitemap
const STATIC_PAGES = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/pricing', changefreq: 'weekly', priority: 0.9 },
  { url: '/features', changefreq: 'weekly', priority: 0.9 },
  { url: '/crisis-support', changefreq: 'monthly', priority: 1.0 }, // High priority for crisis resources
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/help', changefreq: 'monthly', priority: 0.7 },
  { url: '/free-trial', changefreq: 'weekly', priority: 0.7 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms', changefreq: 'monthly', priority: 0.5 },
  { url: '/medical-disclaimer', changefreq: 'monthly', priority: 0.5 },
  { url: '/hipaa-notice', changefreq: 'monthly', priority: 0.5 },
  { url: '/documentation', changefreq: 'monthly', priority: 0.6 },
  // Interactive Tool Pages
  { url: '/tools/anxiety-relief', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/burnout-assessment', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/mindfulness', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/emotional-regulation', changefreq: 'weekly', priority: 0.9 },
]

function generateSiteMap(pages: typeof STATIC_PAGES, blogPosts: Array<{ slug: string; updatedAt: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentalwellnessapps.com'

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${pages
    .map(({ url, changefreq, priority }) => {
      return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('')}
  ${blogPosts
    .map(({ slug, updatedAt }) => {
      return `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join('')}
</urlset>`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Fetch blog posts from CMS (if available)
  let blogPosts: Array<{ slug: string; updatedAt: string }> = []

  try {
    // Try to fetch blog posts from Sanity CMS
    const { fetchArticles } = await import('@/lib/cms/articleService')
    const articles = await fetchArticles()

    blogPosts = articles.map(article => ({
      slug: article.slug.current,
      updatedAt: article.updatedAt || article._updatedAt || article.publishedAt || new Date().toISOString()
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
