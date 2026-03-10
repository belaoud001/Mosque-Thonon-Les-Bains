import { Link } from 'react-router-dom'
import {
  UserPlus, CheckCircle, Heart, Users, Star,
  ArrowRight, Shield, Award, HandHeart, ExternalLink
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'

const benefits = [
  {
    icon: Heart,
    title: 'Soutenir votre mosquée',
    desc: 'Votre adhésion permet de soutenir physiquement et financièrement le fonctionnement quotidien de la mosquée.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Participer aux décisions',
    desc: 'Assistez aux assemblées générales pour partager vos idées et contribuer au bon fonctionnement des lieux.',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Améliorer le confort',
    desc: 'Aidez à l\'amélioration des installations pour le confort de tous les fidèles.',
    color: 'primary',
  },
  {
    icon: Star,
    title: 'Préparer l\'avenir',
    desc: 'Investissez dans un meilleur avenir pour les générations à venir au sein de notre communauté.',
    color: 'primary',
  },
  {
    icon: HandHeart,
    title: 'Gagner en récompenses',
    desc: 'Enrichissez votre compte de hassanate dans l\'espoir de gagner la satisfaction d\'Allah.',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Faire partie de la communauté',
    desc: 'Rejoignez une communauté active et soudée au service du bien commun.',
    color: 'primary',
  },
]

export default function Membership() {
  return (
    <>
      <PageHeader
        title="Devenir Adhérent"
        titleAr="انضم إلينا"
        subtitle="Rejoignez l'Association Musulmane du Chablais et soutenez votre mosquée"
      />

      {/* Why join */}
      <section className="py-20 md:py-28 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="لماذا الانضمام؟"
              title="Pourquoi Adhérer à l'AMC ?"
              description="Votre adhésion est un acte de foi et de solidarité qui bénéficie à toute la communauté"
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 100}>
                <div className={`bg-white rounded-2xl p-8 border card-hover h-full group 
                  ${benefit.color === 'primary' ? 'border-primary-200' :
                    benefit.color === 'gold' ? 'border-gold-400' :
                    benefit.color === 'emerald' ? 'border-emerald-300' :
                    'border-terracotta-400'}
                `}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform 
                      ${benefit.color === 'primary' ? 'bg-primary-50 text-primary-500 shadow-primary-500/20' :
                        benefit.color === 'gold' ? 'bg-gold-50 text-gold-500 shadow-gold-400/20' :
                        benefit.color === 'emerald' ? 'bg-emerald-50 text-emerald-500 shadow-emerald-300/20' :
                        'bg-terracotta-50 text-terracotta-500 shadow-terracotta-400/20'}
                    `}>
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className={`font-heading font-semibold text-xl mb-0 transition-colors 
                      ${benefit.color === 'primary' ? 'text-primary-500 group-hover:text-primary-600' :
                        benefit.color === 'gold' ? 'text-gold-500 group-hover:text-gold-600' :
                        benefit.color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-600' :
                        'text-terracotta-500 group-hover:text-terracotta-600'}
                    `}>
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-dark/60 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <IslamicDivider />

      {/* CTA to register */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <GeometricPattern variant="hero" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold-400/20 flex items-center justify-center mb-6">
                  <UserPlus className="w-10 h-10 text-gold-400" />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                  Rejoignez-nous Aujourd'hui
                </h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  L'adhésion à l'Association Musulmane du Chablais est simple et rapide.
                  Remplissez le formulaire d'inscription en ligne pour devenir membre.
                </p>

                <a
                  href="https://inscription-amc.fr/adhesion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-bold text-base md:text-lg rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer"
                >
                  <UserPlus className="w-5 h-5" />
                  Adhérer en Ligne
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-white/50 text-sm mt-6">
                  Vous serez redirigé vers le portail d'inscription sécurisé de l'AMC
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-ivory relative">
        <GeometricPattern variant="card" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="كيف تنضم"
              title="Comment Adhérer ?"
              description="Trois étapes simples pour rejoindre notre association"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Remplir le Formulaire',
                desc: 'Rendez-vous sur le portail d\'inscription en ligne et remplissez vos informations.',
              },
              {
                step: '2',
                title: 'Régler la Cotisation',
                desc: 'Réglez votre cotisation annuelle par les moyens de paiement proposés.',
              },
              {
                step: '3',
                title: 'Devenir Membre',
                desc: 'Recevez votre carte d\'adhérent et participez à la vie de la mosquée.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center mb-4 shadow-lg shadow-gold-400/20">
                    <span className="text-dark font-heading font-bold text-2xl">{item.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">{item.title}</h3>
                  <p className="text-dark/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="الشفافية"
              title="Transparence Financière"
              description="Nous croyons en la transparence totale envers nos adhérents"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Loyer & Charges', pct: '40%', color: 'primary' },
                { label: 'Éducation & Cours', pct: '25%', color: 'emerald' },
                { label: 'Entretien & Travaux', pct: '20%', color: 'gold' },
                { label: 'Actions Sociales', pct: '15%', color: 'terracotta' },
              ].map((item) => (
                <div key={item.label} className="bg-ivory rounded-2xl p-6 text-center border border-gold-100/50">
                  <p className={`font-heading font-bold text-4xl mb-2 ${
                    item.color === 'primary' ? 'text-primary-500' :
                    item.color === 'emerald' ? 'text-emerald-500' :
                    item.color === 'gold' ? 'text-gold-500' :
                    'text-terracotta-500'
                  }`}>{item.pct}</p>
                  <p className="text-dark/60 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-center text-dark/50 text-sm mt-8">
              Les bilans financiers détaillés sont présentés chaque année lors de l'assemblée générale.
              Pour plus d'informations, <Link to="/contact" className="text-primary-500 hover:underline">contactez-nous</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-dark to-midnight relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="font-arabic text-4xl text-gold-400 mb-4 leading-relaxed">
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
            </p>
            <p className="text-white/70 italic mb-2">
              « Entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété »
            </p>
            <p className="text-white/40 text-sm">
              Sourate Al-Ma'idah, Verset 2
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
