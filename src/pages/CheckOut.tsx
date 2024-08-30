import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {FormEvent, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {frontendUrl} from "../redux/api/apiBaseUrl.ts";
import handleStripeError from "../utils/stripeError.ts";

const stripePromise = loadStripe(
	"pk_test_51P85zqKkIuFqly0WcH0jii0JelERIPZjhKbj0NxNftJhxfKF5ZntMxTbVP60csDXya2E0tBYAv54YFzxRRSG4mFe00ejlUU33F",
);

const CheckOutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setIsProcessing(true);

		// const order = {};

		// * Confirm the payment
		const {paymentIntent, error} = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: frontendUrl,
			},
			redirect: "if_required",
		});

		if (error) {
			setIsProcessing(false);
			handleStripeError(error);
			return;
		}
		if (paymentIntent?.status === "succeeded") {
			navigate("/orders");
		}
		setIsProcessing(false);
	};

	return (
		<div className='checkout-container'>
			<form onSubmit={submitHandler}>
				<PaymentElement />
				<button type='submit' disabled={isProcessing}>
					{isProcessing ? "Processing..." : "Pay"}
				</button>
			</form>
		</div>
	);
};

const CheckOut = () => {
	const location = useLocation();
	const clientSecret: string = location.state || undefined;

	if (!clientSecret) return <Navigate to={"/shipping"} />;

	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret: clientSecret,
			}}>
			<CheckOutForm />
		</Elements>
	);
};
export default CheckOut;
