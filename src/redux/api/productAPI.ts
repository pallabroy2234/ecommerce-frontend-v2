import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {AllProductsResponse} from "../../types/api-types";

export const productAPI = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/product`,
	}),
	endpoints: (builder) => ({
		latestProducts: builder.query<AllProductsResponse, string>({
			query: () => ({
				url: "/latest",
				method: "GET",
			}),
		}),
	}),
});

export const {useLatestProductsQuery} = productAPI;
