import { GetServerSideProps } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { SITE_URL } from '@/lib/seo'

interface StaticPageEntry {
  url: string
  changefreq: string
  priority: number
  lastmod?: string
  sourcePath?: string
}

// Static pages that should be in sitemap
const STATIC_PAGES: StaticPageEntry[] = [
  { url: '/', changefreq: 'daily', priority: 1.0, sourcePath: 'index.tsx' },
  { url: '/features', changefreq: 'weekly', priority: 0.9, sourcePath: 'features.tsx' },
  { url: '/content', changefreq: 'weekly', priority: 0.8, sourcePath: 'content/index.tsx' },
  { url: '/crisis-support', changefreq: 'monthly', priority: 1.0, sourcePath: 'crisis-support.tsx' }, // High priority for crisis resources
  { url: '/crisis/support', changefreq: 'monthly', priority: 0.9, sourcePath: 'crisis/support.tsx' },
  { url: '/blog', changefreq: 'daily', priority: 0.8, sourcePath: 'blog/index.tsx' },
  { url: '/about', changefreq: 'monthly', priority: 0.7, sourcePath: 'about.tsx' },
  { url: '/contact', changefreq: 'monthly', priority: 0.6, sourcePath: 'contact.tsx' },
  { url: '/help', changefreq: 'monthly', priority: 0.7, sourcePath: 'help.tsx' },
  { url: '/privacy', changefreq: 'monthly', priority: 0.5, sourcePath: 'privacy.tsx' },
  { url: '/terms', changefreq: 'monthly', priority: 0.5, sourcePath: 'terms.tsx' },
  { url: '/medical-disclaimer', changefreq: 'monthly', priority: 0.5, sourcePath: 'medical-disclaimer.tsx' },
  { url: '/hipaa-notice', changefreq: 'monthly', priority: 0.5, sourcePath: 'hipaa-notice.tsx' },
  { url: '/documentation', changefreq: 'monthly', priority: 0.6, sourcePath: 'documentation.tsx' },
  // Support resource pages
  { url: '/support/emotional-exhaustion-burnout', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/emotional-exhaustion-burnout.tsx' },
  { url: '/support/affordable-mental-health-care', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/affordable-mental-health-care.tsx' },
  { url: '/support/combat-loneliness-isolation', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/combat-loneliness-isolation.tsx' },
  { url: '/support/mindfulness-for-beginners', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/mindfulness-for-beginners.tsx' },
  { url: '/support/overcome-mental-health-stigma', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/overcome-mental-health-stigma.tsx' },
  { url: '/support/emotional-regulation-skills', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/emotional-regulation-skills.tsx' },
  { url: '/support/managing-anxiety-naturally', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/managing-anxiety-naturally.tsx' },
  { url: '/support/realistic-mental-health-expectations', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/realistic-mental-health-expectations.tsx' },
  { url: '/support/emotional-resistance-meditation', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/emotional-resistance-meditation.tsx' },
  { url: '/support/meditation-consistency', changefreq: 'monthly', priority: 0.7, sourcePath: 'support/meditation-consistency.tsx' },
  // Interactive Tool Pages
  { url: '/tools/free-mental-health-tools', changefreq: 'weekly', priority: 1.0, sourcePath: 'tools/free-mental-health-tools.tsx' },
  { url: '/tools/emotional-exhaustion-recovery', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/emotional-exhaustion-recovery.tsx' },
  { url: '/tools/anxiety-relief', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/anxiety-relief.tsx' },
  { url: '/tools/burnout-assessment', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/burnout-assessment.tsx' },
  { url: '/tools/mindfulness', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/mindfulness.tsx' },
  { url: '/tools/emotional-regulation', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/emotional-regulation.tsx' },
  { url: '/tools/loneliness-assessment', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/loneliness-assessment.tsx' },
  { url: '/tools/therapy-cost-calculator', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/therapy-cost-calculator.tsx' },
  { url: '/grounding/54321-grounding-script', changefreq: 'weekly', priority: 0.9, sourcePath: 'grounding/54321-grounding-script.tsx' },
  { url: '/tools/stigma-assessment', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/stigma-assessment.tsx' },
  { url: '/tools/meditation-tracker', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/meditation-tracker.tsx' },
  { url: '/tools/recovery-timeline', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/recovery-timeline.tsx' },
  { url: '/tools/substance-screening', changefreq: 'weekly', priority: 0.9, sourcePath: 'tools/substance-screening.tsx' },
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

async function enrichStaticPagesWithLastmod(
  pages: StaticPageEntry[]
): Promise<StaticPageEntry[]> {
  const pagesDir = path.join(process.cwd(), 'apps/web/src/pages')

  return Promise.all(
    pages.map(async (page) => {
      if (page.lastmod || !page.sourcePath) {
        return page
      }

      try {
        const stats = await fs.stat(path.join(pagesDir, page.sourcePath))
        return {
          ...page,
          lastmod: stats.mtime.toISOString(),
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Sitemap: could not determine lastmod for ${page.url}`, error)
        }
        return page
      }
    })
  )
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPages = await enrichStaticPagesWithLastmod(STATIC_PAGES)

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
  const sitemap = generateSiteMap(staticPages, blogPosts)

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
