import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, GraduationCap, Users, Star, Clock, Calendar,
  ArrowRight, CheckCircle, Award, X, ZoomIn
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'

const courses = [
  {
    title: 'Cours de Coran — Enfants',
    level: 'Débutant à Avancé',
    ages: '6 - 14 ans',
    schedule: 'Mercredi & Samedi',
    time: '14:00 - 16:00',
    features: ['Apprentissage de la lecture', 'Tajwid (règles de récitation)', 'Mémorisation (Hifz)', 'Compréhension du sens'],
    icon: BookOpen,
    color: 'primary',
    spots: 8,
  },
  {
    title: 'Cours de Coran — Adultes',
    level: 'Tous niveaux',
    ages: 'Adultes',
    schedule: 'Dimanche',
    time: '10:00 - 12:00',
    features: ['Lecture et récitation', 'Tajwid approfondi', 'Tafsir (exégèse)', 'Mémorisation'],
    icon: BookOpen,
    color: 'emerald',
    spots: 12,
  },
  {
    title: 'Cours d\'Arabe — Débutants',
    level: 'Débutant',
    ages: 'Tous âges',
    schedule: 'Samedi',
    time: '10:00 - 12:00',
    features: ['Alphabet arabe', 'Lecture et écriture', 'Vocabulaire de base', 'Exercices pratiques'],
    icon: GraduationCap,
    color: 'gold',
    spots: 15,
  },
  {
    title: 'Cours d\'Arabe — Intermédiaire',
    level: 'Intermédiaire',
    ages: 'Tous âges',
    schedule: 'Samedi',
    time: '14:00 - 16:00',
    features: ['Grammaire (Nahw)', 'Conjugaison (Sarf)', 'Conversation', 'Textes littéraires'],
    icon: GraduationCap,
    color: 'gold',
    spots: 10,
  },
  {
    title: 'Sciences Islamiques',
    level: 'Tous niveaux',
    ages: 'Adultes',
    schedule: 'Vendredi soir',
    time: '20:30 - 22:00',
    features: ['Aqida (croyance)', 'Fiqh (jurisprudence)', 'Sira (biographie du Prophète)', 'Hadith'],
    icon: Star,
    color: 'primary',
    spots: 20,
  },
  {
    title: 'École du Dimanche',
    level: 'Adapté par âge',
    ages: '4 - 12 ans',
    schedule: 'Dimanche',
    time: '09:00 - 12:00',
    features: ['Éducation islamique', 'Histoires des prophètes', 'Activités manuelles', 'Jeux éducatifs'],
    icon: Users,
    color: 'terracotta',
    spots: 25,
  },
]

