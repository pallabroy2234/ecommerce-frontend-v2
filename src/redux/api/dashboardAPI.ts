import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl.ts";

export const dashboardAPI = createApi({
	reducerPath: "dashboardApi",
	invalidationBehavior: "immediately",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/dashboard`,
	}),

	/**
	 * @description         Tag Types
	 *
	 * */
	tagTypes: ["Dashboard"],

	/**
	 * @description       Endpoints
	 * */
	endpoints: (builder) => ({
		/**
		 * @description         Get all dashboard stats
		 * @path                /api/v1/dashboard/stats
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
		getDashboardStats: builder.query({
			query: (id) => ({
				url: `/stats?id=${id}`,
				method: "GET",
			}),
		}),

		/**
		 * @description
		 * @path                /api/v1/dashboard/
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
	}),
});

export const {useGetDashboardStatsQuery} = dashboardAPI;
