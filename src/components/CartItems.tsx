import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {apiBaseUrl} from "../redux/api/apiBaseUrl.ts";
import {CartItem} from "../types/types.ts";

type CartItemsProps = {
	cartItems: any;
	handleIncrease: (cartItem: CartItem) => void;
	handleDecrease: (cartItem: CartItem) => void;
	handleRemove: (productId: string) => void;
};

const CartItems = ({
	cartItems: cartItem,
	handleIncrease,
	handleRemove,
	handleDecrease,
}: CartItemsProps) => {
	const {image, name, price, stock, quantity, productId} = cartItem;
	return (
		<div className='cart_item'>
			<img src={`${apiBaseUrl}/${image}`} alt={name} />
			<article>
				<Link to={`/product/${productId}`}>{name}</Link>
				<span>&#2547;{price}</span>
			</article>
			<div>
				<button type='button' onClick={() => handleDecrease(cartItem)}>
					-
				</button>
				<p>{quantity}</p>
				<button type='button' onClick={() => handleIncrease(cartItem)}>
					+
				</button>
			</div>

			<button type='button' onClick={() => handleRemove(productId)}>
				<FaTrash />
			</button>
		</div>
	);
};
export default CartItems;
