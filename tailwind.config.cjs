module.exports = {
  content: ["src/{components,layouts,pages}/**/*.{astro,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "ping-l": {
          from: {
            transform: "translate(0, -50%)",
            opacity: 1,
          },
          to: {
            transform: "translate(-20%, -50%)",
            opacity: 0.3,
          },
        },
        "ping-r": {
          from: {
            transform: "translate(0, -50%)",
            opacity: 1,
          },
          to: {
            transform: "translate(20%, -50%)",
            opacity: 0.3,
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("tailwindcss-radix-colors"),
  ],
};
