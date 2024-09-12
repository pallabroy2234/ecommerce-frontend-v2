import {FaPlus} from "react-icons/fa";
import {CartItem} from "../types/types.ts";

type ProductsProps = {
	productId: string;
	image: string;
	name: string;
	price: number;
	stock: number;
	handler: (cartItem: CartItem) => string | undefined | void;
};

const ProductCard = ({productId, image, name, price, stock, handler}: ProductsProps) => {
	return (
		<div className='product_card'>
			<img src={`${image}`} alt={name} />
			<p>{name}</p>
			<span>&#2547;{price}</span>
			<div>
				<button
					onClick={() => handler({productId, quantity: 1, stock, image, name, price})}
					type='button'>
					<FaPlus />
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
