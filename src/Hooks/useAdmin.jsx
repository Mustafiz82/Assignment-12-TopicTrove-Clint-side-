import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Context/AuthProvider';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    const { data: isAdmin  , isPending} = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !!user ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            
            console.log(res.data);
            return res.data?.admin 
            // return res.data.admin
        },
    });

    // console.log("admin"  , isAdmin);


    return [isAdmin , isPending]

};

export default useAdmin;