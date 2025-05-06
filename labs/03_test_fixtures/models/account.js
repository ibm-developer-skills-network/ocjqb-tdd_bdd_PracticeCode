/**
 * Account Model
 */
const { DataTypes } = require('sequelize');
const logger = require('../utils/logger');

/**
 * Error for data validation issues when deserializing
 */
class DataValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataValidationError';
  }
}

/**
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} Account model
 */
module.exports = (sequelize) => {
  const Account = sequelize.define('Account', {
    // Define fields similar to the Python model
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_joined: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Add instance methods
  Account.prototype.toJSON = function() {
    return { ...this.get() };
  };

  // Static methods will use the built-in Sequelize methods:
  // Account.create() - Creates a record
  // Account.findAll() - Returns all records
  // Account.findByPk() - Finds by primary key
  // Account.update() - Updates a record
  // Account.destroy() - Deletes a record

  return Account;
};