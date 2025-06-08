/**
 * World configuration for Cucumber testing
 */
const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const WAIT_SECONDS = parseInt(process.env.WAIT_SECONDS || '60');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

class CustomWorld {
  constructor() {
    this.base_url = BASE_URL;
    this.wait_seconds = WAIT_SECONDS;
    this.driver = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function() {
  // Instantiate the Firefox WebDriver with GeckoDriver
  const options = new firefox.Options();
  options.addArguments('--headless');
  
  this.driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
    
  await this.driver.manage().setTimeouts({ implicit: this.wait_seconds * 1000 });
});

After(async function() {
  if (this.driver) {
    await this.driver.quit();
  }
});