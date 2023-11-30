import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2'


const AddPost = () => {
	const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const [isDisable , setisDisable] = useState(true)

    const handleInput = () => {
        setisDisable(false)
    }


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
    }

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
                         
                <button disabled={isDisable} type="submit" className="block btn btn-primary">Create Post</button>
			</form>
		</div>
	);
};

export default AddPost;
