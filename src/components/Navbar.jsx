import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À Propos', path: '/a-propos' },
  { name: 'Horaires de Prière', path: '/horaires' },
  { name: 'Événements', path: '/evenements' },
  { name: 'Services', path: '/services' },
  { name: 'Apprentissage', path: '/apprentissage' },
  { name: 'Médiathèque', path: '/mediatheque' },
  { name: 'Adhérer', path: '/devenir-adherent' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navBg = scrolled || !isHome
    ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/10'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="AMC Logo" className="w-14 h-14 rounded-full object-cover transform transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-white font-heading font-bold text-lg leading-tight">
                AMC
              </span>
              <span className="text-gold-400 text-xs tracking-widest uppercase">
                Thonon-les-Bains
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 py-2 text-[13px] font-medium transition-colors duration-300 rounded-lg group whitespace-nowrap
                  ${location.pathname === link.path
                    ? 'text-gold-400'
                    : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/faire-un-don"
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-semibold text-sm rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg shadow-gold-400/20 btn-shimmer"
            >
              Faire un Don
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark/98 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                      ${location.pathname === link.path
                        ? 'bg-primary-500/20 text-gold-400 border-l-2 border-gold-400'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  to="/faire-un-don"
                  className="block text-center px-5 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-semibold rounded-xl"
                >
                  Faire un Don
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
