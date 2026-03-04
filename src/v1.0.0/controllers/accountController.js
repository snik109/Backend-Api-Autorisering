const db = require('../data/databaseConnector');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const secret_key = "secret";

async function findAccount(req, res) {
    try {
        // Using parameterized queries (?) prevents SQL Injection
        const [rows] = await db.query(
            'SELECT * FROM users'
        );
        res.status(200).json({
            message: 'Accounts retrieved successfully',
            accounts: rows
        });
        console.log('Search Results:', rows);
    } catch (err) {
        console.error('Database error:', err);
    }
    console.log("test");
}

async function createAccount(req, res) {

    const { Username, Password, Email, User_Role } = req.body;
    try {
        // Using parameterized queries (?) prevents SQL Injection
        const passwordHash = await bcrypt.hash(Password, 14);
        const [rows] = await db.query(
            'INSERT INTO users (Username, Password_Hash, Email, User_Role) VALUES (?, ?, ?, ?)',
            [Username, passwordHash, Email, User_Role]
        );
        res.status(200).json({
            message: 'Account created successfully',
            accounts: rows
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function checkLogIn (req, res) {
    try {
        const { Username, Password } = req.body;
        const [rows] = await db.query(
            'SELECT * FROM users WHERE Username = ?',
            [Username]
        )
        const Password_Hash = rows[0].Password_Hash;
        const User = rows[0];
        const passwordmatch = await bcrypt.compare(Password, Password_Hash);
        if (!User || !passwordmatch) return res.status(400).send('Authentication Invalid');

        const token = jwt.sign({
            id: User.User_ID,
            Username: User.Username,
            Email: User.Email,
            User_Role: User.User_Role
        }, secret_key, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Authentication successful',
            token: token
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

module.exports = { findAccount, createAccount, checkLogIn };