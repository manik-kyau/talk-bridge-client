import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
const Membership = () => {
    return (
        <>
        <Helmet>
            <title>Membership</title>
        </Helmet>
            <div className="py-24 md:py-[120px] px-5 lg:px-0 ">
                <div className="mb-12">
                    <h2 className="text-[40px] font-bold text-center">Payment for Membership</h2>
                    <h2 className="text-[30px] font-bold text-center">Membership Fees 100 USDT</h2>
                </div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Membership;