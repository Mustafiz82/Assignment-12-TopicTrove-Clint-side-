import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";



const Announcement = () => {
	const axiosPublic = useAxiosPublic();
    const [isShow , setIsShow] = useState(false)
    const [announcement , setAnnouncement] = useState([])

    useEffect(() => {
        axiosPublic.get("/announcements")
        .then(res => setAnnouncement(res.data))
        .catch(err => console.log(err))
    } ,[])

    console.log(announcement?.length);

	return (
		<div className={!announcement?.length && "hidden"}>
            <div className="my-10 ">
			<h1 className="text-3xl text-center ">Announcements</h1>

            <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-5 bg-base-200"
      >
        
        {
            announcement ? 
            announcement.map((item,index) =><SwiperSlide key={index}>

                <div className="flex max-w-2xl mx-auto my-14 gap-5">
                    <div className="flex  flex-col justify-center items-center">
                        <img className="w-10 h-10 rounded-full " src={item.photoUrl} alt="" />
                        <p>{item.authorName}</p>
                    </div>
                    <div className="space-y-5">
                    <h1 className="text-xl font-bold">{item.title}</h1>
                    <p>{item.description}</p>
                    </div>
                </div>
            </SwiperSlide>  ) : null
        }
      </Swiper>
		</div>
        </div>
	);
};

export default Announcement;
