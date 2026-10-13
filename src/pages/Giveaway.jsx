import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import Header from '../components/Header'
import SectionLabel from '../components/ui/SectionLabel'
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

const card = 'bg-white/5 border border-white/10 rounded-xl'

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
    <div className="w-full border border-dashed border-amber-400/40 bg-amber-400/5 rounded-xl px-4 py-3">
      <p className="text-xs font-semibold text-amber-300">
        Draft preview — not linked anywhere and hidden from search
      </p>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
        {items.map(([label, done]) => (
          <li key={label} className={`text-xs ${done ? 'text-white/40 line-through' : 'text-white/75'}`}>
            {done ? '✓' : '○'} {label}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-white/40">
        Edit <code>src/config/site.js</code>, then set status to <code>'open'</code> to launch.
      </p>
    </div>
  )
}

function Prizes() {
  return (
    <section className="w-full">
      <SectionLabel
        title="The Prizes"
        subtitle={`${GIVEAWAY.winners} winners. Each one picks a drone from this list.`}
      />
      <div className="grid grid-cols-3 gap-3">
        {GIVEAWAY.eligibleDrones.map((drone) => (
          <div key={drone.id} className={`${card} p-3 flex flex-col items-center text-center`}>
            <img
              src={drone.image}
              alt={drone.name}
              className="w-full aspect-square object-contain rounded-lg bg-white/5"
            />
            <p className="mt-2 text-xs font-medium leading-tight">{drone.name}</p>
            <p className="mt-0.5 text-[10px] text-white/40 leading-tight">{drone.variants}</p>
          </div>
        ))}
      </div>

      {GIVEAWAY.bonusPrizes.length > 0 && (
        <div className={`${card} mt-3 px-4 py-3`}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Bonus prizes</p>
          {GIVEAWAY.bonusPrizes.map((p) => (
            <p key={p.name} className="text-sm mt-1">
              {p.count}× {p.name}
            </p>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-white/45 leading-relaxed">
        This one&apos;s on me. BetaFPV isn&apos;t sponsoring it. I&apos;m buying the drones myself
        and having them shipped straight to the winners. Too young to enter? Get a parent to enter
        for you.
      </p>
    </section>
  )
}

function HowToEnter() {
  const steps = [
    ['Fill out the form below', 'Takes about a minute. No Google account needed.'],
    ['That’s it, really', 'No follows, tags, comments, or screenshots. One entry per person.'],
    ['Watch your email', `Winners hear from ${CONTACT_EMAIL} within a week of the close.`],
  ]
  return (
    <section className="w-full">
      <SectionLabel title="How to Enter" />
      <ol className="flex flex-col gap-2">
        {steps.map(([title, body], i) => (
          <li key={title} className={`${card} flex items-start gap-3 px-4 py-3`}>
            <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-white/50 mt-0.5">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function EntryForm() {
  if (!GIVEAWAY.formUrl) {
    return (
      <div className={`${card} border-dashed px-4 py-10 text-center text-xs text-white/40`}>
        Google Form goes here. Add <code>formUrl</code> in <code>src/config/site.js</code>.
      </div>
    )
  }
  return (
    <div className="w-full">
      <div className="rounded-xl overflow-hidden bg-white">
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
      <a
        href={GIVEAWAY.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-sm font-medium"
      >
        Form not loading? Open it directly
        <ExternalLink className="w-4 h-4 text-white/50" />
      </a>
    </div>
  )
}

function Closed() {
  return (
    <section className={`${card} w-full px-4 py-6 text-center`}>
      <p className="text-sm font-semibold">Entries are closed</p>
      <p className="text-xs text-white/50 mt-2 leading-relaxed">
        Thanks to everyone who entered. Winners will be contacted by email and announced
        {DISCORD_INVITE_URL ? ' in the Discord' : ''} once they&apos;re confirmed.
      </p>
    </section>
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
      <div className="max-w-xl mx-auto px-4 pt-8 pb-8 flex flex-col items-center gap-10">
        {GIVEAWAY.status === 'draft' && <LaunchChecklist />}

        <Header />

        <section className="w-full text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">10K Giveaway</p>
          <h2 className="text-3xl font-semibold tracking-tight mt-2">Thank you.</h2>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            A few months ago I bought my first tiny whoop and started filming myself figuring it out.
            Somehow a lot of you decided to come along for that. So I&apos;m giving away two drones,
            and finally opening the Discord a bunch of you have been asking for.
          </p>
          {status === 'open' && GIVEAWAY.endsAt && (
            <p className="mt-4 inline-block text-xs text-white/70 border border-white/15 rounded-full px-3 py-1">
              Ends {formatLocal(GIVEAWAY.endsAt)}
              {remaining && <span className="text-white/40"> · {remaining}</span>}
            </p>
          )}
        </section>

        <Prizes />

        {status === 'closed' ? (
          <Closed />
        ) : (
          <>
            <HowToEnter />
            <section id="enter" className="w-full scroll-mt-6">
              <SectionLabel title="Enter" subtitle="One entry per person. Duplicates get removed." />
              <EntryForm />
            </section>
          </>
        )}

        {DISCORD_INVITE_URL && (
          <section className="w-full">
            <SectionLabel
              title="The Discord"
              subtitle="Not required to enter. Just a good place to hang out with other pilots."
            />
            <DiscordCard showBeforeLaunch />
          </section>
        )}

        <GiveawayRules />
      </div>
    </PageShell>
  )
}
