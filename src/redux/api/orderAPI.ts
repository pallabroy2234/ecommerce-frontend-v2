import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {
	AllOrdersResponse,
	DeleteOrderRequest,
	MessageResponse,
	NewOrderRequest,
	OrderDetailsRequest,
	OrderDetailsResponse,
	UpdateOrderStatusRequest,
} from "../../types/api-types";
import {productAPI} from "./productAPI.ts";
import {dashboardAPI} from "./dashboardAPI.ts";

export const orderAPI = createApi({
	reducerPath: "orderApi",
	invalidationBehavior: "immediately",
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
			onQueryStarted: async (_, {dispatch}) => {
				dispatch(productAPI.util.invalidateTags(["products"]));
				dispatch(dashboardAPI.util.invalidateTags(["Dashboard"]));
			},
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
		orderDetails: builder.query<OrderDetailsResponse, OrderDetailsRequest>({
			query: ({orderId, userId}) => ({
				url: `/${orderId}?id=${userId}`,
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
			onQueryStarted: async (_, {dispatch}) => {
				dispatch(dashboardAPI.util.invalidateTags(["Dashboard"]));
			},
		}),

		/**
		 * @description         Delete order
		 * @path                /api/v1/order/${orderId}?id=${id}
		 * @method              DELETE
		 * @tags                orders
		 * @access              Private(Admin)
		 * */
		deleteOrder: builder.mutation<MessageResponse, DeleteOrderRequest>({
			query: ({orderId, userId}) => ({
				url: `/${orderId}?id=${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["orders"],
			onQueryStarted: async (_, {dispatch}) => {
				dispatch(dashboardAPI.util.invalidateTags(["Dashboard"]));
			},
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
