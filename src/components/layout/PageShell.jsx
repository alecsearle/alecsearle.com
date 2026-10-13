import { Analytics } from '@vercel/analytics/react'
import SiteNav from './SiteNav'
import Footer from './Footer'

// Shared frame for every page: nav, content, footer, analytics.
export default function PageShell({ current, children }) {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <SiteNav current={current} />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
    </div>
  )
}
