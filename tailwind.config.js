/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", // Include the root HTML file
    "./pages/**/*.{html,js}",], // Include files within the "pages" folder],
  theme: {
    extend: {
      colors: {
        main: '#FFC30B',
        mainRed: "#EF4444",
        mainGreen: "#10B981"
      }
    },
  },
  plugins: [],
}

