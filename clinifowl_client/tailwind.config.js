/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#251F1A",
        sienna: "#E06F43",
        alabaster: "#F5F0E6",
        dutchwhite: "#f5e6c6",
        darkalabaster: "#ebe1c6",
        celestialblue: "#20A4F3",
        grey: "#798478",
      },
    },
  },
  plugins: [],
};
