import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem, ShippingInfo} from "../../types/types.ts";
import {CartReducerInitialState} from "../../types/reducer-types.ts";

const initialState: CartReducerInitialState = {
	loading: false,
	cartItems: [],
	subtotal: 0,
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
		addToCart: (state, {payload}: PayloadAction<CartItem>) => {
			state.loading = true;
			const index = state.cartItems.findIndex((item) => item.productId === payload.productId);

			if (index !== -1) {
				state.cartItems[index] = payload;
			} else {
				state.cartItems = [...state.cartItems, payload];
				state.loading = false;
			}
		},
		removeCartItem: (state, {payload}: PayloadAction<string>) => {
			state.loading = true;
			state.cartItems = state.cartItems.filter((item) => item.productId !== payload);
			state.loading = false;
		},
		calculatePrice: (state) => {
			state.subtotal = state.cartItems.reduce((acc, item) => {
				return acc + item.price * item.quantity;
			}, 0);
			state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
			state.tax = Math.round(state.subtotal * 0.15);
			state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
		},

		discountApplied: (state, {payload}: PayloadAction<number>) => {
			state.discount = payload;
		},
		saveShippingInfo: (state, {payload}: PayloadAction<ShippingInfo>) => {
			state.shippingInfo = payload;
		},
		resetCart: () => initialState,
	},
});

export const {
	addToCart,
	removeCartItem,
	calculatePrice,
	discountApplied,
	saveShippingInfo,
	resetCart,
} = cartReducer.actions;
