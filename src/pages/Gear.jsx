import PageShell from '../components/layout/PageShell'
import GearCard from '../components/GearCard'
import { GEAR_SECTIONS } from '../data/gear'

function Group({ group }) {
  return (
    <div>
      {group.label && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest">{group.label}</h3>
          {group.note && <p className="text-xs text-white/45 mt-1">{group.note}</p>}
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {group.items.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function Gear() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-8">
        <header className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight">Gear</h1>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            Everything here is something I&apos;ve flown and made a video about. If a card says{' '}
            <span className="text-emerald-300">I fly this</span>, it&apos;s in my bag right now.{' '}
            <span className="text-sky-300">Recommended</span> means I&apos;d tell a beginner to buy it.
          </p>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            Most BetaFPV links are affiliate links. If you buy through them I get a small cut, at no
            extra cost to you.
          </p>
        </header>

        <nav className="flex gap-2 mt-6">
          {GEAR_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {s.title}
            </a>
          ))}
        </nav>

        {GEAR_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            {section.intro && <p className="text-sm text-white/55 mt-2 max-w-xl">{section.intro}</p>}

            <div className="flex flex-col gap-8 mt-6">
              {section.featured && (
                <div>
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3">
                    The easy way: one box
                  </p>
                  <GearCard item={section.featured} large />
                </div>
              )}
              {section.groups.map((group, i) => (
                <Group key={group.label || i} group={group} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
