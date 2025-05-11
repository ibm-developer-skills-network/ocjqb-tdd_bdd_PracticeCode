# Factories and Fakes in Testing

This project demonstrates the use of factories and fake data in testing Node.js applications with Jest and SQLite.

## Project Structure

```
05_factories_and_fakes/
├── models/
│   ├── db.js                 # SQLite database setup and connection
│   └── account.js            # Account model with CRUD operations
│
├── tests/
│   ├── factories.js          # Factory definitions for generating test data
│   ├── fixtures/
│   │   └── account_data.json # Sample account data for tests
│   └── test_account.js       # Account model tests
│
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency lock file
└── README.md                 # Project readme
```

## About Factories and Fakes

Factories are functions that generate test data in a consistent and reusable way. They help create objects with default values that can be overridden as needed for specific test cases. This approach:

- Reduces code duplication
- Makes tests more maintainable
- Allows for flexible test data generation
- Improves test readability

## Implementation Details

### Account Model

The Account model implements a simple data access layer for an SQLite database with the following features:

- CRUD operations (Create, Read, Update, Delete)
- Data validation
- Error handling
- Conversion between database and object representations

### Test Factories

The `factories.js` file contains the `AccountFactory` class that provides methods to:

- Build account objects with default or custom attributes
- Create multiple account instances at once
- Generate realistic test data using Faker.js

### Test Fixtures

The `account_data.json` file contains predefined test data that can be loaded into tests for consistent test scenarios.

## Running the Tests

To run the tests for this project:

```bash
npm test
```

## Dependencies

- sqlite3: SQLite database driver for Node.js
- jest: Testing framework
- @faker-js/faker: Library for generating fake data

## Learning Objectives

- Understand how to create and use factory functions for test data
- Learn to work with fixtures for consistent test scenarios
- Practice writing maintainable tests with reusable test data patterns
- Implement proper error handling and data validation in models
- Use async/await with Promises for database operations
