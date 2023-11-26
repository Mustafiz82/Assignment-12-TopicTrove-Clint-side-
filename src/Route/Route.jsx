import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/User/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/User/Login/Login";
import Registration from "../Pages/User/Registration/Registration";
import Membership from "../Pages/User/Membership/Membership";
import PostDetails from "../Pages/User/PostDetails/PostDetails";
// import ErrorPage from "../Layout/ErrorPage/ErrorPage";
// import ErrorPage from "../Layout/ErrorPage/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout></MainLayout>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/membership",
				element: <Membership></Membership>
			},
			{
				path: "/postDetails/:id",
				element: <PostDetails></PostDetails>
			},
		],
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
	{
		path: "/register",
		element: <Registration></Registration>
	},

]);

export default router;
