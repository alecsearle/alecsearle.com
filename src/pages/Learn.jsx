import { useState } from 'react'
import { Play } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import VideoRow from '../components/VideoRow'
import { FEATURED_VIDEO, TOPICS } from '../data/videos'

const toSeconds = (t) => t.split(':').reduce((total, n) => total * 60 + Number(n), 0)
const at = (t) => `https://www.youtube.com/watch?v=${FEATURED_VIDEO.id}&t=${toSeconds(t)}s`

function FeaturedGuide() {
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${FEATURED_VIDEO.id}/maxresdefault.jpg`)
  const exercises = FEATURED_VIDEO.chapters.filter((c) => c.exercise)
  const basics = FEATURED_VIDEO.chapters.filter((c) => !c.exercise && c.t !== '0:00')

  return (
    <section className="mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <a href={at('0:00')} target="_blank" rel="noopener noreferrer" className="block relative group">
        <img
          src={thumb}
          onError={() => setThumb(`https://i.ytimg.com/vi/${FEATURED_VIDEO.id}/hqdefault.jpg`)}
          alt={FEATURED_VIDEO.title}
          className="w-full aspect-video object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/5 transition-colors">
          <span className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
          </span>
        </span>
      </a>

      <div className="p-4 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Flying FPV for Dummies · start here
        </p>
        <h2 className="text-xl font-semibold tracking-tight mt-1">{FEATURED_VIDEO.title}</h2>
        <p className="text-sm text-white/60 mt-2 leading-relaxed">
          Everything I wish someone had shown me when I started: the controls, then eight exercises in
          the simulator that build on each other. Tap one to jump straight to it.
        </p>

        <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {exercises.map((c) => (
            <li key={c.t}>
              <a
                href={at(c.t)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                <span className="text-[10px] font-semibold text-amber-300/90">Exercise {c.exercise}</span>
                <span className="text-sm font-medium leading-tight mt-0.5">{c.label}</span>
                <span className="text-[11px] text-white/35 mt-auto pt-1">{c.t}</span>
              </a>
            </li>
          ))}
        </ol>

        <p className="text-xs text-white/40 mt-5 mb-2">Before the exercises:</p>
        <div className="flex flex-wrap gap-1.5">
          {basics.map((c) => (
            <a
              key={c.t}
              href={at(c.t)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-colors"
            >
              {c.label} <span className="text-white/30">{c.t}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Learn() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-8">
        <header className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight">Learn</h1>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            I started FPV with zero experience and documented everything along the way. Here&apos;s all of
            it, sorted so you can find what you need.
          </p>
        </header>

        <nav className="flex gap-2 mt-6 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {TOPICS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {t.title}
            </a>
          ))}
        </nav>

        <FeaturedGuide />

        {TOPICS.map((topic) => (
          <section key={topic.id} id={topic.id} className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-semibold tracking-tight">{topic.title}</h2>
            {topic.intro && <p className="text-sm text-white/55 mt-1">{topic.intro}</p>}
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4 -mx-2">
              {topic.videos.map((video) => (
                <VideoRow key={video.id} video={video} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
