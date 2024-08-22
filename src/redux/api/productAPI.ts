import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {
	AllProductsResponse,
	CategoriesResponse,
	SearchProductsParams,
	SearchProductsResponse,
} from "../../types/api-types";

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
		categories: builder.query<CategoriesResponse, void>({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
		}),
		searchProducts: builder.query<SearchProductsResponse, SearchProductsParams>({
			query: ({search, price, category, sort, page}) => {
				let base = `/all?search=${search}&page=${page}`;
				if (price) base += `&price=${price}`;
				if (category) base += `&category=${category}`;
				if (sort) base += `&sort=${sort}`;
				return {
					url: base,
					method: "GET",
				};
			},
		}),
	}),
});

export const {
	useLatestProductsQuery,
	useAdminAllProductsQuery,
	useCategoriesQuery,
	useSearchProductsQuery,
} = productAPI;
