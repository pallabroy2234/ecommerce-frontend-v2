import {Product, User} from "./types.ts";

// ! Custom Type Error
export type CustomError = {
	status: number;
	data: {
		success: boolean;
		message: string;
		payload?: any;
	};
};

export type MessageResponse = {
	success: boolean;
	message: string;
	payload?: any;
};

export type UserResponse = {
	success: boolean;
	message: string;
	payload: User;
};

export type AllProductsResponse = {
	success: boolean;
	message: string;
	payload?: Product[];
};

export type CategoriesResponse = {
	success: boolean;
	message: string;
	payload?: string[];
};

export type Pagination = {
	totalNumberOfProducts: number | null;
	totalPages: number | null | undefined;
	currentPage: number | null;
	previousPage: number | null;
	nextPage: number | null;
};

export type SearchProductsResponse = {
	success: boolean;
	message: string;
	payload?: Product[];
	pagination?: Pagination;
	link?: {
		previous: string | null;
		next: string | null;
	};
};
export type SearchProductsParams = {
	search: string;
	price: number;
	category: string;
	sort: string;
	page: number;
};

export type NewProductRequest = {
	id: string;
	formData: FormData;
};

export type UpdateProductRequest = {
	userId: string;
	id: string;
	formData: FormData;
};

export type DeleteProductRequest = {
	userId: string;
	id: string;
};
