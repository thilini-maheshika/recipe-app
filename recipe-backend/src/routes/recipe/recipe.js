const express = require('express');

const { receipeByCategory, receipeById } = require('../../mvc/recipe/RecipeController');

const { authenticateToken } = require('../../middlewares/userAuth');

module.exports = (config) => {
    const router = express.Router();

    router.get('/filter', authenticateToken, receipeByCategory);
    router.get('/:idMeal', authenticateToken, receipeById);
    return router;
};
