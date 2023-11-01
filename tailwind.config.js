/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        'chinese-rocks': ['Chinese Rocks Rg', 'sans-serif'],
      },
      colors: {
        red: 'rgb(254, 32, 31)',
        'red23': 'rgba(254, 32, 31, 0.23)',
        'red09': 'rgba(254, 32, 31, 0.09)',
        'red-100': '#851C1C',
        'input-bg': '#141414',
        grey: '#1D1D1D',
        'gray-100': '#1C1C1C',
        'gray-100-hover': 'rgb(38, 38, 38)',
        divider: 'rgba(255, 255, 255, 0.12)',
        'black-100': '#0C0C0C',
        'button-primary': '#FE201F',
        'button-primary-hover': '#f2100f',
      },
      letterSpacing: {
        button: '0.84px',
      }
    },
  },
  plugins: [],
}

