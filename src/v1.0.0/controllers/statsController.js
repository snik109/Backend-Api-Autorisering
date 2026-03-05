const statService = require('../service/stats.service');

async function getAllStats(req, res) {
    try {
        const stats = await statService.getAllStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve stats', details: error.message });
    }
}

async function updateValue(req, res) {
    try {
        const { statId, newValue } = req.body;
        if (!statId) return res.status(400).json({ error: 'statId is required' });

        const updatedStat = await statService.updateValue(statId, newValue);
        res.json(updatedStat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stat value', details: error.message });
    }
}

async function createStat(req, res) {
    try {
        const { name, value } = req.body;
        if (!name) return res.status(400).json({ error: 'Stat name is required' });

        const newStat = await statService.createStat({ name, value });
        res.json(newStat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create stat', details: error.message });
    }
}

async function linkToType(req, res) {
    try {
        const { statId, typeId } = req.body;
        const linkedStat = await statService.linkToType(statId, typeId);
        res.json(linkedStat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to link stat to type', details: error.message });
    }
}

async function deleteStat(req, res) {
    try {
        const id = req.params.id;
        await statService.delete(id);
        res.json({ message: 'Stat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete stat', details: error.message });
    }
}

module.exports = {
    getAllStats,
    updateValue,
    createStat,
    linkToType,
    deleteStat,
};