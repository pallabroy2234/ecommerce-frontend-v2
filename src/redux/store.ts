import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./api/userAPI.ts";
import {userReducer} from "./reducer/userReducer.ts";
import {productAPI} from "./api/productAPI.ts";
import {cartReducer} from "./reducer/cartReducer.ts";
import {orderAPI} from "./api/orderAPI.ts";
import {createLogger} from "redux-logger";

// const logRTKQueryTagsMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
// 	// Check if action type ends with '/fulfilled', '/pending', or '/rejected'
// 	if (
// 		action.type.endsWith("/fulfilled") ||
// 		action.type.endsWith("/pending") ||
// 		action.type.endsWith("/rejected")
// 	) {
// 		// Retrieve the state after the action is processed
// 		const state = storeAPI.getState();
//
// 		// Extract tags from the state slices for each API
// 		const userApiTags = state[userAPI.reducerPath]?.queries
// 		const productApiTags = state[productAPI.reducerPath]?.queries;
// 		const orderApiTags = state[orderAPI.reducerPath]?.queries;
//
// 		// Log tags for debugging
// 		console.log("User API Tags:", userApiTags);
// 		console.log("Product API Tags:", productApiTags);
// 		console.log("Order API Tags:", orderApiTags);
// 	}
//
// 	return next(action); // Continue to next middleware or reducer
// };

const logger = createLogger({
	collapsed: true, // Collapse log entries for readability
	diff: true, // Show differences between states
});

export const store = configureStore({
	reducer: {
		// * API
		[userAPI.reducerPath]: userAPI.reducer,
		[productAPI.reducerPath]: productAPI.reducer,
		[orderAPI.reducerPath]: orderAPI.reducer,

		// * Reducers
		[userReducer.name]: userReducer.reducer,
		[cartReducer.name]: cartReducer.reducer,
	},
	devTools: import.meta.env.MODE === "development",
	// logger
	middleware: (getDefaultMiddleware) =>
		// * API Middleware
		getDefaultMiddleware().concat([
			userAPI.middleware,
			productAPI.middleware,
			orderAPI.middleware,
			logger,
		]),
});
