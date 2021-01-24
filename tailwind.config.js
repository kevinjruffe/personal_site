const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false,
  theme: {
    colors: {
      gray: {
        DEFAULT: "#ececec",
      },
      green: {
        light: "#7ca583",
        DEFAULT: "#1e5344",
        dark: "#215144",
      },
      white: {
        DEFAULT: "#ffffff",
      },
    },
    extend: {},
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.3xl") },
        h2: { fontSize: theme("fontSize.2xl") },
        h3: { fontSize: theme("fontSize.xl") },
        p: { padding: "0.50rem 0" },
      });
    }),
  ],
};
