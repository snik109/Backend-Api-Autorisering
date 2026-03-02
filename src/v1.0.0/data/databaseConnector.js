const mysql = require('mysql2');

// Create a connection pool (better for web apps than a single connection)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Your MySQL Workbench username
  password: 'Skole123', // Your MySQL Workbench password
  database: 'minecraftitems',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise-based version for modern async/await usage
module.exports = pool.promise();