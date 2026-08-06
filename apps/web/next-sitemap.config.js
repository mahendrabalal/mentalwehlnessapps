/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentalwellnessapps.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/user/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/user/*/dashboard', '/user/*/profile', '/user/*/settings', '/user/*/assessment*', '/user/*/results*'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/user/*/dashboard', '/user/*/profile', '/user/*/settings'],
      }
    ],
  },
}
