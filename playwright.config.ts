import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  // Run all tests in parallel.
  fullyParallel: true,
  use: {
    browserName: "chromium",
    headless: false,
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    isMobile: false,
    viewport: {
      width: 1280,
      height: 720
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
