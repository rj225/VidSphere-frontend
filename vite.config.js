import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://vidsphere-backend.onrender.com/', // Always remember to Replace your backend server URL http://localhost:3000/
        // target:'http://localhost:3000/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: 'dist',  // Output directory
    sourcemap: false,  // Disable sourcemaps in production for better performance
  },

  plugins: [react()],
})
