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
}

module.exports = new BlockService();