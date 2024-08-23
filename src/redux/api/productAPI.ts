import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiBaseUrl} from "./apiBaseUrl";
import {
	AllProductsResponse,
	CategoriesResponse,
	MessageResponse,
	NewProductRequest,
	SearchProductsParams,
	SearchProductsResponse,
} from "../../types/api-types";

export const productAPI = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/product`,
	}),

	/**
	 * @description         Tag Types
	 *
	 * */
	tagTypes: ["products"],

	endpoints: (builder) => ({
		/**
		 * @description         Get all latest products
		 * @path                /api/v1/product/latest
		 * @method              GET
		 * @access              Public
		 * */
		latestProducts: builder.query<AllProductsResponse, void>({
			query: () => ({
				url: "/latest",
				method: "GET",
			}),
			providesTags: ["products"],
		}),

		/**
		 * @description         Get all products for admin
		 * @path                /api/v1/product/admin-products
		 * #query               id
		 * @method              GET
		 * @access              Private (Admin)
		 * */
		adminAllProducts: builder.query<AllProductsResponse, string>({
			query: (id) => ({
				url: `/admin-products?id=${id}`,
				method: "GET",
			}),
			providesTags: ["products"],
		}),

		/**
		 * @description         Get all categories
		 * @path                /api/v1/product/categories
		 * @method              GET
		 * @access              Public
		 * */
		categories: builder.query<CategoriesResponse, void>({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
			providesTags: ["products"],
		}),

		/**
		 * @description         Search products by query
		 * @path                /api/v1/product/all
		 * #query               search, price, category, sort, page
		 * @method              GET
		 * @access              Public
		 *
		 * */
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
			providesTags: ["products"],
		}),

		/**
		 * @description         Create a new product
		 * @path                /api/v1/product/new
		 * #body                name, description, price, stock, category, image
		 * @method              POST
		 * @access              Private (Admin)
		 *
		 * */

		newProduct: builder.mutation<MessageResponse, NewProductRequest>({
			query: ({formData, id}) => ({
				url: `/new?id=${id}`,
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["products"],
		}),
	}),
});

export const {
	useLatestProductsQuery,
	useAdminAllProductsQuery,
	useCategoriesQuery,
	useSearchProductsQuery,
	useNewProductMutation,
} = productAPI;
