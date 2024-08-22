import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {AllProductsResponse} from "../../types/api-types";

export const productAPI = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/product`,
	}),
	endpoints: (builder) => ({
		latestProducts: builder.query<AllProductsResponse, void>({
			query: () => ({
				url: "/latest",
				method: "GET",
			}),
		}),
		adminAllProducts: builder.query<AllProductsResponse, string>({
			query: (id) => ({
				url: `/admin-products?id=${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {useLatestProductsQuery, useAdminAllProductsQuery} = productAPI;
