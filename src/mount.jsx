import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'

// Pages listed in scripts/prerender.mjs ship with their HTML already in #root,
// so they show instantly and React just attaches to it. Everything else (and
// `npm run dev`) renders from scratch.
export default function mount(Page) {
  const root = document.getElementById('root')
  const app = (
    <StrictMode>
      <Page />
    </StrictMode>
  )
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)
}
