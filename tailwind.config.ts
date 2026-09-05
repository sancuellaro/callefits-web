import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Usando <alpha-value> para que los modificadores de opacidad de Tailwind
        // (ej: bg-background/85, border-black/5) funcionen correctamente.
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          muted: "hsl(var(--surface-muted) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary) / <alpha-value>)",
            foreground: "hsl(var(--brand-primary-foreground) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary) / <alpha-value>)",
            foreground: "hsl(var(--brand-secondary-foreground) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "hsl(var(--brand-accent) / <alpha-value>)",
            foreground: "hsl(var(--brand-accent-foreground) / <alpha-value>)",
          },
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
        md: "var(--radius)",
        lg: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
