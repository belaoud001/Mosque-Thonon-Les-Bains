import { Calendar, Clock, MapPin, Users, Tag, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import GeometricPattern from '../components/GeometricPattern'

const events = [
  {
    id: 1,
    title: 'Conférence: La Patience en Islam',
    date: '15 Mars 2026',
    time: '20:00 - 21:30',
    location: 'Salle principale',
    category: 'Conférence',
    desc: 'Une soirée enrichissante animée par notre imam sur le thème de la patience (As-Sabr) et son importance dans la vie du musulman.',
    attendees: 120,
    featured: true,
  },
  {
    id: 2,
    title: 'Atelier Calligraphie Arabe',
    date: '22 Mars 2026',
    time: '14:00 - 17:00',
    location: 'Salle d\'activités',
    category: 'Atelier',
    desc: 'Découvrez l\'art ancestral de la calligraphie arabe lors de cet atelier pratique ouvert à tous les niveaux.',
    attendees: 30,
    featured: false,
  },
  {
    id: 3,
    title: 'Journée Portes Ouvertes',
    date: '29 Mars 2026',
    time: '10:00 - 18:00',
    location: 'Mosquée',
    category: 'Communauté',
    desc: 'Venez découvrir notre mosquée lors d\'une journée spéciale avec visites guidées, expositions et dégustations.',
    attendees: 200,
    featured: true,
  },
  {
    id: 4,
    title: 'Concours de Récitation du Coran',
    date: '5 Avril 2026',
    time: '09:00 - 17:00',
    location: 'Salle principale',
    category: 'Éducation',
    desc: 'Concours annuel de récitation du Coran ouvert aux enfants et adultes. Plusieurs catégories d\'âge.',
    attendees: 80,
    featured: false,
  },
  {
    id: 5,
    title: 'Iftar Communautaire (Ramadan)',
    date: '20 Mars 2026',
    time: '18:45',
    location: 'Salle de réception',
    category: 'Ramadan',
    desc: 'Partagez un repas de rupture du jeûne en communauté. Ouvert à tous, musulmans et non-musulmans.',
    attendees: 250,
    featured: true,
  },
  {
    id: 6,
    title: 'Séminaire: Éducation des Enfants',
    date: '12 Avril 2026',
    time: '15:00 - 17:00',
    location: 'Salle d\'activités',
    category: 'Éducation',
    desc: 'Séminaire pour les parents sur les méthodes d\'éducation islamique bienveillante.',
    attendees: 60,
    featured: false,
  },
]

const categories = ['Tous', 'Conférence', 'Atelier', 'Communauté', 'Éducation', 'Ramadan']

import { useState } from 'react'

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = activeCategory === 'Tous'
    ? events
    : events.filter(e => e.category === activeCategory)

  return (
    <>
      <PageHeader
        title="Événements"
        titleAr="الأنشطة"
        subtitle="Découvrez les prochains événements et activités de la mosquée"
      />

      <section className="py-20 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-white text-dark/60 hover:bg-primary-50 hover:text-primary-500 border border-gold-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Events grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 100} className="h-full">
                <div
                  className={`flex flex-col h-full bg-white rounded-2xl overflow-hidden card-hover border transition-all duration-300
                    ${event.featured
                      ? `${event.category === 'Conférence' ? 'border-primary-200 ring-1 ring-primary-100' :
                          event.category === 'Atelier' ? 'border-gold-400 ring-1 ring-gold-100' :
                          event.category === 'Communauté' ? 'border-emerald-200 ring-1 ring-emerald-100' :
                          event.category === 'Ramadan' ? 'border-primary-200 ring-1 ring-primary-100' :
                          event.category === 'Terracotta' ? 'border-terracotta-400 ring-1 ring-terracotta-100' :
                          'border-gold-400 ring-1 ring-gold-100'}`
                      : `${event.category === 'Conférence' ? 'border-transparent shadow-sm' :
                          event.category === 'Atelier' ? 'border-gold-200 shadow-sm' :
                          event.category === 'Communauté' ? 'border-emerald-100 shadow-sm' :
                          event.category === 'Ramadan' ? 'border-primary-100 shadow-sm' :
                          event.category === 'Terracotta' ? 'border-terracotta-200 shadow-sm' :
                          'border-gold-200 shadow-sm'}`}
                  hover:${event.category === 'Conférence' ? 'border-primary-500' :
                          event.category === 'Atelier' ? 'border-gold-500' :
                          event.category === 'Communauté' ? 'border-emerald-500' :
                          event.category === 'Ramadan' ? 'border-primary-500' :
                          event.category === 'Terracotta' ? 'border-terracotta-500' :
                          'border-gold-500'}
                  `}
                >
                  {/* Top colored bar */}
                  <div className={`h-2 ${
                    event.category === 'Conférence' ? 'bg-primary-500' :
                    event.category === 'Atelier' ? 'bg-gold-400' :
                    event.category === 'Communauté' ? 'bg-emerald-500' :
                    event.category === 'Ramadan' ? 'bg-primary-400' :
                    'bg-terracotta-400'
                  }`} />

                  <div className="flex flex-col flex-1 p-6">
                    {/* Category tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        event.category === 'Conférence' ? 'bg-primary-50 text-primary-600' :
                        event.category === 'Atelier' ? 'bg-gold-50 text-gold-600' :
                        event.category === 'Communauté' ? 'bg-emerald-50 text-emerald-600' :
                        event.category === 'Ramadan' ? 'bg-primary-50 text-primary-500' :
                        'bg-terracotta-50 text-terracotta-600'
                      }`}>
                        <Tag className="w-3 h-3" />
                        {event.category}
                      </span>
                      {event.featured && (
                        <span className="px-2 py-0.5 bg-gold-400 text-dark text-[10px] font-bold uppercase rounded-full">
                          À la une
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-semibold text-xl text-dark mb-3 leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-dark/60 text-sm leading-relaxed mb-4">
                      {event.desc}
                    </p>

                    <div className="space-y-2 text-sm text-dark/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary-400" />
                        {event.attendees} participants attendus
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark/40 text-lg">Aucun événement dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
