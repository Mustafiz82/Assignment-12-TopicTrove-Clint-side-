import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import loadingImage from "../assets/loading-loader.gif"


const PrivateRoute = ({children}) => {

    const {pathname} = useLocation()
    const {user , loading } = useContext(AuthContext)

    console.log(loading);

    if(loading){
        
        return <div className="flex justify-center items-center h-screen w-full">
            <img src={loadingImage} className="-mt-10" alt="" srcset="" />
        </div>
    }

    if(user) { 
        return children
    }

    return <Navigate state={{pathname}} to="/login"></Navigate>
};

export default PrivateRoute;
