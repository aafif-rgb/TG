import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  preview: {
    // Configure preview server to handle SPA routing
    // This ensures that refreshing on any route works correctly
    port: 4173,
    strictPort: false,
  },
  server: {
    // Configure dev server to handle SPA routing
    port: 5173,
    strictPort: false,
  },
})
