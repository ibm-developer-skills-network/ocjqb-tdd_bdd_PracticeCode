# Test Coverage Lab

This project demonstrates how to implement and measure test coverage for a Node.js application using Jest.

## Project Structure

```
04_test_coverage/
├── models/
│   ├── index.js           # Database setup with in-memory implementation
│   └── account.js         # Account model with CRUD operations
├── tests/
│   ├── fixtures/
│   │   └── account_data.json  # Test data for accounts
│   └── test_account.js    # Test file with account tests
├── utils/
│   └── logger.js          # Logger utility
├── package.json           # Project dependencies
├── jest.config.js         # Jest configuration
└── README.md              # Project documentation
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run tests with coverage:
   ```
   npm test
   ```

## Test Coverage

This project uses Jest's built-in coverage reporting to measure test coverage. The current test suite provides partial coverage of the Account model:

```
------------|---------|----------|---------|---------|---------------------------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                     
------------|---------|----------|---------|---------|---------------------------------------
All files   |   68.59 |    66.66 |      40 |   68.59 |                                       
 account.js |   68.59 |    66.66 |      40 |   68.59 | 12-14,39-40,54-60,73-82,85-91,107-115 
------------|---------|----------|---------|---------|---------------------------------------
```

### Understanding the Coverage Report

- **% Stmts**: Percentage of statements covered
- **% Branch**: Percentage of branches covered (if/else, switch cases)
- **% Funcs**: Percentage of functions called
- **% Lines**: Percentage of lines executed
- **Uncovered Line #s**: Specific lines that weren't executed during tests

### Improving Coverage

To improve test coverage, additional tests should be written to target the uncovered lines. This includes:

1. Testing the `DataValidationError` class
2. Testing the `toString()` and `toDict()` methods
3. Testing the `update()` and `delete()` methods
4. Testing the `find()` method with both existing and non-existing IDs
