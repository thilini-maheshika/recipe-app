const FavoriteModel = require("./FavoriteModel");
const axios = require('axios');

const addFavorite = async (req, res) => {
  try {
    const meal = req.body;
    const favId = await FavoriteModel.addFavourite(meal);
    if (!favId) {
      res.status(500).send({ error: "Failed to add favourite" });
      return;
    }

    //response
    res.status(200).send({
      message: "favourite added successfully.",
      favId,
    });
  } catch (error) {
    console.error("Error adding favourite:", error);
    res.status(500).send({ error: "Error adding user" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const id = req.params.id;

    const favId = await FavoriteModel.removeFavouriteById(id);
    if (!favId) {
      res.status(500).send({ error: "Failed to remove favourite" });
      return;
    }

    res.status(200).send({
      message: "favourite removed successfully.",
      favId,
    });
  } catch (error) {
    console.error("Error removing favourite:", error);
    res.status(500).send({ error: "Error removing favourite" });
  }
};

const getAllByUser = async (req, res) => {
  try {
      const userid = req.params.userid;

      const results = await FavoriteModel.getAllFavourite(userid);
      let favoriteRecipe = [];

      if (results.length === 0) {
          return res.status(404).send({ message: "No favorites found" });
      }

      for (let index = 0; index < results.length; index++) {
          const element = results[index];

          try {
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.idMeal}`);
              
              if (response.data.meals && response.data.meals.length > 0) {
                  const recipe = response.data.meals[0];

                  recipe.favourite = 'Y';
                  recipe.id = element._id;
                  favoriteRecipe.push(recipe);
              } else {
                console.warn(`No meal found for idMeal: ${element.idMeal}`);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }

      res.status(200).send(favoriteRecipe);
  } catch (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).send({ error: "Error fetching data from the database" });
  }
};



module.exports = {
  getAllByUser,
  addFavorite,
  removeFavorite
};
