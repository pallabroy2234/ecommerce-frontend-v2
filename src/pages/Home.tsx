import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";
import {useLatestProductsQuery} from "../redux/api/productAPI.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../components/Loader.tsx";

const Home = () => {
	const {data, isLoading, isError} = useLatestProductsQuery();
	// * Latest Products
	const latestProducts = data?.payload || [];

	if (isError) toast.error("Failed to fetch products");

	const handleAddToCart = () => {
		console.log("Added to Cart");
	};

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
