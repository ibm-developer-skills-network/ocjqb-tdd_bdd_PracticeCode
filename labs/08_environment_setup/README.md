# Environment Setup Lab - JavaScript BDD

This lab demonstrates how to set up an environment for Behavior Driven Development (BDD) testing using JavaScript, Cucumber.js, and Jest.

## Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

## Getting Started



1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   # Run Cucumber tests
   npm run cucumber
   
   # Run Jest tests (when available)
   npm run test:jest
   ```

## Project Structure

```
features/
├── environment.js     # Environment setup and configuration
├── setup.feature      # Feature file (currently empty)
└── steps/
    └── web_steps.js   # Step definitions (currently empty)
```

## Configuration Files

- `package.json` - Project dependencies and scripts
- `cucumber.js` - Cucumber.js configuration
- `jest.config.js` - Jest configuration for BDD testing

## Lab Objectives

This lab will teach you to:
1. Set up environment variables for BDD testing
2. Configure Cucumber.js hooks (BeforeAll, AfterAll)
3. Pass configuration data between test files
4. Use environment variables with default values

## Technologies Used

- **Cucumber.js**: BDD framework for JavaScript
- **Jest**: Testing framework (alternative approach)
- **Selenium WebDriver**: Browser automation
- **ChromeDriver**: Chrome browser automation
- **Node.js**: JavaScript runtime environment

## Selenium Setup

This project includes Selenium WebDriver configuration for automated browser testing:

- Chrome WebDriver with headless options
- Configurable wait times for element loading
- Environment-based URL configuration

## Example Usage

```javascript
// Basic Selenium usage in step definitions
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const environment = require('../environment');

Given('I navigate to the application', async function() {
    this.driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(environment.chromeOptions)
        .build();
    
    await this.driver.get(environment.baseUrl);
});
```