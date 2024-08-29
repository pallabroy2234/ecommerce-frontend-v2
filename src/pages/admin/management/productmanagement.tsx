import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FaTrash} from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../../types/reducer-types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {
	useDeleteProductMutation,
	useProductDetailsQuery,
	useUpdateProductMutation,
} from "../../../redux/api/productAPI.ts";
import {apiBaseUrl} from "../../../redux/api/apiBaseUrl.ts";
import {Skeleton} from "../../../components/Loader.tsx";
import toast from "react-hot-toast";
import {responseToast} from "../../../utils/feature.ts";

const Productmanagement = () => {
	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);
	const params = useParams();
	const navigate = useNavigate();
	const {data, isLoading, isError} = useProductDetailsQuery(params.id || "");

	const {image, name, price, stock, category} = data?.payload || {
		image: "",
		name: "",
		price: 0,
		stock: 0,
		category: "",
	};

	const [priceUpdate, setPriceUpdate] = useState<number>(price);
	const [stockUpdate, setStockUpdate] = useState<number>(stock);
	const [nameUpdate, setNameUpdate] = useState<string>(name);
	const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
	const [imageUpdate, setImageUpdate] = useState<string>(image);
	const [imageFile, setImageFile] = useState<File>();

	// * Update Product Mutation
	const [updateProduct] = useUpdateProductMutation();

	// * Delete Product Mutation
	const [deleteProduct] = useDeleteProductMutation();

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

	// * Submit Handler to update product
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		if (nameUpdate) formData.set("name", nameUpdate);
		if (priceUpdate) formData.set("price", priceUpdate.toString());
		if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
		if (categoryUpdate) formData.set("category", categoryUpdate);
		if (imageFile) formData.set("image", imageFile);
		try {
			const res = await updateProduct({
				formData,
				userId: user?._id || "",
				id: params.id || "",
			});
			responseToast(res, navigate, "/admin/product");
		} catch (error) {
			toast.error("Failed to update product");
		}
	};

	// * Delete Product Handler
	const deleteProductHandler = async () => {
		try {
			const res = await deleteProduct({userId: user?._id || "", id: params.id || ""});
			responseToast(res, navigate, "/admin/product");
		} catch (error) {
			toast.error("Failed to delete product");
		}
	};

	useEffect(() => {
		if (isError) {
			return navigate("/404");
		}
	}, [isError, navigate]);

	useEffect(() => {
		if (data) {
			setNameUpdate(data?.payload.name);
			setPriceUpdate(data?.payload.price);
			setStockUpdate(data?.payload.stock);
			setCategoryUpdate(data?.payload.category);
			setImageUpdate("");
		}
	}, [data]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='product-management'>
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<section>
							<strong>ID - {data?.payload._id}</strong>
							<img src={`${apiBaseUrl}/${image}`} alt='Product' />
							<p>{name}</p>
							{stock > 0 ? (
								<span className='green'>{stock} Available</span>
							) : (
								<span className='red'> Not Available</span>
							)}
							<h3>₹{price}</h3>
						</section>
						<article>
							<button className='product-delete-btn' onClick={deleteProductHandler}>
								<FaTrash />
							</button>
							<form onSubmit={submitHandler}>
								<h2>Manage</h2>
								<div>
									<label>Name</label>
									<input
										type='text'
										placeholder='Name'
										value={nameUpdate}
										onChange={(e) => setNameUpdate(e.target.value)}
									/>
								</div>
								<div>
									<label>Price</label>
									<input
										type='number'
										placeholder='Price'
										value={priceUpdate}
										onChange={(e) => setPriceUpdate(Number(e.target.value))}
									/>
								</div>
								<div>
									<label>Stock</label>
									<input
										type='number'
										placeholder='Stock'
										value={stockUpdate}
										onChange={(e) => setStockUpdate(Number(e.target.value))}
									/>
								</div>

								<div>
									<label>Category</label>
									<input
										type='text'
										placeholder='eg. laptop, camera etc'
										value={categoryUpdate}
										onChange={(e) => setCategoryUpdate(e.target.value)}
									/>
								</div>

								<div>
									<label>Photo</label>
									<input type='file' onChange={changeImageHandler} />
								</div>

								{imageUpdate && <img src={imageUpdate} alt='New Image' />}
								<button type='submit'>Update</button>
							</form>
						</article>
					</>
				)}
			</main>
		</div>
	);
};

export default Productmanagement;
