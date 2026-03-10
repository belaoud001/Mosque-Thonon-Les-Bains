export default function PageHeader({ title, titleAr, subtitle }) {
  return (
    <section className="page-header">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Arabic title */}
        {titleAr && (
          <p className="font-arabic text-gold-400/60 text-2xl md:text-3xl mb-3">
            {titleAr}
          </p>
        )}
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="block w-16 h-0.5 bg-gradient-to-r from-transparent to-gold-400" />
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-gold-400">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor" />
          </svg>
          <span className="block w-16 h-0.5 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
      </div>
    </section>
  )
}
