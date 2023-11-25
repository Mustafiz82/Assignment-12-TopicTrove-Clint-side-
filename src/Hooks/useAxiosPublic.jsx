import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-restauren-server.vercel.app',
    // timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' }
  });


const useAxiosPublic = () => {
    return axiosPublic
};


export default useAxiosPublic;