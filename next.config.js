const path = require('path');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isCloudflare = process.env.CF_PAGES === '1' || process.env.CI === 'true' || !isGitHubPages;

// Para GitHub Pages:
// - Si usas dominio personalizado (CNAME): basePath = '' (vacío)
// - Si usas migueldra.github.io/paginast: basePath = '/paginast'
// Por defecto, si tienes CNAME, usa '' (vacío). Cambia esto si necesitas el subpath.
const repoName = 'paginast';
const basePath = isGitHubPages ? (process.env.GITHUB_PAGES_BASE_PATH || '') : '';
const assetPrefix = basePath;

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
