import { Play, Calendar, Clock, User, Download, Headphones } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import GeometricPattern from '../components/GeometricPattern'

const sermons = [
  {
    id: 1,
    title: 'La Patience face aux Épreuves',
    date: '28 Février 2026',
    imam: 'Imam Ahmed',
    duration: '35 min',
    desc: 'Comment la patience (As-Sabr) nous aide à traverser les moments difficiles et renforce notre foi.',
    featured: true,
  },
  {
    id: 2,
    title: 'Les Droits du Voisinage en Islam',
    date: '21 Février 2026',
    imam: 'Imam Ahmed',
    duration: '30 min',
    desc: 'L\'importance du bon voisinage et les recommandations du Prophète ﷺ à ce sujet.',
    featured: false,
  },
  {
    id: 3,
    title: 'La Sincérité dans les Actes',
    date: '14 Février 2026',
    imam: 'Imam Ahmed',
    duration: '32 min',
    desc: 'L\'intention pure (Ikhlas) comme fondement de toute action en Islam.',
    featured: false,
  },
  {
    id: 4,
    title: 'L\'Unité de la Communauté',
    date: '7 Février 2026',
    imam: 'Imam Ahmed',
    duration: '28 min',
    desc: 'L\'importance de l\'unité et de la solidarité entre les membres de la Oumma.',
    featured: false,
  },
  {
    id: 5,
    title: 'Le Respect des Parents',
    date: '31 Janvier 2026',
    imam: 'Imam Ahmed',
    duration: '33 min',
    desc: 'Bir Al-Walidayn : l\'excellence dans le comportement envers les parents.',
    featured: false,
  },
  {
    id: 6,
    title: 'La Miséricorde en Islam',
    date: '24 Janvier 2026',
    imam: 'Imam Ahmed',
    duration: '30 min',
    desc: 'Ar-Rahman, Ar-Rahim : comment la miséricorde divine inspire notre comportement.',
    featured: false,
  },
  {
    id: 7,
    title: 'La Science et la Foi',
    date: '17 Janvier 2026',
    imam: 'Imam Ahmed',
    duration: '35 min',
    desc: 'La recherche du savoir comme acte d\'adoration et sa place en Islam.',
    featured: false,
  },
  {
    id: 8,
    title: 'La Gratitude envers Allah',
    date: '10 Janvier 2026',
    imam: 'Imam Ahmed',
    duration: '31 min',
    desc: 'Ash-Shukr : l\'art de la gratitude et ses bienfaits sur l\'âme.',
    featured: false,
  },
]

export default function FridaySermons() {
  return (
    <>
      <PageHeader
        title="Khoutba du Vendredi"
        titleAr="خطبة الجمعة"
        subtitle="Retrouvez les résumés et enregistrements de nos prêches du vendredi"
      />

      {/* Featured Sermon */}
      <section className="py-16 bg-ivory relative">
        <GeometricPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <GeometricPattern variant="hero" className="opacity-20" />
              <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/20 text-gold-400 text-sm font-semibold rounded-full mb-4">
                    <Headphones className="w-3.5 h-3.5" />
                    Dernière Khoutba
                  </span>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                    {sermons[0].title}
                  </h2>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {sermons[0].desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {sermons[0].date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {sermons[0].imam}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {sermons[0].duration}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="w-24 h-24 rounded-full bg-gold-400 hover:bg-gold-300 flex items-center justify-center transition-all duration-300 shadow-2xl shadow-gold-400/30 group animate-pulse-glow">
                    <Play className="w-10 h-10 text-dark ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Archive */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="الأرشيف"
              title="Archives des Khoutbas"
              description="Parcourez nos prêches précédents"
            />
          </ScrollReveal>

          <div className="space-y-4">
            {sermons.slice(1).map((sermon, i) => (
              <ScrollReveal key={sermon.id} delay={i * 80}>
                <div className="group bg-ivory rounded-2xl p-6 border border-gold-100/50 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Play button */}
                    <button className="w-12 h-12 rounded-full bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Play className="w-5 h-5 text-primary-500 group-hover:text-white ml-0.5 transition-colors" />
                    </button>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg text-dark group-hover:text-primary-500 transition-colors truncate">
                        {sermon.title}
                      </h3>
                      <p className="text-dark/50 text-sm mt-1 line-clamp-1">{sermon.desc}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-dark/40 text-sm flex-shrink-0">
                      <span className="hidden md:flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> {sermon.imam}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {sermon.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {sermon.duration}
                      </span>
                      <button className="w-9 h-9 rounded-full bg-white hover:bg-primary-50 flex items-center justify-center transition-colors border border-gold-100">
                        <Download className="w-4 h-4 text-dark/40 hover:text-primary-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Jumuah info */}
      <section className="py-16 bg-gradient-to-r from-dark to-midnight relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="font-arabic text-gold-400/70 text-xl mb-3">يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ</p>
            <p className="text-white/70 italic mb-2">
              « Ô vous qui croyez ! Quand on appelle à la prière du vendredi, accourez à l'invocation d'Allah »
            </p>
            <p className="text-white/40 text-sm">— Sourate Al-Jumu'a, Verset 9</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
