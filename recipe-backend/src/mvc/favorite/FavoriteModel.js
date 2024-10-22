const db = require('../../../config/db');
const { ObjectId } = require('mongodb');

const FavoriteModel = {
  addFavourite: async (recipe) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('favourite');

      const insertResult = await collection.insertOne(recipe);

      return insertResult.insertedId;
    } catch (error) {
      throw error;
    }
  },

  removeFavouriteById: async (id) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('favourite');

      const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

      if (deleteResult.deletedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },

  getAllFavourite: async (userid) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('favourite');
      const projection = {
        _id: 1,
        idMeal: 1,
        userid: 1
      };
      const favourites = await collection.find({ userid }, projection).toArray();

      console.log(favourites);
      return favourites;
      
    } catch (error) {
      throw error;
    }
  },

  getByRecipeId: async (email) => {
    try {
      const database = db.getDatabase();
      const collection = database.collection('favourite');

      const favourite = await collection.findOne({ getByRecipeId });


      return favourite;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = FavoriteModel;
