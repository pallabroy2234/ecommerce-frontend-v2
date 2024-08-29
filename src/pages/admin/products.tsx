import {ReactElement, useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import {Column} from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {useAdminAllProductsQuery} from "../../redux/api/productAPI.ts";
import {apiBaseUrl} from "../../redux/api/apiBaseUrl.ts";
import toast from "react-hot-toast";
import {CustomError} from "../../types/api-types.ts";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../types/reducer-types.ts";
import {Skeleton} from "../../components/Loader.tsx";

interface DataType {
	image: ReactElement;
	name: string;
	price: number;
	stock: number;
	action: ReactElement;
}

const columns: Column<DataType>[] = [
	{
		Header: "Photo",
		accessor: "image",
	},
	{
		Header: "Name",
		accessor: "name",
	},
	{
		Header: "Price",
		accessor: "price",
	},
	{
		Header: "Stock",
		accessor: "stock",
	},
	{
		Header: "Action",
		accessor: "action",
	},
];

const Products = () => {
	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);
	const {data, isLoading, isError, error} = useAdminAllProductsQuery(user?._id || "");
	const adminAllProducts = data?.payload || [];
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err.data.message);
		}
	}, [isError, error]);

	useEffect(() => {
		if (data) {
			setRows(
				adminAllProducts.map((item) => ({
					image: <img src={`${apiBaseUrl}/${item?.image}`} alt={item?.name} />,
					name: item?.name,
					price: item?.price,
					stock: item?.stock,
					action: <Link to={`/admin/product/${item?._id}`}>Manage</Link>,
				})),
			);
		}
	}, [data]);

	const Table = TableHOC<DataType>(
		columns,
		rows,
		"dashboard-product-box",
		"Products",
		rows.length > 6,
	)();

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main>{isLoading ? <Skeleton length={20} /> : Table}</main>
			<Link to='/admin/product/new' className='create-product-btn'>
				<FaPlus />
			</Link>
		</div>
	);
};

export default Products;
