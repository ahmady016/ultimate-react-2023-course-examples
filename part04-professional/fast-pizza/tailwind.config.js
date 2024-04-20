/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          '"Segoe UI"',
          '"Segoe UI Emoji"',
          'sans-serif',
        ],
      }
    },
  },
  plugins: [],
}
