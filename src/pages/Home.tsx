import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";
import {useLatestProductsQuery} from "../redux/api/productAPI.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../components/Loader.tsx";
import {CartItem} from "../types/types.ts";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/reducer/cartReducer.ts";
import {useEffect} from "react";
import {CustomError} from "../types/api-types.ts";

const Home = () => {
	const {data, isLoading, isError, error} = useLatestProductsQuery();
	const dispatch = useDispatch();
	// * Latest Products
	const latestProducts = data?.payload || [];

	const handleAddToCart = (cartItem: CartItem) => {
		if (cartItem.stock < 1) return toast.error("Out of stock");
		dispatch(addToCart(cartItem));
		toast.success("Successfully added to cart");
	};

	// ! Handle Error
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err.data.message);
		}
	}, [isError, error]);

	return (
		<div className='home'>
			<section></section>
			<h1>
				Latest Product{" "}
				<Link to={"/search"} className='findmore'>
					More
				</Link>
			</h1>
			<main>
				{isLoading ? (
					<Skeleton width='80vw' />
				) : (
					latestProducts.map((product) => (
						<ProductCard
							key={product?._id}
							productId={product?._id}
							image={product?.image}
							name={product?.name}
							price={product?.price}
							stock={product?.stock}
							handler={handleAddToCart}
						/>
					))
				)}
			</main>
		</div>
	);
};
export default Home;
