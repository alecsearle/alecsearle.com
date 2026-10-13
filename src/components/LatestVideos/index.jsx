import { useEffect, useState } from 'react'
import { YOUTUBE_CHANNEL_URL } from '../../config/site'
import { TextLink } from '../ui/Editorial'

// Served by api/videos.js (cached on Vercel's CDN). Locally, run `vercel dev`
// to hit it; plain `npm run dev` shows the fallback link instead.
async function fetchLatestVideos() {
  const res = await fetch('/api/videos')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Latest uploads as a simple thumbnail grid.
export default function LatestVideos({ count = 6 }) {
  const [videos, setVideos] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetchLatestVideos()
      .then((v) => (Array.isArray(v) && v.length ? setVideos(v.slice(0, count)) : setFailed(true)))
      .catch(() => setFailed(true))
  }, [count])

  if (failed) {
    return <TextLink href={YOUTUBE_CHANNEL_URL}>Watch the latest videos on YouTube ↗</TextLink>
  }

  return (
    <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {(videos || Array.from({ length: count }, (_, i) => ({ id: `s${i}` }))).map((video) => (
        <li key={video.id}>
          {videos ? (
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="group block">
              <span className="block aspect-video overflow-hidden rounded-sm bg-ink/5">
                <img
                  src={video.thumbnail}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </span>
              <span className="block mt-3 text-base leading-snug group-hover:text-accent transition-colors line-clamp-2">
                {video.title}
              </span>
            </a>
          ) : (
            <>
              <span className="block aspect-video rounded-sm bg-ink/5 animate-pulse" />
              <span className="block mt-3 h-4 w-3/4 rounded bg-ink/5 animate-pulse" />
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
