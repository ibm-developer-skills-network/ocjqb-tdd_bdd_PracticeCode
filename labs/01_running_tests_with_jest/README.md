# Lab: Running tests with Jest

These are the source files for the lab **Running tests with Jest**

## Requirements

Required Node.js packages are:

- jest (for running tests)
- eslint (for code linting)

## Setup

1. Install Node.js and npm
2. Run `npm install` to install dependencies
3. Run `npm test` to execute tests with coverage

## Configuration

The Jest configuration is set in `package.json` and `jest.config.js`:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.test.js'],
};
```

## Running Tests

```bash
# Run tests with coverage
npm test

# Run linting
npm run lint
```

## Project Structure

- `triangle.js` - Main module with triangle area calculator
- `triangle.test.js` - Jest tests for the triangle module
- `package.json` - Project configuration and dependencies
- `jest.config.js` - Jest testing framework configuration
