/**
 * Database setup and connection module
 */
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// In-memory database for testing purposes
class Database {
  constructor() {
    this.accounts = new AccountsTable();
    this.initialized = false;
  }

  async init() {
    logger.info('Initializing database connection');
    this.initialized = true;
    
    // Load test data if in test environment
    if (process.env.NODE_ENV === 'test') {
      try {
        const dataPath = path.join(__dirname, '..', 'tests', 'fixtures', 'account_data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const accounts = JSON.parse(jsonData);
        
        // Preload accounts if any exist in the test data
        if (accounts && accounts.length > 0) {
          logger.info(`Preloading ${accounts.length} accounts from test data`);
          for (const account of accounts) {
            await this.accounts.create(account);
          }
        }
      } catch (error) {
        logger.error(`Error loading test data: ${error.message}`);
      }
    }
    
    return this;
  }

  async close() {
    logger.info('Closing database connection');
    this.initialized = false;
    return true;
  }
}

// In-memory table implementation for Account objects
class AccountsTable {
  constructor() {
    this.records = [];
    this.nextId = 1;
  }

  async create(data) {
    const record = { ...data, id: this.nextId++ };
    this.records.push(record);
    return record;
  }

  async update(id, data) {
    const index = this.records.findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error(`Account with id ${id} not found`);
    }
    this.records[index] = { ...data, id };
    return this.records[index];
  }

  async delete(id) {
    const index = this.records.findIndex(record => record.id === id);
    if (index === -1) {
      throw new Error(`Account with id ${id} not found`);
    }
    this.records.splice(index, 1);
    return true;
  }

  async findAll() {
    return [...this.records];
  }

  async findById(id) {
    return this.records.find(record => record.id === id) || null;
  }

  async deleteAll() {
    this.records = [];
    return true;
  }
}

// Export a singleton instance
const db = new Database();

module.exports = { db };