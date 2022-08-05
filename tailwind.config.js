/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/{pages,components}/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      transitionProperty: {
        bg: "background",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
