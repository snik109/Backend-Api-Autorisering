// repositories/BlockRepository.js
const db = require('../../data/databaseConnector');

class BlockRepository {
    async findById(id) {
        const query = `
            SELECT b.*, p.Property_Name, bpm.Value
            FROM blocks b
            LEFT JOIN block_property_map bpm ON b.Block_ID = bpm.Block_ID
            LEFT JOIN properties p ON bpm.Property_ID = p.Property_ID
            WHERE b.Block_ID = ?
        `;
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0) return null;

        return {
            id: rows[0].Block_ID,
            name: rows[0].Block_Name,
            properties: rows.filter(r => r.Property_Name).map(r => ({
                name: r.Property_Name,
                value: r.Value
            }))
        };
    }

    async findDrops(blockId) {
        const [rows] = await db.query(
            'SELECT i.Item_Name, id.Min_Quantity, id.Max_Quantity, id.Drop_Chance FROM item_drops id JOIN items i ON id.Item_ID = i.Item_ID WHERE id.Block_ID = ?',
            [blockId]
        );
        return rows.map(r => ({
            itemName: r.Item_Name,
            min: r.Min_Quantity,
            max: r.Max_Quantity,
            chance: r.Drop_Chance
        }));
    }
}

module.exports = new BlockRepository();