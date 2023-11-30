
import { Link, NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";


const AdminDashboard = () => {
    return (
        <div className="m-5">
        <div className="drawer lg:drawer-open">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content ">
                
                <label
                    htmlFor="my-drawer-2"
                    className=" mx-10 m-5 drawer-button lg:hidden"
                >
                    <FiMenu size={46} /> 
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
                        to="/AdminDashboard/AdminProfile"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                ? "text-purple-600 font-bold"
                                : " text-black"
                        }
                    >
                        Admin Profile
                    </NavLink>
                    <NavLink
                        to="/AdminDashboard/ManageUsers"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                ? "text-purple-600 font-bold"
                                : " text-black"
                        }
                    >
                        Manage users
                    </NavLink>
                    <NavLink
                        to="/AdminDashboard/MakeAnnouncement"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                ? "text-purple-600 font-bold"
                                : " text-black"
                        }
                    >
                        Make Announcement
                    </NavLink>
                    <NavLink
                        to="/AdminDashboard/ReportedPage"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                ? "text-purple-600 font-bold"
                                : " text-black"
                        }
                    >
                        Reported Page 
                    </NavLink>
                </ul>
            </div>
        </div>
    </div>
    );
};

export default AdminDashboard;