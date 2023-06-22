import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
dotenv.config({ path: '.env.production' }) //배포 환경에서 사용

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MLB_Management/", 
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/api': {  //#1. axios라이브러리 등으로 http 요청인데 api로 시작하면,
        target: 'https://api.notion.com/v1/',  //#2. 이쪽 주소로 매핑하여 백그라운드로 보내라.
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  }  
})
