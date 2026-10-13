// Shared editorial building blocks: page intro, section heading, text link.

export function PageIntro({ eyebrow, title, children }) {
  return (
    <header className="max-w-page mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
      {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
      <h1 className="font-display text-6xl sm:text-8xl leading-[0.95] tracking-tight mt-3">{title}</h1>
      {children && <div className="mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">{children}</div>}
    </header>
  )
}

// Hairline-topped section with the heading in a left column on desktop.
export function Section({ id, number, title, intro, children, aside }) {
  return (
    <section id={id} className="max-w-page mx-auto px-5 sm:px-8 scroll-mt-20">
      <div className="border-t border-ink/15 pt-8 sm:pt-10 mt-14 sm:mt-20 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            {number && <p className="text-sm text-ink/40 tabular-nums">{number}</p>}
            <h2 className="font-display text-4xl sm:text-5xl leading-none tracking-tight mt-1">{title}</h2>
            {intro && <p className="text-sm text-ink/60 mt-4 leading-relaxed max-w-xs">{intro}</p>}
            {aside}
          </div>
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  )
}

export function TextLink({ href, children, external = true, sponsored = false, className = '' }) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: `noopener noreferrer${sponsored ? ' sponsored' : ''}` })}
      className={`text-sm font-medium underline underline-offset-4 decoration-ink/25 hover:decoration-accent hover:text-accent transition-colors ${className}`}
    >
      {children}
    </a>
  )
}

export function Contents({ items }) {
  return (
    <nav className="max-w-page mx-auto px-5 sm:px-8">
      <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-ink/60 hover:text-ink transition-colors">
              <span className="text-ink/35 tabular-nums mr-1.5">{String(i + 1).padStart(2, '0')}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
