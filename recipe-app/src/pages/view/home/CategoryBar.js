import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, logout } from '../../../session';

const CategoryBar = ({ setCategoryFilter }) => {
    const [filled, setFilled] = useState(1);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/categories/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': getToken()
                    }
                });

                if (response && response.data && response.data.length > 0) {
                    setCategories(response.data);
                    setCategoryFilter(response.data[0].strCategory);
                } else {
                    console.error('No data received from the server');
                }
            } catch (error) {
                if (error.response.status == 401){
                    logout();
                }
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (category) => {
        setFilled(category.idCategory);
        setCategoryFilter(category.strCategory);
    };

    return (
        <div className=" py-10 sm:py-100 lg:py-20 flex flex-wrap gap-5">
            {categories && categories.slice(0,5).map((category) => {
                return (
                    <button
                        key={category.idCategory}
                        className={`border border-pink-600 ${filled == category.idCategory ? 'bg-pink-600 text-white hover:text-white' : 'text-pink-600 hover:text-white hover:bg-pink-600'} py-2 px-10 rounded-full transition-all`}
                        onClick={(e) => { handleClick(category) }}
                    >
                        {category.strCategory}
                    </button>)
            })}
        </div>

    );
}

export default CategoryBar;