import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HonoX Todo App</title>
        <link rel="stylesheet" href="/static/style.css" />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <Script src="/app/client.ts" />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
})