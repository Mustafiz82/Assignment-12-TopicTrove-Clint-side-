import React from 'react';
import clipboardCopy from "clipboard-copy";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import loading from "../../../../assets/loading-loader.gif"



const SearchTag = () => {
    const axiosPublic = useAxiosPublic()

    const handleCopyClick = (textToCopy) => {
        clipboardCopy(textToCopy);

        toast(textToCopy + "   Copied to clipboard")
    };      


    const { isLoading, data, refetch } = useQuery({
		queryKey: ["tag"],
		queryFn: () =>
			axiosPublic.get("/tags").then((res) => {
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
        <div className='text-center bg-slate-200 py-10'>
            <h1 className='text-3xl'>#TAGS</h1>
            <p className='mb-2'>Better Seacrh with these tags || Click to copy</p>

            <div>


                {
                    data?.map(item => <p key={item._id}  onClick={() => handleCopyClick(item?.tag)} className='btn cursor-copy btn-outline'>{item.tag}</p>)
                }
                
                <ToastContainer />
            </div>


        </div>
    );
};

export default SearchTag;