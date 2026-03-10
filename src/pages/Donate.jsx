import { useState } from 'react'
import {
  Heart, CreditCard, Banknote, Shield, CheckCircle, Star,
  Copy, ExternalLink, FileText, Building2
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/ScrollReveal'
import IslamicDivider from '../components/IslamicDivider'
import GeometricPattern from '../components/GeometricPattern'

const projects = [
  {
    title: 'Entretien de la Mosquée',
    desc: 'Contribuez aux frais d\'entretien quotidien : électricité, chauffage, nettoyage.',
    target: 15000,
    raised: 9800,
    icon: '🕌',
  },
  {
    title: 'Programme Éducatif',
    desc: 'Financez les cours de Coran, d\'arabe et l\'école du dimanche.',
    target: 8000,
    raised: 5200,
    icon: '📚',
  },
  {
    title: 'Aide aux Familles',
    desc: 'Soutenez les familles en difficulté avec des paniers alimentaires et une aide d\'urgence.',
    target: 12000,
    raised: 7500,
    icon: '🤲',
  },
]

export default function Donate() {
  const [copiedField, setCopiedField] = useState(null)

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <>
      <PageHeader
        title="Faire un Don"
        titleAr="تبرع"
        subtitle="Votre générosité fait vivre notre mosquée et soutient notre communauté"
      />

      {/* Intro + PayPal CTA */}
      <section className="py-20 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-arabic text-gold-400 text-xl mb-3">صدقة جارية</p>
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">
                Chaque Don Compte
              </h2>
              <p className="text-dark/60 leading-relaxed mb-8">
                Le Prophète ﷺ a dit : « L'aumône n'a jamais diminué une richesse ».
                Votre don, quel que soit son montant, contribue à maintenir un lieu de prière,
                d'éducation et d'entraide pour toute la communauté.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Shield, text: 'Paiement sécurisé' },
                  { icon: CheckCircle, text: 'Reçu fiscal disponible' },
                  { icon: Heart, text: 'Déductible des impôts' },
                ].map(item => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-500/60"
                  >
                    <item.icon className="w-4 h-4 text-primary-500" />
                    <span className="text-dark/70 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 3 donation methods */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* PayPal */}
            <ScrollReveal delay={0}>
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gold-400/5 border border-gold-400 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 border-2 border-[#003087]/30">
                  <img src={`${import.meta.env.BASE_URL}paypal.png`} alt="PayPal" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-2">PayPal</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-6 flex-1">
                  Faites un don rapide et sécurisé via PayPal. Carte bancaire acceptée même sans compte PayPal.
                </p>
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=P55AJZ9UGVAYS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark font-bold rounded-xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg shadow-gold-400/20 btn-shimmer"
                >
                  <Heart className="w-5 h-5" />
                  Donner via PayPal
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

            {/* Virement Bancaire */}
            <ScrollReveal delay={150}>
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gold-400/5 border border-gold-400 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-2">Virement Bancaire</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-6">
                  Effectuez un virement directement sur le compte de l'association.
                </p>

                <div className="space-y-4 flex-1">
                  <div className="bg-ivory rounded-xl p-4 border border-gold-100/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-dark/40 text-xs font-medium uppercase tracking-wider">BIC</span>
                      <button
                        onClick={() => copyToClipboard('AGRIFRPP881', 'bic')}
                        className="text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        {copiedField === 'bic' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="font-mono text-dark font-bold tracking-wider">AGRIFRPP881</p>
                  </div>

                  <div className="bg-ivory rounded-xl p-4 border border-gold-100/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-dark/40 text-xs font-medium uppercase tracking-wider">IBAN</span>
                      <button
                        onClick={() => copyToClipboard('FR76 1810 6000 4894 5722 9105 079', 'iban')}
                        className="text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        {copiedField === 'iban' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="font-mono text-dark font-bold text-sm tracking-wider">FR76 1810 6000 4894<br />5722 9105 079</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Chèque */}
            <ScrollReveal delay={300}>
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gold-400/5 border border-gold-400 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-500 flex items-center justify-center mb-6 shadow-lg shadow-terracotta-400/20">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-2">Chèque</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-6 flex-1">
                  Envoyez un chèque à l'ordre de :
                </p>

                <div className="bg-ivory rounded-xl p-4 border border-gold-100/50 mb-4">
                  <p className="font-heading font-bold text-dark text-center">
                    Association Musulman Du Chablais
                  </p>
                </div>

                <div className="bg-ivory rounded-xl p-4 border border-gold-100/50">
                  <p className="text-dark/60 text-sm text-center">
                    5 chemin des Epinanches<br />
                    74200 Thonon-les-Bains
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <IslamicDivider />

      {/* Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle
              subtitle="مشاريعنا"
              title="Nos Projets en Cours"
              description="Soutenez un projet spécifique qui vous tient à cœur"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => {
              const progress = Math.round((project.raised / project.target) * 100)
              return (
                <ScrollReveal key={project.title} delay={i * 150}>
                  <div className="bg-ivory rounded-2xl p-8 border border-gold-500 card-hover">
                    <span className="text-4xl mb-4 block">{project.icon}</span>
                    <h3 className="font-heading font-semibold text-xl text-dark mb-2">{project.title}</h3>
                    <p className="text-dark/60 text-sm mb-6">{project.desc}</p>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="h-3 bg-gold-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-500 font-bold">{project.raised.toLocaleString()}€</span>
                      <span className="text-dark/40">objectif: {project.target.toLocaleString()}€</span>
                    </div>
                    <p className="text-center text-dark/50 text-xs mt-2">{progress}% atteint</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Verse */}
      <section className="py-16 bg-dark relative overflow-hidden">
        <GeometricPattern variant="hero" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="font-arabic text-2xl text-gold-400 mb-4 leading-relaxed">
              مَّن ذَا ٱلَّذِى يُقْرِضُ ٱللَّهَ قَرْضًا حَسَنًا فَيُضَٰعِفَهُۥ لَهُۥٓ أَضْعَافًا كَثِيرَةً
            </p>
            <p className="text-white/70 italic mb-2">
              « Qui est celui qui fait à Allah un prêt gracieux, qu'Il lui multiplie de multiples fois ? »
            </p>
            <p className="text-white/40 text-sm">Sourate Al-Baqarah, Verset 245</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
