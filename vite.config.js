import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy requests to the specified target
      '/api': {
        target: 'http://57.151.104.191:8888',
        changeOrigin: true,
        // Optional configuration to allow specific hosts
        allowedHosts: ['57.151.104.191']
      }
    }
  }
})
