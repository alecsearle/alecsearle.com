import PageShell from '../components/layout/PageShell'
import BuildParts from '../components/BuildParts'
import VideoRow from '../components/VideoRow'
import MakerWorldIcon from '../components/SocialLinks/MakerWorldIcon'
import { AffiliateNote, Contents, PageIntro, Section, TextLink } from '../components/ui/Editorial'
import {
  BUILD_TITLE,
  BUILD_SUBTITLE,
  BUILD_HERO_IMAGE,
  BUILD_VIDEO_URL,
  BUILD_SHORTS,
  BUILD_UPDATE,
  MAKERWORLD_URL,
  PRINTS,
  REPAIRS,
} from '../data/builds'

const SECTIONS = [
  { id: 'bandit', title: BUILD_TITLE },
  { id: 'prints', title: '3D prints' },
  { id: 'repairs', title: 'Soldering & repairs' },
]

function VideoList({ videos }) {
  return (
    <ol className="divide-y divide-ink/10 border-y border-ink/10">
      {videos.map((video) => (
        <VideoRow key={video.id} video={video} />
      ))}
    </ol>
  )
}

// Big link to the MakerWorld collection: prints I use, mine and other people's.
function MakerWorldLink() {
  return (
    <a
      href={MAKERWORLD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 border-y border-ink/15 py-8 sm:py-10"
    >
      <MakerWorldIcon className="w-12 h-12 sm:w-16 sm:h-16 text-ink/70 group-hover:text-[#00AE42] transition-colors" />
      <span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60">My MakerWorld collection</span>
        <span className="block font-display text-3xl sm:text-5xl leading-tight mt-1 group-hover:text-accent transition-colors">
          FPV Featured
        </span>
        <span className="block text-sm text-ink/70 mt-2">All the prints I like to use on my gear, made by me and other people.</span>
      </span>
      <span className="text-2xl sm:text-3xl text-ink/40 group-hover:text-accent group-hover:translate-x-1 transition-all">↗</span>
    </a>
  )
}

export default function Builds() {
  return (
    <PageShell current="/builds">
      <PageIntro eyebrow="Built, printed & fixed" title="Builds">
        <p>
          Everything I&apos;ve built, printed, or soldered back together, with the video for each one and the full
          parts list where there is one.
        </p>
        <AffiliateNote className="mt-4 max-w-xl" />
      </PageIntro>

      <Contents items={SECTIONS} />

      <Section
        id="bandit"
        title={BUILD_TITLE}
        intro={`${BUILD_SUBTITLE}, and what it cost.`}
        aside={
          BUILD_UPDATE && (
            <p className="text-sm mt-6 max-w-xs leading-relaxed">
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Up next</span>
              <span className="block text-ink/70 mt-1">{BUILD_UPDATE}</span>
            </p>
          )
        }
      >
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          <div>
            <img
              src={BUILD_HERO_IMAGE}
              alt='My finished 3.5" build'
              className="w-full aspect-video sm:aspect-[4/5] object-cover rounded-sm"
            />
            <TextLink href={BUILD_VIDEO_URL} className="inline-block mt-4">Watch the build video ↗</TextLink>
          </div>
          <BuildParts />
        </div>

        <p className="text-sm text-ink/60 mt-12 mb-1">The build in five Shorts</p>
        <VideoList videos={BUILD_SHORTS} />
      </Section>

      <Section
        id="prints"
        title="3D prints"
        intro="Cases and accessories I print on my Bambu Lab A1. I save the ones I actually use to a collection on MakerWorld."
      >
        <MakerWorldLink />
        <p className="text-sm text-ink/60 mt-12 mb-1">Prints in my videos</p>
        <VideoList videos={PRINTS} />
      </Section>

      <Section id="repairs" title="Soldering & repairs" intro="Learning to solder, and fixing the things I broke.">
        <VideoList videos={REPAIRS} />
      </Section>
    </PageShell>
  )
}
