import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'https://vidsphere-backend-production.up.railway.app/', //
        target: "https://vidsphere-backend.onrender.com/",
        // target:'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, 
    sourcemap: false,  
  },

  plugins: [react()],
})
