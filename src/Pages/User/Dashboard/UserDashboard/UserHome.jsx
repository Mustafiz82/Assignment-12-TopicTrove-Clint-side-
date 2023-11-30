import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import myPost from "../../../../assets/my-post-1.png"
import Addpost from "../../../../assets/ADDPost.png"
import myProfile from "../../../../assets/profile.png"
import { Link } from "react-router-dom";

const UserHome = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="m-5 ">
			<h1 className="text-3xl my-10 text-center">
				Welcome {user?.displayName}
			</h1>

			<div className="w-full md:h-[500px] flex  md:flex-row justify-center items-center overflow-hidden">
			<div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center ">
				<Link to="/Dashboard/AddPost"  className="card p-10 bg-base-100 shadow-xl">
					<figure className="w-full">
						<img
							src={Addpost}
							alt="Shoes"
                            className="w-44 md:w-28"
						/>
					</figure>
					<div className="card-body">
						<div className="text-xl text-center font-bold">Add Post</div>
					</div>
				</Link>
				<Link to="/Dashboard/MyPost"  className="card p-10 bg-base-100 shadow-xl">
					<figure>
						<img
							src={myPost}
							alt="Shoes"
                            className="w-44 md:w-28"
						/>
					</figure>
					<div className="card-body">
						<p className="text-xl font-bold">My Post</p>
					</div>
				</Link>
				<Link to="/Dashboard/MyProfile"  className="card p-10 bg-base-100 shadow-xl">
					<figure>
						<img
							src={myProfile}
							alt="Shoes"
                            className="w-44 md:w-28"
						/>
					</figure>
					<div className="card-body">
						<p className="text-xl font-bold">My profile</p>
					</div>
				</Link>
			</div>
			</div>
		</div>
	);
};

export default UserHome;
