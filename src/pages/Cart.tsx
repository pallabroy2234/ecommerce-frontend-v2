import {useEffect, useState} from "react";
import {VscError} from "react-icons/vsc";
import CartItems from "../components/CartItems.tsx";
import {Link} from "react-router-dom";

const subtotal = 4000;
const cartItems = [
    {
        productId: 1,
        name: "Product 1",
        image: "https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg",
        price: 1000,
        quantity: 40,
        stock: 100
    },
    {
        productId: 2,
        name: "Product 2",
        image: "https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg",
        price: 2000,
        quantity: 2,
        stock: 100

    },
    {
        productId: 3,
        name: "Product 3",
        image: "https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg",
        price: 1000,
        quantity: 1,
        stock: 100

    },
    {
        productId: 3,
        name: "Product 3",
        image: "https://m.media-amazon.com/images/I/81dVkD9YyOL._AC_SX522_.jpg",
        price: 1000,
        quantity: 1,
        stock: 100

    }
];
const tax = Math.round(subtotal * 0.18);
const shippingCharge = 100;
const discount = 100;
const total = subtotal + tax + shippingCharge;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("")
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)


    useEffect(() => {
        const timeOutID = setTimeout(() => {
            if (Math.random() > 0.5) {
                setIsValidCouponCode(true)
            } else {
                setIsValidCouponCode(false)
            }
        }, 1000)
        return () => {
            clearTimeout(timeOutID)
            setIsValidCouponCode(false)
        }
    }, [couponCode])

    return (
        <div className="cart">
            <main>
                {
                    cartItems.length > 0 ? (
                        cartItems?.map((item, index) => <CartItems key={index} cartItems={item} />)
                    ) : (
                        <h1>No Items Added</h1>
                    )
                }
            </main>
            <aside>
                <p>Subtotal : &#2547;{subtotal}</p>
                <p>Shipping Charges : &#2547;{shippingCharge}</p>
                <p>Tax : &#2547;{tax}</p>
                <p>
                    Discount : <em className="red"> - &#2547;{discount}</em>
                </p>
                <p>
                    <b>Total :&#2547;{total}</b>
                </p>
                <input onChange={(e) => setCouponCode(e.target.value)} type="text" value={couponCode}/>
                {
                    couponCode && (
                        isValidCouponCode ? (
                            <>
                                <span className="green">&#2547;{discount} off using the <code>{couponCode}</code></span>
                            </>
                        ) : (
                            <>
                                <span className="red">Invalid Coupon <VscError/> </span>
                            </>
                        )
                    )
                }
                {
                    cartItems.length > 0 && (
                        <Link to={"/shipping"}>Checkout</Link>
                    )
                }

            </aside>
        </div>
    )
}
export default Cart
