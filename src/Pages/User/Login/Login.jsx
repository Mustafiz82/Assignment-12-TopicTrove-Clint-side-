import { useContext, useState } from "react";
import loginillustrate from "../../../assets/login-illustration.png";
import loginBG from "../../../assets/loginbgImg.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Login = () => {
	const [error, setError] = useState("");
	const {SignIN , googleSignIn} = useContext(AuthContext)
	const navigate = useNavigate()
	const axiosPublic = useAxiosPublic()

	const {register,handleSubmit,	formState: { errors }, } = useForm()

	
	
	const onSubmit =  (data) => {
		console.log(data)

		const email = data.email
		const password = data.password

		SignIN(email , password)
		.then(res => {
			console.log(res.user)
			
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "logged in  Succefully",
				showConfirmButton: false,
				timer: 1500,
			});
			navigate("/")
		})
		.catch( err => setError(err.message))
	}
	{errors.exampleRequired && <span>This field is required</span>}


	
	const handleGoogleLogin = () => [
		googleSignIn()
			.then((data) => {
				console.log(data.user.displayName);
				const userDetails = {
					name: data.user.displayName,
					email: data.user.email,
					imageUrl: data.user.photoURL,
					Membership: "Free",
					role: "user",
				};

				axiosPublic
					.post("/users", userDetails)
					.then((res) => {
						console.log(res.data);

						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "User created Succefully",
							showConfirmButton: false,
							timer: 1500,
						});
						navigate("/");
					})
					.catch((err) => console.log(err));		
			})
			.catch((err) => console.log(err)),
	];


	return (
		<div className="">
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(${loginBG})`,
				}}
			>
				<div className=" text-center md:mx-10 md:my-8 ">
					<div className="hero min-h-screen bg-base-200">
						<div className="hero-content w-screen md:w-auto lg:w-screen  gap-10 justify-center flex-col md:flex-row"> 
							<div className="  ">
								<img src={loginillustrate} alt="" />
							</div>
							<div className="card  w-full max-w-sm shadow-2xl bg-base-100">
								
								<form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="text-left ">
									<h1 className="text-3xl mb-2 font-bold ">
										Login
									</h1>
									<p className="font-medium ">
										Don't Have an Account |
										<Link to="/register" className="text-purple-600 ">
											Signup
										</Link>
									</p>
								</div>
									<div className="form-control mt-2">
										<label className="label">
											<span className="label-text">
												Email
											</span>
										</label>
										<input
                                            name="email"
											type="email"
											placeholder="email"
											className="input input-bordered"
											{...register("email", {
												required: true,
											})}
										/>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="label-text">
												Password
											</span>
										</label>
										<input
                                            name="password"
											type="password"
											placeholder="password"
											className="input input-bordered"
											{...register("password", {
												required: true,
											})}
										/>
									</div>
									<p className="text-left  text-red-500 ">
										{error}
									</p>
									<div className="form-control mt-6">
										<button type="submit" className="btn btn-primary">
											Login
										</button>
									</div>
								</form>
								<button onClick={handleGoogleLogin} className="btn -mt-5  mx-8 my-5 btn-outline text-primary">
									
									continue with Google
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
