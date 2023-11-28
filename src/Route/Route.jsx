import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/User/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/User/Login/Login";
import Registration from "../Pages/User/Registration/Registration";
import Membership from "../Pages/User/Membership/Membership";
import PostDetails from "../Pages/User/PostDetails/PostDetails";
import UserDashboard from "../Pages/User/Dashboard/UserDashboard";
import AddPost from "../Pages/User/Dashboard/AddPost/AddPost";
import Myprofile from "../Pages/User/Dashboard/MyProfile/Myprofile";
import MyPost from "../Pages/User/Dashboard/MYPosts/MyPost";
import Comment from "../Pages/User/PostDetails/Comment";
import CommentPage from "../Pages/User/Home/CommentPage/CommentPage";
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
	{
		path: "/Dashboard",
		element: <UserDashboard></UserDashboard>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path:"MyProfile",
				element: <Myprofile></Myprofile>
				
			},
			{
				path:"AddPost",
				element: <AddPost></AddPost>
				
			},
			{
				path:"MyPost",
				element: <MyPost></MyPost>
				
			},
			{
				path:"Comments/:title",
				element: <CommentPage></CommentPage>
				
			},
		]
	},

]);

export default router;
