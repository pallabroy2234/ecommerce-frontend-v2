import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {BiArrowBack} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {CartReducerInitialState} from "../types/reducer-types.ts";
import axios from "axios";
import {apiBaseUrl} from "../redux/api/apiBaseUrl.ts";
import toast from "react-hot-toast";

type ShippingInfo = {
	address: string;
	city: string;
	division: string;
	country: string;
	postCode: string;
};

const Shipping = () => {
	const {cartItems, total} = useSelector(
		(state: {cartReducer: CartReducerInitialState}) => state.cartReducer,
	);
	const navigate = useNavigate();

	const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
		address: "",
		city: "",
		division: "",
		country: "",
		postCode: "",
	});

	// * Handle Change
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
	};

	// * Submit Handler
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const {data} = await axios.post(
				`${apiBaseUrl}/api/v1/payment/create`,
				{
					amount: total,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			navigate("/pay", {
				state: data?.payload,
			});
		} catch (error) {
			toast.error("Something went wrong.");
		}
	};

	useEffect(() => {
		if (cartItems.length <= 0) {
			navigate("/cart");
		}
	}, [cartItems]);

	return (
		<div className='shipping'>
			<button onClick={() => navigate("/cart")} className='back-btn'>
				<BiArrowBack />
			</button>
			<form onSubmit={handleSubmit}>
				<h1>Shipping Address</h1>
				<input
					onChange={(e) => handleChange(e)}
					required
					type='text'
					name='address'
					value={shippingInfo.address}
					placeholder='Address'
				/>
				<input
					onChange={(e) => handleChange(e)}
					required
					type='text'
					name='city'
					value={shippingInfo.city}
					placeholder='City'
				/>
				<input
					onChange={(e) => handleChange(e)}
					required
					type='text'
					name='division'
					value={shippingInfo.division}
					placeholder='division'
				/>
				<select
					onChange={(e) => handleChange(e)}
					name='country'
					required
					value={shippingInfo.country}>
					<option value=''>Choose Country</option>
					<option value='Bangladesh'>Bangladesh</option>
				</select>
				<input
					onChange={(e) => handleChange(e)}
					required
					type='number'
					name='postCode'
					value={shippingInfo.postCode}
					placeholder='Pin Code'
				/>
				<button type='submit'>Pay Now</button>
			</form>
		</div>
	);
};
export default Shipping;
