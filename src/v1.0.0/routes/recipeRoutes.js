// recipe.routes.js
const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { authToken, authRole } = require('../middleware/authMiddleware');

router.post('/', authToken, authRole("Admin", "Editor"), recipesController.addRecipe);
router.get('/craft/:itemId', recipesController.getHowToCraft);
router.delete('/:recipeId', authToken, authRole("Admin", "Editor"), recipesController.deleteRecipe);

module.exports = router;