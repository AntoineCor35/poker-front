/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'poker-green-dark': '#0f4d2e',
        'poker-green': '#1a6540',
        'poker-red': '#d32f2f',
        'poker-black': '#121212',
        'poker-white': '#ffffff',
        'poker-gold': '#ffc107',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
} 