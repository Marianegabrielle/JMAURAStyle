/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4A373',
        primaryDark: '#A1887F',
        bg: '#2C1810',
        surface: '#3E2723',
        surfaceLight: '#4E342E',
        border: '#5D4037',
        text: '#E8DCD1',
        textMuted: '#BCAAA4',
        textDim: '#8D6E63',
      },
    },
  },
  plugins: [],
};
