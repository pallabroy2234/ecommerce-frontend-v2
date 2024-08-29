import {FaTrash} from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {useEffect} from "react";
import {OrderItem} from "../../../types/api-types.ts";
import {apiBaseUrl} from "../../../redux/api/apiBaseUrl";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../../types/reducer-types.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
	useDeleteOrderMutation,
	useOrderDetailsQuery,
	useUpdateOrderStatusMutation,
} from "../../../redux/api/orderAPI.ts";
import {Order} from "../../../types/types.ts";
import {Skeleton} from "../../../components/Loader.tsx";
import {responseToast} from "../../../utils/feature.ts";
import toast from "react-hot-toast";

const defaultData: Order = {
	_id: "",
	shippingInfo: {
		address: "",
		city: "",
		division: "",
		country: "",
		postCode: 0,
	},
	status: "",
	subtotal: 0,
	discount: 0,
	shippingCharges: 0,
	tax: 0,
	total: 0,
	orderItems: [],
	user: {
		name: "",
		_id: "",
	},
};
const TransactionManagement = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);
	// Order Details Query
	const {data, isError, isLoading} = useOrderDetailsQuery({
		orderId: id || "",
		userId: user?._id || "",
	});

	// Update Order Status Mutation
	const [updateOrderStatus] = useUpdateOrderStatusMutation();
	// Delete Order Mutation
	const [deleteOrder] = useDeleteOrderMutation();

	const {
		shippingInfo: {address, city, country, division, postCode},
		status,
		subtotal,
		discount,
		shippingCharges,
		tax,
		total,
		orderItems,
		user: {name},
	} = data?.payload || defaultData;

	// Update Order Handler
	const updateHandler = async () => {
		try {
			const res = await updateOrderStatus({
				userId: user?._id || "",
				orderId: data?.payload._id || "",
			});
			responseToast(res, navigate, "/admin/transaction");
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	// Delete Order Handler
	const deleteHandler = async () => {
		try {
			const res = await deleteOrder({
				userId: user?._id || "",
				orderId: data?.payload._id || "",
			});
			responseToast(res, navigate, "/admin/transaction");
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (isError) {
			return navigate("/404");
		}
	}, [isError, navigate]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='product-management'>
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<section
							style={{
								padding: "2rem",
							}}>
							<h2>Order Items</h2>

							{orderItems.map((i) => (
								<ProductCard
									key={i._id}
									name={i.name}
									image={`${apiBaseUrl}/${i.image}`}
									productId={i.productId}
									_id={i._id}
									quantity={i.quantity}
									price={i.price}
								/>
							))}
						</section>

						<article className='shipping-info-card'>
							<button className='product-delete-btn' onClick={deleteHandler}>
								<FaTrash />
							</button>
							<h1>Order Info</h1>
							<h5>User Info</h5>
							<p>Name: {name}</p>
							<p className=''>
								Address:&nbsp;
								{`${address}, ${city}, ${division}, ${country} ${postCode}`}
							</p>
							<h5>Amount Info</h5>
							<p>Subtotal: {subtotal}</p>
							<p>Shipping Charges: {shippingCharges}</p>
							<p>Tax: {tax}</p>
							<p>Discount: {discount}</p>
							<p>Total: {total}</p>

							<h5>Status Info</h5>
							<p>
								Status:
								<span
									className={
										status === "processing"
											? "green"
											: status === "shipped"
												? "red"
												: "purple"
									}>
									&nbsp;{status}
								</span>
							</p>
							<button className='shipping-btn' onClick={updateHandler}>
								Process Status
							</button>
						</article>
					</>
				)}
			</main>
		</div>
	);
};

const ProductCard = ({name, image, price, quantity, productId}: OrderItem) => (
	<div className='transaction-product-card'>
		<img src={image} alt={name} />
		<Link to={`/admin/product/${productId}`}>{name}</Link>
		<span>
			&#2547;{price} X {quantity} = &#2547;{price * quantity}
		</span>
	</div>
);

export default TransactionManagement;
