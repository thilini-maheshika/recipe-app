const express = require('express');

const { categoryList, receipeByCategory } = require('../../mvc/category/CategoryController');

const { authenticateToken } = require('../../middlewares/userAuth');

module.exports = (config) => {
    const router = express.Router();

    router.get('/all', authenticateToken, categoryList);
    router.get('/recipe/:recipe', authenticateToken, receipeByCategory);
    return router;
};
