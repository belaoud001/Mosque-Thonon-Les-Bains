/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5f5',
          100: '#b3e0e0',
          200: '#80cccc',
          300: '#4db8b8',
          400: '#1aa3a3',
          500: '#0A6B6B',
          600: '#085858',
          700: '#064545',
          800: '#043232',
          900: '#021f1f',
        },
        gold: {
          50: '#fdf8eb',
          100: '#f9eabc',
          200: '#f2d98d',
          300: '#e8c45e',
          400: '#D4A84B',
          500: '#B8922E',
          600: '#967524',
          700: '#74591B',
          800: '#523D12',
          900: '#302209',
        },
        terracotta: {
          50: '#fdf0eb',
          100: '#f9d4c4',
          200: '#f0b89d',
          300: '#e49c76',
          400: '#C67B5C',
          500: '#A85E3E',
          600: '#8A4830',
          700: '#6C3322',
          800: '#4E1F14',
          900: '#300C06',
        },
        emerald: {
          50: '#e8f5ed',
          100: '#b9e0c8',
          200: '#8acba3',
          300: '#5bb67e',
          400: '#2da159',
          500: '#1B5E3B',
          600: '#164D31',
          700: '#113C26',
          800: '#0C2B1C',
          900: '#071A11',
        },
        ivory: '#FDF6E9',
        cream: '#FBF0DC',
        dark: '#1A1A2E',
        midnight: '#16213E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      backgroundImage: {
        'geometric-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A84B' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'star-pattern': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A84B' fill-opacity='0.06'%3E%3Cpath d='M40 0l6.32 17.32L64.64 15.36 52.68 33.68 70 40l-17.32 6.32 1.96 18.32L40 52.68 25.36 64.64l1.96-18.32L10 40l17.32-6.32L25.36 15.36l18.32 1.96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 168, 75, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 168, 75, 0.6)' },
        },
      },
      borderRadius: {
        'arch': '50% 50% 0 0',
      },
    },
  },
  plugins: [],
}
