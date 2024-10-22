const axios = require('axios');

const receipeByCategory = async (req, res) => {
    try {
        const category = req.query.category
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php', {
            params: {
                c: category
            }
        });
        const recipes = response.data.meals;

        res.status(200).send(recipes);
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        res.status(500).send({ error: "Error fetching data from the database" });
    }
};

const receipeById = async (req, res) => {
    try {
        const idMeal = req.params.idMeal
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const recipes = response.data.meals[0];

        res.status(200).send(recipes);
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        res.status(500).send({ error: "Error fetching data from the database" });
    }
};


module.exports = {
    receipeByCategory,
    receipeById
};
