// type.routes.js
const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/', typesController.getAllTypes);
router.post('/', authToken, authRole("Admin", "Editor"), typesController.createType);
router.get('/:typeId/stats', typesController.getTypeBaseStats);
router.delete('/:typeId', authToken, authRole("Admin", "Editor"), typesController.deleteType);

module.exports = router;