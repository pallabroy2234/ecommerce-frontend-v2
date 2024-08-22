import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./api/userAPI.ts";
import {userReducer} from "./reducer/userReducer.ts";
import {productAPI} from "./api/productAPI.ts";

export const store = configureStore({
	reducer: {
		// * API
		[userAPI.reducerPath]: userAPI.reducer,
		[productAPI.reducerPath]: productAPI.reducer,

		// * Reducers
		[userReducer.name]: userReducer.reducer,
	},
	devTools: import.meta.env.MODE === "development",
	middleware: (getDefaultMiddleware) =>
		// * API Middleware
		getDefaultMiddleware().concat([userAPI.middleware, productAPI.middleware]),
});
