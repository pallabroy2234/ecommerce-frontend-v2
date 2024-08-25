import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cartItem} from "../../types/types.ts";
import {cartReducerInitialState} from "../../types/reducer-types.ts";

const initialState: cartReducerInitialState = {
	loading: false,
	cartItems: [],
	subTotal: 0,
	tax: 0,
	shippingCharges: 0,
	discount: 0,
	total: 0,
	shippingInfo: {
		address: "",
		country: "",
		city: "",
		division: "",
		postCode: 0,
	},
};
export const cartReducer = createSlice({
	name: "cartReducer",
	initialState,
	reducers: {
		addToCart: (state, {payload}: PayloadAction<cartItem>) => {
			state.loading = true;
			state.cartItems.push(payload);
			state.loading = false;
		},
		removeCartItem: (state, {payload}: PayloadAction<string>) => {
			state.loading = true;
			state.cartItems = state.cartItems.filter((item) => item.productId !== payload);
			state.loading = false;
		},
	},
});

export const {addToCart, removeCartItem} = cartReducer.actions;
