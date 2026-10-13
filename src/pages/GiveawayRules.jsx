import { Section, TextLink } from '../components/ui/Editorial'
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
    <Section id="rules" title="The short version" intro="The official rules, in plain English.">
      <dl className="border-t border-ink/15">
        {points.map(([term, detail]) => (
          <div key={term} className="border-b border-ink/10 py-4 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium">{term}</dt>
            <dd className="text-sm text-ink/70 leading-relaxed">{detail}</dd>
          </div>
        ))}
      </dl>
      <TextLink href="/giveaway/rules" external={false} className="inline-block mt-6">
        Read the full official rules →
      </TextLink>
    </Section>
  )
}
