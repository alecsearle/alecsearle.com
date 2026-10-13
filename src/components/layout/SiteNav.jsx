import { DISCORD_INVITE_URL, DISCORD_LIVE, NAV_LINKS } from '../../config/site'

export default function SiteNav() {
  const here = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const links = [
    ...NAV_LINKS,
    ...(DISCORD_LIVE ? [{ label: 'Discord', href: DISCORD_INVITE_URL, external: true }] : []),
  ]

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/85 backdrop-blur border-b border-white/[0.06]">
      <nav className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/images/alec-avatar.jpg"
            alt=""
            className="w-7 h-7 rounded-full object-cover border border-white/10"
            style={{ objectPosition: '50% 15%' }}
          />
          <span className="text-sm font-semibold tracking-tight">alec_searle</span>
        </a>
        {links.length > 0 && (
          <ul className="flex items-center gap-5 overflow-x-auto hide-scrollbar">
            {links.map(({ label, href, external }) => {
              const active = !external && here.startsWith(href)
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm whitespace-nowrap transition-colors ${
                      active ? 'text-white font-medium' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </nav>
    </header>
  )
}
