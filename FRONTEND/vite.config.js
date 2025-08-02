import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import path from 'path' // <-- ADD THIS

export default defineConfig({
  server: {
    https: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <-- ADD THIS
    },
  },
  plugins: [react(), mkcert()],
})
