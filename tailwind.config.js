/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#0a192f', // Navy
        accent: '#64ffda', // Teal-ish
        subtle: '#8892b0',
      }
    },
  },
  plugins: [],
}