import {OrderItem} from "./api-types.ts";

export type User = {
	_id: string;
	name: string;
	email: string;
	image: string;
	gender: string;
	role?: string;
	dob: string;
};

export type Product = {
	_id: string;
	name: string;
	category: string;
	image: string;
	price: number;
	stock: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type ShippingInfo = {
	address: string;
	country: string;
	city: string;
	division: string;
	postCode: number;
};

export type CartItem = {
	productId: string;
	quantity: number;
	stock: number;
	name: string;
	image: string;
	price: number;
};

export type Order = {
	shippingInfo: ShippingInfo;
	orderItems: OrderItem[];
	_id: string;
	user: {
		name: string;
		_id: string;
	};
	subtotal: number;
	tax: number;
	shippingCharges: number;
	discount: number;
	total: number;
	status: string;
};
