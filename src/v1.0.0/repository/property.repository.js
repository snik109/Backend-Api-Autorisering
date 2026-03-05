// repositories/PropertyRepository.js
const db = require('../data/databaseConnector');

class PropertyRepository {
    async findByName(name) {
        const [rows] = await db.query('SELECT * FROM Properties WHERE property_name = ?', [name]);
        return rows[0] || null;
    }

    async add(name) {
        const [result] = await db.query('INSERT INTO Properties (property_name) VALUES (?)', [name]);
        return result.insertId;
    }

    async assignToItem(itemId, propertyId, value) {
        return await db.query(
            'INSERT INTO item_properties (Item_ID, Property_ID, Value) VALUES (?, ?, ?)', 
            [itemId, propertyId, value]
        );
    }

    async delete(id) {
        return await db.query('DELETE FROM Properties WHERE property_id = ?', [id]);
    }

    async findAll() {
        const [rows] = await db.query('SELECT * FROM Properties');
        return rows.map(r => r.Property_ID);
    }

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM Properties WHERE property_id = ?', [id]);
        return rows[0] || null;
    }
}

module.exports = new PropertyRepository();