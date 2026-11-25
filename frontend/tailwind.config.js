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
        stone: {
          50: '#FBF8F1',
          100: '#F4EEE1',
          200: '#E9DFCB',
          300: '#D9CCB3',
          400: '#A89C88',
          500: '#74695A',
          600: '#5A5043',
          700: '#433B31',
          800: '#2E2820',
          900: '#211C15',
          950: '#15110C',
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
