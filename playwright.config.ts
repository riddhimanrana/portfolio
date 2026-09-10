import { defineConfig, devices } from "@playwright/test";

// End-to-end tests run against the production build on its own port, so
// they exercise exactly what ships: static HTML, hydrated islands, build-time
// markdown. Run with `bun run test:e2e` (builds first).
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4322",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "PORT=4322 bun tests/e2e/serve.ts",
    url: "http://localhost:4322",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "ios", use: { ...devices["iPhone 14"] } },
    // Playwright's Firefox build cannot create its profile on current macOS
    // ("Could not find profile folder"); run it where it launches (Linux CI)
    // with PW_FIREFOX=1.
    ...(process.env.PW_FIREFOX ? [{ name: "firefox", use: { ...devices["Desktop Firefox"] } }] : []),
  ],
});
