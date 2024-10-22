const db = require('../../../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
  addUser: async (user) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('users');

      const insertResult = await collection.insertOne(user);

      return insertResult.insertedId;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      // Retrieve the user by email
      const database = db.getDatabase();
      const collection = database.collection('users');
      const user = await collection.findOne({ email });

      if (!user) {
        return { error: 'User not found' };
      }

      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { error: 'Invalid password' };
      }

      // Return the user data
      return user;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('users');
      const users = await collection.find({}).toArray();

      return users;
    } catch (error) {
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('users');

      // Find the user by email
      const user = await collection.findOne({ email });

      return user;
    } catch (error) {
      throw error;
    }
  },

  getByPhone: async (phone) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('users');

      // Find the user by phone
      const user = await collection.findOne({ phone });

      return user;
    } catch (error) {
      throw error;
    }
  }

};

module.exports = UserModel;
