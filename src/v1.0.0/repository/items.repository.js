// repositories/ItemRepository.js
const db = require('../data/databaseConnector');

class ItemRepository {
    async findById(id) {
        const query = `
            SELECT i.*, r.Rarity_Name, e.Enchantment_Name, e.Max_Level
            FROM items i
            LEFT JOIN rarities r ON i.Rarity_ID = r.Rarity_ID
            LEFT JOIN item_enchantments ie ON i.Item_ID = ie.Item_ID
            LEFT JOIN enchantments e ON ie.Enchantment_ID = e.Enchantment_ID
            WHERE i.Item_ID = ?
        `;
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0) return null;

        return {
            id: rows[0].Item_ID,
            name: rows[0].Item_Name,
            description: rows[0].Description,
            rarity: rows[0].Rarity_Name,
            enchantments: rows.filter(r => r.Enchantment_Name).map(r => ({
                name: r.Enchantment_Name,
                maxLevel: r.Max_Level
            }))
        };
    }

    async create({ name, description, rarityId, typeId }) {
        const [result] = await db.query(
            'INSERT INTO items (Item_Name, Description, Rarity_ID, Type_ID) VALUES (?, ?, ?, ?)',
            [name, description, rarityId, typeId]
        );
        return result.insertId;
    }

    async update({ id, name, description, rarityId, typeId }) {
        const [result] = await db.query(
            'UPDATE items SET Item_Name = ?, Description = ?, Rarity_ID = ?, Type_ID = ? WHERE Item_ID = ?',
            [name, description, rarityId, typeId, id]
        );
        return result.affectedRows > 0;
    }

    async deleteByID(id) {
        return await db.query('DELETE FROM items WHERE Item_ID = ?', [id]);
    }
}

module.exports = new ItemRepository();