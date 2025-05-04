/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fixel: ['var(--font-fixel-display)'], // твій кастомний шрифт
      },
      colors: {
        black: {
          DEFAULT: '#121417',
          50: 'rgba(18, 20, 23, 0.5)',
        },
        black50: 'rgba(18, 20, 23, 0.5)',
        white: '#FCFCFC',
        green: {
          dark: '#85AA9F',
          light: '#A5C0B8',
          50: 'rgba(133, 170, 159, 0.1)',
        },
      },
    },
  },
  plugins: [],
};
