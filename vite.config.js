import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    allowedHosts: [
      "4fb9-24-206-110-82.ngrok-free.app"
    ],
    port: 3000,
    open: true
  }
})
