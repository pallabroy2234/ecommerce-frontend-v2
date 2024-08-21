export interface User {
	_id: string;
	name: string;
	email: string;
	image: string;
	gender: string;
	role?: string;
	dob: string;
}

export interface Product {
	_id: string;
	name: string;
	category: string;
	image: string;
	price: number;
	stock: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
