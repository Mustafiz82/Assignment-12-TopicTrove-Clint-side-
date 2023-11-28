import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import loading from "../../../assets/loading-loader.gif"
import Card from './Card';
import Swal from 'sweetalert2';

const ReportedActivities = () => {

    const axiosSecure = useAxiosSecure()

    const { isLoading, data, refetch } = useQuery({
		queryKey: ["adminState"],
		queryFn: () =>
			axiosSecure.get("/commentsReported").then((res) => {
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

	const handleDelete =(id) => {
		
		console.log(id)

		

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
				axiosSecure.delete(`/comment/${id}`)
				.then(res => {
					console.log(res.data);
					Swal.fire({
						title: "Deleted!",
						text: "Your post has been deleted.",
						icon: "success",
					});
					refetch()
				})
				
		
			}
		});
	}
    return (
       <div className='m-5'>
         <div className='text-center '>
            <h1 className='text-3xl text-center mb-2'>Reported Comment</h1>
            <p>view comment has been reported and take requered action</p>
           
        </div>

		<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>commented by</th>
							<th>comment</th>
							<th>Report</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={item._id}>
								<th>
									<label>{index + 1}</label>
								</th>
								<td>{item.email}</td>
								<td>{item?.postInfo.comment}</td>
								<td>	
                                    <button className=""> {item?.postInfo.reported} </button>
                                </td>
								<td>
                                    <button onClick={() => handleDelete(item?.postInfo._id)} className='btn btn-primary'>Dlete</button>
                                </td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
       </div>
    );
};

export default ReportedActivities;