import ThemeToggle from './ThemeToggle'
import { DISCORD_INVITE_URL, DISCORD_LIVE, NAV_LINKS, YOUTUBE_CHANNEL_URL } from '../../config/site'

// `current` is the page's path (e.g. "/gear"), passed in rather than read from
// the URL so the prerendered HTML already has the right link underlined.
export default function SiteNav({ current = '' }) {
  const links = [
    ...NAV_LINKS,
    ...(DISCORD_LIVE ? [{ label: 'Discord', href: DISCORD_INVITE_URL, external: true }] : []),
    // Once Discord is in the nav there's no room for both on a phone, and the
    // hero's social row already links YouTube, so hide it there on small screens.
    { label: 'YouTube', href: YOUTUBE_CHANNEL_URL, external: true, desktopOnly: DISCORD_LIVE },
  ]

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-ink/10">
      <nav className="max-w-page mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <a href="/" className="font-display text-2xl leading-none tracking-tight flex-shrink-0">
          Alec Searle
        </a>
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
        <ul className="flex items-center gap-5 sm:gap-7 overflow-x-auto hide-scrollbar">
          {links.map(({ label, href, external, desktopOnly }) => {
            const active = !external && current.startsWith(href)
            return (
              <li key={label} className={desktopOnly ? 'hidden sm:block' : undefined}>
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-current={active ? 'page' : undefined}
                  className={`block py-2 text-sm whitespace-nowrap transition-colors ${
                    active ? 'text-ink underline underline-offset-[6px] decoration-accent decoration-2' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
        <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
