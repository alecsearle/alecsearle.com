import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { DISCORD_INVITE_URL, DISCORD_LIVE, NAV_LINKS, YOUTUBE_CHANNEL_URL } from '../../config/site'

// `current` is the page's path (e.g. "/gear"), passed in rather than read from
// the URL so the prerendered HTML already has the right link underlined.
// Desktop (lg and up) shows the links in the bar; phones and tablets get a
// menu button that opens them full width under the bar.
export default function SiteNav({ current = '' }) {
  const [open, setOpen] = useState(false)

  const links = [
    ...NAV_LINKS,
    ...(DISCORD_LIVE ? [{ label: 'Discord', href: DISCORD_INVITE_URL, external: true }] : []),
    { label: 'YouTube', href: YOUTUBE_CHANNEL_URL, external: true },
  ].map((link) => ({ ...link, active: !link.external && current.startsWith(link.href) }))

  // Close on Escape, and if the window grows to desktop width while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const desktop = matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const linkProps = ({ href, external, active }) => ({
    href,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
    'aria-current': active ? 'page' : undefined,
  })

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-ink/10">
      <nav className="max-w-page mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <a href="/" className="font-display text-xl leading-none tracking-tight flex-shrink-0">
          Alec Searle
        </a>
        <div className="flex items-center gap-2 lg:gap-6">
          <ul className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  {...linkProps(link)}
                  className={`block py-2 text-sm whitespace-nowrap transition-colors ${
                    link.active
                      ? 'text-ink underline underline-offset-[6px] decoration-accent decoration-2'
                      : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden -mr-2 p-2 text-ink/70 hover:text-ink transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="site-menu" className="lg:hidden absolute inset-x-0 top-full border-y border-ink/10 bg-paper shadow-lg">
          <ul className="max-w-page mx-auto px-5 sm:px-8 py-2">
            {links.map((link) => (
              <li key={link.label} className="border-b border-ink/10 last:border-b-0">
                <a
                  {...linkProps(link)}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 font-display text-3xl transition-colors ${
                    link.active ? 'text-accent' : 'hover:text-accent'
                  }`}
                >
                  {link.label}
                  <span className="text-xl text-ink/40">{link.external ? '↗' : '→'}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
