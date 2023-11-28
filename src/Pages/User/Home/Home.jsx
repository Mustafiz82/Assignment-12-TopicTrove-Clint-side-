import { useState } from "react";
import Announcement from "./Announement/Announcement";
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";
import Posts from "./Post/Posts";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import loading from "../../../assets/loading-loader.gif"
import SearchTag from "./Tag/SearchTag";

const Home = () => {

    const [searchData , setSearchData] = useState("")
    const [post , setPost ] = useState([])
    const axiosPublic = useAxiosPublic()


    const { isLoading, error, data , refetch} = useQuery({
        queryKey: ['postData'],
        queryFn: () =>
          axiosPublic.get(`/posts?tag=${searchData}`)
          .then(res => {
            return res.data
          }) 
      })
      if(isLoading){
        return <div className="h-96 flex justify-center items-center">
             <img src={loading} alt="" srcset="" />
         </div>
     }

     


      
    
    return (
        <div>
            <Banner setSearchData={setSearchData} refetch={refetch} ></Banner>
            <Announcement></Announcement>
            <SearchTag></SearchTag>
            <Posts data={data}></Posts>
            <Footer></Footer>

        </div>
    );
};

export default Home;