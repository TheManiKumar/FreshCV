import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F2F2F7",
          primary: "#0071E3",
          secondary: "#86868B",
          text: "#1D1D1F",
          accent: "#34C759",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-md": "0 8px 32px rgba(0,0,0,0.08)",
        "card-lg": "0 20px 60px rgba(0,0,0,0.10)",
        "card-blue": "0 8px 24px rgba(0,113,227,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "score-fill": {
          "0%": { "stroke-dashoffset": "314" },
          "100%": { "stroke-dashoffset": "var(--target-offset)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
        "fade-up-1": "fade-up 0.5s 0.1s ease both",
        "fade-up-2": "fade-up 0.5s 0.2s ease both",
        "fade-up-3": "fade-up 0.5s 0.3s ease both",
        "fade-up-4": "fade-up 0.5s 0.4s ease both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
