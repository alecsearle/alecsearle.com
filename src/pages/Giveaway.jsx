import { useEffect, useState } from 'react'
import PageShell from '../components/layout/PageShell'
import { PageIntro, Section, TextLink } from '../components/ui/Editorial'
import DiscordCard from '../components/DiscordCard'
import GiveawayRules from './GiveawayRules'
import NothingHereYet from './NothingHereYet'
import {
  GIVEAWAY,
  DISCORD_INVITE_URL,
  CONTACT_EMAIL,
  formEmbedUrl,
  isProductionSite,
} from '../config/site'

// Viewer's local time. The rules use Mountain time as the official deadline.
function formatLocal(iso) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

// 'open' only counts until the deadline passes, so the page closes itself
// even if nobody flips the config on time.
function getStatus(now) {
  if (GIVEAWAY.status !== 'open') return GIVEAWAY.status
  if (GIVEAWAY.endsAt && now >= new Date(GIVEAWAY.endsAt).getTime()) return 'closed'
  return 'open'
}

function timeLeft(iso, now) {
  const ms = new Date(iso).getTime() - now
  if (ms <= 0) return null
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const mins = Math.floor((ms % 3_600_000) / 60_000)
  if (days > 0) return `${days}d ${hours}h left`
  if (hours > 0) return `${hours}h ${mins}m left`
  return `${mins}m left`
}

// Only shown while status is 'draft' — what still needs filling in.
function LaunchChecklist() {
  const items = [
    ['Google Form URL', Boolean(GIVEAWAY.formUrl)],
    ['Start + end dates', Boolean(GIVEAWAY.startsAt && GIVEAWAY.endsAt)],
    ['Discord invite', Boolean(DISCORD_INVITE_URL)],
    ['Eligible countries', GIVEAWAY.eligibleCountries.length > 0],
  ]
  return (
    <div className="max-w-page mx-auto px-5 sm:px-8 pt-6">
      <div className="border border-dashed border-amber-600/50 bg-amber-100/50 rounded-sm px-4 py-3">
        <p className="text-xs font-semibold text-amber-800">Draft preview: not linked anywhere and hidden from search</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {items.map(([label, done]) => (
            <li key={label} className={`text-xs ${done ? 'text-ink/40 line-through' : 'text-ink/80'}`}>
              {done ? '✓' : '○'} {label}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-ink/50">
          Edit <code>src/config/site.js</code>, then set status to <code>'open'</code> to launch.
        </p>
      </div>
    </div>
  )
}

function Prizes() {
  return (
    <>
      <div className="grid gap-6 grid-cols-3">
        {GIVEAWAY.eligibleDrones.map((drone) => (
          <div key={drone.id}>
            <div className="bg-white rounded-sm aspect-square flex items-center justify-center">
              <img src={drone.image} alt={drone.name} className="w-4/5 h-4/5 object-contain" />
            </div>
            <p className="mt-3 text-base font-medium leading-tight">{drone.name}</p>
            <p className="mt-1 text-xs text-ink/50">{drone.variants}</p>
          </div>
        ))}
      </div>

      {GIVEAWAY.bonusPrizes.length > 0 && (
        <p className="mt-8 text-base">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50 mr-3">Bonus</span>
          {GIVEAWAY.bonusPrizes.map((p) => `${p.count}× ${p.name}`).join(' · ')}
        </p>
      )}

      <p className="mt-8 text-base text-ink/70 leading-relaxed max-w-xl">
        This one&apos;s on me. BetaFPV isn&apos;t sponsoring it. I&apos;m buying the drones myself and
        having them shipped straight to the winners. Too young to enter? Get a parent to enter for you.
      </p>
    </>
  )
}

function HowToEnter() {
  const steps = [
    ['Fill out the form below', 'Takes about a minute. No Google account needed.'],
    ['That’s it, really', 'No follows, tags, comments, or screenshots. One entry per person.'],
    ['Watch your email', `Winners hear from ${CONTACT_EMAIL} within a week of the close.`],
  ]
  return (
    <ol className="border-t border-ink/15">
      {steps.map(([title, body], i) => (
        <li key={title} className="border-b border-ink/10 grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
          <span className="font-display text-3xl text-accent leading-none">{i + 1}</span>
          <span>
            <span className="block font-display text-2xl sm:text-3xl leading-tight">{title}</span>
            <span className="block text-sm text-ink/60 mt-1">{body}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function EntryForm() {
  if (!GIVEAWAY.formUrl) {
    return (
      <div className="border border-dashed border-ink/20 rounded-sm px-4 py-10 text-center text-sm text-ink/50">
        Google Form goes here. Add <code>formUrl</code> in <code>src/config/site.js</code>.
      </div>
    )
  }
  return (
    <div>
      <div className="rounded-sm overflow-hidden bg-white border border-ink/10">
        <iframe
          src={formEmbedUrl(GIVEAWAY.formUrl)}
          title="Giveaway entry form"
          className="w-full h-[1100px] md:h-[1000px] block"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
      {/* Instagram/TikTok in-app browsers sometimes choke on embedded forms */}
      <p className="mt-4 text-sm text-ink/60">
        Form not loading?{' '}
        <TextLink href={GIVEAWAY.formUrl}>Open it directly ↗</TextLink>
      </p>
    </div>
  )
}

function Closed() {
  return (
    <div>
      <p className="font-display text-4xl leading-tight">Entries are closed.</p>
      <p className="text-base text-ink/70 mt-3 leading-relaxed max-w-xl">
        Thanks to everyone who entered. Winners will be contacted by email and announced
        {DISCORD_INVITE_URL ? ' in the Discord' : ''} once they&apos;re confirmed.
      </p>
    </div>
  )
}

export default function Giveaway() {
  const now = useNow()
  const status = getStatus(now)
  const remaining = GIVEAWAY.endsAt ? timeLeft(GIVEAWAY.endsAt, now) : null

  useEffect(() => {
    if (GIVEAWAY.status !== 'draft') return
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  if (GIVEAWAY.status === 'draft' && isProductionSite()) return <NothingHereYet />

  return (
    <PageShell>
      {GIVEAWAY.status === 'draft' && <LaunchChecklist />}

      <PageIntro eyebrow="10K Giveaway" title="Thank you.">
        <p>
          A few months ago I bought my first tiny whoop and started filming myself figuring it out. Somehow a
          lot of you decided to come along for that. So I&apos;m giving away two drones, and finally opening
          the Discord a bunch of you have been asking for.
        </p>
        {status === 'open' && GIVEAWAY.endsAt && (
          <p className="mt-6 text-base text-ink">
            Ends {formatLocal(GIVEAWAY.endsAt)}
            {remaining && <span className="text-accent"> · {remaining}</span>}
          </p>
        )}
      </PageIntro>

      <Section number="01" title="The prizes" intro={`${GIVEAWAY.winners} winners. Each one picks a drone from this list.`}>
        <Prizes />
      </Section>

      {status === 'closed' ? (
        <Section number="02" title="That's a wrap">
          <Closed />
        </Section>
      ) : (
        <>
          <Section number="02" title="How to enter">
            <HowToEnter />
          </Section>
          <Section id="enter" number="03" title="Enter" intro="One entry per person. Duplicates get removed.">
            <EntryForm />
          </Section>
        </>
      )}

      {DISCORD_INVITE_URL && (
        <Section
          number={status === 'closed' ? '03' : '04'}
          title="The Discord"
          intro="Not required to enter. Just a good place to hang out with other pilots."
        >
          <DiscordCard showBeforeLaunch />
        </Section>
      )}

      <GiveawayRules />
    </PageShell>
  )
}
