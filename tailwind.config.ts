import type { Config } from "tailwindcss";

// Colours and fonts are taken from the Figma design (MRthi AI, frame "Main").
const scripts = [
  "var(--font-tamil)", "var(--font-devanagari)", "var(--font-telugu)",
  "var(--font-kannada)", "var(--font-malayalam)", "var(--font-bengali)",
  "system-ui", "sans-serif",
];

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#710fe5",
        "primary-light": "#8b3dff",
        magenta: "#a200ba",
        ink: "#181445",
        body: "#4b4456",
        muted: "#7c7387",
        tint: "#f6f2ff",
        "tint-2": "#efebff",
        "tint-3": "#e9e5ff",
        lilac: "#ebdcff",
        blush: "#ffd9e4",
        "blush-dark": "#3e0022",
        rose: "#aa0266",
        orchid: "#ffd6fd",
        page: "#fcf8ff",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", ...scripts],
        display: ["var(--font-outfit)", ...scripts],
      },
    },
  },
  plugins: [],
};
export default config;
