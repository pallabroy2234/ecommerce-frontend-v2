import {ChangeEvent, useState} from "react";
import {BiArrowBack} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

type ShippingInfo = {
	address: string;
	city: string;
	state: string;
	country: string;
	pinCode: string;
};

const Shipping = () => {
	const navigate = useNavigate();
	const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
		address: "",
		city: "",
		state: "",
		country: "",
		pinCode: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
	};

	return (
		<div className='shipping'>
			<button onClick={() => navigate("/cart")} className='back-btn'>
				<BiArrowBack />
			</button>
			<form>
				<h1>Shipping Address</h1>
				<input onChange={(e) => handleChange(e)} required type='text' name='address' value={shippingInfo.address} placeholder='Address' />
				<input onChange={(e) => handleChange(e)} required type='text' name='city' value={shippingInfo.city} placeholder='City' />
				<input onChange={(e) => handleChange(e)} required type='text' name='state' value={shippingInfo.state} placeholder='State' />
				<select onChange={(e) => handleChange(e)} name='country' required value={shippingInfo.country}>
					<option value=''>Choose Country</option>
					<option value='Bangladesh'>Bangladesh</option>
				</select>
				<input onChange={(e) => handleChange(e)} required type='number' name='pinCode' value={shippingInfo.pinCode} placeholder='Pin Code' />
				<button type='submit'>Pay Now</button>
			</form>
		</div>
	);
};
export default Shipping;