export default function QuranLearning() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt=""
                className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-10 h-10 bg-dark/70 hover:bg-dark text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader
        title="Apprentissage"
        titleAr="التعليم"
        subtitle="Découvrez nos programmes éducatifs pour tous les âges et tous les niveaux"
      />

      {/* Intro — Description + Photo Gallery */}
      <section className="py-20 md:py-28 bg-ivory relative overflow-hidden">
        <GeometricPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quranic verse */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-arabic text-gold-400 text-2xl mb-4">
                اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
              </p>
              <p className="text-dark/60 italic mb-1">
                « Lis, au nom de ton Seigneur qui a créé »
              </p>
              <p className="text-dark/40 text-sm">
                Sourate Al-'Alaq, Verset 1
              </p>
            </div>
          </ScrollReveal>

          {/* Content grid: text + images */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Description */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-6">
                  Un Espace Éducatif pour <span className="text-primary-500">Toute la Famille</span>
                </h2>
                <div className="space-y-4 text-dark/60 leading-relaxed">
                  <p>
                    L'enseignement de la langue arabe et du Coran est au cœur de notre mission.
                    Nous prenons en charge vos enfants dès leur plus jeune âge pour leur transmettre
                    les bases de la langue arabe ainsi que les principes fondamentaux de l'Islam.
                  </p>
                  <p>
                    Notre espace éducatif dispense des cours de <strong className="text-dark">langue arabe</strong>,
                    d'<strong className="text-dark">apprentissage du Coran</strong> et de
                    <strong className="text-dark"> sciences islamiques</strong>, encadrés par des
                    enseignants bénévoles passionnés et dévoués.
                  </p>
                  <p>
                    Les cours ont lieu principalement <strong className="text-dark">le dimanche</strong> et
                    s'adressent aux <strong className="text-dark">enfants à partir de 6 ans</strong>,
                    ainsi qu'aux <strong className="text-dark">adultes</strong> hommes et femmes.
                    Une participation financière est demandée, variable selon le nombre d'enfants inscrits.
                  </p>
                </div>
                <div className="mt-8 flex flex-row gap-4 flex-nowrap">
                  <a
                    href="https://www.inscription-amc.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/20 text-xs md:text-sm"
                  >
                    S'inscrire en Ligne
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-400 text-dark font-semibold rounded-full hover:bg-gold-300 transition-all duration-300 shadow-lg shadow-gold-400/20 text-xs md:text-sm"
                  >
                    Nous Contacter
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Photo gallery grid */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Large image spanning full width */}
                <button
                  onClick={() => setLightbox(`${import.meta.env.BASE_URL}images/quran-class-2.jpg`)}
                  className="col-span-2 group relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-dark/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/quran-class-2.jpg`}
                    alt="Cours de Coran — salle de classe"
                    className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                      <ZoomIn className="w-5 h-5 text-dark" />
                    </div>
                  </div>
                </button>
                {/* Bottom two images side by side */}
                {[
                  { src: `${import.meta.env.BASE_URL}images/quran-class-3.jpg`, alt: 'Élèves en cours d\'arabe' },
                  { src: `${import.meta.env.BASE_URL}images/quran-class-1.jpg`, alt: 'Apprentissage du Coran' },
                ].map((img) => (
                  <button
                    key={img.src}
                    onClick={() => setLightbox(img.src)}
                    className="group relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-dark/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-36 md:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                        <ZoomIn className="w-5 h-5 text-dark" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="برامجنا"
              title="Nos Programmes"
              description="Des cours adaptés à chaque âge et chaque niveau"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <ScrollReveal key={course.title} delay={i * 100}>
                <div className={`bg-ivory rounded-2xl border overflow-hidden card-hover h-full flex flex-col group ${
                  course.color === 'primary' ? 'border-primary-500' :
                  course.color === 'gold' ? 'border-gold-500' :
                  course.color === 'emerald' ? 'border-emerald-500' :
                  'border-terracotta-500'
                }`}>
                  {/* Header */}
                  <div className={`p-6 ${
                    course.color === 'primary' ? 'bg-gradient-to-r from-primary-500 to-primary-600' :
                    course.color === 'gold' ? 'bg-gradient-to-r from-gold-400 to-gold-500' :
                    course.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                    'bg-gradient-to-r from-terracotta-400 to-terracotta-500'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <course.icon className="w-8 h-8 text-white/80" />
                      <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-full">
                        {course.spots} places
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">{course.title}</h3>
                    <p className="text-white/70 text-sm mt-1">{course.level} · {course.ages}</p>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-dark/50 text-sm mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {course.schedule}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {course.time}
                      </span>
                    </div>

                    <ul className="space-y-2.5 flex-1">
                      {course.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-dark/60">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                            course.color === 'primary' ? 'text-primary-400' :
                            course.color === 'gold' ? 'text-gold-400' :
                            course.color === 'emerald' ? 'text-emerald-400' :
                            'text-terracotta-400'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://www.inscription-amc.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group ${
                        course.color === 'primary' ? 'bg-primary-50 text-primary-600 border border-primary-500 hover:bg-primary-500 hover:text-white' :
                        course.color === 'gold' ? 'bg-gold-50 text-gold-600 border border-gold-500 hover:bg-gold-400 hover:text-dark hover:text-white' :
                        course.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-500 hover:bg-emerald-500 hover:text-white' :
                        'bg-terracotta-50 text-terracotta-600 border border-terracotta-500 hover:bg-terracotta-400 hover:text-white'
                      }`}
                    >
                      S'inscrire
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn */}
      <section className="py-20 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="لماذا تتعلم معنا"
              title="Pourquoi Apprendre avec Nous ?"
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Enseignants Qualifiés', desc: 'Des professeurs certifiés et expérimentés' },
              { icon: Users, title: 'Petits Groupes', desc: 'Un suivi personnalisé pour chaque étudiant' },
              { icon: Star, title: 'Méthodologie Éprouvée', desc: 'Des méthodes pédagogiques modernes et efficaces' },
              { icon: CheckCircle, title: 'Certificats', desc: 'Attestation de réussite à la fin de chaque niveau' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-dark/50 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">Prêt à Commencer ?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Les inscriptions sont ouvertes tout au long de l'année.
              Inscrivez-vous directement en ligne pour rejoindre nos cours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.inscription-amc.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gold-400 text-dark font-bold rounded-full hover:bg-gold-300 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer"
              >
                S'inscrire en Ligne
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/40 text-sm mt-6">
              Un problème lors de l'inscription ?
              <Link to="/contact" className="text-gold-400/70 hover:text-gold-400 underline underline-offset-2 ml-1 transition-colors">
                Contactez-nous
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
