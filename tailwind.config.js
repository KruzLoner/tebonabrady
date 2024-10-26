module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '411px',
        'sm': '550px',
      },
      maxWidth: {
        'xxs': '18rem',
      }
    },
  },
  plugins: [],
}
