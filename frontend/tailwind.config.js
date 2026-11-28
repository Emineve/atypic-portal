const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Les gris du site sont des bruns chauds, et l'encre un brun foncé plutôt qu'un noir
      colors: {
        stone: {
          50: '#F8F6F2',
          100: '#F2EEE8',
          200: '#E4DDD5',
          300: '#D5CCC3',
          400: '#A89C94',
          500: '#8B7E77',
          600: '#6F635D',
          700: '#5A4D47',
          800: '#463935',
          900: '#3A2E2A',
          950: '#2B2320',
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
