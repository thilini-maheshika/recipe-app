import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/24/solid';
import { getToken, getUserid, logout } from '../../../session';

const RecipeList = ({ categoryFilter }) => {
    const [isWishlist, setIsWishlist] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipe();
    }, [categoryFilter]);

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/recipe/filter', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': getToken()
                },
                params: {
                    category: categoryFilter
                }
            });

            if (response) {
                setRecipes(response.data);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleWishlist = async (recipe) => {
        setIsWishlist(recipe.idMeal);

        const data = {
            idMeal: recipe.idMeal,
            userid: getUserid(),
        }
        try {
            const response = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/favourite/add', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': getToken()
                }
            });

            if (response) {
                console.log(response.data);
            }

        } catch (error) {
            if (error.response.status == 401) {
                logout();
            }
            console.error('Error fetching data:', error);
        }
    };

    return (
      <>
        <div className=" py-5 sm:py-5 lg:py-5 flex flex-wrap gap-5">
          <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {recipes &&
              recipes.map((recipe) => (
                <div key={recipe.idMeal} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
                    <a href={`/recipe/${recipe.idMeal}`}>
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-start items-center text-gray">
                      {categoryFilter}
                      <button
                        className={`flex items-center justify-center p-2 ${
                          isWishlist == recipe.idMeal
                            ? "text-red border-red"
                            : "text-gray"
                        }`}
                        onClick={(e) => {
                          toggleWishlist(recipe);
                        }}
                      >
                        {isWishlist == recipe.idMeal ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#be185d"
                            stroke="#be185d"
                            className="h-6 w-6"
                          >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="#be185d"
                            strokeWidth="1.5"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div>
                      <p className="font-bold ">{recipe.strMeal}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
}

export default RecipeList;