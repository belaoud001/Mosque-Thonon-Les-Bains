import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import PrayerTimes from './pages/PrayerTimes'
import Events from './pages/Events'
import Services from './pages/Services'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
// import FridaySermons from './pages/FridaySermons' // Disabled for now
import QuranLearning from './pages/QuranLearning'
import MediaCenter from './pages/MediaCenter'
import Membership from './pages/Membership'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-ivory font-body text-dark">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/horaires" element={<PrayerTimes />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faire-un-don" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/khutba" element={<FridaySermons />} /> */}
          <Route path="/apprentissage" element={<QuranLearning />} />
          <Route path="/mediatheque" element={<MediaCenter />} />
          <Route path="/devenir-adherent" element={<Membership />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
