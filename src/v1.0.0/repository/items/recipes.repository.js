// repositories/RecipeRepository.js
const db = require('../../data/databaseConnector');

class RecipeRepository {
    async findByItemId(itemId) {
        const query = `
            SELECT r.*, ri.Slot_Number, ri.Quantity, i.Item_Name as Ingredient_Name
            FROM recipes r
            JOIN recipe_ingredients ri ON r.Recipe_ID = ri.Recipe_ID
            JOIN items i ON ri.Item_ID = i.Item_ID
            WHERE r.Result_Item_ID = ?
        `;
        const [rows] = await db.query(query, [itemId]);
        if (rows.length === 0) return null;

        return {
            recipeId: rows[0].Recipe_ID,
            craftingType: rows[0].Crafting_Type,
            ingredients: rows.map(r => ({
                name: r.Ingredient_Name,
                slot: r.Slot_Number,
                quantity: r.Quantity
            }))
        };
    }
}

module.exports = new RecipeRepository();