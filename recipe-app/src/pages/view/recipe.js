import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../../session';

const Recipe = () => {
    const [singleRecipe, setSingleRecip] = useState([]);
    let { idMeal } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + '/recipe/' + idMeal, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': getToken()
                    }
                });

                if (response) {
                    setSingleRecip(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const loadIngredients = () => {
        const ingredientList = [];

        for (let index = 1; index <= 20; index++) {
            if (singleRecipe[`strIngredient${index}`]) {
                ingredientList.push(
                    <li key={index} className="text-sm">
                        {singleRecipe[`strMeasure${index}`]} {singleRecipe[`strIngredient${index}`]}
                    </li>
                );
            }
        }

        return ingredientList;
    };
    
    const loadInstructions = () => {
        const instructions = singleRecipe.strInstructions
            ?.split('\n')
            .filter(step => step.trim() !== '') 
            .map(step => step.replace(/^\d+\.\d+/, '').trim()) 
            || [];
    
        return (
            <div className="mt-6">
                <ol className="list-decimal space-y-2 text-sm text-gray-700" style={{ columnCount: 2, columnGap: '20px' }}>
                    {instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        );
    };
    
    
    return (
        <div className="flex flex-col items-center py-10 bg-gray-50">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg p-6">

                <div className="flex flex-col lg:flex-row">

                    <div className="w-full lg:w-1/2 p-4">
                        <img
                            src={singleRecipe.strMealThumb}
                            alt={singleRecipe.strMeal}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 p-4">
   
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{singleRecipe.strMeal}</h1>
                        
                        <div className="mt-2">
                            <h2 className="text-lg font-semibold text-gray-600 mb-2">Ingredients</h2>
                            <ul className="list-none space-y-1">
                                {loadIngredients()}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Instructions</h2>
                    {loadInstructions()}
                </div>


                {singleRecipe.strSource && (
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-600">More : </h3>
                        <p className="text-sm text-gray-500">
                            Find more details at:{" "}
                            <a href={singleRecipe.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {singleRecipe.strSource}
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipe;
