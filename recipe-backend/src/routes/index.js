const express = require('express')
const categoryRoute = require('./category/category');
const userRoute = require('./user/user');
const recipeRoute = require('./recipe/recipe');
const favoriteRoute = require('./favorite/favorite');

module.exports = (config) => {
    const router = express.Router();
    router.use('/categories', categoryRoute(config));
    router.use('/recipe', recipeRoute(config));
    router.use('/user', userRoute(config));
    router.use('/favourite', favoriteRoute(config));

    return router;
};

