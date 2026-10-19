import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        // In-page anchors (/blank#earth-island) are the same document.
        filter: ({ path }) => !path.includes('#'),
      },
      pages: [
        { path: '/' },
        { path: '/blank' },
        { path: '/blank-2' },
        { path: '/blank-3' },
        { path: '/blank-4' },
        { path: '/blank-5' },
        { path: '/blank-5-1' },
        { path: '/blank-5-1-1' },
        { path: '/blank-5-1-1-1' },
      ],
    }),
    viteReact(),
  ],
})
