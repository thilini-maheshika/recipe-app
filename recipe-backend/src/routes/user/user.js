const express = require('express');

const {
    addUser,
    login,
    getAll
} = require('../../mvc/user/UserController');

const { authenticateToken } = require('../../middlewares/userAuth');

module.exports = (config) => {
    const router = express.Router();

    router.post('/create', addUser);
    router.post('/login', login);
    router.get('/all', authenticateToken, getAll);

    return router;
};
