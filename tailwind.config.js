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
          50: '#EBF2F9',
          100: '#D6E4F2',
          200: '#B8D2E8',
          300: '#8FB5D9',
          400: '#5A8BC4',
          500: '#1B4F72',
          600: '#173F5B',
          700: '#133046',
          800: '#0F2430',
          900: '#0B1A23'
        },
        secondary: {
          50: '#FDF8E8',
          100: '#FBF1D1',
          200: '#F8E5A8',
          300: '#F3D373',
          400: '#EBC544',
          500: '#D4AF37',
          600: '#B8952A',
          700: '#9C7C1F',
          800: '#806417',
          900: '#664D11'
        },
        accent: {
          50: '#E8F6F0',
          100: '#D1EDE1',
          200: '#A3DBC3',
          300: '#75C9A5',
          400: '#47B787',
          500: '#2ECC71',
          600: '#25A65C',
          700: '#1D8047',
          800: '#155A32',
          900: '#0D331D'
},
        border: '#E5E7EB',
        surface: '#F8F9FA',
        background: '#FFFFFF',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -3px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}