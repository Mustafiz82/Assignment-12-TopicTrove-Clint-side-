import banner from "../.././../../assets/bannerImage.jpg";

const Banner = () => {
	return (
		<div>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(${banner})`,
				}}
			>
				<div className=""></div>
				<div className="hero-content text-center text-neutral-content">
					<div className=" bg-[#46057B]   rounded-full text-center">
						<h1 className="mb-5 max-w-xl mx-auto text-4xl font-bold">
							Your Gateway to Vibrant Conversations
						</h1>
						<p className="mb-5 max-w-4xl">
							Discover a diverse world of topics and engage in
							meaningful conversations with like-minded
							individuals. Use the search bar below to explore
							topics, connect with like-minded individuals, and
							share your thoughts.
						</p>
						<div className="join">
							<input
								className="input text-black input-bordered join-item"
								placeholder="See search tags in tags section"
							/>
							<button className="btn join-item rounded bg-orange-500 text-white hover:bg-orange-500">
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
