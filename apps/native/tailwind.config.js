/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#7C3AED",
        "brand-dark": "#5B21B6",
        "brand-light": "#A78BFA",

        "bg-app": "#0A0A0F",
        "bg-surface": "#18181F",
        "bg-surface-alt": "#1F1F28",
        "bg-muted": "#27272F",

        "text-primary": "#E4E4E7",
        "text-secondary": "#9CA3AF",
        "text-on-brand": "#FFFFFF",

        border: "rgba(124, 58, 237, 0.2)",
        "input-bg": "#1A1A22",
        "input-border": "rgba(124, 58, 237, 0.15)",
        ring: "#7C3AED",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        "tabbar-bg": "#0A0A0F",
        "tabbar-border": "rgba(124, 58, 237, 0.2)",
        "tab-icon-active": "#7C3AED",
        "tab-icon-inactive": "#9CA3AF",

        primary: "#7C3AED",
        secondary: "#1F1F28",
        error: "#EF4444",
        background: "#0A0A0F",
        surface: "#18181F",
        text: "#E4E4E7",
      },
    },
  },
  plugins: [],
}