module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,tsx}"],

  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    extend: {
      colors: {
        midnight: "#121063",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
