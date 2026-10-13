import PageShell from '../components/layout/PageShell'
import VideoRow from '../components/VideoRow'
import { PageIntro, Section, Contents } from '../components/ui/Editorial'
import { FEATURED_VIDEO, TOPICS } from '../data/videos'

const toSeconds = (t) => t.split(':').reduce((total, n) => total * 60 + Number(n), 0)
const at = (t) => `https://www.youtube.com/watch?v=${FEATURED_VIDEO.id}&t=${toSeconds(t)}s`

function FeaturedGuide() {
  const exercises = FEATURED_VIDEO.chapters.filter((c) => c.exercise)
  const basics = FEATURED_VIDEO.chapters.filter((c) => !c.exercise && c.t !== '0:00')

  return (
    <section className="max-w-page mx-auto px-5 sm:px-8 mt-12">
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <a href={at('0:00')} target="_blank" rel="noopener noreferrer" className="group block">
            <img
              src={`https://i.ytimg.com/vi/${FEATURED_VIDEO.id}/maxresdefault.jpg`}
              alt={FEATURED_VIDEO.title}
              className="w-full aspect-video object-cover rounded-sm"
            />
          </a>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mt-6">
            Flying FPV for Dummies · Start here
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] mt-2">
            <a href={at('0:00')} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              {FEATURED_VIDEO.title}
            </a>
          </h2>
          <p className="text-base text-ink/70 mt-4 leading-relaxed max-w-xl">
            The controls, then eight simulator exercises that build on each other. Pick any exercise to
            jump straight to it.
          </p>
          <p className="text-sm text-ink/50 mt-6">Before the exercises:</p>
          <p className="text-sm mt-1 leading-7">
            {basics.map((c, i) => (
              <span key={c.t}>
                {i > 0 && <span className="text-ink/25"> · </span>}
                <a href={at(c.t)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {c.label}
                </a>
              </span>
            ))}
          </p>
        </div>

        <ol className="lg:col-span-5 border-t border-ink/15">
          {exercises.map((c) => (
            <li key={c.t} className="border-b border-ink/10">
              <a
                href={at(c.t)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-3 py-4"
              >
                <span className="font-display text-3xl text-ink/30 group-hover:text-accent transition-colors tabular-nums">
                  {c.exercise}
                </span>
                <span className="text-lg group-hover:text-accent transition-colors">{c.label}</span>
                <span className="text-xs text-ink/40 tabular-nums">{c.t}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Learn() {
  return (
    <PageShell>
      <PageIntro eyebrow="Tutorials" title="Learn FPV">
        <p>
          I started with zero experience and filmed everything I figured out. Here&apos;s all of it, in the
          order I&apos;d watch it.
        </p>
      </PageIntro>

      <Contents items={TOPICS} />

      <FeaturedGuide />

      {TOPICS.map((topic, i) => (
        <Section
          key={topic.id}
          id={topic.id}
          number={String(i + 1).padStart(2, '0')}
          title={topic.title}
          intro={topic.intro}
        >
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {topic.videos.map((video, vi) => (
              // Series topics number by part; the extra long-form video gets no number.
              <VideoRow key={video.id} video={video} index={topic.videos.some((v) => v.part) ? null : vi + 1} />
            ))}
          </ol>
        </Section>
      ))}
    </PageShell>
  )
}
