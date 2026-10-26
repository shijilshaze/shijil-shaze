import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/shijil-shaze/',  
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})