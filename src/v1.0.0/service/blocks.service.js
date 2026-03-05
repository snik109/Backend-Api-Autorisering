// services/BlockService.js
const BlockRepo = require('../repository/blocks.repository');

class BlockService {
    async getBlockDetails(id) {
        const block = await BlockRepo.findById(id);
        if (!block) throw new Error("Block not found");

        // Logic: Fetch the drops associated with this block
        const drops = await BlockRepo.findDrops(id);
        
        return {
            ...block,
            possibleDrops: drops
        };
    }

    async getBlocks() {
        return await BlockRepo.findAll();
    }

    async deleteBlock(id) {
        return await BlockRepo.deleteBlockByID(id);
    }

    async updateBlock(id, name) {
        return await BlockRepo.updateBlock(id, name);
    }

    async addDrop({ blockId, itemId, min, max, chance }) {
        return await BlockRepo.addDrop({ blockId, itemId, min, max, chance });
    }

    async deleteDrop(id) {
        return await BlockRepo.deleteDropByID(id);
    }
}

module.exports = new BlockService();