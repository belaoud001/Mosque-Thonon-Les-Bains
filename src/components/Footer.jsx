import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Heart, Facebook, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 zellige-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="AMC Logo" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <span className="font-heading font-bold text-lg block leading-tight">AMC</span>
                <span className="text-gold-400 text-xs tracking-widest uppercase">Thonon-les-Bains</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-2">
              Association Musulmane du Chablais
            </p>
            <p className="font-arabic text-gold-400/60 text-sm mb-6">
              الجمعية الإسلامية لشابلي
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=100012969094800" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-4 h-4 text-white/60 group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/@amcmosqueethonon6928?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 flex items-center justify-center transition-all duration-300 group">
                <Youtube className="w-4 h-4 text-white/60 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 mb-6 text-lg">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'À Propos', path: '/a-propos' },
                { name: 'Horaires de Prière', path: '/horaires' },
                { name: 'Événements', path: '/evenements' },
                { name: 'Services', path: '/services' },
                { name: 'Médiathèque', path: '/mediatheque' },
                { name: 'Devenir Adhérent', path: '/devenir-adherent' },
                { name: 'Faire un Don', path: '/faire-un-don' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400/40 group-hover:bg-gold-400 mr-3 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 mb-6 text-lg">Nos Services</h3>
            <ul className="space-y-3">
              {[
                'Prières Quotidiennes',
                'Cours de Coran',
                'Cours d\'Arabe',
                'École du Dimanche',
                'Mariage Islamique',
                'Accompagnement Funéraire',
                'Aide Sociale',
              ].map(service => (
                <li key={service}>
                  <span className="text-white/60 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/60 mr-3" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  5 chemin des Epinanches<br />74200 Thonon-les-Bains
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+33450706478" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                  (+33) 4 50 70 64 78
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:contact@mosquee-thonon.fr" className="text-white/60 hover:text-gold-400 text-sm transition-colors">
                  contact@mosquee-thonon.fr
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Ouvert tous les jours<br />Du Fajr au Isha
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Association Musulmane du Chablais. Tous droits réservés.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Fait avec <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> pour la communauté
          </p>
        </div>
      </div>
    </footer>
  )
}
