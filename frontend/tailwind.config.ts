import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#FF8661",
        teal: "#006D77",
        sunshine: "#FFD166",
        sky: "#55CCF2",
        violet: "#9B5DE5",
        ink: "#1E1E1E",
        paper: "#FAFAFA",
        white: "#ffffff",
        black: "#000000",
        transparent: "transparent",
        current: "currentColor",

        // === Home + Mood shared pastel palette ===
        cream: "#F6EDE8",
        coralLight: "#FDE7D8",
        coral: "#FCA17D",
        coralDeep: "#F6765E",
        gold: "#FFD166",
        violetSoft: "#A78BFA",
        textPrimary: "#2C2C2C",
        glassWhite: "rgba(255,255,255,0.5)",
      },

      boxShadow: {
        coralGlow: "0 0 20px rgba(252,161,125,0.35)",
        goldGlow: "0 0 20px rgba(255,209,102,0.35)",
        violetGlow: "0 0 20px rgba(167,139,250,0.35)",
      },

      backgroundImage: {
        "mood-gradient":
          "linear-gradient(180deg, #FDE7D8 0%, #FDF7F8 35%, #FFF7D8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;