import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import  { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, seterror] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const axiospublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const [transectionId , settransectionId] = useState("")


    const {user} = useContext(AuthContext)


    const total = 5


    // console.log("price of cart is ", total);


    useEffect(() => {
        axiospublic.post("/create-payment-intent", { price: total })
                .then((item) => {
                    console.log("hello" );
                    setClientSecret(item.data.clientSecret);
                    console.log(item.data.clientSecret);


                    // do something
                });
    }, [total , axiospublic]);


    console.log(clientSecret)


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            console.log(" Stripe.js not found ");
            return;
        }


        const card = elements.getElement(CardElement);


        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });


        if (error) {
            seterror(error.message);
            console.log("error", error);
        } else {
            seterror("");
            console.log("paymentMethod", paymentMethod);
        }






        // conferm Payment




        const {paymentIntent , error :confirmError} = await stripe.confirmCardPayment(clientSecret , {
            payment_method : {
                card : card,
                billing_details : {
                    email : user?.email || "anonymous",
                    name : user?.displayName || "anonymous"
                }
            }
        })


        if(confirmError){
            console.log(confirmError);
        }
        else{
            console.log("payment INtent " , paymentIntent);


            if(paymentIntent.status === "succeeded"){
                console.log("transection id" , paymentIntent.id);
                settransectionId(paymentIntent.id)

                Swal.fire({
                    title: "Payment Successfull",
                    text: " Visit your profile to see membership",
                    icon: "success"
                  });



                const payment = {
                    email : user.email,
                    price : total,
                    date : new Date(),
                    transectionIds : paymentIntent.id,
                    status :'pending'
                }


                const res   = await axiospublic.post("/payment" , payment)

                if(res.data.acknowledged === true){

                    axiosSecure.patch(`/users/membership/${user?.email}` )
                    .then(res => {
                        console.log(res.data);

                    })
                    .catch(err => console.log(err))

                    console.log("result of payment saving" , res.data)
                }
                
            }
        }




    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "20px",
                            color: "#000000",
                            "::placeholder": {
                                color: "#000000",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
           <div className="flex gap-5  mt-5 justify-center items-center">
            <p>Pay $5 to become a member</p>
            <button
                className="btn btn-primary "
                type="submit"
                disabled={!stripe}
            >
                Make Payment
            </button>
           </div>
            <p className="text-red-500">{error}</p>
        </form>
    );
};


export default CheckOut;