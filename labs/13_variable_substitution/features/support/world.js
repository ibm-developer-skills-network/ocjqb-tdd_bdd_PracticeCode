/**
 * World setup for Cucumber.js Testing
 */
const { setWorldConstructor, setDefaultTimeout, Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const WAIT_SECONDS = parseInt(process.env.WAIT_SECONDS || '60', 10) * 1000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

class CustomWorld {
    constructor() {
        this.baseUrl = BASE_URL;
        this.waitSeconds = WAIT_SECONDS;
        this.driver = null;
    }

    async initializeDriver() {
        // Configure Firefox options
        const options = new firefox.Options();
        options.addArguments('--headless');
        
        // Create WebDriver instance
        this.driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
            
        // Set implicit wait
        await this.driver.manage().setTimeouts({ implicit: this.waitSeconds });
    }

    async closeDriver() {
        if (this.driver) {
            await this.driver.quit();
        }
    }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);

Before(async function() {
    await this.initializeDriver();
});

After(async function() {
    await this.closeDriver();
});