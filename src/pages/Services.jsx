import {
  BookOpen, Heart, GraduationCap, Users, Baby, Scroll,
  HandHeart, Home, Scale, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'

const services = [
  {
    icon: BookOpen,
    title: 'Prières Quotidiennes',
    desc: 'Les cinq prières quotidiennes sont accomplies en congrégation à la mosquée, avec un imam qualifié. La prière du vendredi (Joumou\'a) est un moment fort de la semaine.',
    details: ['5 prières/jour', 'Prière du vendredi', 'Prière de Tarawih (Ramadan)', 'Prières de l\'Aïd'],
    color: 'primary',
  },
  {
    icon: GraduationCap,
    title: 'Cours de Coran',
    desc: 'Des cours de récitation et de mémorisation du Coran sont dispensés pour tous les niveaux, enfants et adultes, par des enseignants certifiés.',
    details: ['Tajwid', 'Mémorisation (Hifz)', 'Cours pour enfants', 'Cours pour adultes'],
    color: 'emerald',
  },
  {
    icon: Scroll,
    title: 'Cours d\'Arabe',
    desc: 'Apprenez la langue arabe, la langue du Coran, avec nos professeurs expérimentés. Des cours pour tous les niveaux sont proposés.',
    details: ['Alphabet arabe', 'Lecture et écriture', 'Conversation', 'Grammaire'],
    color: 'gold',
  },
  {
    icon: Baby,
    title: 'École du Dimanche',
    desc: 'Un programme éducatif complet pour les enfants combinant enseignement islamique, apprentissage ludique et activités culturelles.',
    details: ['Éducation islamique', 'Histoire des prophètes', 'Activités créatives', 'Sorties éducatives'],
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Mariage Islamique',
    desc: 'Nous accompagnons les couples dans la célébration de leur mariage (Nikah) selon les rites islamiques, avec conseil pré-marital.',
    details: ['Cérémonie de Nikah', 'Conseil pré-marital', 'Documentation officielle', 'Salle de réception'],
    color: 'gold',
  },
  {
    icon: HandHeart,
    title: 'Accompagnement Funéraire',
    desc: 'Un service complet d\'accompagnement pour les familles en deuil, incluant la prière funéraire et l\'aide aux démarches.',
    details: ['Lavage rituel (Ghousl)', 'Prière funéraire (Janaza)', 'Accompagnement familial', 'Aide administrative'],
    color: 'terracotta',
  },
  {
    icon: Users,
    title: 'Médiation Familiale',
    desc: 'Un service de médiation et de conseil pour les familles traversant des difficultés, avec des conseillers formés et bienveillants.',
    details: ['Conseil conjugal', 'Médiation familiale', 'Écoute et soutien', 'Orientation sociale'],
    color: 'primary',
  },
  {
    icon: Scale,
    title: 'Aide Juridique',
    desc: 'Orientation et accompagnement dans les démarches administratives et juridiques pour les membres de la communauté.',
    details: ['Droit de la famille', 'Démarches administratives', 'Orientation juridique', 'Aide aux démarches'],
    color: 'emerald',
  },
  {
    icon: Home,
    title: 'Aide Sociale',
    desc: 'Distribution alimentaire, aide aux familles en difficulté et accompagnement social pour les plus vulnérables.',
    details: ['Distribution alimentaire', 'Aide d\'urgence', 'Accompagnement social', 'Collecte de Zakat'],
    color: 'gold',
  },
]

export default function Services() {
  return (
    <>
      <PageHeader
        title="Nos Services"
        titleAr="خدماتنا"
        subtitle="Découvrez l'ensemble des services que nous proposons à la communauté"
      />

      <section className="py-20 md:py-28 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 80}>
                <div
                  className={`bg-white rounded-2xl p-8 border card-hover h-full flex flex-col group
                    ${service.color === 'primary' ? 'border-primary-200' :
                      service.color === 'gold' ? 'border-gold-400' :
                      service.color === 'emerald' ? 'border-emerald-300' :
                      service.color === 'terracotta' ? 'border-terracotta-400' :
                      'border-gold-100/50'}
                  `}
                >

                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      service.color === 'primary' ? 'bg-primary-50 text-primary-500' :
                      service.color === 'gold' ? 'bg-gold-50 text-gold-500' :
                      service.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                      'bg-terracotta-50 text-terracotta-500'
                    }`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className={`font-heading font-semibold text-xl mb-0 transition-colors ${
                      service.color === 'primary' ? 'text-primary-500 group-hover:text-primary-600' :
                      service.color === 'gold' ? 'text-gold-500 group-hover:text-gold-600' :
                      service.color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-600' :
                      'text-terracotta-500 group-hover:text-terracotta-600'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-dark/60 text-sm leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>

                  <ul className="space-y-2">
                    {service.details.map(detail => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-dark/50">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          service.color === 'primary' ? 'bg-primary-400' :
                          service.color === 'gold' ? 'bg-gold-400' :
                          service.color === 'emerald' ? 'bg-emerald-400' :
                          'bg-terracotta-400'
                        }`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <IslamicDivider />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">
              Besoin d'un Service ?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              N'hésitez pas à nous contacter pour toute demande de service ou d'information.
              Notre équipe est à votre écoute.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-gold-400 text-dark font-bold rounded-full hover:bg-gold-300 transition-all duration-300 shadow-xl shadow-gold-400/20 btn-shimmer"
            >
              Nous Contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
