/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      DEFAULT: '0.25rem', // 4px
    },
    extend: {
      colors: {
        'neutral-100': '#E4E4E2',
        'neutral-200': '#C5C3BF',
        'neutral-300': '#B2AFA9',
        'neutral-400': '#9E9B94',
        'neutral-500': '#8B877E',
        'neutral-600': '#76726A',
        'neutral-700': '#605D57',
        'neutral-800': '#4B4944',
        'neutral-900': '#363430',
        'neutral-black': '#1F1E1C',
        'yellow-middle': '#F2B705',
        'yellow-dark': '#BF7E04',
        'yellow-darker': '#593202',

        'neutral-900': '#363430',
        'neutral-600': '#76726A',
        'neutral-300': '#B2AFA9',
        'neutral-200': '#C5C3BF',
        
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