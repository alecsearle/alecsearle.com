import { marked } from 'marked'
import PageShell from '../components/layout/PageShell'
import rulesMarkdown from '../content/giveaway-rules.md?raw'
import { GIVEAWAY, formatMountainTime, isProductionSite } from '../config/site'
import NothingHereYet from './NothingHereYet'

// The rules are plain markdown so they're easy to edit. Dates and the country
// list are filled in from config so they can't drift from the giveaway page.
function renderRules() {
  const filled = rulesMarkdown
    .replace('{{START}}', formatMountainTime(GIVEAWAY.startsAt))
    .replace('{{END}}', formatMountainTime(GIVEAWAY.endsAt))
    .replace('{{ELIGIBLE_COUNTRIES}}', GIVEAWAY.eligibleCountries.map((c) => `- ${c}`).join('\n'))

  // "### 10. Privacy and Personal Information" → id="privacy-and-personal-information"
  return marked.parse(filled).replace(/<h3>(?:\d+\.\s*)?(.*?)<\/h3>/g, (_, title) => {
    const id = title.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `<h3 id="${id}">${title}</h3>`
  })
}

const html = renderRules()

export default function GiveawayRulesPage() {
  if (GIVEAWAY.status === 'draft' && isProductionSite()) return <NothingHereYet />

  return (
    <PageShell>
      <div className="max-w-page mx-auto px-5 sm:px-8 pt-10 pb-8">
        <a href="/giveaway" className="text-sm text-ink/60 hover:text-accent transition-colors">
          ← Back to the giveaway
        </a>
        <article className="prose-rules mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </PageShell>
  )
}
