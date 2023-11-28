import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import loading from "../../../../assets/loading-loader.gif";
import SinglePost from "../../Home/Post/SinglePost";
import brongeBadge from "../../../../assets/pngtree-champion-bronze-award-medals-with-red-ribbons-png-image_6564729.png"
import goldBadge from "../../../../assets/pngtree-red-gold-badge-png-image_6427773.png"

const Myprofile = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useContext(AuthContext);

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["SingleUser"],
		queryFn: () =>
			axiosSecure.get(`/user/${user?.email}`).then((res) => {
				return res.data;
			}),
	});


	const { isLoading: allPostLoading, data: allPost } = useQuery({
		queryKey: ["allPostData"],
        enabled: !!user?.email,
		queryFn: () =>
			axiosSecure.get(`/posts?email=${user?.email}`).then((res) => {
				return res.data;
			}),
	});

	console.log(allPost);

	if (isLoading || allPostLoading) {
		return (
			<div className="h-96 flex justify-center items-center">
				<img src={loading} alt="" srcset="" />
			</div>
		);
	}

	console.log(data);
    const  recentPost = allPost?.slice(0,3)

	return (
		<div className="flex  ">
			<div className="m-10  sticky top-0  w-1/3 ">
				<div className="flex justify-center relative rounded-full">
					<img
						src={user?.photoURL}
						className={` w-72 p-2 rounded-full ${data?.Membership === "Gold"
                        ? "border-yellow-400"
                        : "border-[#CD7F32] "}  border-4`}
						alt=""
					/> 
                    <img src={data?.Membership === "Gold"
									? goldBadge
									: brongeBadge} className="w-32 absolute -bottom-10 right-0  " alt="" />

				</div>

				<div className="space-y-4 mt-4 font-bold">
					<div>
						<h1
							className={
								data?.Membership === "Gold"
									? "text-yellow-400"
									: "text-[#CD7F32] "
							}
						>
							Name
						</h1>
						<p>{user?.displayName}</p>
					</div>

					<div>
						<h1
							className={
								data?.Membership === "Gold"
									? "text-yellow-400"
									: "text-[#CD7F32] "
							}
						>
							Email
						</h1>
						<p>{user?.email}</p>
					</div>

					<div>
						<h1
							className={
								data?.Membership === "Gold"
									? "text-yellow-400"
									: "text-[#CD7F32] "
							}
						>
							Membership
						</h1>
						<p>{data?.Membership}</p>
					</div>
				</div>
			</div>
			<div className="h-screen min-h-[600px] overflow-scroll  w-full p-4 bg-slate-200">
				<h1 className="text-3xl">Recent Posts</h1>

                <div className="grid gird-cols-1 gap-5 mt-5">
                {
                    recentPost?.map(item => <SinglePost key={item._id} item={item}></SinglePost>)
                }
                </div>
			</div>
		</div>
	);
};

export default Myprofile;
