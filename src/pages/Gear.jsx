import PageShell from '../components/layout/PageShell'
import GearCard, { GearFeature, GearImage, GearLabels, GearLinks } from '../components/GearCard'
import { AffiliateNote, PageIntro, Section, Contents } from '../components/ui/Editorial'
import { GEAR_SECTIONS } from '../data/gear'

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
            <p className="text-sm text-ink/70 mt-1 leading-relaxed">{item.blurb}</p>
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
    <PageShell current="/gear">
      <PageIntro eyebrow="What I fly & recommend" title="Gear">
        <p>
          Everything here is something I&apos;ve flown and made a video about.{' '}
          <span className="text-accent">I fly this</span> means it&apos;s in my bag right now.{' '}
          <span className="text-ink">Recommended</span> means I&apos;d tell a beginner to buy it.
        </p>
        <AffiliateNote className="mt-4 max-w-xl" />
      </PageIntro>

      <Contents items={GEAR_SECTIONS} />

      {GEAR_SECTIONS.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          intro={section.intro}
        >
          <div className="flex flex-col gap-10 sm:gap-14">
            {section.featured && <GearFeature item={section.featured} eyebrow="The easy way: one box" />}
            {section.groups.map((group, gi) =>
              section.id === 'flying' ? (
                <GearList key={gi} items={group.items} />
              ) : (
                <div key={group.label || gi}>
                  {group.label && (
                    <div className="mb-6">
                      <h3 className="font-display text-2xl">{group.label}</h3>
                      {group.note && <p className="text-sm text-ink/70 mt-1">{group.note}</p>}
                    </div>
                  )}
                  <div className={`grid gap-x-6 gap-y-8 sm:gap-y-12 sm:grid-cols-2 ${group.items.length === 3 ? 'lg:grid-cols-3' : ''}`}>
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
