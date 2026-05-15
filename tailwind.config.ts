import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Geist', 'Inter', 'sans-serif'],
      },
      colors: {
        terminal: {
          green: '#00FF41',
          cyan: '#00E5FF',
          purple: '#BD00FF',
          yellow: '#FFD600',
          red: '#FF1744',
          orange: '#FF9100',
          blue: '#2979FF',
        },
        surface: {
          DEFAULT: 'hsl(220 15% 6%)',
          elevated: 'hsl(220 15% 9%)',
          overlay: 'hsl(220 15% 12%)',
          glass: 'hsla(220 15% 12% / 0.7)',
        },
        border: {
          subtle: 'hsl(220 15% 16%)',
          DEFAULT: 'hsl(220 15% 22%)',
          strong: 'hsl(220 15% 28%)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'terminal-blink': 'blink 1s step-end infinite',
        'matrix-rain': 'matrixRain 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        matrixRain: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        gradientShift: { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }, '50%': { boxShadow: '0 0 40px rgba(0, 255, 65, 0.6)' } },
      },
      backdropBlur: { xs: '2px' },
      backgroundImage: {
        'noise': "url('/noise.png')",
        'aurora': 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 25%, #0a1a2e 50%, #1a0a2e 75%, #0a0a1a 100%)',
        'terminal-grid': 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'noise': '200px 200px',
        'terminal-grid': '32px 32px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
