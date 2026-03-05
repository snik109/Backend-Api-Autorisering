const propertyRepo = require('../repository/property.repository');

class PropertyService {
    async findByName(name) {
        return await propertyRepo.findByName(name);
    }
    async add(name) {
        return await propertyRepo.add(name);
    }
    async assignToItem(itemId, propertyId, value) {
        return await propertyRepo.assignToItem(itemId, propertyId, value);
    }
    async delete(id) {
        return await propertyRepo.delete(id);
    }

    async findAll() {
        return await propertyRepo.findAll();
    }

    async getById(id) {
        return await propertyRepo.getById(id);
    }
}

module.exports = new PropertyService();

