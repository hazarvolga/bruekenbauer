import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        "on-background": "rgb(var(--color-on-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-dim": "rgb(var(--color-surface-dim) / <alpha-value>)",
        "surface-bright": "rgb(var(--color-surface-bright) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--color-surface-container-lowest) / <alpha-value>)",
        "surface-container-low": "rgb(var(--color-surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--color-surface-container) / <alpha-value>)",
        "surface-container-high": "rgb(var(--color-surface-container-high) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--color-surface-container-highest) / <alpha-value>)",
        "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
        "graphite-surface": "rgb(var(--color-graphite-surface) / <alpha-value>)",
        "graphite-muted": "rgb(var(--color-graphite-muted) / <alpha-value>)",
        "industrial-silver": "rgb(var(--color-industrial-silver) / <alpha-value>)",
        "data-orange": "rgb(var(--color-data-orange) / <alpha-value>)",
        "warning-red": "rgb(var(--color-warning-red) / <alpha-value>)",
        outline: "rgb(var(--color-outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
        "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
        "secondary-container": "rgb(var(--color-secondary-container) / <alpha-value>)",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        technical: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      spacing: {
        gutter: "24px",
        unit: "4px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "viewport-macro": "80vh",
      },
      fontSize: {
        "label-xs": ["10px", { lineHeight: "12px", letterSpacing: "0.1em", fontWeight: "700" }],
        "data-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "400" }],
        "technical-md": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0.02em", fontWeight: "500" },
        ],
        "headline-lg-mobile": [
          "32px",
          { lineHeight: "40px", letterSpacing: "0", fontWeight: "600" },
        ],
        "headline-lg": ["48px", { lineHeight: "56px", letterSpacing: "0", fontWeight: "600" }],
        "display-xl": [
          "clamp(64px, 10vw, 120px)",
          { lineHeight: "0.92", letterSpacing: "0", fontWeight: "700" },
        ],
      },
      boxShadow: {
        "red-reticle": "0 0 18px rgb(var(--color-warning-red) / 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
