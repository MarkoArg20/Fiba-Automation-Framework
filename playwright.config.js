// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  
 // reporter: [
//    [
 //     "playwright-mail-reporter",
 //     {
 //       host: "smtp.gmail.com",
 //       port: 465,
 //       secure: true, // Optional, defaults to true
 //       username: "markoargirovski07@gmail.com",
 //       password: process.env.GGL_PASSWORD,
 //       from: "markoargirovski07@gmail.com",
 //       to: "markoargirovski07@gmail.com", // Comma separated list of email addresses
 //       subject: "PW TEST RESULTS",
 //       linkToResults: 'test',
  //      mailOnSuccess: true,
 //       showError: true,
       // apiKey: "<api>",
 //     },
   // ],
//  ], 
  timeout: 100000, 
  expect: {
    timeout: 10_0000,
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,//process.env.CI ? 1 : undefined,
  use: {
    screenshot: 'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid-id' //fiba's locator 
  },
 

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

