/* eslint-disable linebreak-style */
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    fontFamily: {
      fontbase: ['Work Sans', 'sans-serif'],
    },

    extend: {
      colors: {
        bodycolor: '#F1F0EE',
      },
    },
  },

  plugins: [],
};
