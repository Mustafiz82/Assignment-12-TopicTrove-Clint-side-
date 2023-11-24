import { Link } from "react-router-dom";
import erropImg from "../../assets/errorPage.webp"

const ErrorPage = () => {
    return (
        <div className="h-screen bg-[#000212] w-full flex flex-col justify-center  items-center">
            <img src={erropImg} className="" alt="" />
            <Link to="/"><button className="btn btn-outline text-[#4EDBE9] ">  Back to Home</button></Link>
            </div>
    );
};

export default ErrorPage;