import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        sans: ["var(--font-primary)", "Lexend Deca", "system-ui", "sans-serif"],
      },
      colors: {
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#b3b3b3",
        background: "#ffffff",
        foreground: "#242326",
        primary: {
          DEFAULT: "#33CC99",
          foreground: "#242326",
        },
        secondary: {
          DEFAULT: "#f8f8f8",
          foreground: "#333333",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f8f8f8",
          foreground: "#8e8e93",
        },
        accent: {
          DEFAULT: "#f8f8f8",
          foreground: "#333333",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#242326",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#242326",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        sidebar: {
          DEFAULT: "#fafafa",
          foreground: "#242326",
          primary: "#333333",
          "primary-foreground": "#fafafa",
          accent: "#f8f8f8",
          "accent-foreground": "#333333",
          border: "#e5e5e5",
          ring: "#b3b3b3",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #33CC99 0%, #36B188 100%)",
        "gradient-subtle": "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)",
        "gradient-card": "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      },
      boxShadow: {
        elegant: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        soft: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
} satisfies Config;
