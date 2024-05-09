/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          'IBM Plex Mono',
          'Roboto',
          '"Segoe UI"',
          '"Segoe UI Emoji"',
          'sans-serif',
        ],
      },
      fontSize: {
        huge: ['24rem', 1],
      },
      height: {
        screen: '100dvh'
      }
    },
  },
  plugins: [],
}
