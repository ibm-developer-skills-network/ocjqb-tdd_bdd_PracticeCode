# Environment Setup for BDD Testing

This project demonstrates how to set up an environment for Behavior-Driven Development (BDD) testing using Cucumber.js and Puppeteer for web testing.

## Project Structure

```
labs/08_environment_setup/
│   ├── features/
│   │   ├── environment.js - Setup and teardown hooks
│   │   ├── setup.feature - Feature file with scenarios
│   │   └── steps/
│   │       └── web_steps.js - Step definitions for web testing
│   ├── package.json - Project dependencies
│   ├── cucumber.js - Cucumber configuration
│   ├── jest.config.js - Jest configuration
│   └── README.md - Project documentation
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run Cucumber tests:
   ```
   npm run cucumber
   ```

3. Run Jest tests (if any):
   ```
   npm test
   ```

## Features

- Web testing with Puppeteer
- BDD testing with Cucumber.js
- Environment setup and teardown hooks
