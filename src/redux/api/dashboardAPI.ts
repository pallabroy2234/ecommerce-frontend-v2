import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl.ts";
import {StatsResponse} from "../../types/api-types.ts";

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
		 * @path                /api/v1/dashboard/stats?id=${id}
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
		StatsData: builder.query<StatsResponse, string>({
			query: (id) => ({
				url: `/stats?id=${id}`,
				method: "GET",
			}),
			providesTags: ["Dashboard"],
		}),

		/**
		 * @description        Get dashboard pie chart data
		 * @path                /api/v1/dashboard/pie?id=${id}
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
		pieChartData: builder.query<string, string>({
			query: (id) => ({
				url: `/pie?id=${id}`,
				method: "GET",
			}),
			providesTags: ["Dashboard"],
		}),

		/**
		 * @description        Get dashboard bar chart data
		 * @path                /api/v1/dashboard/bar?id=${id}
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
		barChartData: builder.query<string, string>({
			query: (id) => ({
				url: `/bar?id=${id}`,
				method: "GET",
			}),
			providesTags: ["Dashboard"],
		}),

		/**
		 * @description        Get dashboard line chart data
		 * @path                /api/v1/dashboard/line?id=${id}
		 * @method              GET
		 * @tags                Dashboard
		 * @access              Private (Admin)
		 * */
		lineChartData: builder.query<string, string>({
			query: (id) => ({
				url: `/line?id=${id}`,
				method: "GET",
			}),
			providesTags: ["Dashboard"],
		}),
	}),
});

export const {
	useStatsDataQuery,
	usePieChartDataQuery,
	useBarChartDataQuery,
	useLineChartDataQuery,
} = dashboardAPI;
