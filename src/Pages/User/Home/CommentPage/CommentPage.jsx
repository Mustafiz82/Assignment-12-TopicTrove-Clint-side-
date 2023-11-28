import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Comment from "../../PostDetails/Comment";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


const CommentPage = () => {
	const { title } = useParams();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosPublic();
    const [disabled , setDisabled] = useState(true)
    const [isInputDisable , setisInputDisable] = useState(false)
    const [inputText , setInputText] = useState("")
	console.log(title);

	const { isLoading, error, data ,refetch} = useQuery({
		queryKey: ["comments"],
		queryFn: () =>
			axiosPublic.get(`/comment/${title}`).then((res) => {
				return res.data;
			}),
	});

    

    const handlefeedback = (e) => {


        const value = e.target.value
        setInputText(value);
        setDisabled(false)
 


    }


    const handleDelete = (id) => {

        console.log(id);
        // console.log("data is ", data);
        // console.log(data?._id , "search data");
        
        axiosSecure.put(`/comment/${id}` , {report : inputText})
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "reported",
                    text: "Admin will review the comment",
                    icon: "success"
                  });
                  setDisabled(true)
                  setisInputDisable(true)
                  
            }
        })

    }

	console.log(data);
	return (
		<div className="p-5">
			<div className="overflow-x-auto">
				<table className="table  table-md ">
					{/* head */}
					<thead>
						<tr>
							<th>Comenter Email</th>
							<th>comment</th>
							<th>Feedback</th>
							<th>Report</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}

						{data?.map((item) => (
							<tr key={item._id} className="hover">
								<th>{item?.email}</th>
								<td>{item?.postInfo.comment}</td>
								<td>
									<select disabled={isInputDisable} onChange={handlefeedback}  className="select select-bordered w-full max-w-xs">
										<option selected select="true" disabled >
											Select Reason
										</option>
										<option value="Inappropriate">Inappropriate</option>
										<option value="Spam">Spam</option>
										<option value="Offensive">Offensive</option>
									</select>
								</td>   
								<td>
									<button onClick={() => handleDelete(item?.postInfo
._id)}  disabled={disabled}    className="btn btn-error ">
										Report
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex h-screen text-xl justify-center items-center">
				{data?.length === 0 ? <h1>No comments yet</h1> : null}
			</div>
		</div>
	);
};

export default CommentPage;
