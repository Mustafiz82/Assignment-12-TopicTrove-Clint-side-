import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BiSolidUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { BiSolidDownvote } from "react-icons/bi";
import loading from "../../../assets/loading-loader.gif";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Comment from "./Comment";
import { AuthContext } from "../../../Context/AuthProvider";

const PostDetails = () => {
	const params = useParams();
	console.log(params.id);

	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
    const [commentData , setcommentData] = useState([])
    const [iscommented , setiscomment] = useState({})
    const [loading , setLoading] = useState(true)

    const {user} = useContext(AuthContext)

	const { isPending, isLoading, error, data, refetch } = useQuery({
		queryKey: ["singlePostDetails"],
		queryFn: () =>
			axiosPublic.get(`/post/${params.id}`).then((res) => {

                
				return res.data;
			}),
	});
    console.log(data?.postInfo.postTitle);

	useEffect(() => {
        axiosPublic.get(`/comment/${data?.postInfo.postTitle}`)
                .then(res => {
                    setcommentData(res.data)
                    setLoading(false)
                })
    } ,[data,iscommented ])
  
      
      console.log(commentData);  




	// console.log(data);

	if (isLoading ) {
		return (
			<div className="flex h-96 w-screen items-center justify-center">
				<img src={loading} alt="" srcset="" />
			</div>
		);
	}
    

	const handleUpvote = () => {
		const upVote = {
			upvote: data?.postInfo.upVote ? data?.postInfo.upVote + 1 : 1,
			downVote: data?.postInfo.downVote ? data?.postInfo.downVote : 1,
		};
		console.log(upVote);

		axiosSecure.patch(`/post/update/${params.id}`, upVote).then((res) => {
			console.log(res.data);
			refetch();
		});
	};

	const handleDownVote = () => {
		const downVote = {
			downVote: data?.postInfo.downVote ? data?.postInfo.downVote + 1 : 1,
			upvote: data?.postInfo.upVote ? data?.postInfo.upVote : 1,
		};
		console.log(downVote);

		axiosSecure.patch(`/post/update/${params.id}`, downVote).then((res) => {
			console.log(res.data);
			refetch();
		});
	};

    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            comment : e.target.comment.value,
            email : user.email,
            postTitle:data.postInfo.postTitle

        }

        console.log(comment);

        axiosSecure.post("/comments" , comment)
        .then(res => {
            setiscomment(res.data);
            refetch()
        })
        .catch(err => console.log(err))

    }

	return (
		<div className="py-5">
			<div className="flex gap-4 items-center">
				<img
					src={data?.imageUrl}
					className="w-10 h-10 rounded-full"
					alt=""
				/>
				<div>
					<p className=" font-bold">{data?.name}</p>
					<p className="flex items-center">
						{new Date(data?.postInfo.postTimeUTC).toLocaleString()}
						<span className="ml-4 text-blue-500">
							#{data?.postInfo.tag}
						</span>
					</p>
				</div>
			</div>
			<div className="mt-5 space-y-3">
				<p className="font-bold text-xl">{data?.postInfo.postTitle}</p>
				<p>{data?.postInfo.postDescription}</p>
			</div>
			<div className="flex mt-5 ">
				<button
					onClick={handleUpvote}
					className="btn rounded-none btn-outline"
				>
					<BiSolidUpvote size={20} />
					Upvote {data?.postInfo.upVote}
				</button>
				<button
					onClick={handleDownVote}
					className="btn rounded-none btn-outline"
				>
					<BiSolidDownvote size={20} />
					Downvote {data?.postInfo.downVote}
				</button>
				<label for="comment" className="btn rounded-none btn-outline">
					<FaCommentAlt size={20} />
					Comment {commentData.length}
				</label>
				<button className="btn rounded-none btn-outline">
					<IoIosShareAlt size={20} />
					Share
				</button>
			</div>

			{user ? <div className="flex gap-4 mt-5">
                <img src={user?.photoURL}  className="w-10 h-10 rounded-full" alt="" />
				<form onSubmit={handleSubmit} className="w-full relative">

                <textarea
					className="textarea textarea-bordered   w-full"
					placeholder="your comment"
                    id="comment" required
                    name="comment"
				></textarea>
                <button type="submit"    className={`  btn absolute right-8 top-4`}>send</button>
                </form>
			</div> : <p>please Login to  comment</p>}

            <div className="my-5"> 

                <h1 className="text-3xl text-center my-5">comments</h1>
                {
                    commentData?.map(item => <Comment key={item._id} item={item}></Comment>
                    )
                }

                {
                    loading && <p>loading...</p>
                }
            </div>
		</div>
	);
};

export default PostDetails;
