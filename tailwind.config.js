/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0e0d",
        surface: "#161614",
        border: "#232320",
        "border-strong": "#33322e",
        ink: "#e9e7e2",
        muted: "#a3a099",
        dim: "#6b6862",
        amber: "#f59e0b",
        "amber-light": "#fbbf24",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1060px",
      },
    },
  },
  plugins: [],
};
