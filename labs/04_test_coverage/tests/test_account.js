/**
 * Test Cases for AccountModel using Jest
 */
const { db } = require('../models');
const { Account, DataValidationError } = require('../models/account');
const fs = require('fs');
const path = require('path');

let ACCOUNT_DATA = [];

describe('Test Account Model', () => {
  let rand;
  
  beforeAll(async () => {
    // Load data needed by tests
    await db.init();  // Initialize database
    
    // Load test fixture data
    const dataPath = path.join(__dirname, 'fixtures', 'account_data.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    ACCOUNT_DATA = JSON.parse(jsonData);
  });

  afterAll(async () => {
    // Disconnect from database
    await db.close();
  });

  beforeEach(async () => {
    // Clear database before each test
    rand = Math.floor(Math.random() * ACCOUNT_DATA.length);
    await db.accounts.deleteAll();
  });

  // TEST CASES

  test('should create multiple accounts', async () => {
    // Test creating multiple Accounts
    for (const data of ACCOUNT_DATA) {
      const account = new Account(data);
      await account.create();
    }
    const allAccounts = await Account.all();
    expect(allAccounts.length).toBe(ACCOUNT_DATA.length);
  });

  test('should create a single account', async () => {
    // Test Account creation using known data
    const data = ACCOUNT_DATA[rand]; // get a random account
    const account = new Account(data);
    await account.create();
    const allAccounts = await Account.all();
    expect(allAccounts.length).toBe(1);
  });

  // Additional test cases will be added here to improve coverage
});