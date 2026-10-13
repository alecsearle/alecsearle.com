import PageShell from './components/layout/PageShell'
import GiveawayBanner from './components/GiveawayBanner'
import DiscordCard from './components/DiscordCard'
import LatestVideos from './components/LatestVideos'
import SocialLinks from './components/SocialLinks'
import BuildParts from './components/BuildParts'
import { GearFeature, GearImage } from './components/GearCard'
import { AffiliateNote, ButtonLink, Section, TextLink } from './components/ui/Editorial'
import { FEATURED, BEGINNER_SETUP, BETAFPV_MAIN } from './data/gear'
import { BUILD_HERO_IMAGE, BUILD_VIDEO_URL } from './data/builds'
import { DISCORD_LIVE, YOUTUBE_CHANNEL_URL } from './config/site'

const START_HERE = [
  {
    q: 'What should I buy first?',
    a: "The beginner setup I'd tell a friend to get. One kit and you're flying.",
    href: '/gear#start',
  },
  {
    q: 'How do I actually fly this thing?',
    a: 'Eight simulator exercises, from hovering to power loops.',
    href: '/learn',
  },
  {
    q: 'How do I set it all up?',
    a: 'Binding, goggles, Betaflight, and batteries, one short video at a time.',
    href: '/learn#setup',
  },
  {
    q: "Something's broken.",
    a: 'Quick fixes for the problems everyone runs into.',
    href: '/learn#fixes',
  },
]

// Quick routes under the hero, for people arriving from a bio link.
const QUICK_LINKS = [
  { label: 'What to buy', href: '/gear#start' },
  { label: 'Learn to fly', href: '/learn' },
  { label: 'Fix a problem', href: '/learn#fixes' },
]

const JOURNEY_VIDEO = { id: 'NJK1SpQ9Vdc', title: '6 Months of FPV Changed Everything' }

function Hero() {
  return (
    <section className="max-w-page mx-auto px-5 sm:px-8 pt-10 sm:pt-20 grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          @alec_searle · FPV pilot · Southern Utah
        </p>
        <h1 className="font-display text-5xl sm:text-8xl leading-[0.95] tracking-tight mt-5">
          I learned FPV from zero, and filmed <em>all</em> of it.
        </h1>
        <p className="text-lg text-ink/70 leading-relaxed mt-6 max-w-xl">
          I&apos;m Alec. I bought my first tiny whoop in spring 2026 with no idea what I was doing. Now I make
          videos about everything I&apos;ve learned, so you don&apos;t have to figure it out alone.
        </p>
        <SocialLinks className="mt-8" />
        <ul className="mt-6 flex flex-wrap gap-2">
          {QUICK_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-ink/25 hover:border-accent hover:text-accent transition-colors"
              >
                {label} →
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-5">
        {/* Landscape crop on phones (face + quad), full portrait beside the text on desktop */}
        <img
          src="/images/alec-hero.jpg"
          alt="Alec in the Utah desert, holding his 3.5-inch quad"
          className="w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-[50%_72%] lg:object-center rounded-sm"
        />
      </div>
    </section>
  )
}

// One row of "The Best Beginner FPV Setup" — the whole row is the affiliate link.
function SetupRow({ item }) {
  return (
    <li className="border-b border-ink/10">
      <a
        href={item.href}
        target="_blank"
        rel={item.affiliate === false ? 'noopener noreferrer' : 'noopener noreferrer sponsored'}
        className="group flex items-center gap-4 sm:gap-5 py-4"
      >
        <GearImage item={item} className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-lg leading-snug group-hover:text-accent transition-colors">{item.name}</span>
            {item.note && (
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">{item.note}</span>
            )}
          </span>
          <span className="block text-sm text-ink/70 mt-1">
            {item.tagline}
            {/* Most of this list is BetaFPV; name the store when it isn't */}
            {item.store && item.store !== 'BetaFPV' && <span className="text-ink/60"> · on {item.store}</span>}
          </span>
        </span>
        <span className="text-xl text-ink/40 group-hover:text-accent transition-colors">↗</span>
      </a>
    </li>
  )
}

function StartHere() {
  return (
    <ul className="border-t border-ink/15">
      {START_HERE.map((item) => (
        <li key={item.q} className="border-b border-ink/10">
          <a href={item.href} className="group grid grid-cols-[1fr_auto] gap-x-4 items-baseline py-5 sm:py-6">
            <span>
              <span className="block font-display text-3xl sm:text-4xl leading-tight group-hover:text-accent transition-colors">
                {item.q}
              </span>
              <span className="block text-sm text-ink/70 mt-2">{item.a}</span>
            </span>
            <span className="text-xl text-ink/40 group-hover:text-accent group-hover:translate-x-1 transition-all">→</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

const SETUP_GROUPS = [
  { label: 'Pick one drone', items: BEGINNER_SETUP.filter((i) => i.category === 'whoops') },
  { label: 'Then add', items: BEGINNER_SETUP.filter((i) => i.category !== 'whoops') },
]

export default function App() {
  return (
    <PageShell>
      <GiveawayBanner />
      <Hero />

      <Section
        id="featured"
        title="Featured"
        intro="One kit. One purchase. Only $200 and you're in the air."
        aside={<AffiliateNote className="mt-4 max-w-xs" />}
      >
        <GearFeature item={FEATURED} />
      </Section>

      <Section
        id="beginner-setup"
        title="The Best Beginner FPV Setup"
        intro="Everything you need to start flying FPV + the same setup I started with ;)"
      >
        {SETUP_GROUPS.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? 'mt-10' : undefined}>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 mb-3">{group.label}</h3>
            <ul className="border-t border-ink/15">
              {group.items.map((item) => (
                <SetupRow key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
        <ButtonLink href={BETAFPV_MAIN} sponsored solid className="mt-8">
          Shop All BetaFPV ↗
        </ButtonLink>
      </Section>

      <Section
        id="build"
        title='My First 3.5" Build'
        intro='The exact parts list from my first 3.5" freestyle build.'
      >
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          <div>
            {/* Short on phones so "View full parts list" stays on screen */}
            <img
              src={BUILD_HERO_IMAGE}
              alt='My finished 3.5" build'
              loading="lazy"
              className="w-full aspect-video sm:aspect-[4/5] object-cover rounded-sm"
            />
            <TextLink href={BUILD_VIDEO_URL} className="inline-block mt-4">Watch the build video ↗</TextLink>
          </div>
          <BuildParts />
        </div>
      </Section>

      <Section title="New to FPV?" intro="The four questions I get asked the most.">
        <StartHere />
      </Section>

      <Section
        title="Latest videos"
        aside={<TextLink href={YOUTUBE_CHANNEL_URL} className="inline-block mt-6">All videos ↗</TextLink>}
      >
        <LatestVideos />
      </Section>

      <Section title="Six months in" intro="Where I started, what I learned, and where this is going.">
        <a
          href={`https://www.youtube.com/watch?v=${JOURNEY_VIDEO.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <span className="block aspect-video overflow-hidden rounded-sm bg-ink/5">
            <img
              src={`https://i.ytimg.com/vi/${JOURNEY_VIDEO.id}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </span>
          <span className="block font-display text-3xl mt-5 group-hover:text-accent transition-colors">
            {JOURNEY_VIDEO.title} ↗
          </span>
        </a>
      </Section>

      {DISCORD_LIVE && (
        <div className="max-w-page mx-auto px-5 sm:px-8 mt-20">
          <DiscordCard />
        </div>
      )}
    </PageShell>
  )
}
