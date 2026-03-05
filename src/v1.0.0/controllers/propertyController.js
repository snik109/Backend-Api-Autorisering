const propertyService = require('../service/property.service');

async function add(req, res) {
    try {
        const name = req.body.name;
        const property = await propertyService.add(name);
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add property', details: error.message });
    }
}

async function getById(req, res) {
    try {
        const id = req.params.id;
        const property = await propertyService.getById(id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching property by ID', details: error.message });
    }
}

async function findAll(req, res) {
    try {
        const properties = await propertyService.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching properties', details: error.message });
    }
}

async function assignToItem(req, res) {
    try {
        const { itemId, propertyId, value } = req.body;
        const result = await propertyService.assignToItem(itemId, propertyId, value);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error assigning property to item', details: error.message });
    }
}

async function deleteProperty(req, res) {
    try {
        const id = req.params.id;
        const result = await propertyService.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting property', details: error.message });
    }
}

async function getByName(req, res) {
    try {
        const name = req.params.name;
        const property = await propertyService.findByName(name);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching property by name', details: error.message });
    }
}

module.exports = { add, getById, findAll, assignToItem, deleteProperty, getByName };