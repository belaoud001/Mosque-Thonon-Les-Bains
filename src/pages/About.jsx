import { Heart, Users, BookOpen, Shield, Star, Award } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'

export default function About() {
  return (
    <>
      <PageHeader
        title="À Propos"
        titleAr="من نحن"
        subtitle="Découvrez l'histoire et la mission de notre mosquée"
      />

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-8 h-px bg-gold-400" />
                  <span className="text-primary-500 text-sm uppercase tracking-[0.2em] font-medium">Notre Histoire</span>
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6">
                  Un Lieu de Foi au Cœur de la{' '}
                  <span className="text-primary-500">Haute-Savoie</span>
                </h2>
                <div className="space-y-4 text-dark/60 leading-relaxed">
                  <p>
                    La Mosquée de Thonon-les-Bains a été fondée pour répondre aux besoins
                    spirituels de la communauté musulmane de la région. Depuis sa création,
                    elle est devenue un pilier central de la vie communautaire.
                  </p>
                  <p>
                    Inspirée par l'art islamique traditionnel, notre mosquée mêle les motifs
                    géométriques séculaires, les arabesques élégantes et les couleurs chaudes
                    pour créer un espace propice au recueillement et à la méditation.
                  </p>
                  <p>
                    Notre engagement va au-delà de la prière : nous organisons des cours,
                    des événements culturels et des actions sociales pour renforcer les liens
                    au sein de notre communauté et avec la société dans son ensemble.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative group">
                {/* Decorative gold corner accents */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-400 rounded-tl-2xl z-10" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold-400 rounded-br-2xl z-10" />

                {/* Main image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-900/20">
                  <img
                    src="/mosque.jpg"
                    alt="Mosquée de Thonon-les-Bains"
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

                  {/* Bayt Allah text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <div className="inline-flex items-center gap-3 mb-3">
                      <span className="block w-8 h-px bg-gold-400" />
                      <Star className="w-5 h-5 text-gold-400" />
                      <span className="block w-8 h-px bg-gold-400" />
                    </div>
                    <p className="font-arabic text-3xl text-gold-400 mb-1 drop-shadow-lg">بيت الله</p>
                    <p className="font-heading text-lg text-white/80 tracking-wide">La Maison de Dieu</p>
                  </div>
                </div>

                {/* Floating geometric accent */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-400/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary-500/10 rounded-full blur-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <IslamicDivider />

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="قيمنا"
              title="Nos Valeurs"
              description="Les principes fondamentaux qui guident notre communauté"
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Compassion', desc: 'Nous croyons en la bienveillance et la miséricorde envers tous les êtres humains, sans distinction.', color: 'primary' },
              { icon: Users, title: 'Unité', desc: 'Nous cultivons l\'esprit de fraternité et de solidarité au sein de notre communauté.', color: 'primary' },
              { icon: BookOpen, title: 'Savoir', desc: 'Nous encourageons la recherche du savoir comme pilier fondamental de notre foi.', color: 'primary' },
              { icon: Shield, title: 'Intégrité', desc: 'Nous agissons avec honnêteté et transparence dans toutes nos activités.', color: 'primary' },
              { icon: Star, title: 'Excellence', desc: 'Nous aspirons à l\'excellence dans le service de notre communauté et de la société.', color: 'primary' },
              { icon: Award, title: 'Respect', desc: 'Nous promouvons le dialogue interreligieux et le respect mutuel entre toutes les cultures.', color: 'primary' },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100} className="h-full">
                <div className={`bg-white h-full p-8 rounded-2xl border card-hover group flex flex-col 
                  ${value.color === 'primary' ? 'border-primary-200' :
                    value.color === 'gold' ? 'border-gold-400' :
                    value.color === 'emerald' ? 'border-emerald-300' :
                    'border-terracotta-400'}
                `}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform 
                      ${value.color === 'primary' ? 'bg-primary-50 text-primary-500 shadow-primary-500/20' :
                        value.color === 'gold' ? 'bg-gold-50 text-gold-500 shadow-gold-400/20' :
                        value.color === 'emerald' ? 'bg-emerald-50 text-emerald-500 shadow-emerald-300/20' :
                        'bg-terracotta-50 text-terracotta-500 shadow-terracotta-400/20'}
                    `}>
                      <value.icon className="w-7 h-7" />
                    </div>
                    <h3 className={`font-heading font-semibold text-xl mb-0 transition-colors 
                      ${value.color === 'primary' ? 'text-primary-500 group-hover:text-primary-600' :
                        value.color === 'gold' ? 'text-gold-500 group-hover:text-gold-600' :
                        value.color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-600' :
                        'text-terracotta-500 group-hover:text-terracotta-600'}
                    `}>
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-dark/60 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-ivory relative">
        <GeometricPattern className="opacity-70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="تاريخنا"
              title="Notre Parcours"
              description="Les moments clés qui ont marqué l'histoire de notre mosquée"
            />
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400 via-primary-500 to-gold-400 hidden md:block" />

            {[
              { year: '2008', title: 'Fondation', desc: 'Création de l\'association et premiers regroupements pour la prière.' },
              { year: '2012', title: 'Premier Local', desc: 'Acquisition du premier local dédié aux prières et activités.' },
              { year: '2016', title: 'Expansion', desc: 'Agrandissement de l\'espace et lancement des cours de Coran.' },
              { year: '2020', title: 'Adaptation', desc: 'Mise en place de cours en ligne et d\'activités à distance.' },
              { year: '2024', title: 'Renouveau', desc: 'Rénovation de la mosquée avec une décoration inspirée de l\'art islamique.' },
            ].map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 150}>
                <div className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="inline-block px-3 py-1 bg-gold-400/10 text-gold-600 font-bold text-sm rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-heading font-semibold text-xl text-dark mb-2">{item.title}</h3>
                    <p className="text-dark/60 text-sm">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-gradient-to-br from-gold-400 to-primary-500 flex-shrink-0 ring-4 ring-ivory relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Imam */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="فريقنا"
              title="Notre Équipe"
              description="Des personnes dévouées au service de la communauté"
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Imam Ahmed', role: 'Imam Principal', initials: 'IA' },
              { name: 'Mohamed B.', role: 'Président', initials: 'MB' },
              { name: 'Youssef K.', role: 'Trésorier', initials: 'YK' },
              { name: 'Fatima Z.', role: 'Responsable Éducation', initials: 'FZ' },
            ].map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div className="text-center group">
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-xl shadow-primary-500/20 group-hover:scale-105 transition-transform">
                    <span className="text-white font-heading font-bold text-2xl">{member.initials}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-dark">{member.name}</h3>
                  <p className="text-gold-500 text-sm font-medium">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
