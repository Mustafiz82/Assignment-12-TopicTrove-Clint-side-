import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from "./CheckOut";
import paymentImage from "../../../assets/paymetn preview.jpg"



// VITE_Payment_Gateway_PK=pk_test_51OERChApSB9emkR4v7tUIre9D15DktZzBuvL2H4AizZWvD7SKhOZnB0aLmhTeTp0Bxn7oYSfmW08DnXKYtTlFLcQ00H154Nf7q


const Membership = () => {
    const stripePromise = loadStripe("pk_test_51OERChApSB9emkR4v7tUIre9D15DktZzBuvL2H4AizZWvD7SKhOZnB0aLmhTeTp0Bxn7oYSfmW08DnXKYtTlFLcQ00H154Nf7q");

    console.log("stripePromise" , import.meta.env.VITE_APIKEY);
    return (
        <div className="max-w-3xl bg-slate-100 mx-auto p-5" >

            <div className="flex justify-center">
                <img src={paymentImage} className="w-full mb-5 h-96 object-cover" alt="" />
            </div>
            <div >
            <Elements stripe={stripePromise}>
                <CheckOut></CheckOut>
            </Elements>
            </div>
        </div>
    );
};

export default Membership;