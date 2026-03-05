const express = require('express');
const router = express.Router();
const statController = require('../controllers/statsController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/', statController.getAllStats);
router.post('/', authToken, authRole("Admin", "Editor"), statController.createStat);
router.put('/value', authToken, authRole("Admin", "Editor"), statController.updateValue);
router.post('/link', authToken, authRole("Admin", "Editor"), statController.linkToType);
router.delete('/:id', authToken, authRole("Admin", "Editor"), statController.deleteStat);

module.exports = router;