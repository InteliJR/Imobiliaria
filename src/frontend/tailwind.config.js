/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-black': '#1F1E1C',
        'yellow-middle': '#F2B705',
        'yellow-dark': '#BF7E04',
        'yellow-darker': '#593202',

        'neutral-900': '#363430',
        'neutral-600': '#76726A',
        'neutral-300': '#B2AFA9',
      },
    },
  },
  plugins: [],
}