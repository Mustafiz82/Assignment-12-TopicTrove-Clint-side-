import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import loading from "../../../assets/loading-loader.gif"

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
	
	const [countData, setCountData] = useState({});
	const [currentPage , setCurrentPage] = useState(0)


	
	useEffect(() => {
		axiosSecure.get("/adminState").then((res) => {
			setCountData(res.data?.userCount);
		});
	}, []);

	const { data: users = [] ,isLoading, refetch} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users" );
			return res.data;
		},
	});

    // console.log(users);

	if(isLoading){
		return <div className='h-screen w-full flex justify-center items-center'>
			<img src={loading} alt="" srcset="" />
		</div>
	}


    const handleAdminRole = (id) =>{
        console.log("admin");

        axiosSecure.patch(`/users/${id}` )
        .then(res => {
            console.log(res.data);
            refetch()
        })
        .catch(err => console.log(err))
    }


	const itemPerPage = 6;
	const numberOfPage = Math.ceil(countData / itemPerPage);

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

	console.log(countData , pages);


    return (
        <div>
            <div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Make Admin</th>
							<th>Membership</th>
						</tr>
					</thead>
					<tbody>
						{users.map((item, index) => (
							<tr key={item._id}>
								<th>
									<label>{index + 1}</label>
								</th>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>
                                    <button className={`btn ${item.role === "user" ? "btn-primary" : "btn-ghost"}`} onClick={ () => handleAdminRole(item._id)}> {item.role === "user" ? "Make Admin" : "admin"} </button>
                                </td>
								<td>
                                    <button className=""> {item?.Membership} </button>
                                </td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className=" flex justify-center mt-5 gap-2">
				<button className="btn " onClick={btnPrevious}>
					{" "}
					previous
				</button>

				{pages.map((page) => (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`btn join-item ${
							currentPage === page && "btn-primary "
						}`}
					>
						{page}
					</button>
				))}

				<button className="btn " onClick={btnNext}>
					{" "}
					Next
				</button>
			</div>
        </div>
    );
};

export default ManageUsers;