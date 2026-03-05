// repositories/user.repository.js
const db = require('../data/databaseConnector');

class UserRepository {
    #mapToEntity(row) {
        if (!row) return null;
        return {
            id: row.User_ID,
            username: row.Username,
            email: row.Email,
            role: row.User_Role,
            isBanned: !!row.Is_Banned,
            createdAt: row.Created_At,
            passwordHash: row.Password_Hash
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
        return this.#mapToEntity(rows[0])
    };

    async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows.map(this.#mapToEntity);
    }

    async delete(id) {
        return await db.query('DELETE FROM users WHERE User_ID = ?', [id]);
    }

    async findByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE Email = ?',
            [email]
        );
        return this.#mapToEntity(rows[0]);
    }

    async updatePassword(id, passwordHash) {
        const [result] = await db.query('UPDATE users SET Password_Hash = ? WHERE User_ID = ?', [passwordHash, id]);
        return result.affectedRows > 0;
    }

    async updateEmail(id, email) {
        const [result] = await db.query('UPDATE users SET Email = ? WHERE User_ID = ?', [email, id]);
        return result.affectedRows > 0;
    }

    async updateUsername(id, username) {
        const [result] = await db.query('UPDATE users SET Username = ? WHERE User_ID = ?', [username, id]);
        return result.affectedRows > 0;
    }

    async updateRole(id, role) {
        const [result] = await db.query('UPDATE users SET User_Role = ? WHERE User_ID = ?', [role, id]);
        return result.affectedRows > 0;
    }
}

module.exports = new UserRepository();