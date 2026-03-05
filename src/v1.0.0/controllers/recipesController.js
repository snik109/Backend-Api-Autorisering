const recipesService = require('../service/recipes.service');

async function getHowToCraft(req, res) {
    try {
        const { itemId } = req.params;
        const howToCraft = await recipesService.getHowToCraft(itemId);
        
        if (!howToCraft) {
            return res.status(404).json({ error: 'Crafting recipe not found for this item' });
        }
        
        res.json(howToCraft);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving crafting recipe', details: error.message });
    }
}

async function deleteRecipe(req, res) {
    try {
        const { recipeId } = req.params;
        await recipesService.deleteRecipe(recipeId);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting recipe', details: error.message });
    }
}

async function addRecipe(req, res) {
    try {
        const { recipeId, craftingType, ingredients } = req.body;
        
        // Basic validation check
        if (!recipeId || !ingredients) {
            return res.status(400).json({ error: 'Missing required recipe fields' });
        }

        await recipesService.addRecipe({ recipeId, craftingType, ingredients });
        res.json({ message: 'Recipe added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding recipe', details: error.message });
    }
}

module.exports = { getHowToCraft, deleteRecipe, addRecipe };