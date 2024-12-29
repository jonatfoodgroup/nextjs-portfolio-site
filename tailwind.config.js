/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,html}", // Include files in the app directory
    "./pages/**/*.{js,jsx,ts,tsx}", // Include files in the pages directory
    "./components/**/*.{js,jsx,ts,tsx}", // Include files in the components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};