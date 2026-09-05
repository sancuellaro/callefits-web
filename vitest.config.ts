import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: false,
    // Excluir specs de Playwright — se ejecutan por separado con `npm run test:e2e`
    exclude: ["tests/e2e/**", "node_modules/**"],
    include: ["tests/unit/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
