/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      DEFAULT: '0.25rem', // 4px
      // ... other borderRadius settings
    },
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
      fontFamily: {
        sans: ['Object Sans', 'sans-serif'], // Custom font
      },
      fontSize: {
        'title': ['20px', { lineHeight: '1.2' }],
        'form-label': ['13px', { lineHeight: '1.5' }],
        'normal-text': ['12px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        'strong': '800',
      },
    },
  },
  plugins: [],
}