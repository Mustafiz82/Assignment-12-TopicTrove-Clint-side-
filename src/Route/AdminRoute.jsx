import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import loadingImage from "../assets/loading-loader.gif"


const AdminRoute = ({children}) => {

    const {pathname} = useLocation()
    const {user , loading } = useContext(AuthContext)
    const [isAdmin , isLoading]  = useAdmin()

    console.log(pathname);

    if(loading || isLoading ){
        return  <div className="flex justify-center items-center h-screen w-full">
        <img src={loadingImage} className="-mt-10" alt="" srcset="" />
    </div>
    }

    if(user && isAdmin) { 
        return children
    }

    return <Navigate state={{pathname}} to="/login"></Navigate>
};

export default AdminRoute;
