import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure environment variables are loaded properly
  envPrefix: 'VITE_',
  // Add better error handling for missing env vars
  define: {
    // This helps with debugging environment issues
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  }
})