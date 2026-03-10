import { useState, useEffect, useCallback } from 'react'

// ── Config ────────────────────────────────────────────────

const CHANNEL_HANDLE = import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
const CHANNEL_URL = import.meta.env.VITE_YOUTUBE_CHANNEL_URL
const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`

// Channel avatar & banner saved locally to avoid YouTube 429 rate-limiting
const CHANNEL_AVATAR = '/images/channel-avatar.jpg'
const CHANNEL_BANNER = '/images/channel-banner.jpg'

// YouTube RSS feed URL
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

// CORS proxies — YouTube RSS blocks direct browser fetch (CORS),
// so we route through these proxies. We try each in order.
const CORS_PROXIES = [
  (url) => `https://api.codetabs.com/v1/proxy?quest=${url}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => url, // direct fetch as last resort (works if YouTube ever allows CORS)
]

// ── Hardcoded fallback shorts ─────────────────────────────
// These are the known shorts from the channel. If the RSS feed
// can't be fetched (CORS, network, etc.), we always show these.
const FALLBACK_SHORTS = [
  {
    id: 'rwqr-1zr5RI',
    title: "Fête de l'Aïd ✨",
    thumbnail: 'https://i.ytimg.com/vi/rwqr-1zr5RI/hqdefault.jpg',
    views: 0,
    duration: 0,
    uploadedDate: '22 avr. 2025',
    uploaderName: 'AMC Mosquée THONON',
    isShort: true,
    description: '',
    url: 'https://www.youtube.com/shorts/rwqr-1zr5RI',
  },
  {
    id: '3OYXg-MyOfg',
    title: 'Eid El Fitr 2025 🌙',
    thumbnail: 'https://i.ytimg.com/vi/3OYXg-MyOfg/hqdefault.jpg',
    views: 0,
    duration: 0,
    uploadedDate: '3 avr. 2025',
    uploaderName: 'AMC Mosquée THONON',
    isShort: true,
    description: '',
    url: 'https://www.youtube.com/shorts/3OYXg-MyOfg',
  },
  {
    id: 'mYkv9mCVHhw',
    title: '🅿️ Bien se garer pendant le Ramadan 🚗',
    thumbnail: 'https://i.ytimg.com/vi/mYkv9mCVHhw/hqdefault.jpg',
    views: 0,
    duration: 0,
    uploadedDate: '8 mars 2025',
    uploaderName: 'AMC Mosquée THONON',
    isShort: true,
    description: '',
    url: 'https://www.youtube.com/shorts/mYkv9mCVHhw',
  },
]

// Piped API instances (optional enhancement for subscriber count)
const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',
  'https://pipedapi.r4fo.com',
  'https://pipedapi.moomoo.me',
  'https://pipedapi.syncpundit.io',
  'https://api-piped.mha.fi',
]

const CACHE_KEY_VIDEOS = 'yt_channel_videos_v3'
const CACHE_KEY_SHORTS = 'yt_channel_shorts_v3'
const CACHE_KEY_INFO = 'yt_channel_info_v3'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

// ── Cache helpers ─────────────────────────────────────────
function getCache(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch { /* storage full – ignore */ }
}

// ── RSS Feed parser (through CORS proxy) ──────────────────
async function fetchFromRSS() {
  let lastError = null

  for (const proxyFn of CORS_PROXIES) {
    const url = proxyFn(RSS_URL)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()

      // Validate that we got XML
      if (!text.includes('<feed') && !text.includes('<entry')) {
        throw new Error('Response is not RSS XML')
      }

      // Strip XML namespace prefixes (yt:, media:) so querySelector works
      const cleanXml = text
        .replace(/xmlns(:\w+)?="[^"]*"/g, '')
        .replace(/<(\/?)\w+:/g, '<$1')

      const parser = new DOMParser()
      const xml = parser.parseFromString(cleanXml, 'text/xml')
      const entries = xml.querySelectorAll('entry')
      if (entries.length === 0) throw new Error('No entries in RSS')

      const channelTitle =
        xml.querySelector('feed > title')?.textContent || 'AMC Mosquée THONON'

      const videos = []
      entries.forEach((entry) => {
        const videoId = entry.querySelector('videoId')?.textContent || ''
        const title = entry.querySelector('title')?.textContent || ''
        const published = entry.querySelector('published')?.textContent || ''
        const thumbnail =
          entry.querySelector('thumbnail')?.getAttribute('url') ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        const description =
          entry.querySelector('description')?.textContent || ''
        const views = parseInt(
          entry.querySelector('statistics')?.getAttribute('views') || '0',
          10,
        )
        const link =
          entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || ''

        const isShort = link.includes('/shorts/')

        videos.push({
          id: videoId,
          title,
          thumbnail,
          views,
          duration: 0,
          uploadedDate: published
            ? new Date(published).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : '',
          uploaderName: channelTitle,
          isShort,
          description: description.substring(0, 200),
          url: isShort
            ? `https://www.youtube.com/shorts/${videoId}`
            : `https://www.youtube.com/watch?v=${videoId}`,
        })
      })

      console.log(`[YouTube] RSS fetched via proxy (${videos.length} videos)`)
      return { videos, channelName: channelTitle }
    } catch (err) {
      clearTimeout(timeout)
      lastError = err
      continue // try next proxy
    }
  }

  throw lastError || new Error('All CORS proxies failed')
}

