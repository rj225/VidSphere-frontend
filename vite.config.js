import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:5173,
    proxy: {
      '/api': {
        target: 'https://vidsphere-backend.onrender.com/', // Always remember to Replace your backend server URL http://localhost:3000/
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },

  plugins: [react()],
})
