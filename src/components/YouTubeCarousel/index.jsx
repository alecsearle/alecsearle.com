import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import VideoCard from './VideoCard'
import VideoSkeleton from './VideoSkeleton'
import { YOUTUBE_CHANNEL_URL } from '../../config/site'

// Served by api/videos.js (cached on Vercel's CDN). Locally, run `vercel dev`
// to hit it; plain `npm run dev` shows the fallback link instead.
async function fetchLatestVideos() {
  const res = await fetch('/api/videos')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export default function YouTubeCarousel() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    fetchLatestVideos()
      .then(setVideos)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }, [])

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 270, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <SectionLabel title="Latest Videos" />
      {!loading && (failed || videos.length === 0) ? (
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-sm font-semibold"
        >
          Watch the latest videos on YouTube →
        </a>
      ) : (
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <VideoSkeleton key={i} />)
            : videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>

        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll videos left"
          className="hidden md:flex absolute left-0 top-[45%] -translate-x-5 -translate-y-1/2 w-8 h-8 items-center justify-center bg-black/80 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll videos right"
          className="hidden md:flex absolute right-0 top-[45%] translate-x-5 -translate-y-1/2 w-8 h-8 items-center justify-center bg-black/80 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      )}
    </div>
  )
}
