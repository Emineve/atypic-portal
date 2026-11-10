/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['var(--font-logo)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
