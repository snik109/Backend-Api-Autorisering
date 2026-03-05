const express = require('express');
const router = express.Router();
const blocksController = require('../controllers/blocksController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.get('/', blocksController.getBlocks);
router.get('/:id', blocksController.getBlockDetails);
router.put('/:id', authToken, authRole("Admin", "Editor"), blocksController.updateBlock);
router.delete('/:id', authToken, authRole("Admin", "Editor"), blocksController.deleteBlock);
router.post('/drops', authToken, authRole("Admin", "Editor"), blocksController.addDrop);
router.delete('/drops/:id', authToken, authRole("Admin", "Editor"), blocksController.deleteDrop);

module.exports = router;