export default function IslamicDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg width="300" height="24" viewBox="0 0 300 24" className="text-gold-400 w-full max-w-xs">
        {/* Left line */}
        <line x1="0" y1="12" x2="100" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        {/* Left diamond */}
        <path d="M105 12L110 7L115 12L110 17Z" fill="currentColor" opacity="0.4" />
        {/* Center star */}
        <path
          d="M150 2L155.5 9.5L164 12L155.5 14.5L150 22L144.5 14.5L136 12L144.5 9.5Z"
          fill="currentColor"
          opacity="0.6"
        />
        {/* Inner star */}
        <path
          d="M150 6L153 10L157 12L153 14L150 18L147 14L143 12L147 10Z"
          fill="currentColor"
          opacity="0.3"
        />
        {/* Right diamond */}
        <path d="M185 12L190 7L195 12L190 17Z" fill="currentColor" opacity="0.4" />
        {/* Right line */}
        <line x1="200" y1="12" x2="300" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  )
}
