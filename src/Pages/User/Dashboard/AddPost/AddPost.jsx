import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { useQuery } from "@tanstack/react-query";
import loading from "../../../../assets/loading-loader.gif"
import { Link } from "react-router-dom";


const AddPost = () => {
	const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const [isDisable , setisDisable] = useState(true)

    const handleInput = () => {
        setisDisable(false)
    }


	const { data: postCount = [] ,isLoading, refetch} = useQuery({
		queryKey: ["postCount"  ],
		queryFn: async () => {
			const res = await axiosSecure.get(`/postcount/${user?.email}` );
			return res.data;
		},
	});

    console.log(postCount);

	


	const { isLoading :loading, data,  } = useQuery({
		queryKey: ["SingleUser"],
		queryFn: () =>
			axiosSecure.get(`/user/${user?.email}`).then((res) => {
				return res.data;
			}),
	});

	if(isLoading || loading){
		return <div className='h-screen w-full flex justify-center items-center'>
			<img src={loading} alt="" srcset="" />
		</div>
	}

	console.log(data?.Membership , postCount?.result);




    const handleSubmit = (e) => {

        e.preventDefault()

        const authorEmail = user?.email
        const postTitle = e.target.title.value
        const postDescription = e.target.description.value
        const tag = e.target.tag.value
        const postTimeUTC = new Date();
        const upVote = 0
        const downVote = 0

        const postDetails = {authorEmail , postTitle , postDescription , tag , postTimeUTC , upVote , downVote}

        // console.log(postDetails)
        
        axiosSecure.post("/posts" , postDetails)
        .then(res => {
            console.log(res.data)
            if(res.data.acknowledged){
                Swal.fire({
                    title: "Post Created Successfully",
                    text: "Check My post page to see your Post",
                    icon: "success"
                  });
                  e.target.reset()
            }
            
        })
		refetch()
    }

	const membership = <div>
		<Link to="/membership"><button className="btn mb-2 text-white btn-error"> Become A member</button></Link>
		<p className="text-red-500 ">An user with free plan can up to 5 post . Become a member to make more post</p>
	</div>

	return (
		<div className="p-5">

			<div className="py-5">
				<div className="flex gap-4 items-center">
					<img
						src={user?.photoURL}
						className="w-10 h-10 rounded-full"
						alt=""
					/>
					<div>
						<p className=" font-bold">{user?.displayName}</p>
						{/* <p className="flex items-center">
							{date?.toLocaleString()}
						</p> */}
						<p>{user?.email}</p>
					</div>
				</div>
			</div>

			<form  onSubmit={handleSubmit} className="space-y-8 mt-4">
				<input
					type="text"
					name="title"
					placeholder=" Post Title"
					className="input input-bordered w-full "
                    required
				/>

				<textarea
					className="textarea textarea-bordered w-full h-40"
					placeholder="Post DescripTion"
					name="description"
                    required
				></textarea>
                

				<select onChange={handleInput} name="tag" className="select select-bordered w-full max-w-xs">
					<option disabled selected>
						Select Tag relevant to your post
					</option>
					<option value="business">business</option>
					<option value="technology">technology</option>
					<option value="programming">programming</option>
					<option value="food">food</option>
				</select>
              {/* {
				postCount?.result  > 
			  } */}

			  {
				(data?.Membership ==="Free" && postCount?.result >= 5 )? membership
			 :            
                <button disabled={isDisable} type="submit" className="block btn btn-primary">Create Post</button>
			  } 
			</form>
		</div>
	);
};

export default AddPost;
