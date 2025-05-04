/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
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
        white: {
          DEFAULT: '#FCFCFC',
          40: 'rgba(252, 252, 252, 0.4)',
        },
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

export default config;
