import { Analytics } from '@vercel/analytics/react'
import { ArrowLeft } from 'lucide-react'
import { marked } from 'marked'
import rulesMarkdown from '../content/giveaway-rules.md?raw'
import { GIVEAWAY, formatMountainTime } from '../config/site'

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
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        <a
          href="/giveaway"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to the giveaway
        </a>
        <article className="prose-rules mt-8" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <Analytics />
    </main>
  )
}
