import { useState, useEffect, useCallback } from 'react'

// Thonon-les-Bains coordinates
const LAT = 46.3703
const LNG = 6.4780
// Method 12 = UOIF (Union des Organisations Islamiques de France)
const METHOD = 12

const API_BASE = 'https://api.aladhan.com/v1'

/**
 * Fetches today's prayer times from the Aladhan API
 */
export function useTodayPrayerTimes() {
  const [times, setTimes] = useState(null)
  const [hijriDate, setHijriDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTimes() {
      try {
        setLoading(true)
        setError(null)

        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const dateStr = `${dd}-${mm}-${yyyy}`

        const res = await fetch(
          `${API_BASE}/timings/${dateStr}?latitude=${LAT}&longitude=${LNG}&method=${METHOD}`
        )

        if (!res.ok) throw new Error('Erreur lors du chargement des horaires')

        const data = await res.json()

        if (cancelled) return

        const t = data.data.timings
        setTimes({
          fajr: formatTime(t.Fajr),
          sunrise: formatTime(t.Sunrise),
          dhuhr: formatTime(t.Dhuhr),
          asr: formatTime(t.Asr),
          maghrib: formatTime(t.Maghrib),
          isha: formatTime(t.Isha),
        })

        if (data.data.date?.hijri) {
          const h = data.data.date.hijri
          setHijriDate(`${h.day} ${h.month.en} ${h.year}`)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          // Fallback to reasonable defaults so the UI isn't empty
          setTimes({
            fajr: '06:15',
            sunrise: '07:45',
            dhuhr: '13:00',
            asr: '16:00',
            maghrib: '18:30',
            isha: '20:00',
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTimes()

    // Refetch every hour to stay up-to-date
    const interval = setInterval(fetchTimes, 60 * 60 * 1000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { times, hijriDate, loading, error }
}

/**
 * Fetches a full month's prayer times from the Aladhan API
 */
export function useMonthlyPrayerTimes(year, month) {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchMonth() {
      try {
        setLoading(true)
        setError(null)

        // Aladhan API uses 1-indexed months
        const apiMonth = month + 1

        const res = await fetch(
          `${API_BASE}/calendar/${year}/${apiMonth}?latitude=${LAT}&longitude=${LNG}&method=${METHOD}`
        )

        if (!res.ok) throw new Error('Erreur lors du chargement du calendrier')

        const data = await res.json()

        if (cancelled) return

        const days = data.data.map((dayData) => ({
          day: parseInt(dayData.date.gregorian.day, 10),
          weekday: dayData.date.gregorian.weekday.en,
          fajr: formatTime(dayData.timings.Fajr),
          sunrise: formatTime(dayData.timings.Sunrise),
          dhuhr: formatTime(dayData.timings.Dhuhr),
          asr: formatTime(dayData.timings.Asr),
          maghrib: formatTime(dayData.timings.Maghrib),
          isha: formatTime(dayData.timings.Isha),
        }))

        setSchedule(days)
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setSchedule([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMonth()

    return () => { cancelled = true }
  }, [year, month])

  return { schedule, loading, error }
}

/**
 * Strip the timezone info that Aladhan sometimes appends, e.g. "06:15 (CET)"
 */
function formatTime(timeStr) {
  if (!timeStr) return '--:--'
  return timeStr.replace(/\s*\(.*\)\s*$/, '')
}
