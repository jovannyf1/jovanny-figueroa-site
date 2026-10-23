const { defineConfig } = require('@playwright/test');

const liveURL = process.env.PORTFOLIO_URL;

module.exports = defineConfig({
  testDir: './tests',
  reporter: 'list',
  retries: 0,
  use: {
    baseURL: liveURL || 'http://127.0.0.1:4173',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
  },
  webServer: liveURL ? undefined : {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1 2>/dev/null',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 10_000,
  },
});
