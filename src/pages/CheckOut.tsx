import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {FormEvent, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {frontendUrl} from "../redux/api/apiBaseUrl.ts";
import handleStripeError from "../utils/stripeError.ts";
import toast from "react-hot-toast";
import {CustomError, NewOrderRequest} from "../types/api-types.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNewOrderMutation} from "../redux/api/orderAPI.ts";
import {resetCart} from "../redux/reducer/cartReducer.ts";
import {responseToast} from "../utils/feature.ts";
import {AppDispatch, RootState} from "../redux/store.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const CheckOutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const {cartItems, total, shippingCharges, shippingInfo, tax, discount, subtotal} = useSelector(
		(state: RootState) => state.cartReducer,
	);
	const {user} = useSelector((state: RootState) => state.userReducer);
	const [newOrder] = useNewOrderMutation();

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setIsProcessing(true);

		// * Prepare the order Object Data
		const order: NewOrderRequest = {
			shippingInfo,
			orderItems: cartItems.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			})),
			shippingCharges,
			subtotal,
			tax,
			discount,
			total,
			user: user?._id || "",
		};

		try {
			// 	* Confirm the payment and create the new order parallel
			const [orderResult, paymentResult] = await Promise.all([
				newOrder(order),
				stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: frontendUrl,
					},
					redirect: "if_required",
				}),
			]);

			// 	Destructure paymentIntent and error from paymentResult
			const {paymentIntent, error: paymentError} = paymentResult;

			// check if orderResult has any error
			if ("error" in orderResult) {
				const error = orderResult.error as CustomError;
				toast.error(error?.data?.message);
				setIsProcessing(false);
				return;
			} else if (paymentError) {
				handleStripeError(paymentError);
				setIsProcessing(false);
				return;
			}

			if (paymentIntent?.status === "succeeded" && !("error" in orderResult)) {
				dispatch(resetCart());
				responseToast(orderResult, navigate, "/orders");
				setIsProcessing(false);
			}
		} catch (error) {
			toast.error("Something went wrong.");
			setIsProcessing(false);
		}
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
