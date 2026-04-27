import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Spectral", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Stripe Press warm ivory palette
        paper: {
          50:  "#FAFAF7",
          100: "#F5F4EE",
          200: "#EBE9E1",
          300: "#DCD9CE",
          400: "#C5C0B0",
          500: "#A8A190",
        },
        ink: {
          50:  "#F2F2F0",
          100: "#DDDDD8",
          200: "#BBBBB3",
          300: "#8E8E84",
          400: "#636359",
          500: "#3A3A35",
          600: "#252520",
          700: "#1A1A17",
          800: "#111110",
          900: "#090908",
        },
        vermilion: {
          50:  "#FFF1EE",
          100: "#FFD9D0",
          200: "#FFB3A0",
          300: "#FF8066",
          400: "#F55A38",
          500: "#E34D12",
          600: "#C43D0A",
          700: "#9E2F06",
          800: "#7A2204",
          900: "#5C1902",
        },
        // Accent: ink-deep for Rauno-ish dark moments
        obsidian: "#0D0D0C",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        display: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "clamp(4rem, 8vw, 9rem)",
      },
      maxWidth: {
        "prose-wide": "72ch",
        "prose-narrow": "58ch",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      keyframes: {
        wave: {
          "0%":   { transform: "rotate(0deg)" },
          "10%":  { transform: "rotate(20deg)" },
          "20%":  { transform: "rotate(-16deg)" },
          "30%":  { transform: "rotate(20deg)" },
          "40%":  { transform: "rotate(-8deg)" },
          "50%":  { transform: "rotate(20deg)" },
          "60%":  { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "line-grow": {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        wave:     "wave 2s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.5s ease both",
        "line-grow": "line-grow 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
