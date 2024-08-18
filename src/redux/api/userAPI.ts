import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "../store.ts";
import {MessageResponse} from "../../types/api-types.ts";
import {User} from "../../types/types.ts";

export const userAPI = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({baseUrl: `${apiBaseUrl}/api/v1/user`}),
	endpoints: (builder) => ({
		login: builder.mutation<MessageResponse, User>({
			query: (user) => ({
				url: "/new",
				method: "POST",
				body: user,
			}),
		}),
	}),
});

export const {useLoginMutation} = userAPI;
