import { useState } from "react";
import loginillustrate from "../../../assets/login-illustration.png";
import loginBG from "../../../assets/loginbgImg.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
	const [error, setError] = useState("");

	const {register,handleSubmit,	formState: { errors }, } = useForm()
	
	const onSubmit =  (data) => console.log(data)
	{errors.exampleRequired && <span>This field is required</span>}


	return (
		<div className="">
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(${loginBG})`,
				}}
			>
				<div className=" text-center mx-10 my-8 ">
					<div className="hero min-h-screen bg-base-200">
						<div className="hero-content w-screen  gap-10 justify-center flex-col lg:flex-row"> 
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
								<button className="btn -mt-5  mx-8 my-5 btn-outline text-primary">
									
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
