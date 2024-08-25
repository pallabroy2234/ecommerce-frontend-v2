import {cartItem, shippingInfo, User} from "./types.ts";

export interface UserReducerInitialState {
	user: User | null;
	loading: boolean;
}

/**
 * @description This is the initial state of the cart reducer
 *
 * */
export interface cartReducerInitialState {
	loading: boolean;
	cartItems: cartItem[];
	shippingCharges: number;
	discount: number;
	total: number;
	shippingInfo: shippingInfo;
	subTotal: number;
	tax?: number;
}
