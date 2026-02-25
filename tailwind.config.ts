import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Midnight Navy — trust, stability, European prestige
        brand: {
          50:  "#EFF4FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#4D7FD4",
          500: "#1B3A8C",
          600: "#152E73",
          700: "#0F2259",
          800: "#0A1840",
          900: "#07102B",
          950: "#03081A",
        },
        // Imperial Gold — 金 wealth, status, nobility (accent)
        gold: {
          50:  "#FEFCE8",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#C9A44A",
          600: "#A17C2E",
          700: "#7C5C1E",
          800: "#5C4115",
          900: "#3D2B0C",
          950: "#221706",
        },
        // Ink Dark — body text, borders, UI chrome
        navy: {
          50:  "#F5F5F3",
          100: "#E8E6E1",
          200: "#CCCABE",
          300: "#A8A497",
          400: "#7D7970",
          500: "#5E5A52",
          600: "#44413A",
          700: "#302E28",
          800: "#1E1C18",
          900: "#111009",
          950: "#080705",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cabinet)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient": "gradient 8s ease infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};

export default config;
