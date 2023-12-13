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
import CommentPage from "../Pages/User/Home/CommentPage/CommentPage";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import MakeAnnouncement from "../Pages/Admin/MakeAnnouncement/MakeAnnouncement";
import ReportedActivities from "../Pages/Admin/ReportedActivities/ReportedActivities";
import UserHome from "../Pages/User/Dashboard/UserDashboard/UserHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UpdateProfile from "../Pages/User/Dashboard/UpdateProfile/UpdateProfile";


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
				element: <PrivateRoute><Membership></Membership></PrivateRoute>
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
				path:"DashboardHome",
				element:<PrivateRoute> <UserHome></UserHome></PrivateRoute>
				
			},
			{
				path:"MyProfile",
				element:<PrivateRoute> <Myprofile></Myprofile></PrivateRoute>
				
			},
			{
				path:"UpdateProfile",
				element:<PrivateRoute> <UpdateProfile></UpdateProfile></PrivateRoute>
				
			},
			{
				path:"AddPost",
				element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
				
			},
			{
				path:"MyPost",
				element: <PrivateRoute><MyPost></MyPost></PrivateRoute>
				
			},
			{
				path:"Comments/:title",
				element: <PrivateRoute><CommentPage></CommentPage></PrivateRoute>
				
			},
			
		]
	},
	{
		path:"/AdminDashboard",
		element : <AdminDashboard></AdminDashboard>,
		errorElement: <ErrorPage></ErrorPage>,
		children : [
			{
				path:"AdminHome",
				element : <AdminRoute><AdminHome></AdminHome></AdminRoute>
			},
			{
				path:"AdminProfile",
				element :<AdminRoute> <AdminProfile></AdminProfile></AdminRoute>
			},
			{
				path:"ManageUsers",
				element : <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
			},
			{
				path:"MakeAnnouncement",
				element : <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
			},
			{
				path:"ReportedPage",
				element :<AdminRoute> <ReportedActivities></ReportedActivities></AdminRoute>
			},
		]

	}

]);

export default router;
