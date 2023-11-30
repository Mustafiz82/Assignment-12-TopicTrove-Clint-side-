import { useEffect, useState } from "react";
import Announcement from "./Announement/Announcement";
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";
import Posts from "./Post/Posts";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import loading from "../../../assets/loading-loader.gif";
import SearchTag from "./Tag/SearchTag";

const Home = () => {
	const [searchData, setSearchData] = useState("");
	const [currentPage , setCurrentPage] = useState(0)
	const [count , setCount] = useState(0)
	const axiosPublic = useAxiosPublic();


	useEffect(() => {
		axiosPublic.get("/dataCount")
		.then(res => setCount(res.data.count))
	} ,[])

	// console.log(count , "count");
	
	
	const itemPerPage = 5;
	const numberOfPage = Math.ceil(count / itemPerPage);
	console.log(numberOfPage , count);

	const { isLoading,  data, refetch } = useQuery({
		queryKey: ["postData" , currentPage ,searchData ],
		queryFn: () =>
			axiosPublic.get(`/posts?tag=${searchData}&size=${itemPerPage}&page=${currentPage}`).then((res) => {
				return res.data;
			}),
	});


	if (isLoading) {
		return (
			<div className="h-96 flex justify-center items-center">
				<img src={loading} alt="" srcset="" />
			</div>
		);
	}


	return (
		<div>
			<Banner setSearchData={setSearchData} refetch={refetch}></Banner>
			<Announcement></Announcement>
			<SearchTag></SearchTag>
			<Posts data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPage={numberOfPage}></Posts>
			<Footer></Footer>
		</div>
	);
};

export default Home;
