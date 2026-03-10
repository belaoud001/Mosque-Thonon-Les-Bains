import { useState, useEffect } from 'react'
import { Sun, Sunrise, Clock, Sunset, Moon, CloudSun, Loader2 } from 'lucide-react'
import { useTodayPrayerTimes } from '../hooks/usePrayerTimes'

const PRAYER_NAMES = [
  { key: 'fajr', name: 'Fajr', nameAr: 'الفجر', icon: Sunrise },
  { key: 'dhuhr', name: 'Dhuhr', nameAr: 'الظهر', icon: Sun },
  { key: 'asr', name: 'Asr', nameAr: 'العصر', icon: CloudSun },
  { key: 'maghrib', name: 'Maghrib', nameAr: 'المغرب', icon: Sunset },
  { key: 'isha', name: 'Isha', nameAr: 'العشاء', icon: Moon },
]

function getNextPrayer(times) {
  if (!times) return 'fajr'
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  for (const prayer of PRAYER_NAMES) {
    const timeStr = times[prayer.key]
    if (!timeStr) continue
    const [h, m] = timeStr.split(':').map(Number)
    if (h * 60 + m > currentMinutes) {
      return prayer.key
    }
  }
  return 'fajr' // next day
}

function getTimeUntil(timeStr) {
  if (!timeStr) return { hours: 0, mins: 0 }
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  let diff = (h * 60 + m) - (now.getHours() * 60 + now.getMinutes())
  if (diff < 0) diff += 24 * 60
  const hours = Math.floor(diff / 60)
  const mins = diff % 60
  return { hours, mins }
}

export default function PrayerTimesWidget({ compact = false }) {
  const { times: PRAYER_TIMES, hijriDate, loading, error } = useTodayPrayerTimes()
  const [nextPrayer, setNextPrayer] = useState('fajr')
  const [countdown, setCountdown] = useState({ hours: 0, mins: 0 })

  useEffect(() => {
    if (!PRAYER_TIMES) return
    const update = () => {
      const next = getNextPrayer(PRAYER_TIMES)
      setNextPrayer(next)
      setCountdown(getTimeUntil(PRAYER_TIMES[next]))
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [PRAYER_TIMES])

  const nextPrayerInfo = PRAYER_NAMES.find(p => p.key === nextPrayer)

  if (loading || !PRAYER_TIMES) {
    return (
      <div className={`flex items-center justify-center ${compact ? 'bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12' : 'py-12'}`}>
        <Loader2 className={`w-8 h-8 animate-spin ${compact ? 'text-gold-400' : 'text-primary-500'}`} />
        <span className={`ml-3 text-sm ${compact ? 'text-white/60' : 'text-dark/50'}`}>Chargement des horaires...</span>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-gold-400 p-6">
        <div className="text-center mb-4">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Prochaine prière</p>
          <p className="text-gold-400 font-heading font-bold text-2xl">{nextPrayerInfo?.name}</p>
          <p className="text-white font-arabic text-lg">{nextPrayerInfo?.nameAr}</p>
          <p className="text-white text-3xl font-bold mt-1">{PRAYER_TIMES[nextPrayer]}</p>
          <p className="text-white/50 text-sm mt-1">
            dans {countdown.hours}h {countdown.mins}min
          </p>
        </div>
        <div className="space-y-2">
          {PRAYER_NAMES.map((prayer) => {
            const Icon = prayer.icon
            const isNext = prayer.key === nextPrayer
            return (
              <div
                key={prayer.key}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                  isNext ? 'bg-gold-400/20 border border-gold-400/30' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isNext ? 'text-gold-400' : 'text-white/50'}`} />
                  <span className={`text-sm font-medium ${isNext ? 'text-gold-400' : 'text-white/70'}`}>
                    {prayer.name}
                  </span>
                </div>
                <span className={`text-sm font-bold ${isNext ? 'text-gold-400' : 'text-white'}`}>
                  {PRAYER_TIMES[prayer.key]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {PRAYER_NAMES.map((prayer) => {
        const Icon = prayer.icon
        const isNext = prayer.key === nextPrayer
        return (
          <div
            key={prayer.key}
            className={`relative rounded-2xl p-6 text-center transition-all duration-500 card-hover ${
              isNext
                ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl shadow-primary-500/20'
                : 'bg-white border border-gold-100 hover:border-gold-300'
            }`}
          >
            {isNext && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-400 text-dark uppercase tracking-wider">
                  Prochaine
                </span>
              </div>
            )}
            <Icon className={`w-8 h-8 mx-auto mb-3 ${isNext ? 'text-gold-400' : 'text-primary-500'}`} />
            <p className={`font-heading font-semibold text-lg ${isNext ? 'text-white' : 'text-dark'}`}>
              {prayer.name}
            </p>
            <p className={`font-arabic text-sm mb-2 ${isNext ? 'text-white/70' : 'text-dark/40'}`}>
              {prayer.nameAr}
            </p>
            <p className={`text-2xl font-bold ${isNext ? 'text-gold-400' : 'text-primary-500'}`}>
              {PRAYER_TIMES[prayer.key]}
            </p>
            {isNext && (
              <p className="text-white/60 text-xs mt-2">
                dans {countdown.hours}h {countdown.mins}min
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
