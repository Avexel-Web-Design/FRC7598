import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FRC7598/', // This matches the repository name for GitHub Pages
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
  },
  // Add optimizeDeps configuration
  optimizeDeps: {
    include: ['@/assets/**/*'],
  },
});