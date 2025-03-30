/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,ts}",
    "./app/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: true,
  },
};
