import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, BookOpen, Heart, Users, Calendar,
  GraduationCap, HandHeart, Clock, Star, ChevronRight,
  Moon, Sunrise, Play
} from 'lucide-react'
import PrayerTimesWidget from '../components/PrayerTimesWidget'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'
import useYouTubeChannel, { CHANNEL_AVATAR } from '../hooks/useYouTubeChannel'

export default function Home() {
  const { videos, shorts, channelInfo, subscribeUrl } = useYouTubeChannel()

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary-900 to-dark" />
          <GeometricPattern variant="hero" />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-gold-400/5 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Text content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Arabic Bismillah */}
                <p className="font-arabic text-gold-400/70 text-xl md:text-2xl mb-4">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>

                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6">
                  Mosquée de{' '}
                  <span className="relative">
                    <span className="gold-text">Thonon-les-Bains</span>
                  </span>
                </h1>

                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                  Association Musulmane du Chablais. Un havre de paix au cœur de la Haute-Savoie.
                  Rejoignez notre communauté dans la prière, l'apprentissage et le partage.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/horaires"
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-semibold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer"
                  >
                    <Clock className="w-5 h-5" />
                    Horaires de Prière
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/a-propos"
                    className="group flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    Découvrir
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Prayer times widget */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PrayerTimesWidget compact />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Défiler</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gold-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ========== PRAYER TIMES FULL ========== */}
      <section className="py-20 md:py-28 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="أوقات الصلاة"
              title="Horaires de Prière"
              description="Les horaires de prière du jour pour Thonon-les-Bains"
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <PrayerTimesWidget />
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                to="/horaires"
                className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 bg-primary-500 text-white font-semibold rounded-full backdrop-blur-md transition-all duration-300"
              >
                Voir le calendrier complet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <IslamicDivider />

      {/* ========== ABOUT PREVIEW ========== */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="ornate-frame">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Google Maps iframe for Notre Mosquée */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!4v1773059037789!6m8!1m7!1sok2WTe8C4M82AhT5cn93fA!2m2!1d46.38567909804736!2d6.493643362217891!3f183.52573774685968!4f-1.5916920587623054!5f0.4000000000000002"
                      width="800"
                      height="600"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Notre Mosquée - Google Maps"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
                {/* Floating decorative element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-400/10 rounded-2xl border border-gold-400/20 flex items-center justify-center animate-float">
                  <Star className="w-8 h-8 text-gold-400" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-8 h-px bg-gold-400" />
                  <span className="text-primary-500 text-sm uppercase tracking-[0.2em] font-medium">Notre Mosquée</span>
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6 leading-tight">
                  Un Lieu de{' '}
                  <span className="text-primary-500">Spiritualité</span> et de{' '}
                  <span className="text-gold-500">Communauté</span>
                </h2>
                <p className="text-dark/60 leading-relaxed mb-6">
                  La Mosquée de Thonon-les-Bains accueille la communauté musulmane
                  dans un espace dédié à la prière, l'éducation et l'entraide.
                  Notre mission est de servir de pont entre les traditions spirituelles
                  et la vie moderne, offrant un lieu de rassemblement ouvert à tous.
                </p>
                <p className="text-dark/60 leading-relaxed mb-8">
                  Inspirée par l'art et l'architecture islamiques séculaires,
                  notre mosquée offre un cadre propice au recueillement et à la sérénité,
                  enrichi par les motifs géométriques et les arabesques qui ornent nos murs.
                </p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <p className="font-heading font-bold text-3xl text-primary-500">5</p>
                    <p className="text-dark/50 text-sm">Prières / jour</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-3xl text-primary-500">500+</p>
                    <p className="text-dark/50 text-sm">Fidèles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-3xl text-primary-500">15+</p>
                    <p className="text-dark/50 text-sm">Années</p>
                  </div>
                </div>
                <Link
                  to="/a-propos"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 bg-primary-500 text-white font-semibold rounded-full backdrop-blur-md transition-all duration-300"
                >
                  En Savoir Plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <IslamicDivider />

      {/* ========== SERVICES ========== */}
      <section className="py-20 md:py-28 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="خدماتنا"
              title="Nos Services"
              description="Nous offrons une large gamme de services pour accompagner notre communauté dans tous les aspects de la vie"
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Cours de Coran',
                desc: 'Apprentissage du Coran pour tous les niveaux, avec des enseignants qualifiés et bienveillants.',
                color: 'primary',
              },
              {
                icon: GraduationCap,
                title: 'Cours d\'Arabe',
                desc: 'Apprenez la langue arabe, de l\'alphabet aux conversations avancées.',
                color: 'primary',
              },
              {
                icon: Users,
                title: 'École du Dimanche',
                desc: 'Éducation islamique pour les enfants dans un cadre ludique et enrichissant.',
                color: 'primary',
              },
              {
                icon: Heart,
                title: 'Mariage Islamique',
                desc: 'Accompagnement complet pour la célébration de votre mariage selon les rites islamiques.',
                color: 'primary',
              },
              {
                icon: HandHeart,
                title: 'Aide Sociale',
                desc: 'Soutien aux familles en difficulté, distribution alimentaire et accompagnement social.',
                color: 'primary',
              },
              {
                icon: Calendar,
                title: 'Événements',
                desc: 'Célébrations religieuses, conférences, iftar communautaire pendant le Ramadan.',
                color: 'primary',
              },
            ].map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <div
                  className={
                    `group bg-white rounded-2xl p-8 card-hover h-full border ` +
                    (
                      service.color === 'primary' ? 'border-primary-500' :
                      service.color === 'gold' ? 'border-gold-500' :
                      service.color === 'emerald' ? 'border-emerald-500' :
                      'border-terracotta-500'
                    )
                  }
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      service.color === 'primary' ? 'bg-primary-50 text-primary-500' :
                      service.color === 'gold' ? 'bg-gold-50 text-gold-500' :
                      service.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                      'bg-terracotta-50 text-terracotta-500'
                    }`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className={
                      `font-heading font-semibold text-xl mb-0 transition-colors ` +
                      (
                        service.color === 'primary' ? 'text-primary-500 group-hover:text-primary-600' :
                        service.color === 'gold' ? 'text-gold-500 group-hover:text-gold-600' :
                        service.color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-600' :
                        'text-terracotta-500 group-hover:text-terracotta-600'
                      )
                    }>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-dark/60 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 bg-primary-500 text-white font-semibold rounded-full backdrop-blur-md transition-all duration-300"
              >
                Découvrir tous nos services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== CTA / DONATE ========== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700" />
        <GeometricPattern variant="hero" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="font-arabic text-gold-400/70 text-xl mb-4">صدقة جارية</p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
              Contribuez à Notre Mission
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Votre générosité permet de maintenir notre mosquée, de financer nos programmes
              éducatifs et d'aider les plus démunis de notre communauté.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/faire-un-don"
                className="group flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-bold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer text-lg"
              >
                <Heart className="w-5 h-5" />
                Faire un Don
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <IslamicDivider />

      {/* ========== YOUTUBE CHANNEL CTA ========== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-ivory">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-arabic text-gold-400/70 text-xl mb-3">مكتبة الوسائط</p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark mb-4">
                Notre Chaîne YouTube
              </h2>
              <p className="text-dark/50 text-lg max-w-2xl mx-auto">
                Conférences, cours de Coran, rappels et bien plus encore
              </p>
            </div>
          </ScrollReveal>

          {/* Channel card */}
          <ScrollReveal delay={100}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                <GeometricPattern variant="hero" />
                {/* Extra decorative glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl mb-6">
                    <img
                      src={CHANNEL_AVATAR}
                      alt={channelInfo?.name || 'AMC Mosquée THONON'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2">
                    {channelInfo?.name || 'AMC Mosquée THONON'}
                  </h3>
                  <p className="text-white/50 text-sm mb-8">@amcmosqueethonon6928</p>

                  {/* Stats — inline row */}
                  <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
                    {[
                      { value: shorts.length, label: 'Shorts' },
                      { value: videos.length, label: 'Vidéos' },
                      { value: videos.length + shorts.length, label: 'Total' },
                    ].map((stat, i, arr) => (
                      <div key={stat.label} className="flex items-center gap-6 md:gap-10">
                        <div className="text-center">
                          <p className="font-heading font-bold text-4xl md:text-5xl text-white">
                            {stat.value}
                          </p>
                          <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="w-px h-12 bg-white/15" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      to="/mediatheque"
                      className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-bold text-sm sm:text-lg rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer"
                    >
                      <Play className="w-5 h-5 fill-dark" />
                      Découvrir la Médiathèque
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href={subscribeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-lg rounded-full transition-all duration-300 shadow-xl shadow-red-600/20"
                    >
                      S'abonner à la Chaîne
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <p className="text-white/30 text-sm mt-6">
                    Conférences, cours de Coran, rappels et bien plus encore
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <IslamicDivider />

      {/* ========== UPCOMING EVENTS ========== */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="الأنشطة القادمة"
              title="Événements à Venir"
              description="Restez informé des prochaines activités et événements de la mosquée"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: '15',
                month: 'Mars',
                title: 'Conférence: La Patience en Islam',
                time: '20:00 - 21:30',
                desc: 'Une soirée enrichissante sur le thème de la patience et la persévérance.',
                tag: 'Conférence',
              },
              {
                date: '22',
                month: 'Mars',
                title: 'Atelier Calligraphie Arabe',
                time: '14:00 - 17:00',
                desc: 'Initiation à l\'art de la calligraphie arabe avec un maître calligraphe.',
                tag: 'Atelier',
              },
              {
                date: '29',
                month: 'Mars',
                title: 'Journée Portes Ouvertes',
                time: '10:00 - 18:00',
                desc: 'Venez découvrir notre mosquée et nos activités lors de cette journée spéciale.',
                tag: 'Communauté',
              },
            ].map((event, i) => (
              <ScrollReveal key={event.title} delay={i * 150} className="h-full">
                <div className="group bg-ivory rounded-2xl overflow-hidden card-hover border border-gold-400 h-full flex flex-col">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary-500/20">
                        <span className="text-xl font-bold leading-none">{event.date}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-80">{event.month}</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-2.5 py-0.5 bg-gold-400/10 text-gold-600 text-xs font-semibold rounded-full mb-2">
                          {event.tag}
                        </span>
                        <h3
                          className="font-heading font-semibold text-lg text-dark mb-1 group-hover:text-primary-500 transition-colors leading-snug line-clamp-2 min-h-[3.1rem]"
                          title={event.title}
                        >
                          {event.title}
                        </h3>
                        <p className="text-dark/40 text-sm flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-dark/60 text-sm mt-4 leading-relaxed flex-1">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link
                to="/evenements"
                className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 bg-primary-500 text-white font-semibold rounded-full backdrop-blur-md transition-all duration-300"
              >
                Voir Tous les Événements
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== VERSE SECTION ========== */}
      <section className="relative py-20 bg-dark overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="font-arabic text-3xl md:text-4xl text-gold-400 leading-relaxed mb-6">
              إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ يَهْدِيهِمْ رَبُّهُم بِإِيمَٰنِهِمْ
            </p>
            <p className="text-white/70 text-lg italic mb-4">
              « Ceux qui croient et font le bien, leur Seigneur les guidera grâce à leur foi »
            </p>
            <p className="text-white/40 text-sm">
              Sourate Yunus, Verset 9
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
