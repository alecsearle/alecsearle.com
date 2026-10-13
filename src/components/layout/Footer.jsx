import { SOCIALS } from '../SocialLinks'

const FOOTER_LINKS = SOCIALS.map((s) => [s.label, s.href])

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-4xl leading-tight">Follow along.</p>
          <p className="text-sm text-ink/60 mt-3 max-w-sm leading-relaxed">
            New videos every week. Mostly FPV, some 3D printing, and whatever I break next.
          </p>
        </div>
        <ul className="md:col-span-3 flex flex-col gap-2">
          {FOOTER_LINKS.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="md:col-span-3 text-xs text-ink/50 leading-relaxed">
          <p>
            Some gear links are affiliate links. If you buy through them I get a small cut, at no extra cost to
            you.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Alec Searle</p>
        </div>
      </div>
    </footer>
  )
}
