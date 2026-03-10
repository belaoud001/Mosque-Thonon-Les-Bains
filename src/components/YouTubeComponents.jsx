import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Eye, Clock } from 'lucide-react'
import { formatViews, formatDuration } from '../hooks/useYouTubeChannel'

// ── Video Modal (Embedded YouTube Player) ────────────────
function VideoModal({ videoId, title, onClose }) {
  if (!videoId) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 md:top-3 md:right-3 w-10 h-10 bg-dark/80 hover:bg-dark text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Video Card ────────────────────────────────────────────
export function VideoCard({ video, index = 0 }) {
  const [playing, setPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fallbackThumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
  const thumbnailSrc = imgError ? fallbackThumb : (video.thumbnail || fallbackThumb)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group cursor-pointer"
        onClick={() => setPlaying(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark/10 mb-4">
          <img
            src={thumbnailSrc}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-red-600 fill-red-600 ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          {video.duration > 0 && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-dark/80 text-white text-xs font-medium rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="font-heading font-semibold text-dark group-hover:text-primary-500 transition-colors line-clamp-2 mb-2 leading-snug">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-dark/50 text-sm">
          {video.views > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(video.views)}
            </span>
          )}
          {video.uploadedDate && (
            <span>{video.uploadedDate}</span>
          )}
        </div>
      </motion.div>

      {playing && (
        <VideoModal
          videoId={video.id}
          title={video.title}
          onClose={() => setPlaying(false)}
        />
      )}
    </>
  )
}

// ── Short Card (Vertical) ─────────────────────────────────
export function ShortCard({ video, index = 0 }) {
  const [playing, setPlaying] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fallbackThumb = `https://i.ytimg.com/vi/${video.id}/oar2.jpg`
  const mqThumb = `https://i.ytimg.com/vi/${video.id}/oar2.jpg`
  const thumbnailSrc = imgError ? fallbackThumb : (video.thumbnail || mqThumb)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        className="group cursor-pointer flex-shrink-0 w-44 md:w-52"
        onClick={() => setPlaying(true)}
      >
        {/* Vertical thumbnail */}
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-dark/10 mb-3 ring-1 ring-gold-200/30">
          <img
            src={thumbnailSrc}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-red-600 fill-red-600 ml-0.5" />
            </div>
          </div>

          {/* Shorts badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25Z" />
            </svg>
            Short
          </div>

          {/* Title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-xs font-medium line-clamp-2 leading-snug">
              {video.title}
            </p>
          </div>
        </div>
      </motion.div>

      {playing && (
        <VideoModal
          videoId={video.id}
          title={video.title}
          onClose={() => setPlaying(false)}
        />
      )}
    </>
  )
}

// ── Subscribe Button ──────────────────────────────────────
export function SubscribeButton({ subscribeUrl, className = '' }) {
  return (
    <a
      href={subscribeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.505 2.505 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814ZM10 15.464V8.536L16 12l-6 3.464Z" />
      </svg>
      S'abonner
      <span className="text-white/70 text-sm hidden sm:inline">sur YouTube</span>
    </a>
  )
}

// ── Loading Skeleton ──────────────────────────────────────
export function VideoSkeleton({ count = 3 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video bg-dark/10 rounded-2xl mb-4" />
          <div className="h-4 bg-dark/10 rounded mb-2 w-3/4" />
          <div className="h-3 bg-dark/10 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function ShortSkeleton({ count = 5 }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex-shrink-0 w-44 md:w-52">
          <div className="aspect-[9/16] bg-dark/10 rounded-2xl mb-3" />
        </div>
      ))}
    </div>
  )
}

// ── Error State ───────────────────────────────────────────
export function YouTubeError({ message, channelUrl }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.505 2.505 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814ZM10 15.464V8.536L16 12l-6 3.464Z" />
        </svg>
      </div>
      <p className="text-dark/60 mb-4">{message}</p>
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors"
      >
        Voir sur YouTube
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  )
}

export { VideoModal }
