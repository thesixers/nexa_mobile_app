/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "white",
        secondary: {
          DEFAULT: "blue",
          100: "rgba(50, 50, 253, 0.62)",
          200: "rgba(98, 98, 248, 0.38)",
          300: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        wlight: ["WinkySans-Light", "sans-serif"],
        wregular: ["WinkySans-Regular", "sans-serif"],
        wmedium: ["WinkySans-Medium", "sans-serif"],
        wsemibold: ["WinkySans-SemiBold", "sans-serif"],
        wbold: ["WinkySans-Bold", "sans-serif"],
        wextrabold: ["WinkySans-ExtraBold", "sans-serif"],
        wblack: ["WinkySans-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

