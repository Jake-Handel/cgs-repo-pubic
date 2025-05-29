module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salmon: {
          50: '#fff5f5',
          100: '#ffe4e4',
          200: '#ffd7d7',
          300: '#ffbaba',
          400: '#ff9d9d',
          500: '#ff8080',
          600: '#ff6666',
          700: '#ff4c4c',
          800: '#ff3232',
          900: '#ff1919',
        }
      }
    },
  },
  plugins: [],
}