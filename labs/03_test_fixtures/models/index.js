/**
 * Data Models
 */
const { Sequelize } = require('sequelize');

// Create Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './test.db',
  logging: false // Disable logging
});

// Initialize models
const Account = require('./account')(sequelize);

// Export models and Sequelize instance
module.exports = {
  Account,
  db: sequelize
};