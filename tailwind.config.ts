import type { Config } from "tailwindcss";

/**
 * Brand palette derived from the Lumora "L" mark:
 *  - bright tech-blue (the circuit-board "L")
 *  - deep navy (wordmark / dark sections)
 * The mid-tone `primary` (600) is the accent; for small text on light
 * backgrounds use `primary-700`/`navy` to stay WCAG AA compliant.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e9f6fe",
          100: "#cfecfd",
          200: "#a2dafb",
          300: "#66c4f8",
          400: "#2eaaf4",
          500: "#13a4f4", // brand cyan-blue (the StoreX "X" / cart)
          600: "#0a84cc", // accent — AA on white for large text / UI
          700: "#0a6aa3", // accent for small text on light bg (AA)
          800: "#0d5885",
          900: "#11486d",
          950: "#0a2c45",
        },
        navy: {
          DEFAULT: "#0a1b4d", // deep navy wordmark color
          light: "#142a6b",
          dark: "#07153d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(10, 27, 77, 0.10)",
        card: "0 10px 40px -12px rgba(10, 27, 77, 0.18)",
        glow: "0 20px 60px -20px rgba(43, 139, 230, 0.45)",
      },
      borderRadius: {
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
