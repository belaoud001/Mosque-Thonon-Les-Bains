import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Tv, Eye, Film, ChevronLeft, ChevronRight } from 'lucide-react'
import useYouTubeChannel, { formatViews, CHANNEL_BANNER } from '../hooks/useYouTubeChannel'
import {
  VideoCard, SubscribeButton,
  VideoSkeleton, YouTubeError,
} from '../components/YouTubeComponents'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'
import PageHeader from '../components/PageHeader'

// ── Shorts icon SVG (YouTube Shorts lightning bolt) ───────
const ShortsIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25Z" />
  </svg>
)

// ── YouTube icon SVG ──────────────────────────────────────
const YouTubeIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.505 2.505 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814ZM10 15.464V8.536L16 12l-6 3.464Z" />
  </svg>
)

// ── Embedded Short Player ─────────────────────────────────
function EmbeddedShort({ video, index = 0 }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col"
    >
      {/* Vertical 9:16 embedded player */}
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-dark/5 shadow-lg ring-1 ring-dark/10">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/5">
            <div className="w-10 h-10 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Title + meta below */}
      <div className="mt-3 px-1">
        <h3 className="font-heading font-semibold text-dark text-sm leading-snug line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 text-dark/45 text-xs">
          {video.views > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)}
            </span>
          )}
          {video.uploadedDate && <span>{video.uploadedDate}</span>}
        </div>
      </div>
    </motion.div>
  )
}

// ── Skeleton for embedded shorts ──────────────────────────
function EmbeddedShortSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[9/16] bg-dark/10 rounded-2xl" />
          <div className="mt-3 px-1">
            <div className="h-4 bg-dark/10 rounded w-3/4 mb-2" />
            <div className="h-3 bg-dark/10 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Shorts Carousel ───────────────────────────────────────
