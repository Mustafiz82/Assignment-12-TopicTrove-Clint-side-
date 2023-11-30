import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Context/AuthProvider';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log(user?.email);


    const { data: isAdmin  , isLoading} = useQuery({
        queryKey: [ "isAdmin" , user],

        enabled: !!user ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/${user.email}`);
            
            // console.log(res.data);
            return res.data?.role
            // return res.data.admin
        },
    });

    console.log("admin1"  , isAdmin);


    return [isAdmin , isLoading]

};

export default useAdmin;