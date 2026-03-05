// repositories/StatRepository.js
const db = require('../../data/databaseConnector');

class StatRepository {
    async create({ name, value }) {
        const [result] = await db.query(
            'INSERT INTO stats (Stat_Name, Value) VALUES (?, ?)',
            [name, value]
        );
        return result.insertId;
    }

    async updateValue(statId, newValue) {
        const [result] = await db.query(
            'UPDATE stats SET Value = ? WHERE Stat_ID = ?',
            [newValue, statId]
        );
        return result.affectedRows > 0;
    }

    // Assigns an existing stat to a type (inserts into types_stats)
    async linkToType(statId, typeId) {
        return await db.query(
            'INSERT IGNORE INTO types_stats (Type_ID, Stat_ID) VALUES (?, ?)',
            [typeId, statId]
        );
    }
}

module.exports = new StatRepository();