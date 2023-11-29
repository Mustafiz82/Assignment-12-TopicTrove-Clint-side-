import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import loading from "../../../../assets/loading-loader.gif";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SinglePost from "../../Home/Post/SinglePost";

const MyPost = () => {
	// const axiosSecure = useAxiosSecure();
	const { user } = useContext(AuthContext);
	const axiosSecure = useAxiosSecure();

	const { isLoading, data, refetch } = useQuery({
		queryKey: ["RecentPostData"],
		enabled: !!user?.email,
		queryFn: () =>
			axiosSecure.get(`/posts?email=${user?.email}`).then((res) => {
				return res.data;
			}),
	});

	console.log(data);

	if (isLoading) {
		return (
			<div className="h-96 flex justify-center items-center">
				<img src={loading} alt="" srcset="" />
			</div>
		);
	}

	const handleDelete = (id) => {
		console.log(id);

		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure.delete(`/post/${id}`).then((res) => {
					Swal.fire({
						title: "Deleted!",
						text: "Your post has been deleted.",
						icon: "success",
					});
					console.log(res.data);
					refetch();
				});
			}
		});
	};
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table  table-md ">
					{/* head */}
					<thead>
						<tr>
							<th>Post Title</th>
							<th>Total Votes</th>
							<th>Comment</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}

						{data?.map((item) => (
							<tr key={item._id} className="hover">
								<th>{item?.postInfo.postTitle}</th>
								<td>
									{item?.postInfo.upVote +
										item?.postInfo.downVote}
								</td>
								<td>
									<Link
										to={`/Dashboard/Comments/${item?.postInfo.postTitle}`}
										className="btn btn-primary"
									>
										view Comments
									</Link>
								</td>
								<td>
									<button
										onClick={() =>
											handleDelete(item?.postInfo._id)
										}
										className="btn btn-error "
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyPost;
