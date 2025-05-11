const fs = require('fs');
const path = require('path');
const db = require('../models/db');
const { Account, DataValidationError } = require('../models/account');
// You'll add AccountFactory import later

// Load account data from JSON file
const ACCOUNT_DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures/account_data.json'), 'utf8')
);

// Setup and teardown
beforeAll(() => {
  // Database setup is handled by db.js
});

afterAll(() => {
  return new Promise((resolve) => {
    db.close(resolve);
  });
});

beforeEach(done => {
  db.run('DELETE FROM accounts', done);
});

// Test cases
describe('Account Model Tests', () => {
  test('Test creating multiple Accounts', async () => {
    for (const data of ACCOUNT_DATA) {
      const account = new Account(data);
      await account.create();
    }
    const accounts = await Account.all();
    expect(accounts.length).toBe(ACCOUNT_DATA.length);
  });

  test('Test Account creation using known data', async () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account(data);
    await account.create();
    const accounts = await Account.all();
    expect(accounts.length).toBe(1);
  });

  test('Test the representation of an account', () => {
    const account = new Account();
    account.name = "Foo";
    expect(account.toString()).toBe("<Account 'Foo'>");
  });

  test('Test account to dict', () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account(data);
    const result = account.toDict();
    expect(account.name).toBe(result.name);
    expect(account.email).toBe(result.email);
    expect(account.phone_number).toBe(result.phone_number);
    expect(account.disabled).toBe(result.disabled);
    expect(account.date_joined).toBe(result.date_joined);
  });

  test('Test account from dict', () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account();
    account.fromDict(data);
    expect(account.name).toBe(data.name);
    expect(account.email).toBe(data.email);
    expect(account.phone_number).toBe(data.phone_number);
    expect(account.disabled).toBe(data.disabled);
  });

  test('Test Account update using known data', async () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account(data);
    // Create the account and store the returned object which should have the ID set
    const createdAccount = await account.create();
    // Set the ID from the created account
    account.id = createdAccount.id;
    expect(account.id).not.toBeNull();
    account.name = "Rumpelstiltskin";
    await account.update();
    const found = await Account.find(account.id);
    expect(found.name).toBe(account.name);
  });

  test('Test invalid ID update', async () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account(data);
    account.id = null;
    await expect(account.update()).rejects.toThrow(DataValidationError);
  });

  test('Test Account delete using known data', async () => {
    const data = ACCOUNT_DATA[0];
    const account = new Account(data);
    // Create the account and store the returned object which should have the ID set
    const createdAccount = await account.create();
    // Set the ID from the created account
    account.id = createdAccount.id;
    let accounts = await Account.all();
    expect(accounts.length).toBe(1);
    await account.delete();
    // Add a small delay to ensure the database operation completes
    await new Promise(resolve => setTimeout(resolve, 100));
    accounts = await Account.all();
    expect(accounts.length).toBe(0);
  });

  // Additional tests for error handling and edge cases to achieve 100% coverage
  test('Test error handling in create method', async () => {
    // Mock the database prepare method to simulate an error
    const originalPrepare = db.prepare;
    db.prepare = jest.fn(() => {
      return {
        run: (name, email, phone, disabled, date, callback) => {
          callback(new Error('Database error'));
        },
        finalize: jest.fn()
      };
    });

    const account = new Account(ACCOUNT_DATA[0]);
    await expect(account.create()).rejects.toThrow('Database error');

    // Restore the original method
    db.prepare = originalPrepare;
  });

  test('Test error handling in update method', async () => {
    // Mock the database prepare method to simulate an error
    const originalPrepare = db.prepare;
    db.prepare = jest.fn(() => {
      return {
        run: (name, email, phone, disabled, date, id, callback) => {
          callback(new Error('Database error'));
        },
        finalize: jest.fn()
      };
    });

    const account = new Account(ACCOUNT_DATA[0]);
    account.id = 1; // Set ID to avoid validation error
    await expect(account.update()).rejects.toThrow('Database error');

    // Restore the original method
    db.prepare = originalPrepare;
  });

  test('Test error handling in delete method', async () => {
    // Mock the database prepare method to simulate an error
    const originalPrepare = db.prepare;
    db.prepare = jest.fn(() => {
      return {
        run: (id, callback) => {
          callback(new Error('Database error'));
        },
        finalize: jest.fn()
      };
    });

    const account = new Account(ACCOUNT_DATA[0]);
    account.id = 1; // Set ID to avoid validation error
    await expect(account.delete()).rejects.toThrow('Database error');

    // Restore the original method
    db.prepare = originalPrepare;
  });

  test('Test error handling in all method', async () => {
    // Mock the database all method to simulate an error
    const originalAll = db.all;
    db.all = jest.fn((query, callback) => {
      callback(new Error('Database error'), null);
    });

    await expect(Account.all()).rejects.toThrow('Database error');

    // Restore the original method
    db.all = originalAll;
  });

  test('Test error handling in find method', async () => {
    // Mock the database get method to simulate an error
    const originalGet = db.get;
    db.get = jest.fn((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    await expect(Account.find(1)).rejects.toThrow('Database error');

    // Restore the original method
    db.get = originalGet;
  });

  test('Test find method with non-existent ID', async () => {
    // Mock the database get method to return null (no record found)
    const originalGet = db.get;
    db.get = jest.fn((query, params, callback) => {
      callback(null, null);
    });

    const result = await Account.find(999);
    expect(result).toBeNull();

    // Restore the original method
    db.get = originalGet;
  });
});