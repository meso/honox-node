import { createApp } from 'honox/server'
import { showRoutes } from 'hono/dev'
import { serveStatic } from '@hono/node-server/serve-static'

const app = createApp()

// Serve static files in production
if (import.meta.env.PROD) {
  app.use('/static/*', serveStatic({ root: './dist/' }))
}

if (import.meta.env.NODE_ENV === 'development') {
  showRoutes(app)
}

export default app