import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "animate-float-bob",
    "animate-hiw-pulse",
    "animate-hiw-spin",
    "animate-marquee",
    "animate-scroll-up",
    "animate-file-float",
    "animate-row-in",
    "animate-check-fill",
    "animate-check-mark",
    "animate-price-pop",
    "animate-btn-explode",
    "animate-btn-pulse",
    "animate-stage-shake",
    "animate-dot-pulse"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "hiw-pulse": {
          "0%, 100%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.1)" },
        },
        "hiw-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        "file-float": {
          "0%": { opacity: "0", transform: "translateY(18px) rotate(var(--r))" },
          "15%": { opacity: "1" },
          "70%": { opacity: "1", transform: "translateY(-22px) rotate(calc(var(--r) + var(--w)))" },
          "88%": { opacity: "0" },
          "100%": { opacity: "0", transform: "translateY(-22px) rotate(var(--r))" },
        },
        "row-in": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "check-fill": {
          to: { background: "hsl(var(--destructive) / 0.1)", borderColor: "hsl(var(--destructive) / 0.7)" },
        },
        "check-mark": {
          to: { transform: "rotate(40deg) scale(1)" },
        },
        "price-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        "btn-explode": {
          from: { opacity: "0", transform: "scale(0.2) translate(var(--ox), var(--oy))" },
          to: { opacity: "1", transform: "scale(1) translate(0, 0)" },
        },
        "btn-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        "stage-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-3px)" },
          "40%": { transform: "translateX(3px)" },
          "60%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
        },
        "dot-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".35" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-bob": "float-bob 3s ease-in-out infinite",
        "hiw-pulse": "hiw-pulse 2s ease-in-out infinite",
        "hiw-spin": "hiw-spin 10s linear infinite",
        marquee: "marquee 20s linear infinite",
        "scroll-up": "scroll-up 10s linear infinite",
        "file-float": "file-float 3s ease-in-out infinite",
        "row-in": "row-in 0.3s ease-out forwards",
        "check-fill": "check-fill 0.3s ease-out forwards",
        "check-mark": "check-mark 0.2s ease-out forwards",
        "price-pop": "price-pop 0.5s ease-out",
        "btn-explode": "btn-explode 0.4s ease-out forwards",
        "btn-pulse": "btn-pulse 2s infinite",
        "stage-shake": "stage-shake 0.5s ease-in-out",
        "dot-pulse": "dot-pulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
