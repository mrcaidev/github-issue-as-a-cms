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
        bg: "background-color",
      },
      keyframes: {
        leftslide: {
          from: {
            transform: "translateX(-30px)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        sidemenu: {
          from: {
            transform: "translateX(300px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        rise: {
          from: {
            transform: "translateY(30px)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        pop: {
          from: {
            transform: "scale(0.8)",
            opacity: 0,
          },
          to: {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        tocarrow: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(2px)",
          },
          "75%": {
            transform: "translateX(-2px)",
          },
        },
      },
      animation: {
        leftslide: "leftslide 0.5s ease-in-out",
        rise: "rise 0.5s ease-in-out",
        pop: "pop 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
