import PageShell from './components/layout/PageShell'
import GiveawayBanner from './components/GiveawayBanner'
import DiscordCard from './components/DiscordCard'
import LatestVideos from './components/LatestVideos'
import GearCard from './components/GearCard'
import { Section, TextLink } from './components/ui/Editorial'
import { HOME_GEAR } from './data/gear'
import { BUILD_HERO_IMAGE, BUILD_VIDEO_URL, BUILD_CORE_COST } from './data/builds'
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
    <section className="max-w-page mx-auto px-5 sm:px-8 pt-12 sm:pt-20 grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">FPV pilot · Southern Utah</p>
        <h1 className="font-display text-6xl sm:text-8xl leading-[0.92] tracking-tight mt-4">
          I learned FPV from zero, and filmed <em>all</em> of it.
        </h1>
        <p className="text-lg text-ink/70 leading-relaxed mt-8 max-w-xl">
          I&apos;m Alec. I bought my first tiny whoop in spring 2026 with no idea what I was doing. Now I make
          videos about everything I&apos;ve learned, so you don&apos;t have to figure it out alone.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8">
          <a
            href="#start"
            className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium px-5 py-3 rounded-full hover:bg-accent transition-colors"
          >
            New to FPV? Start here ↓
          </a>
          <TextLink href={YOUTUBE_CHANNEL_URL}>Watch on YouTube ↗</TextLink>
        </div>
      </div>
      <div className="lg:col-span-5">
        <img
          src="/images/alec-portrait.jpg"
          alt="Alec Searle"
          className="w-full aspect-[4/5] object-cover rounded-sm"
          style={{ objectPosition: '50% 20%' }}
        />
      </div>
    </section>
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

      <Section id="start" number="01" title="Start here" intro="The four questions I get asked the most.">
        <StartHere />
      </Section>

      <Section
        number="02"
        title="What I'm flying"
        intro="My current analog setup."
        aside={<TextLink href="/gear" external={false} className="inline-block mt-6">All my gear →</TextLink>}
      >
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {HOME_GEAR.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section number="03" title="Six months in" intro="Where I started, what I learned, and where this is going.">
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

      <Section number="04" title="Latest videos" aside={<TextLink href={YOUTUBE_CHANNEL_URL} className="inline-block mt-6">All videos ↗</TextLink>}>
        <LatestVideos />
      </Section>

      <Section number="05" title="My first build" intro={`A 3.5" freestyle quad, built from scratch for about $${BUILD_CORE_COST}.`}>
        <div className="grid gap-6 sm:grid-cols-2 sm:items-end">
          <img src={BUILD_HERO_IMAGE} alt='My 3.5" build' loading="lazy" className="w-full aspect-[4/5] object-cover rounded-sm" />
          <div>
            <p className="text-base text-ink/75 leading-relaxed">
              My first time building a quad from scratch. The video goes through every part and how it all
              came together.
            </p>
            <TextLink href={BUILD_VIDEO_URL} className="inline-block mt-4">Watch the build ↗</TextLink>
          </div>
        </div>
      </Section>

      {DISCORD_LIVE && (
        <div className="max-w-page mx-auto px-5 sm:px-8 mt-20">
          <DiscordCard />
        </div>
      )}
    </PageShell>
  )
}
