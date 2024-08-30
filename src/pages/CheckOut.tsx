import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51P85zqKkIuFqly0WcH0jii0JelERIPZjhKbj0NxNftJhxfKF5ZntMxTbVP60csDXya2E0tBYAv54YFzxRRSG4mFe00ejlUU33F",
);

const CheckOutForm = () => {
	return (
		<div>
			<h1>CheckOut</h1>
		</div>
	);
};

const CheckOut = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckOutForm />
		</Elements>
	);
};
export default CheckOut;
