import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        cream: '#faf7f2',
        sand: '#f2ede4',
        flame: '#ff5a1f',
        'flame-dark': '#e14a12',
        muted: '#6b6b6b',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.06)',
        lift: '0 12px 40px rgba(10,10,10,0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 600ms ease-out both',
        'fade-in': 'fadeIn 500ms ease-out both',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) rotate(-8deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-6deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
