const { faker } = require('@faker-js/faker');
const { Account } = require('../models/account');

class AccountFactory {
  static build(overrides = {}) {
    // Default attributes
    const defaultAttrs = {
      // TODO: You'll add fake data generation here
    };

    // Create account with merged attributes
    const account = new Account({
      ...defaultAttrs,
      ...overrides
    });

    return account;
  }

  static createMany(count) {
    const accounts = [];
    for (let i = 0; i < count; i++) {
      accounts.push(this.build());
    }
    return accounts;
  }
}

module.exports = { AccountFactory };