import React from 'react';
import {  RouterProvider} from "react-router-dom";
import router from './route/index';

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
