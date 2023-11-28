import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';


const UserDashboard = () => {
	return (
		<div>
			<div className="drawer lg:drawer-open">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content ">
					
					<label
						htmlFor="my-drawer-2"
						className="btn btn-primary drawer-button lg:hidden"
					>
						Open drawer
					</label>

                    <Outlet></Outlet>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-2"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu text-lg p-4 w-80 space-y-4 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						<NavLink
							to="/"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
									? "text-purple-600 font-bold"
									: "font-bold text-black"
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/Dashboard/MyProfile"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
									? "text-purple-600 font-bold"
									: " text-black"
							}
						>
							My Profile
						</NavLink>
						<NavLink
							to="/Dashboard/AddPost"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
									? "text-purple-600 font-bold"
									: " text-black"
							}
						>
                            AddPost
						</NavLink>
						<NavLink
							to="/Dashboard/MyPost"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
									? "text-purple-600 font-bold"
									: " text-black"
							}
						>
							My Post
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
