#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Building for Cloudflare Pages...');

try {
  // Ejecutar build de Next.js
  console.log('Step 1: Building Next.js...');
  execSync('next build', { stdio: 'inherit' });
  
  // Ejecutar build de OpenNext para Cloudflare
  console.log('Step 2: Building OpenNext for Cloudflare...');
  execSync('npx @opennextjs/cloudflare build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
