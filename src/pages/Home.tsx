import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";

const Home = () => {
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
				</Link>{" "}
			</h1>
			<main>
				<ProductCard productId='asdfasd' image='https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg' name='Apple Macbook' price={1000} stock={20} handler={handleAddToCart} />
				<ProductCard productId='asdfasd' image='https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg' name='Apple Macbook' price={1000} stock={20} handler={handleAddToCart} />
				<ProductCard productId='asdfasd' image='https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg' name='Apple Macbook' price={1000} stock={20} handler={handleAddToCart} />
			</main>
		</div>
	);
};
export default Home;
