import {ChangeEvent, useState, FormEvent} from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../../types/reducer-types.ts";
import {useNewProductMutation} from "../../../redux/api/productAPI.ts";
import {useNavigate} from "react-router-dom";
import {responseToast} from "../../../utils/feature.ts";
import toast from "react-hot-toast";

const NewProduct = () => {
	const navigate = useNavigate();
	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);

	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [price, setPrice] = useState<number>(58);
	const [stock, setStock] = useState<number>(1);
	const [photoPrev, setPhotoPrev] = useState<string>("");
	const [image, setImage] = useState<File>();

	const [newProduct] = useNewProductMutation();

	// * Submit Handler
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !price || !stock || !category || !image) return;

		const formData = new FormData();
		formData.set("name", name);
		formData.set("price", price.toString());
		formData.set("stock", stock.toString());
		formData.set("category", category);
		formData.set("image", image);

		try {
			const res = await newProduct({id: user?._id || "", formData});
			responseToast(res, navigate, "/admin/product");
		} catch (error) {
			toast.error("Failed to create product");
		}
	};

	// * FileReader is a built-in object that allows you to read the contents of a file stored on the user's computer.
	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];
		const reader: FileReader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					setPhotoPrev(reader.result);
					setImage(file);
				}
			};
		}
	};

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='product-management'>
				<article>
					<form onSubmit={handleSubmit}>
						<h2>New Product</h2>
						<div>
							<label>Name</label>
							<input
								required
								type='text'
								placeholder='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label>Price</label>
							<input
								required
								type='number'
								placeholder='Price'
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
							/>
						</div>
						<div>
							<label>Stock</label>
							<input
								defaultValue={1}
								required
								type='number'
								placeholder='Stock'
								value={stock}
								onChange={(e) => setStock(Number(e.target.value))}
							/>
						</div>

						<div>
							<label>Category</label>
							<input
								required
								type='text'
								placeholder='eg. laptop, camera etc'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>

						<div>
							<label>Photo</label>
							<input required type='file' onChange={changeImageHandler} />
						</div>

						{photoPrev && <img src={photoPrev} alt='New Image' />}
						<button type='submit'>Create</button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default NewProduct;
