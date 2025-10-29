// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // your files under src/
    "./app/**/*.{js,ts,jsx,tsx}", // if you also use /app
    "./pages/**/*.{js,ts,jsx,tsx}", // if you have /pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "70-30": "70% 28%",
      },
    },
  },
  plugins: [],
};
