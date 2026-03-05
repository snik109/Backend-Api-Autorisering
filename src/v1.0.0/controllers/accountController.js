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
        console.log('Search Results:', result);
    } catch (err) {
        console.error('Database error:', err);
    }
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
        const result = await userService.login(Username, Password);

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

async function updateStatus(req, res) {
    try {
        const result = await userService.updateStatus(req.params.id, req.body.isBanned);
        res.status(200).json({
            message: 'Account status updated successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function updateRole(req, res) {
    try {
        const result = await userService.updateRole(req.params.id, req.body.role);
        res.status(200).json({
            message: 'Account role updated successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function updatePassword(req, res) {
    try {
        const result = await userService.updatePassword(req.params.id, req.body.passwordHash);
        res.status(200).json({
            message: 'Account password updated successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function updateEmail(req, res) {
    try {
        const result = await userService.updateEmail(req.params.id, req.body.email);
        res.status(200).json({
            message: 'Account email updated successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function updateUsername(req, res) {
    try {
        const result = await userService.updateUsername(req.params.id, req.body.username);
        res.status(200).json({
            message: 'Account username updated successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function deleteAccount(req, res) {
    try {
        const result = await userService.delete(req.params.id);
        res.status(200).json({
            message: 'Account deleted successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

async function findById(req, res) {
    try {
        const result = await userService.findById(req.params.id);
        res.status(200).json({
            message: 'Account retrieved successfully',
            result
        });
    } catch (err) {
        console.error('Internal Error:', err);
        res.status(500).send('Internal Error');
    }
}

module.exports = {
    getAllAccounts,
    createAccount,
    login,
    updateStatus,
    updateRole,
    updatePassword,
    updateEmail,
    updateUsername,
    deleteAccount,
    findById
};