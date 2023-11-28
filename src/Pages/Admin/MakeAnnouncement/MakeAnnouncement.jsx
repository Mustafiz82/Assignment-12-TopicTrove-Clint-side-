import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {

    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()



    const handleSubmit = (e) => {

        e.preventDefault()

        const authorName = user?.displayName
        const authorEmail = user?.email
        const title = e.target.title.value
        const description = e.target.description.value
        const photoUrl = user?.photoURL
    

        const postDetails = {authorEmail , title , description , authorName , photoUrl }

        console.log(postDetails)
        
        axiosSecure.post("/announcements" , postDetails)
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
        <div className='px-10'>
            
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

            <div>
                
			<form  onSubmit={handleSubmit} className="space-y-8 mt-4">
				<input
					type="text"
					name="title"
					placeholder="  Title of Announcement" 
					className="input input-bordered w-full "
                    required
				/>

				<textarea
					className="textarea textarea-bordered w-full h-40"
					placeholder="Announcement Description"
					name="description"
                    required
				></textarea>
                

                         
                <button  type="submit" className="block btn btn-primary">Create Announcement</button>
			</form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;