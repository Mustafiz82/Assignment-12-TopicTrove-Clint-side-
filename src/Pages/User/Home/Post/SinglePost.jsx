import React, { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Link, NavLink } from "react-router-dom";
import loading from "../../../../assets/loading-loader.gif"



const SinglePost = ({ item }) => {

    const axiosPublic = useAxiosPublic()
	const [data , setData] = useState([])
	const [loading , setloading] = useState(true)

    
	useEffect(() => {
        axiosPublic.get(`/comment/${item?.postInfo?.postTitle}`)
                .then(res => {
                    setData(res.data)
					setloading(false)
                })
    } ,[item ])


	  if(loading){
       return <div className="h-96 flex justify-center items-center">
            <img src={loading} alt="" srcset="" />
        </div>
    }
	  
    //   console.log("item is" ,data);
	return (
		<Link to={`/postDetails/${item?.postInfo?._id}`}>
            
			<div className="card  bg-base-100 shadow-xl">
				<div className="card-body flex gap-10">
					<div className="flex gap-10">
						<div className="w-20 ">
							<img
								src={item?.imageUrl}
								className="w-full rounded-full"
								alt=""
							/>
						</div>
						<div className="space-y-2">
							<h2 className="card-title">
								{item?.postInfo?.postTitle}
							</h2>
							<span className="">#{item?.postInfo?.tag}</span>
							<p>
								{new Date(
									item?.postInfo?.postTimeUTC
								).toLocaleString()}
							</p>
							<div className="flex gap-5">
								<div className="flex gap-2 items-center">
                                <BiSolidUpvote  size={20}/>

									<span> Total vote Count</span>
									{item?.popularity}
								</div>
								<div className="flex  items-center gap-2"><FaRegCommentAlt size={18} />
									<span>Total comment Count {data?.length} </span>
								</div> 
							</div>
						</div>
					</div>
				</div>
			</div>
            

		</Link>
	);
};

export default SinglePost;
