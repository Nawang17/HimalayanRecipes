import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Favorites from "./Pages/Favorites/Favorites";
import Register from "./Pages/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import CreateRecipe from "./Pages/CreateRecipe/CreateRecipe";
import RecipeDisplay from "./Pages/RecipeDisplay/RecipeDisplay";
import { Notifications } from "@mantine/notifications";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <Home />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <Navbar /> <Login />,
        </>
      ),
    },
    {
      path: "/Register",

      element: (
        <>
          <Navbar /> <Register />,
        </>
      ),
    },
    {
      path: "/Favorites",

      element: (
        <>
          <Navbar /> <Favorites />,
        </>
      ),
    },
    {
      path: "/CreateRecipe",

      element: (
        <>
          <Navbar /> <CreateRecipe />,
        </>
      ),
    },
    {
      path: "/Recipe/:recipeId",

      element: (
        <>
          <Navbar /> <RecipeDisplay />,
        </>
      ),
    },
  ]);
  return (
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
