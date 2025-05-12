// Jest setup file for Selenium
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Global setup for Jest with Selenium
global.setupDriver = async () => {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

global.environment = {
  baseUrl: process.env.BASE_URL || 'http://localhost:8080',
  waitSeconds: parseInt(process.env.WAIT_SECONDS || '60', 10)
};