function ShortsCarousel({ shorts }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    // Calculate active index based on scroll position
    const itemWidth = el.querySelector('[data-short-item]')?.offsetWidth || 300
    const gap = 24
    const idx = Math.round(el.scrollLeft / (itemWidth + gap))
    setActiveIndex(Math.min(idx, shorts.length - 1))
  }, [shorts.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const item = el.querySelector('[data-short-item]')
    const itemWidth = item?.offsetWidth || 300
    const gap = 24
    const scrollAmount = (itemWidth + gap) * (direction === 'left' ? -1 : 1)
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const scrollToIndex = (index) => {
    const el = scrollRef.current
    if (!el) return
    const item = el.querySelector('[data-short-item]')
    const itemWidth = item?.offsetWidth || 300
    const gap = 24
    el.scrollTo({ left: index * (itemWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl border border-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl border border-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {shorts.map((short, i) => (
          <div
            key={short.id}
            data-short-item
            className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] snap-center"
          >
            <EmbeddedShort video={short} index={i} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {shorts.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {shorts.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-red-500'
                  : 'w-2 bg-dark/15 hover:bg-dark/30'
              }`}
              aria-label={`Short ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MediaCenter() {
  const {
    videos, shorts, channelInfo,
    loading, error,
    channelUrl, subscribeUrl,
  } = useYouTubeChannel()

  // Always default to 'shorts' since we always have shorts (hardcoded fallback)
  const [activeTab, setActiveTab] = useState('shorts')

  // Both tabs are ALWAYS visible. Shorts has fallback data, Videos shows empty state if 0.
  const tabs = [
    { id: 'shorts', label: 'Shorts', count: shorts.length, icon: ShortsIcon },
    { id: 'videos', label: 'Vidéos', count: videos.length, icon: Tv },
  ]

  return (
    <>
      {/* ========== PAGE HEADER ========== */}
      <PageHeader
        title="Médiathèque"
        titleAr="مكتبة الوسائط"
        subtitle="Retrouvez nos vidéos, conférences, cours et rappels sur notre chaîne YouTube"
      />

      {/* ========== CHANNEL BANNER ========== */}
      <section className="relative -mt-8 mb-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-xl border border-gold-100/50 overflow-hidden">
              {/* Channel banner image */}
              <div className="h-32 md:h-44 lg:h-52 relative overflow-hidden rounded-t-3xl">
                <img
                  src={channelInfo.CHANNEL_BANNER || CHANNEL_BANNER}
                  alt="Bannière de la chaîne"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Channel info */}
              <div className="relative px-6 md:px-10 py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white ring-4 ring-gold-100/50 shadow-md overflow-hidden flex-shrink-0">
                  {channelInfo?.avatar ? (
                    <img
                      src={channelInfo.avatar}
                      alt={channelInfo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <YouTubeIcon className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>

                {/* Channel details */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-dark truncate">
                    {channelInfo?.name || 'AMC Mosquée Thonon'}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-dark/50 text-sm">
                    {channelInfo?.subscribers > 0 && (
                      <span>{channelInfo.subscribers.toLocaleString('fr-FR')} abonnés</span>
                    )}
                    {channelInfo?.viewCount > 0 && (
                      <>
                        {channelInfo?.subscribers > 0 && <span>•</span>}
                        <span>{channelInfo.viewCount.toLocaleString('fr-FR')} vues</span>
                      </>
                    )}
                    {channelInfo?.videoCount > 0 && (
                      <>
                        {(channelInfo?.subscribers > 0 || channelInfo?.viewCount > 0) && <span>•</span>}
                        <span>{channelInfo.videoCount.toLocaleString('fr-FR')} vidéos</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Subscribe + Visit */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <SubscribeButton subscribeUrl={subscribeUrl} />
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border-2 border-dark/10 hover:border-dark/20 text-dark/60 hover:text-dark transition-all"
                    title="Voir sur YouTube"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== TAB TOGGLE + CONTENT ========== */}
      <section className="py-16 md:py-24 bg-ivory relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Error state (only when nothing loaded at all) */}
          {!loading && error && shorts.length === 0 && videos.length === 0 && (
            <YouTubeError message={error} channelUrl={channelUrl} />
          )}

          {/* ── Tab toggle bar ── */}
          {tabs.length > 0 && (
            <ScrollReveal>
              <div className="flex items-center justify-center mb-12">
                <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gold-100/50">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isActive
                            ? tab.id === 'shorts'
                              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                              : 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                            : 'text-dark/50 hover:text-dark hover:bg-dark/5'
                        }`}
                      >
                        <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : tab.id === 'shorts' ? 'text-red-400' : 'text-primary-400'}`} />
                        {tab.label}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-dark/5 text-dark/40'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── Tab content ── */}
          <AnimatePresence mode="wait">
            {activeTab === 'shorts' && (
              <motion.div
                key="shorts"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {shorts.length > 0 ? (
                  <ShortsCarousel shorts={shorts} />
                ) : loading ? (
                  <EmbeddedShortSkeleton count={3} />
                ) : null}
              </motion.div>
            )}

            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <VideoSkeleton count={6} />
                ) : videos.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {videos.map((video, i) => (
                      <VideoCard key={video.id} video={video} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    {/* Empty state illustration */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-dark/5 rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="w-10 h-10 text-dark/20" />
                      </div>
                      {/* Decorative dashed circle */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" className="text-dark/10" />
                      </svg>
                    </div>
                    <p className="text-dark/60 font-heading font-semibold text-lg mb-2">Aucune vidéo pour le moment</p>
                    <p className="text-dark/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                      La chaîne n'a pas encore publié de vidéos longues.<br />
                      En attendant, découvrez nos Shorts !
                    </p>
                    <button
                      onClick={() => setActiveTab('shorts')}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-full transition-colors text-sm"
                    >
                      <ShortsIcon className="w-4 h-4" />
                      Voir les Shorts
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <IslamicDivider />

      {/* ========== SUBSCRIBE CTA ========== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#1a1a35] to-dark" />
        <GeometricPattern variant="hero" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            {/* YouTube icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-8 bg-red-600/20 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <YouTubeIcon className="w-10 h-10 text-red-500" />
            </motion.div>

            <p className="font-arabic text-gold-400/70 text-xl mb-4">تابعونا</p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
              Restez Connectés
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Abonnez-vous à notre chaîne YouTube pour ne manquer aucune conférence,
              cours de Coran ou rappel. Ensemble, partageons le savoir et la spiritualité.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-red-600/20 text-lg"
              >
                <YouTubeIcon className="w-6 h-6" />
                S'abonner à la Chaîne
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <p className="font-heading font-bold text-3xl text-white">{channelInfo?.videoCount ? channelInfo.videoCount.toLocaleString('fr-FR') : videos.length}</p>
                <p className="text-white/40 text-sm">Vidéos</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-3xl text-white">{shorts.length}</p>
                <p className="text-white/40 text-sm">Shorts</p>
              </div>
              {channelInfo?.subscribers > 0 && (
                <div className="text-center">
                  <p className="font-heading font-bold text-3xl text-white">
                    {channelInfo.subscribers.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-white/40 text-sm">Abonnés</p>
                </div>
              )}
              {channelInfo?.viewCount > 0 && (
                <div className="text-center">
                  <p className="font-heading font-bold text-3xl text-white">
                    {channelInfo.viewCount.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-white/40 text-sm">Vues</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
