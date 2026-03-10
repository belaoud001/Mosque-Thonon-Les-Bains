import { useState } from 'react'
import SubjectDropdown from '../components/SubjectDropdown'
import { Phone, Mail, MapPin, Clock, Send, Facebook, Youtube, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 4000)
  }

  const inputStyle = 'w-full px-4 py-3 bg-white border border-gold-100 rounded-xl text-dark placeholder:text-dark/30 focus:outline-none focus:border-primary-500 transition-colors'

  return (
    <>
      <PageHeader
        title="Contact"
        titleAr="اتصل بنا"
        subtitle="N'hésitez pas à nous contacter pour toute question ou demande"
      />

      <section className="py-20 bg-ivory relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* ── Left: Contact Info ── */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="sticky top-28">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block w-8 h-px bg-gold-400" />
                    <span className="text-gold-400 font-arabic text-lg">✦</span>
                    <span className="block w-8 h-px bg-gold-400" />
                  </div>
                  <h2 className="font-heading font-bold text-3xl text-dark mb-3">
                    Restons en Contact
                  </h2>
                  <p className="text-dark/55 leading-relaxed mb-10">
                    Que vous souhaitiez nous rendre visite, poser une question ou proposer
                    votre aide, nous sommes à votre écoute.
                  </p>

                  {/* Info items */}
                  <div className="space-y-5 mb-10">
                    {[
                      {
                        icon: MapPin,
                        label: 'Adresse',
                        content: '5 chemin des Epinanches\n74200 Thonon-les-Bains, France',
                        href: 'https://maps.google.com/?q=5+chemin+des+Epinanches+74200+Thonon-les-Bains',
                      },
                      {
                        icon: Phone,
                        label: 'Téléphone',
                        content: '(+33) 4 50 70 64 78',
                        href: 'tel:+33450706478',
                      },
                      {
                        icon: Mail,
                        label: 'Email',
                        content: 'contact@mosquee-thonon.fr',
                        href: 'mailto:contact@mosquee-thonon.fr',
                      },
                      {
                        icon: Clock,
                        label: 'Horaires',
                        content: 'Tous les jours : du Fajr au Isha\nJoumou\'a : 12h45 – 13h30\nCours : Sam. & Dim. Maghrib–Isha',
                      },
                    ].map((item) => {
                      const Wrapper = item.href ? 'a' : 'div'
                      return (
                        <Wrapper
                          key={item.label}
                          {...(item.href ? {
                            href: item.href,
                            target: item.href.startsWith('http') ? '_blank' : undefined,
                            rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                          } : {})}
                          className="group flex items-start gap-4"
                        >
                          <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors duration-300">
                            <item.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-dark text-sm mb-0.5">{item.label}</h3>
                            {item.content.split('\n').map((line, i) => (
                              <p key={i} className="text-dark/55 text-sm leading-relaxed">{line}</p>
                            ))}
                          </div>
                        </Wrapper>
                      )
                    })}
                  </div>

                  {/* Social */}
                  <div>
                    <h3 className="font-semibold text-dark text-sm mb-3">Suivez-nous</h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.facebook.com/profile.php?id=100012969094800"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center hover:bg-[#1877F2] group transition-colors duration-300"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4.5 h-4.5 text-primary-500 group-hover:text-white transition-colors" />
                      </a>
                      <a
                        href="https://www.youtube.com/@amcmosqueethonon6928?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center hover:bg-red-600 group transition-colors duration-300"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-4.5 h-4.5 text-primary-500 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3 mt-12">
              <ScrollReveal delay={150}>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-dark/5 border border-gold-300">
                  <h2 className="font-heading font-bold text-2xl text-dark mb-1">
                    Envoyez-nous un Message
                  </h2>
                  <p className="text-dark/45 text-sm mb-8">
                    Nous vous répondrons dans les plus brefs délais, insha'Allah.
                  </p>

                  {submitted ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-dark mb-2">Message Envoyé !</h3>
                      <p className="text-dark/50 text-sm">
                        Merci de nous avoir contactés.{' '}
                        <span className="font-arabic text-gold-500">جزاك الله خيرا</span>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-dark/60 text-xs font-medium mb-1.5 uppercase tracking-wide">Nom complet *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className={inputStyle}
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-dark/60 text-xs font-medium mb-1.5 uppercase tracking-wide">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={inputStyle}
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-dark/60 text-xs font-medium mb-1.5 uppercase tracking-wide">Téléphone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className={inputStyle}
                            placeholder="06 00 00 00 00"
                          />
                        </div>
                        <div>
                          <label className="block text-dark/60 text-xs font-medium mb-1.5 uppercase tracking-wide">Sujet *</label>
                          <SubjectDropdown
                            value={formData.subject}
                            onChange={val => setFormData({ ...formData, subject: val })}
                            className="mt-0.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-dark/60 text-xs font-medium mb-1.5 uppercase tracking-wide">Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputStyle} resize-none`}
                          placeholder="Votre message..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-300 shadow-md shadow-primary-500/15"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer le Message
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* ── Map ── */}
          <ScrollReveal delay={100}>
            <div className="mt-20 rounded-2xl overflow-hidden shadow-lg border border-gold-100/50">
              <iframe
                title="Mosquée de Thonon-les-Bains"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2769.5!2d6.478!3d46.3703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5+Chemin+des+Epinanches%2C+74200+Thonon-les-Bains!5e0!3m2!1sfr!2sfr!4v1700000000000"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
