import React, { useContext, useState } from "react";
import SinglePost from "./SinglePost";
import noDataImage from "../../../../assets/no-data-found-8867280-7265556.webp";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";


const Posts = ({ data ,numberOfPage , setCurrentPage ,currentPage }) => {
	const { user } = useContext(AuthContext);
	const axiospublic = useAxiosPublic();
    // const [currentPage , setCurrentPage] = useState(0)


	const pages = [];
	for (let i = 0; i < numberOfPage; i++) {
		pages.push(i);
	}

    const btnPrevious = () => {
		
		if(currentPage > 0){
			setCurrentPage(currentPage - 1)
			
		}
		console.log(currentPage);
		
	}
	const btnNext = () => {
		if(currentPage < (numberOfPage - 1)){
			setCurrentPage(currentPage + 1)
			
    }
		console.log(currentPage);
	}	

	// // you can also write [...Array(8.keys())] instead of for loop

	console.log(pages);

	return (
		<div className="px-5">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				{data?.map((item, index) => (
					<SinglePost key={index} item={item}></SinglePost>
				))}
			</div>

			{data?.length == 0 ? (
				<div className="text-center w-full mb-20     flex justify-center items-center flex-col">
					<img src={noDataImage} alt="" />

					<div className="-mt-8">
						<p className="text-center">no data found</p>
						<p className="text-xl">
							View search Tags for better Search
						</p>
					</div>
				</div>
			) : null}

			<div className="flex  justify-center my-10 gap-3">
				<button onClick={btnPrevious} className="btn ">
					{" "}
					<MdOutlineNavigateBefore  size={30}/>

				</button>

				{pages.map((page) => (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`btn join-item ${
							currentPage === page && "bg-orange-400"
						}`}
					>
						{page}
					</button>
				))}
				<button onClick={btnNext} className="btn ">
					{" "}
					<MdOutlineNavigateNext size={30} />

				</button>
			</div>
		</div>
	);
};

export default Posts;
