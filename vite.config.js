import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:5173,
    proxy: {
      '/api': {
        target: 'https://vidsphere-backend.vercel.app/', // Always remember to Replace your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },

  plugins: [react()],
})
