import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E Configuration — CALLEFITS BY DANNI
 *
 * En desarrollo: reutiliza el servidor dev ya corriendo (npm run dev).
 * En CI: arranca el servidor de producción (npm run build && npm run start).
 *
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // Serializado para evitar colisiones con el servidor dev
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Un worker para respetar el servidor dev compartido
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Tiempos generosos para Next.js SSR + Supabase queries en dev
    navigationTimeout: 60_000,
    actionTimeout: 30_000,
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  webServer: {
    // En dev local: arranca el servidor de producción (más estable que dev).
    // En CI: hace el build antes y usa el servidor de producción.
    command: process.env.CI ? "npm run build && npm run start" : "npm run start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
