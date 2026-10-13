// Vercel serverless function: GET /api/videos
// Fetches the latest uploads once and lets Vercel's CDN cache the result, so
// YouTube API quota stays flat no matter how much traffic the site gets.
// Also keeps the API key out of the browser bundle.

const API_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY
// YouTube keeps an automatic long-form-only uploads playlist for every channel:
// the channel ID with "UC" swapped for "UULF". Shorts never appear in it.
const CHANNEL_ID = 'UCiMs_UjXQ49N9G-Sa7bOBqQ'
const LONG_FORM_PLAYLIST = `UULF${CHANNEL_ID.slice(2)}`

async function getJson(url) {
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`)
  return data
}

async function fetchLatestVideos() {
  const data = await getJson(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${LONG_FORM_PLAYLIST}&maxResults=10&key=${API_KEY}`
  )
  return (data.items || []).map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
  }))
}

export default async function handler(req, res) {
  try {
    const videos = await fetchLatestVideos()
    // Fresh for 15 min, then serve the cached copy for up to a day while refreshing.
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400')
    res.status(200).json(videos)
  } catch (err) {
    res.setHeader('Cache-Control', 's-maxage=60')
    res.status(502).json({ error: err.message })
  }
}
