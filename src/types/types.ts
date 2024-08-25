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
