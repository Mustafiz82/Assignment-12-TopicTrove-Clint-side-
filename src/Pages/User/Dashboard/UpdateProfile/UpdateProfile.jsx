import { useContext, useState } from "react";
import loginillustrate from "../../../../assets/login-illustration.png";
import loginBG from "../../../../assets/loginbgImg.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { updatePassword } from "firebase/auth";
const UpdateProfile = () => {
	const [error, setError] = useState("");
	const { SignUp, profile } = useContext(AuthContext);
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const { user } = useContext(AuthContext);
	// console.log();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data?.profileImage.length, "data");

		const apiKey = "c696443c798ad9c58798852ae8d4166a";
		const imageUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

		const imageFile = { image: data.profileImage[0] };
		console.log(imageFile, "imageFile");

		if (data) {
			if (data?.profileImage.length > 0) {
				axios
					.post(imageUrl, imageFile, {
						headers: {
							"content-type": "multipart/form-data",
						},
					})
					.then((res) => {
						const userImage = res.data.data.display_url;

						profile(name, userImage)
							.then((result) => {
								

								const userDetails = {
									name: data.name,

									// password: data.password,
									imageUrl: res.data.data.display_url,
									// Membership: "Free",
									// role: "user",
								};

								axiosSecure
									.patch(
										`/users/updateProfile/${user?.email}`,
										userDetails
									)
									.then((res) => {
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
					});

				const name = data.name;
			} else {
				const userImage = user?.PhotoURL;
				const name = data.name;

				profile(name, userImage)
					.then((res) => {
						


                        const userDetails = {
                            name: data.name,

                            imageUrl: user?.photoURL,
                           
                        };


                        axiosSecure
                            .patch(
                                `/users/updateProfile/${user?.email}`,
                                userDetails
                            )
                            .then((res) => {
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

			}
		}

		// console.log(imageUrl ,   "photourl");

		// const userDetails = {
		//     name: data.name,

		//     // password: data.password,
		//     imageUrl: imageUrl2
		//     // Membership: "Free",
		//     // role: "user",
		// };
	};

	{
		errors.exampleRequired && <span>This field is required</span>;
	}

	return (
		<div>
			<div
				className="hero p-10 h-screen max-h-[700px] "
				style={{
					backgroundImage: `url(${loginBG})`,
				}}
			>
				<div className=" text-center w-full   ">
					<div className="hero w-full bg-base-200">
						<div className="hero-content  w-full gap-10 justify-center flex-col md:flex-row">
							<div className="card   w-full shadow-2xl bg-base-100">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="card-body"
								>
									<div className="text-left ">
										<h1 className="text-3xl mb-2 font-bold ">
											Update Profile
										</h1>
									</div>
									<div className="form-control mt-2">
										<label className="label">
											<span className="label-text">
												Name
											</span>
										</label>
										<input
											name="name"
											type="text"
											placeholder="Name"
											defaultValue={user?.displayName}
											className="input input-bordered"
											{...register("name", {
												required: true,
											})}
										/>
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
											defaultValue={user?.photoUrl}
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
											Update Your Profile
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfile;
