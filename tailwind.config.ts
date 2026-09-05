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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          muted: "hsl(var(--surface-muted))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary))",
            foreground: "hsl(var(--brand-primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary))",
            foreground: "hsl(var(--brand-secondary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--brand-accent))",
            foreground: "hsl(var(--brand-accent-foreground))",
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
