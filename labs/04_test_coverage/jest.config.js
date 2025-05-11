// Jest configuration file
module.exports = {
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/"
  ],
  
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "text",
    "lcov"
  ],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/test_*.js"
  ],
  
  // The test environment that will be used for testing
  testEnvironment: "node",
  
  // Collect coverage from these files
  collectCoverageFrom: [
    "models/**/account.js"
  ]
};