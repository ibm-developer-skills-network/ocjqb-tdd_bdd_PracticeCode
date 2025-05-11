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
});