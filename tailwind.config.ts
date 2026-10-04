// tailwind.config.ts — Token warna & konfigurasi sesuai PRD §5.1
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
        // Brand colors (PRD §5.1)
        brand: {
          900: "#0B2A5B",
          800: "#12408A",
          600: "#1E63C6",
          500: "#2F80ED",
          100: "#DCEBFF",
          50: "#F2F7FF",
        },
        // Status colors (PRD §5.1)
        "status-normal": "#22A55B",
        "status-waspada": "#F5B700",
        "status-siaga": "#F08A24",
        "status-awas": "#E5322D",
        "danger-bg": "#FDE8E8",
        // Ink colors (PRD §5.1)
        "ink-900": "#101828",
        "ink-500": "#667085",
        // Border
        line: "#E4E7EC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        "2xl": "16px",
        xl: "12px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      screens: {
        "2xl": "1536px",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
