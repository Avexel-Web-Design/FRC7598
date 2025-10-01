import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For Cloudflare Pages the site is served from the root, so base should be '/'
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    fs: {
      strict: false, // Allow serving files from outside the project root
      allow: ['..'], // Allow serving files from parent directory
    },
    proxy: {
      // Forward API calls to local Cloudflare Pages Functions dev server
      '/api': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true,
        // Cloudflare Pages dev server serves functions under same origin; this proxy simplifies fetch('/api/...') in dev
      },
    },
  },
  // Add optimizeDeps configuration
  optimizeDeps: {
    include: ['@/assets/**/*'],
  },
});