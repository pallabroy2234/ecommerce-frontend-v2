import {FaPlus} from "react-icons/fa";
import {apiBaseUrl} from "../redux/api/apiBaseUrl.ts";

type ProductsProps = {
	productId: string;
	image: string;
	name: string;
	price: number;
	stock: number;
	handler: () => void;
};

const ProductCard = ({productId, image, name, price, stock, handler}: ProductsProps) => {
	return (
		<div className='product_card'>
			<img src={`${apiBaseUrl}/${image}`} alt={name} />
			<p>{name}</p>
			<span>&#2547;{price}</span>
			<div>
				<button onClick={() => handler()} type='button'>
					<FaPlus />
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
