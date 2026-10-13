import { ChevronRight } from 'lucide-react'
import { GIVEAWAY, CONTACT_EMAIL } from '../config/site'

// Plain-language summary for the giveaway page. The binding text is
// src/content/giveaway-rules.md, served at /giveaway/rules.

// "**Canada:** Excluding the Province of Quebec." → "Canada"
const countryNames = GIVEAWAY.eligibleCountries.map((c) => c.replace(/\*/g, '').split(':')[0].trim())

export default function GiveawayRules() {
  const points = [
    [
      'Who can enter',
      `18+ (or the age of majority where you live) in: ${countryNames.join(', ')}. Some regions are excluded. Parents are welcome to enter on behalf of their kids.`,
    ],
    ['How many times', 'Once per person. No purchase, follows, comments, or Discord required.'],
    [
      'Winners',
      `${GIVEAWAY.winners} winners drawn at random within 7 days of the close. You'll get an email from ${CONTACT_EMAIL} and have 7 days to reply. I'll never ask you to pay anything.`,
    ],
    ['Shipping', 'Ordered straight from BetaFPV to your door. Any customs or import fees are on the winner.'],
    ['Your info', 'Name, email, and country, collected only to run this giveaway. Never sold, no mailing lists, and non-winner entries are deleted within 90 days.'],
  ]

  return (
    <section id="rules" className="w-full scroll-mt-6 border-t border-white/10 pt-8">
      <h2 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-4">The short version</h2>
      <dl className="flex flex-col gap-3">
        {points.map(([term, detail]) => (
          <div key={term}>
            <dt className="text-xs font-semibold text-white/85">{term}</dt>
            <dd className="text-xs text-white/55 leading-relaxed mt-0.5">{detail}</dd>
          </div>
        ))}
      </dl>
      <a
        href="/giveaway/rules"
        className="mt-5 flex items-center justify-between w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-sm font-medium group"
      >
        Read the full official rules
        <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
      </a>
    </section>
  )
}
