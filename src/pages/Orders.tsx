import TableHOC from "../components/admin/TableHOC.tsx";
import {ReactElement, useEffect, useState} from "react";
import {Column} from "react-table";
import {useSelector} from "react-redux";
import {useMyOrdersQuery} from "../redux/api/orderAPI.ts";
import {CustomError} from "../types/api-types.ts";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {Skeleton} from "../components/Loader.tsx";
import {RootState} from "../redux/store.ts";

type DataType = {
	_id: String;
	amount: number;
	quantity: number;
	discount: number;
	status: ReactElement;
	action: ReactElement;
};

const column: Column<DataType>[] = [
	{
		Header: "ID",
		accessor: "_id",
	},
	{
		Header: "Quantity",
		accessor: "quantity",
	},
	{
		Header: "Discount",
		accessor: "discount",
	},
	{
		Header: "Amount",
		accessor: "amount",
	},
	{
		Header: "Status",
		accessor: "status",
	},
	{
		Header: "Action",
		accessor: "action",
	},
];
const Orders = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const {data, isError, isLoading, error} = useMyOrdersQuery(user?._id || "");
	const myOrders = data?.payload || [];
	const [rows, setRows] = useState<DataType[]>([]);

	const Table = TableHOC<DataType>(
		column,
		rows,
		"dashboard-product-box",
		"Orders",
		rows.length > 6,
	)();

	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err.data.message);
		}
	}, [isError, error]);

	useEffect(() => {
		if (data) {
			setRows(
				myOrders.map((item) => ({
					_id: item?._id,
					amount: item?.total,
					discount: item?.discount,
					quantity: item?.orderItems.length,
					status: (
						<span
							className={
								item?.status === "processing"
									? "green"
									: item?.status === "shipped"
										? "red"
										: "purple"
							}>
							{item?.status}
						</span>
					),
					action: <Link to={`/admin/transaction/${item?._id}`}>Management</Link>,
				})),
			);
		}
	}, [data]);

	return (
		<div className='container'>
			<h1>My Orders</h1>
			{isLoading ? <Skeleton length={20} /> : Table}
			{myOrders.length > 0 ? null : <h2>No Orders</h2>}
		</div>
	);
};
export default Orders;
