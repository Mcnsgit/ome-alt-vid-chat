import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    global: 'window',
  },
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      },
      '/api': {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: import.meta.env.VITE_WS_URL,
        ws: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true  
  }
});