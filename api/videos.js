// Vercel serverless function: GET /api/videos
// Fetches the latest uploads once and lets Vercel's CDN cache the result, so
// YouTube API quota stays flat no matter how much traffic the site gets.
// Also keeps the API key out of the browser bundle.

const API_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY
const HANDLE = '@alec_searle'

// true = long-form only, false = all videos including Shorts
const LONG_FORM_ONLY = false

function parseDurationSeconds(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  const h = parseInt(match?.[1] || 0)
  const m = parseInt(match?.[2] || 0)
  const s = parseInt(match?.[3] || 0)
  return h * 3600 + m * 60 + s
}

async function getJson(url) {
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`)
  return data
}

async function fetchLatestVideos() {
  const channelData = await getJson(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${HANDLE}&key=${API_KEY}`
  )
  const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsId) throw new Error('Uploads playlist not found')

  const playlistData = await getJson(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=20&key=${API_KEY}`
  )
  const items = playlistData.items || []

  if (!LONG_FORM_ONLY) {
    return items.slice(0, 10).map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    }))
  }

  // Fetch durations to filter out Shorts (≤ 60s)
  const ids = items.map((i) => i.snippet.resourceId.videoId).join(',')
  const detailsData = await getJson(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`
  )
  const durationMap = Object.fromEntries(
    (detailsData.items || []).map((v) => [v.id, parseDurationSeconds(v.contentDetails.duration)])
  )

  return items
    .filter((item) => {
      const id = item.snippet.resourceId.videoId
      return durationMap[id] !== undefined && durationMap[id] > 60
    })
    .slice(0, 10)
    .map((item) => ({
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
