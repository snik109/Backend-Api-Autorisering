const blockService = require('../service/blocks.service');

async function getBlocks(req, res) {
    try {
        const blocks = await blockService.getBlocks();
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
}

async function getBlockDetails(req, res) {
    try {
        const id = req.params.id;
        const block = await blockService.getBlockDetails(id);
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
        }
        res.json(block);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving block details' });
    }
}

async function deleteBlock(req, res) {
    try {
        const id = req.params.id;
        await blockService.deleteBlock(id);
        res.json({ message: 'Block deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete block' });
    }
}

async function updateBlock(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        await blockService.updateBlock(id, name);
        res.json({ message: 'Block updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update block' });
    }
}

async function addDrop(req, res) {
    try {
        const { blockId, itemId, min, max, chance } = req.body;
        await blockService.addDrop({ blockId, itemId, min, max, chance });
        res.json({ message: 'Drop added successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid data or failed to add drop' });
    }
}

async function deleteDrop(req, res) {
    try {
        const id = req.params.id;
        await blockService.deleteDrop(id);
        res.json({ message: 'Drop deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete drop' });
    }
}

module.exports = { 
    getBlocks, 
    getBlockDetails, 
    deleteBlock, 
    updateBlock, 
    addDrop, 
    deleteDrop 
};