#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Building for Cloudflare Pages with OpenNext...');

try {
  // @opennextjs/cloudflare build automáticamente ejecuta npm run build (next build)
  // No necesitamos ejecutar next build manualmente para evitar bucles infinitos
  console.log('Running OpenNext build (this will automatically run next build)...');
  execSync('npx @opennextjs/cloudflare build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
