import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Each page is its own HTML entry so link previews (Open Graph tags) work
// per page without server rendering. To add a page (gear, learn, builds),
// add it here and to vercel.json.
const PAGES = ['gear', 'learn', 'builds', 'giveaway', 'giveaway/rules']

// Vite only serves /giveaway/ (trailing slash); /giveaway falls back to the
// homepage. Rewrite so the slashless URL works in dev and preview like on Vercel.
function cleanPageUrls() {
  const rewrite = (req, _res, next) => {
    const [path, query] = req.url.split('?')
    if (PAGES.includes(path.replace(/^\//, ''))) {
      req.url = `${path}/${query ? `?${query}` : ''}`
    }
    next()
  }
  return {
    name: 'clean-page-urls',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [react(), cleanPageUrls()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Vercel serves dist/404.html for any URL that doesn't exist.
        notFound: resolve(__dirname, '404.html'),
        ...Object.fromEntries(PAGES.map((p) => [p.replace('/', '-'), resolve(__dirname, `${p}/index.html`)])),
      },
    },
  },
})
