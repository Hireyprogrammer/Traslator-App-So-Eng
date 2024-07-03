/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' if you prefer to use the system dark mode
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1a1a1a',
          200: '#242424',
          300: '#2e2e2e',
          400: '#383838',
          500: '#424242',
          600: '#4c4c4c',
          700: '#565656',
          800: '#606060',
          900: '#6a6a6a',
        },
        light: {
          100: '#ffffff',
          200: '#f7f7f7',
          300: '#e1e1e1',
          400: '#cccccc',
          500: '#b6b6b6',
          600: '#a1a1a1',
          700: '#8b8b8b',
          800: '#767676',
          900: '#606060',
        },
      },
    },
  },
  plugins: [],
};
