import toast from "react-hot-toast";

export const handleStripeError = (error: any) => {
	switch (error.type) {
		case "card_error":
			// Card-specific error
			toast.error(error.message || "There was an error with your card.");
			break;
		case "validation_error":
			// 	Input validation error
			toast.error(error.message || "Validation error. Please check your input.");
			break;
		case "api_connection_error":
			// Network communication error
			toast.error(error.message || "Please check your internet connection.");
			break;
		case "api_error":
			// Stripe API error
			toast.error(error.message || "There was an error processing your payment.");
			break;
		case "authentication_error":
			// Authentication error
			toast.error(error.message || "Authentication error. Please log in again.");
			break;
		case "rate_limit_error":
			// Rate limit error
			toast.error(error.message || "Rate limit error. Please try again later.");
			break;
		case "idempotency_error":
			// Idempotency error
			toast.error(error.message || "Idempotency error. Please try again later.");
			break;
		case "invalid_request_error":
			// 			Invalid request error
			toast.error(error.message || "Invalid request error. Please try again later.");
			break;
		case "payment_intent_error":
			// Payment intent error
			toast.error(error.message || "Payment intent error. Please try again later.");
			break;
		default:
			// General error handling
			toast.error("An unexpected error occurred. Please try again.");
			break;
	}
};

export default handleStripeError;
