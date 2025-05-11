/**
 * Account class
 */
const { db } = require('./index');
const logger = require('../utils/logger');

class DataValidationError extends Error {
  /**
   * Used for data validation errors when deserializing
   */
  constructor(message) {
    super(message);
    this.name = "DataValidationError";
  }
}

class Account {
  /** Class that represents an Account */
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone_number = data.phone_number || null;
    this.disabled = data.disabled !== undefined ? data.disabled : false;
    this.date_joined = data.date_joined || new Date();
    
    // Define columns for serialization
    this._tableColumns = [
      { name: 'id' },
      { name: 'name' },
      { name: 'email' },
      { name: 'phone_number' },
      { name: 'disabled' },
      { name: 'date_joined' }
    ];
  }

  toString() {
    return `<Account '${this.name}'>`;
  }

  toDict() {
    /**
     * Serializes the class as a dictionary
     */
    const result = {};
    for (const column of this._tableColumns) {
      result[column.name] = this[column.name];
    }
    return result;
  }

  fromDict(data) {
    /**
     * Sets attributes from a dictionary
     */
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  async create() {
    /**
     * Creates an Account in the database
     */
    logger.info(`Creating ${this.name}`);
    const result = await db.accounts.create(this.toDict());
    this.id = result.id;
    return this;
  }

  async update() {
    /**
     * Updates an Account in the database
     */
    logger.info(`Saving ${this.name}`);
    if (!this.id) {
      throw new DataValidationError("Update called with empty ID field");
    }
    await db.accounts.update(this.id, this.toDict());
    return this;
  }

  async delete() {
    /**
     * Removes an Account from the database
     */
    logger.info(`Deleting ${this.name}`);
    await db.accounts.delete(this.id);
    return true;
  }

  /**
   * CLASS METHODS
   */
  
  static async all() {
    /**
     * Returns all of the Accounts in the database
     */
    logger.info("Processing all Accounts");
    const accounts = await db.accounts.findAll();
    return accounts.map(data => new Account(data));
  }

  static async find(accountId) {
    /**
     * Finds an Account by its ID
     * @param {number} accountId - the id of the Account to find
     * @return an instance with the account_id, or null if not found
     */
    logger.info(`Processing lookup for id ${accountId} ...`);
    const data = await db.accounts.findById(accountId);
    return data ? new Account(data) : null;
  }
}

module.exports = {
  Account,
  DataValidationError
};