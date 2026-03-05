// services/UserService.js
const UserRepo = require('../repository/accounts/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    async register(userData) {
        // 1. Check if user already exists
        const existingUser = await UserRepo.findByEmail(userData.email);
        if (existingUser) throw new Error("Email already registered");

        // 2. Hash the password
        // The '10' is the cost factor (how many times it scrambles the data)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // 3. Prepare data for the Repository
        const newUser = {
            username: userData.username,
            email: userData.email,
            passwordHash: hashedPassword, // Pass the hash, never the plain password
            role: userData.role || 'Reader'
        };

        return await UserRepo.create(newUser);
    }

    async login(username, password) {
        // 1. Fetch user from Repo
        const user = await UserRepo.findByUsername(username);
        
        // 2. Security Check
        // We check if user exists AND if password matches
        if (!user) throw new Error('Authentication Invalid');

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) throw new Error('Authentication Invalid');

        // 3. Generate JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return { token, user: { username: user.username, role: user.role } };
    }
}

module.exports = new UserService();