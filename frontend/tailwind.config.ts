import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#134e39',
          dark: '#0d3527',
          light: '#e6f2ed',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#ecfdf5',
        },
        canvas: '#f8faf8',
        surface: '#ffffff',
        muted: '#f4f6f4',
        border: {
          DEFAULT: '#e2e6e2',
          strong: '#d8dad9',
        },
        content: {
          DEFAULT: '#0f172a',
          secondary: '#475569',
          muted: '#94a3b8',
        },
        stream: {
          organic: '#15803d',
          paper: '#0284c7',
          plastic: '#ea580c',
          hazardous: '#dc2626',
          pending: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 2px 10px rgb(15 23 42 / 0.04)',
        elevated: '0 8px 24px rgb(15 23 42 / 0.08)',
      },
      zIndex: {
        base: '0',
        navigation: '20',
        map: '30',
        dropdown: '40',
        sticky: '50',
        overlay: '60',
        modal: '70',
        toast: '80',
      },
    },
  },
  plugins: [],
} satisfies Config;
