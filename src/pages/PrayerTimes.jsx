import { useState, useEffect } from 'react'
import { Sun, Sunrise, Sunset, Moon, CloudSun, Info, MapPin, Loader2, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import GeometricPattern from '../components/GeometricPattern'
import { useTodayPrayerTimes, useMonthlyPrayerTimes } from '../hooks/usePrayerTimes'

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const PRAYER_ICONS = {
  fajr: Sunrise,
  sunrise: Sun,
  dhuhr: Sun,
  asr: CloudSun,
  maghrib: Sunset,
  isha: Moon,
}

const WEEKDAY_FR = {
  Sunday: 'Dim', Monday: 'Lun', Tuesday: 'Mar', Wednesday: 'Mer',
  Thursday: 'Jeu', Friday: 'Ven', Saturday: 'Sam',
}

// Keys that are actual salah (exclude sunrise)
const SALAH_KEYS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

function getNextPrayer(times) {
  if (!times) return 'fajr'
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  for (const key of SALAH_KEYS) {
    const timeStr = times[key]
    if (!timeStr) continue
    const [h, m] = timeStr.split(':').map(Number)
    if (h * 60 + m > currentMinutes) return key
  }
  return 'fajr' // wraps to next day
}

function getTimeUntil(timeStr) {
  if (!timeStr) return { hours: 0, mins: 0 }
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  let diff = (h * 60 + m) - (now.getHours() * 60 + now.getMinutes())
  if (diff < 0) diff += 24 * 60
  return { hours: Math.floor(diff / 60), mins: diff % 60 }
}

export default function PrayerTimes() {
  const currentYear = new Date().getFullYear()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth()

  const { times: todayTimes, hijriDate, loading: todayLoading, error: todayError } = useTodayPrayerTimes()
  const { schedule, loading: monthLoading, error: monthError } = useMonthlyPrayerTimes(selectedYear, selectedMonth)

  const [nextPrayer, setNextPrayer] = useState('fajr')
  const [countdown, setCountdown] = useState({ hours: 0, mins: 0 })

  useEffect(() => {
    if (!todayTimes) return
    const update = () => {
      const next = getNextPrayer(todayTimes)
      setNextPrayer(next)
      setCountdown(getTimeUntil(todayTimes[next]))
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [todayTimes])

  const todayPrayers = todayTimes ? [
    { key: 'fajr', name: 'Fajr', nameAr: 'الفجر', time: todayTimes.fajr },
    { key: 'sunrise', name: 'Lever', nameAr: 'الشروق', time: todayTimes.sunrise },
    { key: 'dhuhr', name: 'Dhuhr', nameAr: 'الظهر', time: todayTimes.dhuhr },
    { key: 'asr', name: 'Asr', nameAr: 'العصر', time: todayTimes.asr },
    { key: 'maghrib', name: 'Maghrib', nameAr: 'المغرب', time: todayTimes.maghrib },
    { key: 'isha', name: 'Isha', nameAr: 'العشاء', time: todayTimes.isha },
  ] : []

  return (
    <>
      <PageHeader
        title="Horaires de Prière"
        titleAr="أوقات الصلاة"
        subtitle="Consultez les horaires de prière pour Thonon-les-Bains"
      />

      {/* Today's Prayer Times */}
      <section className="py-16 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-primary-500 text-sm uppercase tracking-[0.2em] font-medium mb-2">Aujourd'hui</p>
              <h2 className="font-heading font-bold text-3xl text-dark">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
              {hijriDate && (
                <p className="font-arabic text-gold-500 text-sm mt-1">{hijriDate}</p>
              )}
              <div className="flex items-center justify-center gap-2 mt-2 text-dark/50 text-sm">
                <MapPin className="w-4 h-4" />
                Thonon-les-Bains, Haute-Savoie · Méthode UOIF
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {todayLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                <span className="ml-3 text-dark/50 text-sm">Chargement des horaires...</span>
              </div>
            ) : todayError && !todayTimes ? (
              <div className="flex items-center justify-center gap-2 py-12 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{todayError}</span>
              </div>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {todayPrayers.map((prayer) => {
                const Icon = PRAYER_ICONS[prayer.key]
                const isNext = prayer.key === nextPrayer
                return (
                  <div
                    key={prayer.key}
                    className={`relative rounded-2xl p-6 text-center transition-all duration-500 card-hover ${
                      isNext
                        ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl shadow-primary-500/20'
                        : 'bg-white border border-gold-100/50'
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
                    <p className={`font-heading font-semibold ${isNext ? 'text-white' : 'text-dark'}`}>{prayer.name}</p>
                    <p className={`font-arabic text-xs mb-2 ${isNext ? 'text-white/70' : 'text-dark/40'}`}>{prayer.nameAr}</p>
                    <p className={`text-2xl font-bold ${isNext ? 'text-gold-400' : 'text-primary-500'}`}>{prayer.time}</p>
                    {isNext && (
                      <p className="text-white/60 text-xs mt-2">
                        dans {countdown.hours}h {countdown.mins}min
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            )}
          </ScrollReveal>

          {/* Info box */}
          <ScrollReveal delay={400}>
            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-primary-700">
                <p className="font-semibold mb-1">À noter :</p>
                <p>Les horaires d'iqama (début de la prière en congrégation) sont généralement 10-15 minutes après l'adhan. Veuillez arriver en avance pour la prière du vendredi (Joumou'a).</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Monthly Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <h2 className="font-heading font-bold text-2xl text-dark">
                Calendrier Mensuel
              </h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-4 py-2 bg-ivory border border-gold-200 rounded-xl text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {MONTHS.map((month, i) => (
                    <option key={month} value={i}>{month}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-4 py-2 bg-ivory border border-gold-200 rounded-xl text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {[currentYear - 1, currentYear, currentYear + 1].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {monthLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                <span className="ml-3 text-dark/50">Chargement du calendrier de {MONTHS[selectedMonth]}...</span>
              </div>
            ) : monthError ? (
              <div className="flex items-center justify-center gap-2 py-16 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{monthError}</span>
              </div>
            ) : (
            <div className="overflow-x-auto rounded-2xl border border-primary-800 shadow-lg shadow-primary-800/5">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                    <th className="px-4 py-4 text-left text-white font-semibold text-sm">Jour</th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <Sunrise className="w-4 h-4 mb-1 text-gold-400" />
                        Fajr
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <Sun className="w-4 h-4 mb-1 text-gold-400" />
                        Lever
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <Sun className="w-4 h-4 mb-1 text-gold-400" />
                        Dhuhr
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <CloudSun className="w-4 h-4 mb-1 text-gold-400" />
                        Asr
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <Sunset className="w-4 h-4 mb-1 text-gold-400" />
                        Maghrib
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex flex-col items-center">
                        <Moon className="w-4 h-4 mb-1 text-gold-400" />
                        Isha
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => {
                    const isToday = row.day === today && selectedMonth === currentMonth && selectedYear === currentYear
                    const isFriday = row.weekday === 'Friday'
                    return (
                    <tr
                      key={row.day}
                      className={`border-b border-gold-50 transition-colors ${
                        isToday
                          ? 'bg-primary-50 font-semibold'
                          : isFriday
                          ? 'bg-gold-50/30'
                          : 'hover:bg-ivory/50 even:bg-gold-50/20'
                      }`}
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={`${isToday ? 'inline-flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full' : 'text-dark/70'}`}>
                            {row.day}
                          </span>
                          {row.weekday && (
                            <span className={`text-xs ${isFriday ? 'text-gold-500 font-semibold' : 'text-dark/30'}`}>
                              {WEEKDAY_FR[row.weekday] || row.weekday.slice(0, 3)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.fajr}</td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.sunrise}</td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.dhuhr}</td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.asr}</td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.maghrib}</td>
                      <td className="px-4 py-3 text-center text-sm text-dark/70">{row.isha}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Jumuah Info */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="font-arabic text-gold-400/70 text-4xl mb-3">صلاة الجمعة</p>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">Prière du Vendredi (Joumou'a)</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              La prière du vendredi est obligatoire pour tout musulman adulte.
              Nous vous recommandons d'arriver au moins 15 minutes avant la khoutba.
            </p>
            <div className="max-w-sm mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold-500 text-center">
                <p className="text-gold-400 font-semibold text-sm mb-2">Khoutba & Salat</p>
                <p className="text-white text-4xl font-bold mb-1">12h45 - 13h30</p>
                <p className="text-white/50 text-sm">Toute l'année</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
