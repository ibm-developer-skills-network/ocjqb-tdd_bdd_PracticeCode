// Environment for Cucumber Testing
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Export an empty object for now - we'll populate it with environment variables
const environment = {};

BeforeAll(function() {
    // Executed once before all tests
});

// Export the environment object so it can be imported by step definitions
module.exports = environment;