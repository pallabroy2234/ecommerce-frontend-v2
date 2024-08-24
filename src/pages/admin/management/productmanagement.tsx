import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FaTrash} from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../../types/reducer-types.ts";
import {useParams} from "react-router-dom";
import {useProductDetailsQuery} from "../../../redux/api/productAPI.ts";
import {apiBaseUrl} from "../../../redux/api/apiBaseUrl.ts";
import {Skeleton} from "../../../components/Loader.tsx";


const Productmanagement = () => {

	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer
	);
	const params = useParams();
	const {data, isLoading} = useProductDetailsQuery(params.id || "");

	const {image, name, price, stock, category} = data?.payload || {
		image: "",
		name: "",
		price: 0,
		stock: 0,
		category: ""
	};


	const [priceUpdate, setPriceUpdate] = useState<number>(price);
	const [stockUpdate, setStockUpdate] = useState<number>(stock);
	const [nameUpdate, setNameUpdate] = useState<string>(name);
	const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
	const [imageUpdate, setImageUpdate] = useState<string>(image);
	const [imageFile, setImageFile] = useState<File>();

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		const reader: FileReader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					setImageUpdate(reader.result);
					setImageFile(file);
				}
			};
		}
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	useEffect(() => {
		if (data) {
			setNameUpdate(data?.payload.name);
			setPriceUpdate(data?.payload.price);
			setStockUpdate(data?.payload.stock);
			setCategoryUpdate(data?.payload.category);
		}
	}, [data]);


	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="product-management">
				{
					isLoading ? <Skeleton/> : (
						<>
							<section>
								<strong>ID - {data?.payload._id}</strong>
								<img src={`${apiBaseUrl}/${image}`} alt="Product" />
								<p>{name}</p>
								{stock > 0 ? (
									<span className="green">{stock} Available</span>
								) : (
									<span className="red"> Not Available</span>
								)}
								<h3>₹{price}</h3>
							</section>
							<article>
								<button className="product-delete-btn">
									<FaTrash />
								</button>
								<form onSubmit={submitHandler}>
									<h2>Manage</h2>
									<div>
										<label>Name</label>
										<input
											type="text"
											placeholder="Name"
											value={nameUpdate}
											onChange={(e) => setNameUpdate(e.target.value)}
										/>
									</div>
									<div>
										<label>Price</label>
										<input
											type="number"
											placeholder="Price"
											value={priceUpdate}
											onChange={(e) => setPriceUpdate(Number(e.target.value))}
										/>
									</div>
									<div>
										<label>Stock</label>
										<input
											type="number"
											placeholder="Stock"
											value={stockUpdate}
											onChange={(e) => setStockUpdate(Number(e.target.value))}
										/>
									</div>

									<div>
										<label>Category</label>
										<input
											type="text"
											placeholder="eg. laptop, camera etc"
											value={categoryUpdate}
											onChange={(e) => setCategoryUpdate(e.target.value)}
										/>
									</div>

									<div>
										<label>Photo</label>
										<input type="file" onChange={changeImageHandler} />
									</div>

									{imageUpdate && <img src={imageUpdate} alt="New Image" />}
									<button type="submit">Update</button>
								</form>
							</article>
						</>
					)
				}
			</main>
		</div>
	);
};

export default Productmanagement;
