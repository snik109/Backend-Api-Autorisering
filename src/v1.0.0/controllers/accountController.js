const db = require('../data/databaseConnector');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userService = require('../service/user.service');

const secret_key = "secret";

async function getAllAccounts(req, res) {
    try {
        // Using parameterized queries (?) prevents SQL Injection
        const result = await userService.getAllUsers();
        res.status(200).json({
            message: 'Accounts retrieved successfully',
            accounts: result
        });
        console.log('Search Results:', rows);
    } catch (err) {
        console.error('Database error:', err);
    }
    console.log("test");
}

async function createAccount(req, res) {
    try {
        const result = await userService.register(req.body);

        res.status(201).json({
            message: 'Account created successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);

        if (err.message === 'Missing required fields') {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).send('Internal Error');
    }
}

async function login(req, res) {
    try {
        const { Username, Password } = req.body;

        // Call the service
        const result = await UserService.login(Username, Password);

        // Send success response
        return res.status(200).json({
            message: 'Authentication successful',
            token: result.token
        });

    } catch (err) {
        // Handle specific business errors
        if (err.message === 'Authentication Invalid') {
            return res.status(400).send('Authentication Invalid');
        }

        // Handle unexpected crashes
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

module.exports = { getAllAccounts, createAccount, checkLogIn };