const path = require('path');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isCloudflare = process.env.CF_PAGES === '1' || process.env.CI === 'true' || !isGitHubPages;
const basePath = isGitHubPages ? '/landingpage' : '';
const assetPrefix = isGitHubPages ? '/landingpage' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Para Cloudflare con OpenNext, usar 'standalone'. Para GitHub Pages, usar 'export'
  output: isGitHubPages ? 'export' : (process.env.NEXT_OUTPUT_MODE || 'standalone'),
  basePath: basePath,
  assetPrefix: assetPrefix,
  outputFileTracingRoot: path.join(__dirname, '../'),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
