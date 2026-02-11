import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    // Base relative path ensures assets work on https://<user>.github.io/<repo>/
    base: './', 
    define: {
      // Prevent "process is not defined" error in browser
      'process.env': {},
      // Expose the API Key from environment variable (GitHub Secrets) during build
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})