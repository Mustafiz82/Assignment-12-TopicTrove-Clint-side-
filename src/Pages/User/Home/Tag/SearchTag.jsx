import React from 'react';
import clipboardCopy from "clipboard-copy";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SearchTag = () => {

    const handleCopyClick = (textToCopy) => {
        clipboardCopy(textToCopy);

        toast(textToCopy + "   Copied to clipboard")
    };       
 

    return (
        <div className='text-center bg-slate-200 py-10'>
            <h1 className='text-3xl'>#TAGS</h1>
            <p className='mb-2'>Better Seacrh with these tags || Click to copy</p>

            <div>
                <p  onClick={() => handleCopyClick("business")} className='btn cursor-copy btn-outline'>business</p>
                <p onClick={() => handleCopyClick("technology")} className='btn cursor-copy btn-outline'>technology</p>
                <p onClick={() => handleCopyClick("programming")} className='btn cursor-copy btn-outline'>programming</p>
                <p onClick={() => handleCopyClick("food")} className='btn cursor-copy btn-outline'>food</p>
                <ToastContainer />
            </div>


        </div>
    );
};

export default SearchTag;