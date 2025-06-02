import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['campsite-client'],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
})
