const db = require('./db');
const logger = console;

class DataValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataValidationError';
  }
}

class Account {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone_number = data.phone_number || null;
    this.disabled = data.disabled !== undefined ? data.disabled : false;
    this.date_joined = data.date_joined || new Date().toISOString().split('T')[0];
  }

  toString() {
    return `<Account '${this.name}'>`;
  }

  toDict() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      disabled: this.disabled,
      date_joined: this.date_joined
    };
  }

  fromDict(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
  }

  create() {
    return new Promise((resolve, reject) => {
      logger.info(`Creating ${this.name}`);
      const stmt = db.prepare(
        'INSERT INTO accounts (name, email, phone_number, disabled, date_joined) VALUES (?, ?, ?, ?, ?)'
      );
      stmt.run(
        this.name,
        this.email,
        this.phone_number,
        this.disabled ? 1 : 0,
        this.date_joined,
        (err) => {
          if (err) {
            reject(err);
          } else {
            // Set the ID on the account object
            this.id = stmt.lastID;
            resolve(this);
          }
        }
      );
      stmt.finalize();
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      logger.info(`Saving ${this.name}`);
      if (!this.id) {
        reject(new DataValidationError('Update called with empty ID field'));
        return;
      }
      
      const stmt = db.prepare(
        'UPDATE accounts SET name = ?, email = ?, phone_number = ?, disabled = ?, date_joined = ? WHERE id = ?'
      );
      // Make the branch condition more explicit for date_joined parameter
      let dateJoined;
      if (this.date_joined !== undefined) {
        dateJoined = this.date_joined;
      } else {
        dateJoined = null;
      }
      
      stmt.run(
        this.name,
        this.email,
        this.phone_number,
        this.disabled ? 1 : 0,
        dateJoined,
        this.id,
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this);
          }
        }.bind(this)
      );
      stmt.finalize();
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      logger.info(`Deleting ${this.name}`);
      const stmt = db.prepare('DELETE FROM accounts WHERE id = ?');
      stmt.run(this.id, (err) => {
        if (err) {
          reject(err);
        } else {
          // Ensure the statement is finalized before resolving
          stmt.finalize();
          resolve();
          return;
        }
      });
    });
  }

  // Class methods
  static all() {
    return new Promise((resolve, reject) => {
      logger.info('Processing all Accounts');
      db.all('SELECT * FROM accounts', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const accounts = rows.map(row => {
            const account = new Account();
            account.fromDict(row);
            return account;
          });
          resolve(accounts);
        }
      });
    });
  }

  static find(accountId) {
    return new Promise((resolve, reject) => {
      logger.info(`Processing lookup for id ${accountId} ...`);
      db.get('SELECT * FROM accounts WHERE id = ?', [accountId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const account = new Account();
          account.fromDict(row);
          resolve(account);
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = { Account, DataValidationError };