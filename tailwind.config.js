/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#03121F",
      secondary: "#0B3E6B",
      tertiary: "#E7E7EB",
      transparent: "transparent",
      white: {
        DEFAULT: "#E7E7EB",
        light: "#90A0AD",
      },
    },
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      screens: {
        md: "840px",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
