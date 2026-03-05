// repositories/TypeRepository.js
const db = require('../data/databaseConnector');

class TypeRepository {
    async findByIdWithStats(typeId) {
        const query = `
            SELECT t.Type_ID, t.Type_Name, s.Stat_ID, s.Stat_Name, s.Value
            FROM types t
            LEFT JOIN types_stats ts ON t.Type_ID = ts.Type_ID
            LEFT JOIN stats s ON ts.Stat_ID = s.Stat_ID
            WHERE t.Type_ID = ?
        `;
        
        const [rows] = await db.query(query, [typeId]);
        if (rows.length === 0) return null;

        return {
            id: rows[0].Type_ID,
            name: rows[0].Type_Name,
            stats: rows.filter(r => r.Stat_ID).map(r => ({
                id: r.Stat_ID,
                name: r.Stat_Name,
                value: r.Value
            }))
        };
    }

    async create(typeName) {
        const [result] = await db.query('INSERT INTO types (Type_Name) VALUES (?)', [typeName]);
        return result.insertId;
    }

    async delete(id) {
        return await db.query('DELETE FROM types WHERE Type_ID = ?', [id]);
    }

    async findAll() {
        const [rows] = await db.query('SELECT * FROM types');
        return rows.map(r => r.Type_ID);
    }
}

module.exports = new TypeRepository();