import React from 'react';
import { Link } from 'react-router-dom';
import report from "../../../assets/ban-icon-256x256-6zhbuvav.png"
import manageuser from "../../../assets/user-management-11.png"
import myProfile from "../../../assets/profile.png"
import MakeAnnouncement from "../../../assets/free-announcement-2235195-1872851.webp"

const AdminHome = () => {
    return (
        <div>
            <div className="w-full flex justify-center items-center ">
			<div className=" grid grid-cols-1 md:grid-cols-2 my-5 gap-5 text-center items-center ">
				<Link to="/AdminDashboard/ManageUsers"  className="card p-10 bg-base-100 shadow-2xl">
					<figure>
						<img
							src={manageuser}
							alt="Shoes"
                            className="w-28"
						/>
					</figure>
					<div className="card-body">
						<div className="text-xl font-bold">Manage users</div>
					</div>
				</Link>
				<Link to="/AdminDashboard/MakeAnnouncement"  className="card p-10 bg-base-100 shadow-2xl">
					<figure>
						<img
							src={MakeAnnouncement}
							alt="Shoes"
                            className="w-28"
						/>
					</figure>
					<div className="card-body">
						<p className="text-xl font-bold">Make Announcement</p>
					</div>
				</Link>
				<Link to="/AdminDashboard/ReportedPage"  className="card p-10 bg-base-100 shadow-2xl">
					<figure>
						<img
							src={report}
							alt="Shoes"
                            className="w-28"
						/>
					</figure>
					<div className="card-body">
						<p className="text-xl font-bold">Reported Comments</p>
					</div>
				</Link>
				<Link to="/AdminDashboard/AdminProfile"  className="card p-10 bg-base-100 shadow-2xl">
					<figure>
						<img
							src={myProfile}
							alt="Shoes"
                            className="w-28"
						/>
					</figure>
					<div className="card-body">
						<p className="text-xl font-bold">Admin profile</p>
					</div>
				</Link>
			</div>
			</div>
        </div>
    );
};

export default AdminHome;