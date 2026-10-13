// Exports every public upload on the channel to scripts/videos.json.
// Used to curate src/data/videos.js — not part of the site build.
//
//   npm run videos
//
// Needs YOUTUBE_API_KEY in .env. Costs ~1 quota unit per 50 videos.

import { writeFileSync } from 'node:fs'

const KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY
const HANDLE = '@alec_searle'
const API = 'https://www.googleapis.com/youtube/v3'

if (!KEY) {
  console.error('Missing YOUTUBE_API_KEY in .env')
  process.exit(1)
}

async function get(path, params) {
  const url = `${API}/${path}?${new URLSearchParams({ ...params, key: KEY })}`
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok) throw new Error(`${path}: ${data.error?.message || res.status}`)
  return data
}

async function playlistIds(playlistId) {
  const ids = []
  let pageToken
  do {
    const data = await get('playlistItems', {
      part: 'contentDetails',
      playlistId,
      maxResults: 50,
      ...(pageToken && { pageToken }),
    })
    ids.push(...data.items.map((i) => i.contentDetails.videoId))
    pageToken = data.nextPageToken
  } while (pageToken)
  return ids
}

function seconds(iso) {
  const [, h = 0, m = 0, s = 0] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) || []
  return +h * 3600 + +m * 60 + +s
}

const channel = await get('channels', { part: 'id,snippet', forHandle: HANDLE })
const channelId = channel.items[0].id
const suffix = channelId.slice(2)

const allIds = await playlistIds(`UU${suffix}`)
// YouTube keeps a Shorts-only playlist (UUSH); fall back to duration if it's unavailable.
const shortIds = new Set(await playlistIds(`UUSH${suffix}`).catch(() => []))

const videos = []
for (let i = 0; i < allIds.length; i += 50) {
  const data = await get('videos', {
    part: 'snippet,contentDetails,statistics',
    id: allIds.slice(i, i + 50).join(','),
  })
  for (const v of data.items) {
    const duration = seconds(v.contentDetails.duration)
    videos.push({
      id: v.id,
      title: v.snippet.title,
      published: v.snippet.publishedAt.slice(0, 10),
      duration,
      short: shortIds.size ? shortIds.has(v.id) : duration <= 180,
      views: +v.statistics.viewCount || 0,
    })
  }
}

videos.sort((a, b) => b.published.localeCompare(a.published))
writeFileSync(new URL('./videos.json', import.meta.url), JSON.stringify({ channelId, videos }, null, 2) + '\n')

const longs = videos.filter((v) => !v.short)
console.log(`Channel ${channelId}: ${videos.length} uploads (${longs.length} long-form, ${videos.length - longs.length} Shorts) → scripts/videos.json`)
