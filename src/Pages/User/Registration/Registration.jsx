import { useContext, useState } from "react";
import loginillustrate from "../../../assets/login-illustration.png";
import loginBG from "../../../assets/loginbgImg.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Registration = () => {
	const [error, setError] = useState("");
	const { SignUp, profile } = useContext(AuthContext);
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();
	const { user, googleSignIn } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);

		const apiKey = "c696443c798ad9c58798852ae8d4166a";
		const imageUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

		const imageFile = { image: data.profileImage[0] };

		axios
			.post(imageUrl, imageFile, {
				headers: {
					"content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res);

				const userDetails = {
					name: data.name,
					email: data.email,
					password: data.password,
					imageUrl: res.data.data.display_url,
					Membership: "Free",
					role: "user",
				};

				const name = data.name;
				const email = data.email;
				const password = data.password;
				const imageUrl = res.data.data.display_url;

				const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
				const isValidPassword = passwordRegex.test(password);
				console.log(isValidPassword, password);

				if (isValidPassword) {
					setError("");

					SignUp(email, password)
						.then((res) => {
							console.log(res.user);
							profile(name, imageUrl)
								.then((res) => {
									console.log(res);

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
								.catch((err) => console.log(err.message));
						})
						.catch((err) => console.log(err));
				} else {
					setError(
						"Passwords must contain a digit, a lowercase letter, an uppercase letter, and be at least 8 characters long."
					);
				}
			});
	};

	{
		errors.exampleRequired && <span>This field is required</span>;
	}

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
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="card-body"
							>
								<div className="text-left ">
									<h1 className="text-3xl mb-2 font-bold ">
										SignUp
									</h1>
									<p className="font-medium ">
										Already Have an Account |
										<Link
											to="/login"
											className="text-purple-600 "
										>
											Login
										</Link>
									</p>
								</div>
								<div className="form-control mt-2">
									<label className="label">
										<span className="label-text">Name</span>
									</label>
									<input
										name="name"
										type="text"
										placeholder="Name"
										className="input input-bordered"
										{...register("name", {
											required: true,
										})}
									/>
								</div>
								<div className="form-control">
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
									{errors.exampleRequired && (
										<span>This field is required</span>
									)}
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Profile picture
										</span>
									</label>
									<input
										type="file"
										name="profile"
										className="file-input file-input-bordered file-input-primary w-full max-w-xs"
										{...register("profileImage")}
										required
									/>
								</div>

								<p className="text-left  text-red-500 ">
									{error}
								</p>

								<div className="form-control mt-6">
									<button
										type="submit"
										className="btn btn-primary"
									>
										SignUp
									</button>
								</div>
							</form>
							<button
								onClick={handleGoogleLogin}
								className="btn -mt-5  mx-8 my-5 btn-outline text-primary"
							>
								continue with Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
