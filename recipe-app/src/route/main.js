import Main from "../layout/Main";
import Favourite from "../pages/view/Favourite";
import Home from "../pages/view/home";
import Recipe from "../pages/view/recipe";

const mainRoutes = [
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "recipe/:idMeal",
                element: <Recipe />
            },
            {
                path: "favourite",
                element: <Favourite />
            }
        ]
    }
];

export { mainRoutes };