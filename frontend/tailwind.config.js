/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        ourBlue: '#3CB19C',
      }
    },
    
  },
  plugins: [],
}


