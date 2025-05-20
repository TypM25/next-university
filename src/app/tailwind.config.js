module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        thai: ['IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
   plugins: [require('tailwindcss-motion')], 
}
