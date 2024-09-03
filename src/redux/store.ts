import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger";
import {userAPI} from "./api/userAPI.ts";
import {userReducer} from "./reducer/userReducer.ts";
import {productAPI} from "./api/productAPI.ts";
import {cartReducer} from "./reducer/cartReducer.ts";
import {orderAPI} from "./api/orderAPI.ts";
import {dashboardAPI} from "./api/dashboardAPI.ts";

// * Application mode
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
		[dashboardAPI.reducerPath]: dashboardAPI.reducer,

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
			dashboardAPI.middleware,
		]);

		// Logger middleware
		if (applicationMode === "development") {
			middlewares.push(logger);
		}
		return middlewares;
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
