import PageShell from '../components/layout/PageShell'
import GearCard, { GearImage, GearLabels, GearLinks } from '../components/GearCard'
import { PageIntro, Section, Contents } from '../components/ui/Editorial'
import { GEAR_SECTIONS } from '../data/gear'

function FeaturedKit({ item }) {
  return (
    <article className="grid gap-6 sm:grid-cols-2 sm:items-center">
      <GearImage item={item} className="aspect-[4/3] sm:aspect-square" />
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50">The easy way: one box</p>
        <h3 className="font-display text-4xl leading-tight">{item.name}</h3>
        <GearLabels item={item} />
        <p className="text-base text-ink/80 leading-relaxed">{item.blurb}</p>
        <p className="text-sm text-ink/55">For {item.forWho.charAt(0).toLowerCase() + item.forWho.slice(1)}</p>
        <div className="mt-2">
          <GearLinks item={item} />
        </div>
      </div>
    </article>
  )
}

// Compact hairline list, for "what I fly" style sections.
function GearList({ items }) {
  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <li key={item.id} className="py-5 grid grid-cols-[5rem_1fr] sm:grid-cols-[6rem_1fr_auto] gap-x-5 gap-y-2 items-center">
          <GearImage item={item} className="aspect-square row-span-2 sm:row-span-1" />
          <div>
            <GearLabels item={item} />
            <h3 className="text-lg font-medium mt-1">{item.name}</h3>
            <p className="text-sm text-ink/65 mt-1 leading-relaxed">{item.blurb}</p>
          </div>
          <div className="sm:text-right">
            <GearLinks item={item} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Gear() {
  return (
    <PageShell>
      <PageIntro eyebrow="What I fly & recommend" title="Gear">
        <p>
          Everything here is something I&apos;ve flown and made a video about.{' '}
          <span className="text-accent">I fly this</span> means it&apos;s in my bag right now.{' '}
          <span className="text-ink">Recommended</span> means I&apos;d tell a beginner to buy it.
        </p>
      </PageIntro>

      <Contents items={GEAR_SECTIONS} />

      {GEAR_SECTIONS.map((section, i) => (
        <Section
          key={section.id}
          id={section.id}
          number={String(i + 1).padStart(2, '0')}
          title={section.title}
          intro={section.intro}
        >
          <div className="flex flex-col gap-14">
            {section.featured && <FeaturedKit item={section.featured} />}
            {section.groups.map((group, gi) =>
              section.id === 'flying' ? (
                <GearList key={gi} items={group.items} />
              ) : (
                <div key={group.label || gi}>
                  {group.label && (
                    <div className="mb-6">
                      <h3 className="font-display text-3xl">{group.label}</h3>
                      {group.note && <p className="text-sm text-ink/55 mt-1">{group.note}</p>}
                    </div>
                  )}
                  <div className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 ${group.items.length === 3 ? 'lg:grid-cols-3' : ''}`}>
                    {group.items.map((item) => (
                      <GearCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </Section>
      ))}
    </PageShell>
  )
}
