/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sweetPink: "#AF8F6F",
        berryPink: "#493628",
      },
    },
    
  },
  plugins: [],
}
