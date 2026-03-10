export default function SectionTitle({ subtitle, title, description, light = false, center = true }) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-3xl ${center ? 'mx-auto' : ''} mb-12 md:mb-16`}>
      {/* Decorative element */}
      <div className={`flex items-center ${center ? 'justify-center' : ''} gap-3 mb-4`}>
        <span className="block w-8 h-px bg-gold-400" />
        <span className={`text-gold-400 font-arabic text-lg`}>✦</span>
        <span className="block w-8 h-px bg-gold-400" />
      </div>

      {subtitle && (
        <p className={`text-sm uppercase tracking-[0.2em] font-medium mb-3 ${
          light ? 'text-gold-400' : 'text-primary-500'
        }`}>
          {subtitle}
        </p>
      )}

      <h2 className={`font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight ${
        light ? 'text-white' : 'text-dark'
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`text-base md:text-lg leading-relaxed ${
          light ? 'text-white/70' : 'text-dark/60'
        }`}>
          {description}
        </p>
      )}

      {/* Bottom ornament */}
      <div className={`flex items-center ${center ? 'justify-center' : ''} gap-2 mt-6`}>
        <span className="block w-12 h-0.5 bg-gradient-to-r from-transparent to-gold-400 rounded" />
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold-400">
          <path
            d="M10 0L12.47 7.53L20 10L12.47 12.47L10 20L7.53 12.47L0 10L7.53 7.53Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <span className="block w-12 h-0.5 bg-gradient-to-l from-transparent to-gold-400 rounded" />
      </div>
    </div>
  )
}
