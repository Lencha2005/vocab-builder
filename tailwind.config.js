/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '375px', // мобілка
      md: '768px', // планшет
      xl: '1440px', // десктоп
    },
    extend: {},
  },
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       fixel: ['var(--font-fixel-display)'], // твій кастомний шрифт
  //     },
  //   },
  // },
  plugins: [],
};

export default config;
