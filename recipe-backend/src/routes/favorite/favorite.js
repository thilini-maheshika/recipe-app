const express = require('express');


const { getAllByUser, addFavorite, removeFavorite } = require('../../mvc/favorite/FavoriteController');

const { authenticateToken } = require('../../middlewares/userAuth');

module.exports = (config) => {
    const router = express.Router();

    router.post('/add', authenticateToken, addFavorite);
    router.get('/all/:userid', authenticateToken, getAllByUser);
    router.delete('/remove/:id', authenticateToken, removeFavorite);
    // router.get('/:fevid', receipeById);
    return router;
};
