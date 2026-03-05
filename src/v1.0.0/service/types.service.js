// services/TypeService.js
const TypeRepo = require('../repository/types.repository');

class TypeService {
    async getTypeBaseStats(typeId) {
        const typeData = await TypeRepo.findByIdWithStats(typeId);
        if (!typeData) throw new Error("Type category not found");

        // Logic: Filter out stats that have a value of 0
        typeData.activeStats = typeData.stats.filter(s => s.value > 0);
        
        return typeData;
    }
}

module.exports = new TypeService();