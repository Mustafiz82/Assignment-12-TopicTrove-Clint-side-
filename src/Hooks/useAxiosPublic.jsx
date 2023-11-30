import axios from "axios";


const axiosPublic = axios.create({
    // baseURL: 'http://localhost:5144',
    baseURL: 'https://topictrove-server.vercel.app/',
    // timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' }
  });


const useAxiosPublic = () => {
    return axiosPublic
};


export default useAxiosPublic;