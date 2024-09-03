import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./api/userAPI.ts";
import {userReducer} from "./reducer/userReducer.ts";
import {productAPI} from "./api/productAPI.ts";
import {cartReducer} from "./reducer/cartReducer.ts";
import {orderAPI} from "./api/orderAPI.ts";
import {createLogger} from "redux-logger";

const applicationMode = import.meta.env.VITE_NODE_ENV;

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
	devTools: applicationMode === "development",
	middleware: (getDefaultMiddleware) => {
		// Default middleware
		const middlewares = getDefaultMiddleware().concat([
			userAPI.middleware,
			productAPI.middleware,
			orderAPI.middleware,
		]);

		// Logger middleware
		if (applicationMode === "development") {
			middlewares.push(logger);
		}
		return middlewares;
	},
});
