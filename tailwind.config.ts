import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0B14",        // ana zemin — mor-siyah, "gece vitrini"
        panel: "#171224",      // kart/panel zemini
        volt: "#E8FF4D",       // Pikachu-elektrik vurgu (tek karakter rengi)
        holo1: "#7DE0FF",
        holo2: "#C48CFF",
        ember: "#FF6B5E",      // düşüş / negatif değişim
        mint: "#5CFFB0",       // yükseliş / pozitif değişim
        parchment: "#F4EFE6",  // birincil metin (zeminle kontrast)
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "system-ui", "sans-serif"],
        ticker: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
