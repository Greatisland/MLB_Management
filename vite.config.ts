import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["*.js"], // Or be more specific: ['sw.js']
  plugins: [react()],
})
