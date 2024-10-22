import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryBar from './CategoryBar';
import RecipeList from './RecipeList';

const Home = () => {
   
    const [categoryFilter, setCategoryFilter] = useState();

    return (
        <>
            <CategoryBar setCategoryFilter={setCategoryFilter}/>
            {categoryFilter && (<RecipeList categoryFilter={categoryFilter} />)}
            
        </>
    );
}

export default Home;