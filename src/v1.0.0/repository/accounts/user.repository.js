// repositories/UserRepository.js
const db = require('../../data/databaseConnector');

class UserRepository {
    #mapToEntity(row) {
        if (!row) return null;
        return {
            id: row.User_ID,
            username: row.Username,
            email: row.Email,
            role: row.User_Role,
            isBanned: !!row.Is_Banned, // Convert 0/1 to true/false
            createdAt: row.Created_At,
            passwordHash: row.Password_Hash // Keep private, used for auth
        };
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE User_ID = ?', [id]);
        return this.#mapToEntity(rows[0]);
    }

    async create({ username, passwordHash, email, role }) {
        const [result] = await db.query(
            'INSERT INTO users (Username, Password_Hash, Email, User_Role) VALUES (?, ?, ?, ?)',
            [username, passwordHash, email, role || 'Editor']
        );
        return result.insertId;
    }

    async updateStatus(id, isBanned) {
        const [result] = await db.query('UPDATE users SET Is_Banned = ? WHERE User_ID = ?', [isBanned ? 1 : 0, id]);
        return result.affectedRows > 0;
    }

    async findByUsername(username) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE Username = ?',
            [username]
        );
        if (!rows[0]) return null;

        // Map to camelCase for the rest of the app
        return {
            id: rows[0].User_ID,
            username: rows[0].Username,
            email: rows[0].Email,
            role: rows[0].User_Role,
            passwordHash: rows[0].Password_Hash
        };
    }

    async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows.map(this.#mapToEntity);
    }
}

module.exports = new UserRepository();