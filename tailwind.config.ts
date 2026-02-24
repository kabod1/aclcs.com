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
        // Imperial Chinese Red — luck, prosperity, celebration
        brand: {
          50:  "#FFF1F2",
          100: "#FFE4E6",
          200: "#FFBDC5",
          300: "#FF8795",
          400: "#F84B62",
          500: "#C8102E",
          600: "#A50E26",
          700: "#830C1F",
          800: "#650918",
          900: "#4D0713",
          950: "#2C030B",
        },
        // Imperial Gold — wealth, status, nobility
        gold: {
          50:  "#FEFCE8",
          100: "#FEF5C3",
          200: "#FDE88A",
          300: "#FAD346",
          400: "#F4B90A",
          500: "#C58B09",
          600: "#9E6D07",
          700: "#7A5206",
          800: "#5D3E04",
          900: "#442D03",
          950: "#241701",
        },
        // Ink Dark — power, elegance (text & UI chrome)
        navy: {
          50:  "#F5F4F2",
          100: "#E8E5DF",
          200: "#CCCABC",
          300: "#A8A49A",
          400: "#7D7870",
          500: "#5E5952",
          600: "#434039",
          700: "#302D27",
          800: "#1E1C17",
          900: "#110F0C",
          950: "#080706",
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
