import {useEffect, useState} from "react";
import {VscError} from "react-icons/vsc";
import CartItems from "../components/CartItems.tsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CartReducerInitialState} from "../types/reducer-types.ts";
import {CartItem} from "../types/types.ts";
import {addToCart, calculatePrice, removeCartItem} from "../redux/reducer/cartReducer.ts";

const Cart = () => {
	const dispatch = useDispatch();
	const {cartItems, subtotal, total, shippingCharges, tax, discount} = useSelector(
		(state: {cartReducer: CartReducerInitialState}) => state.cartReducer,
	);

	const [couponCode, setCouponCode] = useState<string>("");
	const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

	// * handler
	const handleIncrease = (cartItem: CartItem) => {
		if (cartItem.quantity <= cartItem.stock) {
			dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
		}
	};
	const handleDecrease = (cartItem: CartItem) => {
		if (cartItem.quantity > 1) {
			dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
		}
	};
	const handleRemove = (productId: string) => {
		dispatch(removeCartItem(productId));
	};

	useEffect(() => {
		const timeOutID = setTimeout(() => {
			if (Math.random() > 0.5) {
				setIsValidCouponCode(true);
			} else {
				setIsValidCouponCode(false);
			}
		}, 1000);
		return () => {
			clearTimeout(timeOutID);
			setIsValidCouponCode(false);
		};
	}, [couponCode]);

	// * Calculate Price and render
	useEffect(() => {
		dispatch(calculatePrice());
	}, [cartItems]);

	return (
		<div className='cart'>
			<main>
				{cartItems.length > 0 ? (
					cartItems?.map((item, index) => (
						<CartItems
							key={index}
							cartItems={item}
							handleIncrease={handleIncrease}
							handleDecrease={handleDecrease}
							handleRemove={handleRemove}
						/>
					))
				) : (
					<h1>No Items Added</h1>
				)}
			</main>
			<aside>
				<p>Subtotal : &#2547;{subtotal}</p>
				<p>Shipping Charges : &#2547;{shippingCharges}</p>
				<p>Tax : &#2547;{tax}</p>
				<p>
					Discount : <em className='red'> - &#2547;{discount}</em>
				</p>
				<p>
					<b>Total :&#2547;{total}</b>
				</p>
				<input
					onChange={(e) => setCouponCode(e.target.value)}
					type='text'
					value={couponCode}
				/>
				{couponCode &&
					(isValidCouponCode ? (
						<>
							<span className='green'>
								&#2547;{discount} off using the <code>{couponCode}</code>
							</span>
						</>
					) : (
						<>
							<span className='red'>
								Invalid Coupon <VscError />
							</span>
						</>
					))}
				{cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
			</aside>
		</div>
	);
};
export default Cart;
