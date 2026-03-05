const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemcontroller');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/:id', itemController.getItem);
router.post('/', authToken, authRole("Admin", "Editor"), itemController.createItem);
router.put('/:id', authToken, authRole("Admin", "Editor"), itemController.updateItem);
router.delete('/:id', authToken, authRole("Admin", "Editor"), itemController.deleteItem);

module.exports = router;