// ── Piped API (optional enhancement) ──────────────────────
async function fetchPipedEnhancement() {
  for (const instance of PIPED_INSTANCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 6000)
      const res = await fetch(`${instance}/channel/${CHANNEL_HANDLE}`, {
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (!res.ok) continue
      const data = await res.json()
      return {
        avatar: data.avatarUrl || '',
        banner: data.bannerUrl || '',
        subscribers: data.subscriberCount ?? 0,
        name: data.name || '',
      }
    } catch {
      continue
    }
  }
  return null
}

// ── Main hook ─────────────────────────────────────────────
export default function useYouTubeChannel() {
  const [videos, setVideos] = useState(() => getCache(CACHE_KEY_VIDEOS) || [])
  const [shorts, setShorts] = useState(
    () => getCache(CACHE_KEY_SHORTS) || FALLBACK_SHORTS,
  )
  const [channelInfo, setChannelInfo] = useState(
    () =>
      getCache(CACHE_KEY_INFO) || {
        name: 'AMC Mosquée THONON',
        avatar: CHANNEL_AVATAR,
        banner: '',
        subscribers: 0,
        description: '',
        id: CHANNEL_ID,
      },
  )
  const [loading, setLoading] = useState(!getCache(CACHE_KEY_VIDEOS))
  const [error, setError] = useState(null)

  const fetchChannel = useCallback(async () => {
    // Return cached data if fresh
    const cachedVids = getCache(CACHE_KEY_VIDEOS)
    const cachedShorts = getCache(CACHE_KEY_SHORTS)
    const cachedInfo = getCache(CACHE_KEY_INFO)
    if (cachedVids && cachedShorts && cachedInfo) {
      setVideos(cachedVids)
      setShorts(cachedShorts)
      setChannelInfo(cachedInfo)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    let stats = null
    try {
      // Fetch YouTube Data API statistics
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
      if (!apiKey) throw new Error('YouTube API key not set in env')
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`
      )
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        if (statsData.items && statsData.items.length > 0) {
          stats = statsData.items[0].statistics
        }
      }
    } catch (err) {
      // Ignore stats error, fallback to other sources
    }

    try {
      // ① Primary source: YouTube RSS feed (via CORS proxy)
      const { videos: allVideos, channelName } = await fetchFromRSS()

      const regularVideos = allVideos.filter((v) => !v.isShort)
      const shortVideos = allVideos.filter((v) => v.isShort)

      // Use fetched shorts, or fallback if RSS returned none
      const finalShorts = shortVideos.length > 0 ? shortVideos : FALLBACK_SHORTS

      let info = {
        name: channelName,
        avatar: CHANNEL_AVATAR,
        banner: '',
        subscribers: 0,
        description: '',
        id: CHANNEL_ID,
        viewCount: stats?.viewCount ? parseInt(stats.viewCount, 10) : 0,
        videoCount: stats?.videoCount ? parseInt(stats.videoCount, 10) : 0,
      }

      // ② Enhancement: try Piped for subscriber count
      try {
        const piped = await fetchPipedEnhancement()
        if (piped) {
          if (piped.subscribers) info.subscribers = piped.subscribers
          if (piped.name) info.name = piped.name
          if (piped.banner) info.banner = piped.banner
        }
      } catch {
        // Piped failed — no problem
      }

      // If YouTube API gave subscriberCount, use it (prefer Piped if available)
      if (stats?.subscriberCount) {
        info.subscribers = parseInt(stats.subscriberCount, 10)
      }

      setVideos(regularVideos)
      setShorts(finalShorts)
      setChannelInfo(info)
      setCache(CACHE_KEY_VIDEOS, regularVideos)
      setCache(CACHE_KEY_SHORTS, finalShorts)
      setCache(CACHE_KEY_INFO, info)
    } catch (err) {
      console.warn('[YouTube] RSS fetch failed:', err.message)
      // RSS failed entirely → use fallback shorts so page is never empty
      setShorts((prev) => (prev.length > 0 ? prev : FALLBACK_SHORTS))
      setChannelInfo((prev) =>
        prev || {
          name: 'AMC Mosquée THONON',
          avatar: CHANNEL_AVATAR,
          banner: '',
          subscribers: 0,
          description: '',
          id: CHANNEL_ID,
          viewCount: stats?.viewCount ? parseInt(stats.viewCount, 10) : 0,
          videoCount: stats?.videoCount ? parseInt(stats.videoCount, 10) : 0,
        },
      )
      // Don't set error if we have fallback data — page still looks good
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchChannel()
  }, [fetchChannel])

  return {
    videos,
    shorts,
    channelInfo,
    loading,
    error,
    refetch: fetchChannel,
    channelUrl: CHANNEL_URL,
    subscribeUrl: SUBSCRIBE_URL,
    channelHandle: CHANNEL_HANDLE,
  }
}

// ── Helpers exported for use in components ────────────────
export function formatViews(n) {
  if (!n) return ''
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M vues`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K vues`
  return `${n} vues`
}

export function formatDuration(seconds) {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export { CHANNEL_URL, SUBSCRIBE_URL, CHANNEL_HANDLE, CHANNEL_ID, CHANNEL_AVATAR, CHANNEL_BANNER }
