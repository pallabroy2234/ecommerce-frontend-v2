import {FaPlus} from "react-icons/fa";

type ProductsProps = {
    productId: string;
    image: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
}

// const server = "image_url"


const ProductCard = ({productId, image, name, price, stock, handler}: ProductsProps) => {
    return (
        <div className="product_card">
            <img src={`${image}`} alt=""/>
            <p>{name}</p>
            <span>&#2547;{price}</span>
            <div>
                <button onClick={()=> handler()} type="button"><FaPlus/></button>
            </div>
        </div>
    )
}
export default ProductCard
