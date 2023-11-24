import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/User/Home/Home";
import ErrorPage from "../Pages/User/Home/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement : <ErrorPage></ErrorPage>,
      children : [
        {
            path : "/",
            element : <Home></Home>
        }
      ]
    },
  ]);



export default router