import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User/organization GitHub Pages site (vasco1290.github.io) is served at the
// domain root, so the base path is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
