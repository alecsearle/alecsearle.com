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
export function Section({ id, title, intro, children, aside }) {
  return (
    <section id={id} className="max-w-page mx-auto px-5 sm:px-8 scroll-mt-20">
      <div className="border-t border-ink/15 pt-6 sm:pt-10 mt-10 sm:mt-20 grid gap-6 sm:gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h2 className="font-display text-4xl sm:text-5xl leading-none tracking-tight">{title}</h2>
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

// "On this page" jump links. One swipeable row on phones, wrapping on desktop.
export function Contents({ items }) {
  return (
    <nav aria-label="On this page" className="max-w-page mx-auto px-5 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">On this page</p>
      <ul className="mt-3 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto hide-scrollbar sm:flex-wrap">
        {items.map((item) => (
          <li key={item.id} className="flex-shrink-0">
            <a
              href={`#${item.id}`}
              className="block whitespace-nowrap text-sm px-4 py-2 rounded-full border border-ink/20 hover:border-accent hover:text-accent transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Primary action, e.g. the buy link on a product. `solid` for the one main
// call to action on a page; outlined everywhere else.
export function ButtonLink({ href, children, sponsored = false, solid = false, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel={`noopener noreferrer${sponsored ? ' sponsored' : ''}`}
      className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
        solid ? 'bg-ink text-paper hover:bg-accent' : 'border border-ink/25 hover:border-accent hover:text-accent'
      } ${className}`}
    >
      {children}
    </a>
  )
}

// Affiliate disclosure, placed before the first buy link on a page.
export function AffiliateNote({ className = '' }) {
  return (
    <p className={`text-sm text-ink/70 leading-relaxed ${className}`}>
      Some of these are affiliate links. If you buy through them I get a small cut, at no extra cost to you.
    </p>
  )
}
