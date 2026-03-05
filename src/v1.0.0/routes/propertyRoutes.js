// property.routes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/', propertyController.findAll);
router.post('/', authToken, authRole("Admin", "Editor"), propertyController.add);
router.get('/:id', propertyController.getById);
router.get('/name/:name', propertyController.getByName);
router.post('/assign', authToken, authRole("Admin", "Editor"), propertyController.assignToItem);
router.delete('/:id', authToken, authRole("Admin", "Editor"), propertyController.deleteProperty);

module.exports = router;