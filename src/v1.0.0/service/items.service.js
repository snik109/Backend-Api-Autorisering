// services/ItemService.js
const ItemRepo = require('../repository/items.repository');

class ItemService {
    async getItemWikiData(id) {
        const item = await ItemRepo.findById(id);
        if (!item) throw new Error("Item does not exist in the database");

        // Logic: Add a "Power Level" calculation based on enchantments
        item.powerLevel = item.enchantments.reduce((acc, ench) => acc + ench.maxLevel, 0);
        
        return item;
    }

    async createNewItem(itemData, userRole) {
        if (userRole === 'Reader') throw new Error("Insufficient permissions to create items");
        
        return await ItemRepo.create(itemData);
    }
}

module.exports = new ItemService();