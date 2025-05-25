/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rrcoder0167.is-a.dev/',
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