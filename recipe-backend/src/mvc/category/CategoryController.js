const axios = require('axios');

const categoryList = async (req, res) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const recipes = response.data.categories;

        res.status(200).send(recipes);
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        res.status(500).send({ error: "Error fetching data from the database" });
    }
};

const receipeByCategory = async (req, res) => {
    try {
        const category = req.params.category;
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


module.exports = {
    categoryList,
    receipeByCategory
};
