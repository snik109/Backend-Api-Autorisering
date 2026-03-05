const typesService = require('../service/types.service');

async function getAllTypes(req, res) {
    try {
        const types = await typesService.getAllTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve types', details: error.message });
    }
}

async function getTypeBaseStats(req, res) {
    try {
        const typeId = req.params.typeId;
        const type = await typesService.getTypeBaseStats(typeId);
        
        if (!type) {
            return res.status(404).json({ error: 'Type not found' });
        }
        
        res.json(type);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching base stats for type', details: error.message });
    }
}

async function createType(req, res) {
    try {
        const typeName = req.body.name;
        if (!typeName) {
            return res.status(400).json({ error: 'Type name is required' });
        }

        const type = await typesService.createType(typeName);
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new type', details: error.message });
    }
}

async function deleteType(req, res) {
    try {
        const typeId = req.params.typeId;
        await typesService.deleteType(typeId);
        res.json({ message: 'Type deleted successfully' });
    } catch (error) {
        // This catches cases where the ID might not exist or there's a database constraint
        res.status(500).json({ error: 'Failed to delete type', details: error.message });
    }
}

module.exports = { getAllTypes, getTypeBaseStats, createType, deleteType };