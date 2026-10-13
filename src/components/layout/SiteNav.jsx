import { DISCORD_INVITE_URL, DISCORD_LIVE, NAV_LINKS, YOUTUBE_CHANNEL_URL } from '../../config/site'

export default function SiteNav() {
  const here = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const links = [
    ...NAV_LINKS,
    ...(DISCORD_LIVE ? [{ label: 'Discord', href: DISCORD_INVITE_URL, external: true }] : []),
    { label: 'YouTube', href: YOUTUBE_CHANNEL_URL, external: true },
  ]

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-ink/10">
      <nav className="max-w-page mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <a href="/" className="font-display text-2xl leading-none tracking-tight flex-shrink-0">
          Alec Searle
        </a>
        <ul className="flex items-center gap-5 sm:gap-7 overflow-x-auto hide-scrollbar">
          {links.map(({ label, href, external }) => {
            const active = !external && here.startsWith(href)
            return (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm whitespace-nowrap transition-colors ${
                    active ? 'text-ink underline underline-offset-[6px] decoration-accent decoration-2' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
