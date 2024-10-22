import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/24/solid';
import { getToken, getUserid, logout } from '../../session';

const Favourite = () => {

    const [isWishlist, setIsWishlist] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/favourite/all/' + getUserid(), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': getToken()
                }
            });

            if (response) {
                setRecipes(response.data);
            }

        } catch (error) {
            if (error.response.status == 401) {
                logout();
            }
            console.error('Error fetching data:', error);
        }
    };

    const toggleWishlist = async (recipe) => {
        setIsWishlist(recipe.idMeal);

        try {
            const response = await axios.delete(process.env.REACT_APP_API_ENDPOINT + '/favourite/remove/' + recipe.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': getToken()
                }
            });

            if (response) {
                fetchRecipe();
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
      <div className=" py-5 sm:py-5 lg:py-5 flex flex-wrap gap-5">
        <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.idMeal} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
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
                    {recipe.strCategory}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#be185d"
                        stroke="#be185d"
                        className="h-6 w-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
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
    );
}

export default Favourite;