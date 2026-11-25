const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Les gris du site sont des bruns très doux, accordés au fond crème
      colors: {
        rose: { loft: '#A56C68' },
        stone: {
          50: '#FBF8F1',
          100: '#F4EEE1',
          200: '#E9DFCB',
          300: '#D9CCB3',
          400: '#A89C88',
          500: '#74695A',
          600: '#5A5043',
          700: '#433B31',
          800: '#34383A',
          // le sombre et l'accent du site (25 novembre 2026) : anthracite #3F4344 et vieux rose #A56C68
          900: '#3F4344',
          950: '#2A2D2E',
        },
      },
      fontFamily: {
        logo: ['var(--font-logo)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
