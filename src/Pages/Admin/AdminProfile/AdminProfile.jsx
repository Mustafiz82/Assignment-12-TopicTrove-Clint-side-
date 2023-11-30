import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import loading from "../../../assets/loading-loader.gif";
import React, { PureComponent } from "react";
import {
	PieChart,
	Pie,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";

const AdminProfile = () => {
	const axiosSecure = useAxiosSecure();

	const { user } = useContext(AuthContext);
	const { isLoading, data, refetch } = useQuery({
		queryKey: ["adminState"],
		queryFn: () =>
			axiosSecure.get("/adminState").then((res) => {
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

	const piData = [
		{ name: "Total User", value: data?.userCount },
		{ name: "Total Posts", value: data?.postCount },
		{ name: "Total Comment", value: data?.commemtCount },
	];

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

	const RADIAN = Math.PI / 180;

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};


    const handleSubmit = (e) => {
        e.preventDefault()
        const tag = (e.target.tag.value).toLowerCase()
        
        const tagObj = {tag}
        axiosSecure.post("/tags" , tagObj)
        .then(res => {
            console.log(res.data);
            if(res.data.acknowledged == true) {
                Swal.fire({
                    title: "Tag added successfully",
                    text: "",
                    icon: "success"
                  });
            }
            if(res.data.messeage){

                
                Swal.fire({
                    title: "Tag adding failed",
                    text: " Tag is already in the collection",
                    icon: "error"
                  });
            }
        })

    }

	return (
		<div className="flex flex-col md:flex-row ">
			<div className="mx-10     ">
				<div className="flex justify-center  rounded-full">
					<img
						src={user?.photoURL}
						className={` w-64 mx-5 p-2 rounded-full   border-4`}
						alt=""
					/>
				</div>

				<div className="space-y-2 mt-4 ">
					<div>
						<h1 className="font-bold">Name</h1>
						<p>{user?.displayName}</p>
					</div>

					<div>
						<h1 className="font-bold">Email</h1>
						<p>{user?.email}</p>
					</div>
					<h1 className="font-bold"> total {data?.postCount} post</h1>
					<h1 className="font-bold">
						{" "}
						total {data?.commemtCount} Comment
					</h1>
					<h1 className="font-bold">  total {data?.userCount} User</h1>
				</div>

				<form onSubmit={handleSubmit} className="join my-4">
					<input
						className="input input-bordered join-item"
						placeholder="Insert New tag"
                        name="tag"
					/>
					<button  type="submit" className="btn join-item rounded-r-full">
						Insert tag
					</button>
				</form>
			</div>
			<div className="h-screen w-full min-h-[600px] overflow-scroll  p-4 bg-slate-200">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={800} height={100}>
						<Pie
							data={piData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={150}
							fill="#8884d8"
							dataKey="value"
						>
							{piData?.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Legend className="-mt-10"></Legend>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AdminProfile;
