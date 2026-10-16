/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#e63946",
        redDark: "#c1121f",
        redGlow: "rgba(230, 57, 70, 0.35)",
        gold: "#f5c518",
        goldDim: "rgba(245, 197, 24, 0.15)",
        background: "color-mix(in oklab, #fff 5%, transparent)",
        border: "color-mix(in oklab, #000 10%, transparent)",
        textColor:"#4a5f72",

      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
