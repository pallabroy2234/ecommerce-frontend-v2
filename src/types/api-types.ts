import {Product, User} from "./types.ts";

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
