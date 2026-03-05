const statsRepo = require('../repository/stats.repository');

class StatService {
    async updateValue(statId, newValue) {
        return await statsRepo.updateValue(statId, newValue);
    }
    async linkToType(statId, typeId) {
        return await statsRepo.linkToType(statId, typeId);
    }
    async delete(id) {
        return await statsRepo.delete(id);
    }

    async getAllStats() {
        return await statsRepo.getAllStats();
    }

    async createStat({ name, value }) {
        return await statsRepo.create({ name, value });
    }
}

module.exports = new StatService();