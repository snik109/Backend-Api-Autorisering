// controllers/ItemController.js
const ItemService = require('../service/items.service');

class ItemController {
    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await ItemService.getItemWikiData(id);
            return res.status(200).json(item);
        } catch (error) {
            // If the service throws "Item does not exist", 404 is appropriate
            const status = error.message.includes("not exist") ? 404 : 500;
            return res.status(status).json({ error: error.message });
        }
    }

    async createItem(req, res) {
        try {
            // Assuming userRole is attached to req by an auth middleware
            const userRole = req.user?.role; 
            const newItem = await ItemService.createNewItem(req.body, userRole);
            return res.status(201).json(newItem);
        } catch (error) {
            const status = error.message.includes("permissions") ? 403 : 400;
            return res.status(status).json({ error: error.message });
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const userRole = req.user?.role;
            const updatedItem = await ItemService.updateItem(id, req.body, userRole);
            return res.status(200).json(updatedItem);
        } catch (error) {
            const status = error.message.includes("permissions") ? 403 : 400;
            return res.status(status).json({ error: error.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const userRole = req.user?.role;
            await ItemService.deleteItem(id, userRole);
            return res.status(204).send(); // No content for successful delete
        } catch (error) {
            const status = error.message.includes("permissions") ? 403 : 400;
            return res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new ItemController();