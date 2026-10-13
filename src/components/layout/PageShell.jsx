import { Analytics } from '@vercel/analytics/react'
import SiteNav from './SiteNav'
import Footer from './Footer'

// Shared frame for every page: nav, content, footer, analytics.
// footerSocials=false on pages that already show the social row up top.
export default function PageShell({ children, footerSocials = true }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <Footer socials={footerSocials} />
      <Analytics />
    </div>
  )
}
