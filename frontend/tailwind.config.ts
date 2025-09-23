import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
    },
  },
  plugins: [],
};

export default config;
