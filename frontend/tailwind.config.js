const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Les gris du site passent d'une teinte chaude à une teinte neutre
      colors: {
        stone: colors.zinc,
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
