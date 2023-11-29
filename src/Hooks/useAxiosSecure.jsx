import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5144',
    // timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' }
  });

  

	const useAxiosSecure = () => {

		const navigate = useNavigate()
		const {logOut} = useContext(AuthContext)


		//  set the token in header 



		axiosSecure.interceptors.request.use(
			function (config) {
				console.log("hello this is interceptor");

				const token = localStorage.getItem("access-token");
				config.headers.authorization = `bearer ${token}`;

				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);

		axiosSecure.interceptors.response.use(
			function (response) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			},
			function (error) {

				
				const status = error.response.status
				console.log(status);

				if(status === 401 || status === 403){
					logOut()
					navigate("/login")
				}


				// console.log(status);
				return Promise.reject(error);
			}
		);

		return axiosSecure;
	};


export default useAxiosSecure;