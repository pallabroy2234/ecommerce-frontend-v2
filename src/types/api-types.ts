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
