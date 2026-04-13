/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stravaOrange: '#fc4c02',
        stravaPink: '#ff416c',
        darkBg: '#0f172a',
        darkCard: '#1e293b'
      }
    },
  },
  plugins: [],
}
