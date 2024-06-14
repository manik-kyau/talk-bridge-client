import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const membershipPrice = 500;


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: membershipPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, membershipPrice])

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const payment = {
                    name: user.displayName,
                    email: user.email,
                    transactionId: paymentIntent.id,
                    price: membershipPrice,
                    date: new Date(),
                }
                const res = await axiosSecure.post('/payments',payment)
                console.log(res.data);
                if(res.data.insertedId){
                    toast.success("payment successfully done");
                }
                // change badge for membership
                const membership = {
                    name: user.displayName,
                    email: user.email,
                    image: user?.photoURL,
                    badge: 'gold'
                    // date: new Date(),
                }
                const memberRes = await axiosSecure.patch(`/users/${user?.email}`, membership)
                console.log(memberRes.data);
                if(memberRes.data.modifiedCount > 0){
                    toast.success('You get Gold badge');
                }
            }
        }
    }

    return (
        <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                },
                            },
                            invalid: {
                                color: '#9e2146'
                            },
                        },
                    }}
                ></CardElement>
                <div className="text-center">
                    <button className="btn text-lg bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white my-8 px-16" type="submit"
                    // disabled={!stripe || !clientSecret}
                    >
                        Pay
                    </button>
                    <p className="text-red-600 text-lg">{error}</p>
                    {transactionId && <p className="text-green-600 text-lg">Your Transaction Id: {transactionId}</p>}
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;