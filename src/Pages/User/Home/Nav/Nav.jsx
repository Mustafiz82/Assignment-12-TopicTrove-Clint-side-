import { Link, NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { IoMdNotifications } from "react-icons/io";

const Nav = () => {
	const ul = (
		<>
			<NavLink
				to="/"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
						? "text-purple-600 font-bold"
						: "font-bold text-black"
				}
			>
				Home
			</NavLink>
			<NavLink
				to="/membership"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
						? "text-purple-600 font-bold"
						: " text-black"
				}
			>
				Membership
			</NavLink>
		</>
	);
	return (
		<div className="navbar p-0 bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{ul}
					</ul>
				</div>
				<div className="btn p-0 flex gap-2  btn-ghost text-xl">
					<img className="w-8" src={logo} alt="" />
					<span>TopicTrove</span>
				</div>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="flex gap-5 px-1">{ul}</ul>
			</div>
			<div className="navbar-end">
				<div className="mr-2">
                <IoMdNotifications size={38} className=""/>
                </div>

				<Link to="/login" className="btn">
					Join Us
				</Link>
			</div>
		</div>
	);
};

export default Nav;
