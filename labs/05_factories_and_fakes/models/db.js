const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set up the database connection
const db = new sqlite3.Database(path.join(__dirname, 'test.db'));

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone_number TEXT,
    disabled INTEGER DEFAULT 0,
    date_joined TEXT DEFAULT CURRENT_DATE
  )`);
});

module.exports = db;