import {CartItem, ShippingInfo, User} from "./types.ts";

export interface UserReducerInitialState {
	user: User | null;
	loading: boolean;
}

/**
 * @description This is the initial state of the cart reducer
 *
 * */
export interface CartReducerInitialState {
	loading: boolean;
	cartItems: CartItem[];
	shippingCharges: number;
	discount: number;
	total: number;
	shippingInfo: ShippingInfo;
	subtotal: number;
	tax: number;
}
