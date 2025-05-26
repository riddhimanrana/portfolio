/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://riddhimanrana.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}