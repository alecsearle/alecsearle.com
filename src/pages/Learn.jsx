import { useState } from 'react'
import PageShell from '../components/layout/PageShell'
import VideoRow, { videoUrl } from '../components/VideoRow'
import { PageIntro, Section, Contents } from '../components/ui/Editorial'
import { TOPICS } from '../data/videos'

const toSeconds = (t) => t.split(':').reduce((total, n) => total * 60 + Number(n), 0)
const watchAt = (video, t) => `https://www.youtube.com/watch?v=${video.id}&t=${toSeconds(t)}s`

// Video list that shows the first two, with a button for the rest.
function VideoList({ videos, preview = 2 }) {
  const [open, setOpen] = useState(false)
  const shown = open ? videos : videos.slice(0, preview)
  const hidden = videos.length - preview

  return (
    <>
      <ol className="divide-y divide-ink/10 border-y border-ink/10">
        {shown.map((video) => (
          <VideoRow key={video.id} video={video} />
        ))}
      </ol>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-ink/25 hover:border-accent hover:text-accent transition-colors"
        >
          {open ? 'Show less' : `Show all ${videos.length} videos`}
        </button>
      )}
    </>
  )
}

// Numbered list under a featured video: the exercises in it, or a series of Shorts.
function NumberedList({ label, items }) {
  return (
    <div className="mt-8">
      {label && <p className="text-sm text-ink/60 mb-3">{label}</p>}
      <ol className="border-t border-ink/15">
        {items.map((item) => (
          <li key={item.href} className="border-b border-ink/10">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-3.5"
            >
              <span className="font-display text-3xl text-ink/45 group-hover:text-accent transition-colors tabular-nums">
                {item.number}
              </span>
              <span className="text-lg leading-snug group-hover:text-accent transition-colors">{item.label}</span>
              <span className="text-xs text-ink/60 tabular-nums">{item.meta}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

// The two "for Dummies" series: the long-form video up top, then its steps.
function FeaturedTopic({ topic }) {
  const { feature } = topic
  const chapters = feature.chapters || []
  const exercises = chapters.filter((c) => c.exercise)
  const basics = chapters.filter((c) => !c.exercise && c.t !== '0:00')

  const items = exercises.length
    ? exercises.map((c) => ({ number: c.exercise, label: c.label, meta: c.t, href: watchAt(feature, c.t) }))
    : topic.videos
        .filter((v) => v.part)
        .map((v) => ({ number: v.part, label: v.title, meta: `Short · ${v.length}`, href: videoUrl(v) }))
  const others = topic.videos.filter((v) => !v.part)

  return (
    <>
      <a href={videoUrl(feature)} target="_blank" rel="noopener noreferrer" className="group block">
        <span className="block aspect-video overflow-hidden rounded-sm bg-ink/5">
          <img
            src={`https://i.ytimg.com/vi/${feature.id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </span>
        <span className="block font-display text-3xl sm:text-4xl leading-tight mt-5 group-hover:text-accent transition-colors">
          {feature.title} ↗
        </span>
        <span className="block text-xs text-ink/60 mt-2">{feature.length} · The full video</span>
      </a>

      {basics.length > 0 && (
        <p className="text-sm mt-6 leading-7">
          <span className="text-ink/60">Also in the video: </span>
          {basics.map((c, i) => (
            <span key={c.t}>
              {i > 0 && <span className="text-ink/40"> · </span>}
              <a href={watchAt(feature, c.t)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                {c.label}
              </a>
            </span>
          ))}
        </p>
      )}

      <NumberedList
        label={topic.listLabel || (exercises.length ? 'The exercises. Pick one to jump straight to it.' : null)}
        items={items}
      />

      {others.length > 0 && (
        <>
          <p className="text-sm text-ink/60 mt-10 mb-1">More on this</p>
          <VideoList videos={others} />
        </>
      )}
    </>
  )
}

export default function Learn() {
  return (
    <PageShell current="/learn">
      <PageIntro eyebrow="Tutorials" title="Learn FPV">
        <p>
          I started with zero experience and filmed everything I figured out. Here&apos;s all of it, in the
          order I&apos;d watch it.
        </p>
      </PageIntro>

      <Contents items={TOPICS} />

      {TOPICS.map((topic) => (
        <Section key={topic.id} id={topic.id} title={topic.title} intro={topic.intro}>
          {topic.feature ? (
            <FeaturedTopic topic={topic} />
          ) : (
            <VideoList videos={topic.videos} />
          )}
        </Section>
      ))}
    </PageShell>
  )
}
