const db = require('../data/databaseConnector');

async function findItem(itemName) {
  try {
    // Using parameterized queries (?) prevents SQL Injection
    const [rows] = await db.query(
      'SELECT * FROM Items WHERE Name LIKE ?', 
      [`%${itemName}%`]
    );
    console.log('Search Results:', rows);
  } catch (err) {
    console.error('Database error:', err);
  }
  console.log("test");
}

module.exports = { findItem };