import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

import Register from "./Pages/Register/Register";
import Navbar from "./Components/Navbar";
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
  ]);
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
