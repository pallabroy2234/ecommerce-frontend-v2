import {Order, PieChart, Product, ShippingInfo, Stats, User} from "./types.ts";

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

export type AllUsersResponse = {
	success: boolean;
	message: string;
	payload: User[];
};

export type DeleteUserRequest = {
	userId: string;
	id: string;
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

export type OrderItem = {
	_id: string;
	productId: string;
	name: string;
	quantity: number;
	price: number;
	image: string;
};

export type NewOrderRequest = {
	user: string;
	subtotal: number;
	tax: number;
	discount: number;
	total: number;
	shippingCharges: number;
	shippingInfo: ShippingInfo;
	orderItems: {
		productId: string;
		quantity: number;
	}[];
};

export type UpdateOrderStatusRequest = {
	orderId: string;
	userId: string;
};
export type OrderDetailsRequest = UpdateOrderStatusRequest;
export type DeleteOrderRequest = UpdateOrderStatusRequest;

export type AllOrdersResponse = {
	success: boolean;
	message: string;
	payload: Order[];
};

export type OrderDetailsResponse = {
	success: boolean;
	message: string;
	payload: Order;
};

export type StatsResponse = {
	success: boolean;
	message: string;
	payload: Stats;
};

export type PieChartResponse = {
	success: boolean;
	message: string;
	payload: PieChart;
};
