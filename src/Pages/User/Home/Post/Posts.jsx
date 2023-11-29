import React from 'react';
import SinglePost from './SinglePost';
import noDataImage from "../../../../assets/no-data-found-8867280-7265556.webp"


const Posts = ({data}) => {

    

    
    
    return (
       <div>
         <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

{
    data?.map((item , index) =>   <SinglePost key={index} item={item}></SinglePost>)
}


</div>

{
                data?.length == 0 ? (
                    <div className='text-center w-full mb-20     flex justify-center items-center flex-col'>
                        <img src={noDataImage} alt="" />

                        <div className='-mt-8'>
                            
                        <p className='text-center'>no data found</p>
                        <p className='text-xl'>View search Tags for better Search</p>
                        </div>
                    </div>

                ) : null
            }
       </div>
    );
}; 

export default Posts;