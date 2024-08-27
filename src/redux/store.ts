import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./api/userAPI.ts";
import {userReducer} from "./reducer/userReducer.ts";
import {productAPI} from "./api/productAPI.ts";
import {cartReducer} from "./reducer/cartReducer.ts";
import {orderAPI} from "./api/orderAPI.ts";

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
	middleware: (getDefaultMiddleware) =>
		// * API Middleware
		getDefaultMiddleware().concat([
			userAPI.middleware,
			productAPI.middleware,
			orderAPI.middleware,
		]),
});
