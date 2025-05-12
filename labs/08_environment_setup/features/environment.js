const puppeteer = require('puppeteer');

// Store the browser and page objects globally for reuse
let browser;
let page;

// Before all scenarios in a feature
const BeforeAll = async function() {
  // Launch the browser
  browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    slowMo: 50, // Slow down operations by 50ms
    defaultViewport: { width: 1280, height: 800 }
  });
};

// Before each scenario
const Before = async function() {
  // Create a new page for each scenario
  page = await browser.newPage();
  
  // Set timeout for navigation
  await page.setDefaultNavigationTimeout(60000);
  
  // Make page and browser available to step definitions
  this.page = page;
  this.browser = browser;
};

// After each scenario
const After = async function() {
  // Close the page
  if (page) {
    await page.close();
    page = null;
  }
};

// After all scenarios in a feature
const AfterAll = async function() {
  // Close the browser
  if (browser) {
    await browser.close();
    browser = null;
  }
};

module.exports = {
  BeforeAll,
  Before,
  After,
  AfterAll
};
