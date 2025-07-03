/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://cow.foundation',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ['*'], // Exclude all pages from sitemap
  outDir: './public',
  // Disable sitemap generation entirely by excluding all paths
  additionalPaths: async () => {
    return []
  },
  transform: async (config, url) => {
    // Return null to exclude all URLs from sitemap
    return null
  },
}