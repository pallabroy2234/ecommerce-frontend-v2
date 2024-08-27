import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {MessageResponse, NewOrderRequest} from "../../types/api-types";

export const orderAPI = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/order`,
	}),
	tagTypes: ["orders"],
	endpoints: (builder) => ({
		/**
		 * @description         Create a new order
		 * @path                /api/v1/order/new
		 * @method              POST
		 * @tags                orders
		 * @access              Private(User)
		 * */
		newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
			query: (order) => ({
				url: "/new",
				method: "POST",
				body: order,
			}),
		}),
	}),
});

export const {useNewOrderMutation} = orderAPI;
