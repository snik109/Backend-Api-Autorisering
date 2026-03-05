// services/RecipeService.js
const RecipeRepo = require('../repository/recipes.repository');

class RecipeService {
    async getHowToCraft(itemId) {
        const recipe = await RecipeRepo.findByItemId(itemId);
        if (!recipe) return { message: "This item cannot be crafted." };

        // Logic: Format the ingredients into a 3x3 grid representation for the UI
        const grid = Array(9).fill(null);
        recipe.ingredients.forEach(ing => {
            grid[ing.slot - 1] = { name: ing.name, qty: ing.quantity };
        });

        return {
            method: recipe.craftingType,
            layout: grid
        };
    }
}

module.exports = new RecipeService();