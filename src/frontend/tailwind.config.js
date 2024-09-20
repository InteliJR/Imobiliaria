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
      },
    },
  },
  plugins: [],
}