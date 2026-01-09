/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hr-blue': {
          light: '#72deff',
          DEFAULT: '#0084bd',
          dark: '#006994',
        },
        'hr-accent': '#feffba',
        'hr-alert': '#b22727',
        'hr-neutral': '#8c6c57',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
