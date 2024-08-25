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

export type shippingInfo = {
	address: string;
	country: string;
	city: string;
	division: string;
	postCode: number;
};

export type cartItem = {
	productId: string;
	quantity: number;
	// name: string;
	// image: string;
	// price: number;
	// stock: number;
};
