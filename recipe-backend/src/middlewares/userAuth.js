const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const UserModel = require('../mvc/user/UserModel');

function authenticateToken(req, res, next) {
  try {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.decoded = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  authenticateToken,
};
