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

  // Arriving from another page with a #section link: the browser tries to jump
  // before React has drawn the page, so jump again once it has.
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1))
    let tries = 0
    const jump = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'instant' })
      else if (++tries < 30) requestAnimationFrame(jump)
    }
    requestAnimationFrame(jump)
  }
}
