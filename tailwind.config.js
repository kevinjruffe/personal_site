const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false,
  theme: {
    colors: {
      black: {
        DEFAULT: "#000000",
      },
      gray: {
        DEFAULT: "#ececec",
      },
      green: {
        light: "#7ca583",
        DEFAULT: "#1e5344",
        dark: "#215144",
      },
      red: {
        DEFAULT: "#ff0000",
      },
      white: {
        DEFAULT: "#ffffff",
      },
    },
    extend: {
      outline: {
        green: "2px solid #7ca583",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
  },
  variants: {
    extend: {
      borderRadius: ["focus"],
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.3xl") },
        h2: { fontSize: theme("fontSize.2xl") },
        h3: { fontSize: theme("fontSize.xl") },
        p: { padding: "0.5rem 0" },
        ul: { padding: "0.5rem 0" },
        article: {
          h1: { a: { color: "#215144" } },
          a: { color: "#7ca583", "&:hover": { textDecoration: "underline" } },
          li: {
            listStyle: "circle",
            listStylePosition: "inside",
            padding: "0.25rem 0",
          },
        },
      });
    }),
  ],
};
