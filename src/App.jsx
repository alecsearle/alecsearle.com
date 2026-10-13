import PageShell from './components/layout/PageShell'
import GiveawayBanner from './components/GiveawayBanner'
import DiscordCard from './components/DiscordCard'
import LatestVideos from './components/LatestVideos'
import SocialLinks from './components/SocialLinks'
import BuildParts from './components/BuildParts'
import { GearFeature, GearImage } from './components/GearCard'
import { Section, TextLink } from './components/ui/Editorial'
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

const JOURNEY_VIDEO = { id: 'NJK1SpQ9Vdc', title: '6 Months of FPV Changed Everything' }

function Hero() {
  return (
    <section className="max-w-page mx-auto px-5 sm:px-8 pt-10 sm:pt-20 grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          <img
            src="/images/alec-avatar.jpg"
            alt=""
            className="lg:hidden w-12 h-12 rounded-full object-cover"
            style={{ objectPosition: '50% 15%' }}
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            @alec_searle · FPV pilot · Southern Utah
          </p>
        </div>
        <h1 className="font-display text-5xl sm:text-8xl leading-[0.95] tracking-tight mt-5">
          I learned FPV from zero, and filmed <em>all</em> of it.
        </h1>
        <p className="text-lg text-ink/70 leading-relaxed mt-6 max-w-xl">
          I&apos;m Alec. I bought my first tiny whoop in spring 2026 with no idea what I was doing. Now I make
          videos about everything I&apos;ve learned, so you don&apos;t have to figure it out alone.
        </p>
        <SocialLinks className="mt-8" />
      </div>
      <div className="hidden lg:block lg:col-span-5">
        <img
          src="/images/alec-hero.jpg"
          alt="Alec in the Utah desert, holding his 3.5-inch quad"
          className="w-full aspect-[4/5] object-cover rounded-sm"
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
          <span className="block text-sm text-ink/60 mt-1">{item.tagline}</span>
        </span>
        <span className="text-xl text-ink/30 group-hover:text-accent transition-colors">↗</span>
      </a>
    </li>
  )
}

function StartHere() {
  return (
    <ol className="border-t border-ink/15">
      {START_HERE.map((item, i) => (
        <li key={item.q} className="border-b border-ink/10">
          <a href={item.href} className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 items-baseline py-6">
            <span className="text-sm text-ink/35 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block font-display text-3xl sm:text-4xl leading-tight group-hover:text-accent transition-colors">
                {item.q}
              </span>
              <span className="block text-sm text-ink/60 mt-2">{item.a}</span>
            </span>
            <span className="text-xl text-ink/30 group-hover:text-accent group-hover:translate-x-1 transition-all">→</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

export default function App() {
  return (
    <PageShell>
      <GiveawayBanner />
      <Hero />

      <Section id="featured" number="01" title="Featured" intro="One kit. One purchase. Only $200 and you're in the air.">
        <GearFeature item={FEATURED} />
      </Section>

      <Section
        id="beginner-setup"
        number="02"
        title="The Best Beginner FPV Setup"
        intro="Everything you need to start flying FPV + the same setup I started with ;)"
      >
        <ul className="border-t border-ink/15">
          {BEGINNER_SETUP.map((item) => (
            <SetupRow key={item.id} item={item} />
          ))}
        </ul>
        <a
          href={BETAFPV_MAIN}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-8 inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium px-6 py-3 rounded-full hover:bg-accent transition-colors"
        >
          Shop All BetaFPV →
        </a>
        <p className="mt-6 text-xs text-ink/50 leading-relaxed max-w-md">
          Some links are affiliate links. They help support the channel at no extra cost to you.
        </p>
      </Section>

      <Section
        id="build"
        number="03"
        title='My First 3.5" Build'
        intro='The exact parts list from my first 3.5" freestyle build.'
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <img
              src={BUILD_HERO_IMAGE}
              alt='My finished 3.5" build'
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
            <TextLink href={BUILD_VIDEO_URL} className="inline-block mt-4">Watch the build video ↗</TextLink>
          </div>
          <BuildParts />
        </div>
      </Section>

      <Section number="04" title="New to FPV?" intro="The four questions I get asked the most.">
        <StartHere />
      </Section>

      <Section
        number="05"
        title="Latest videos"
        aside={<TextLink href={YOUTUBE_CHANNEL_URL} className="inline-block mt-6">All videos ↗</TextLink>}
      >
        <LatestVideos />
      </Section>

      <Section number="06" title="Six months in" intro="Where I started, what I learned, and where this is going.">
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
