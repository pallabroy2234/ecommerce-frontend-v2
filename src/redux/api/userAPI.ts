import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "../store.ts";

export const userAPI = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({baseUrl: `${apiBaseUrl}/api/v1/user`}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (user) => ({
				url: "/new",
				method: "POST",
				body: user,
			}),
		}),
	}),
});
