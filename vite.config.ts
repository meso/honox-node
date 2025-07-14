import { defineConfig } from 'vite'
import honox from 'honox/vite'
import build from '@hono/vite-build/node'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './app/client.ts',
          output: {
            dir: './dist/static',
            entryFileNames: 'client.js',
          },
        },
        copyPublicDir: false,
        emptyOutDir: false,
      },
    }
  } else {
    return {
      plugins: [
        honox(),
        build({
          entry: './app/server.ts',
          external: ['better-sqlite3'],
          port: parseInt(process.env.PORT || '3000'),
        })
      ],
      ssr: {
        external: ['better-sqlite3']
      }
    }
  }
})