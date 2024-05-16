import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa";


type CartItemsProps = {
   cartItems:any;
}


const CartItems = ({cartItems} : CartItemsProps) => {
    const {image,name, price, stock,quantity, productId} = cartItems;
    return (
        <div className="cart_item">
            <img src={image} alt={name}/>
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>&#2547;{price}</span>
            </article>
            <div>
                <button type="button">-</button>
                <p>{quantity}</p>
                <button type="button">+</button>
            </div>

            <button type="button"><FaTrash/></button>
        </div>
    )
}
export default CartItems
