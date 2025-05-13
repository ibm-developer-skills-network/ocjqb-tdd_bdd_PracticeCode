const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const WAIT_SECONDS = parseInt(process.env.WAIT_SECONDS || '60') * 1000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

class CustomWorld {
  constructor() {
    this.baseUrl = BASE_URL;
    this.waitSeconds = WAIT_SECONDS;
  }

  async initDriver() {
    const options = new firefox.Options();
    options.addArguments('--headless');
    
    this.driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
      
    await this.driver.manage().setTimeouts({ implicit: this.waitSeconds });
  }

  async closeDriver() {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.initDriver();
});

After(async function () {
  await this.closeDriver();
});
