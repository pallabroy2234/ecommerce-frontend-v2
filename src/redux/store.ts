import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./api/userAPI.ts";

// * NODE_ENV Wise API Base URL
// const getApiBaseUrl = (): string => {
// 	switch (import.meta.env.VITE_NODE_ENV) {
// 		case "development":
// 			return import.meta.env.VITE_DEVELOPMENT_URL as string;
// 		case "production":
// 			return import.meta.env.VITE_PRODUCTION_URL as string;
// 		case "testing":
// 			return import.meta.env.VITE_TESTING_URL as string;
// 		case "staging":
// 			return import.meta.env.VITE_STAGING_URL as string;
// 		default:
// 			throw new Error("Invalid NODE_ENV value");
// 	}
// };
//
// export const apiBaseUrl: string = getApiBaseUrl();

export const store = configureStore({
	reducer: {
		[userAPI.reducerPath]: userAPI.reducer,
	},
	devTools: import.meta.env.MODE === "development",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userAPI.middleware]),
});
