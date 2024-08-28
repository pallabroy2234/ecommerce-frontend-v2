import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {
	AllOrdersResponse,
	MessageResponse,
	NewOrderRequest,
	OrderDetailsResponse,
	UpdateOrderStatusRequest,
} from "../../types/api-types";

export const orderAPI = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/order`,
	}),
	tagTypes: ["orders"],

	//
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
			invalidatesTags: ["orders"],
		}),

		/**
		 * @description         Get users Orders
		 * @path                /api/v1/order/myOrders?id=${id}
		 * @method              GET
		 * @tags                orders
		 * @access              Private(User)
		 * */

		myOrders: builder.query<AllOrdersResponse, string>({
			query: (id) => ({
				url: `/myOrders?id=${id}`,
				method: "GET",
			}),
			providesTags: ["orders"],
		}),

		/**
		 * @description         Get all orders for admin
		 * @path                /api/v1/order/all?id=${id}
		 * @method              GET
		 * @tags                orders
		 * @access              Private(Admin)
		 * */
		adminAllOrders: builder.query<AllOrdersResponse, string>({
			query: (id) => ({
				url: `/all?id=${id}`,
				method: "GET",
			}),
			providesTags: ["orders"],
		}),

		/**
		 * @description         Get order details By id
		 * @path                /api/v1/order/${id}
		 * @method              GET
		 * @tags                orders
		 *
		 * */
		orderDetails: builder.query<OrderDetailsResponse, string>({
			query: (id) => ({
				url: `/${id}`,
				method: "GET",
			}),
			providesTags: ["orders"],
		}),

		/**
		 * @description         Update order status
		 * @path                /api/v1/order/${orderId}?id=${id}
		 * @method              PUT
		 * @tags                orders
		 * @access              Private(Admin)
		 *
		 * */
		updateOrderStatus: builder.mutation<MessageResponse, UpdateOrderStatusRequest>({
			query: ({orderId, userId}) => ({
				url: `/${orderId}?id=${userId}`,
				method: "PUT",
			}),
			invalidatesTags: ["orders"],
		}),

		/**
		 * @description         Delete order
		 * @path                /api/v1/order/${orderId}?id=${id}
		 * @method              DELETE
		 * @tags                orders
		 * @access              Private(Admin)
		 * */
		deleteOrder: builder.mutation<MessageResponse, UpdateOrderStatusRequest>({
			query: ({orderId, userId}) => ({
				url: `/${orderId}?id=${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["orders"],
		}),
	}),
});

export const {
	useNewOrderMutation,
	useAdminAllOrdersQuery,
	useUpdateOrderStatusMutation,
	useOrderDetailsQuery,
	useMyOrdersQuery,
	useDeleteOrderMutation,
} = orderAPI;
