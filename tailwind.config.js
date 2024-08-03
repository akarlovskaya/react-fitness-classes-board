/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo Black', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'navy': '#002379',
        'navy-light': '#002b99',
        // 'orange-dark': '#FF5F00',
        'orange-dark': '#e65400',
        'orange-light': '#FF9F66',
        'beige': '#FFFAE6'
      },
    },
  },
  plugins: [],
}