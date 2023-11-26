import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5144',
    // timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' }
  });


const useAxiosSecure = () => {
    return axiosSecure
};


export default useAxiosSecure;