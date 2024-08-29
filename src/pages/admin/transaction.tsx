import {ReactElement, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Column} from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {useSelector} from "react-redux";
import {UserReducerInitialState} from "../../types/reducer-types.ts";
import {useAdminAllOrdersQuery} from "../../redux/api/orderAPI.ts";
import {CustomError} from "../../types/api-types.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../../components/Loader.tsx";

interface DataType {
	user: string;
	amount: number;
	discount: number;
	quantity: number;
	status: ReactElement;
	action: ReactElement;
}

const columns: Column<DataType>[] = [
	{
		Header: "Avatar",
		accessor: "user",
	},
	{
		Header: "Amount",
		accessor: "amount",
	},
	{
		Header: "Discount",
		accessor: "discount",
	},
	{
		Header: "Quantity",
		accessor: "quantity",
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

const Transaction = () => {
	const {user} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);
	const {data, isError, isLoading, error} = useAdminAllOrdersQuery(user?._id || "");
	const adminAllOrders = data?.payload || [];

	const [rows, setRows] = useState<DataType[]>([]);

	if (isError) {
		const err = error as CustomError;
		toast.error(err.data.message);
	}

	const Table = TableHOC<DataType>(
		columns,
		rows,
		"dashboard-product-box",
		"Transactions",
		rows.length > 6,
	)();

	useEffect(() => {
		if (data) {
			setRows(
				adminAllOrders.map((item) => ({
					user: item?.user.name,
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
		<div className='admin-container'>
			<AdminSidebar />
			<main>{isLoading ? <Skeleton length={20} /> : Table}</main>
		</div>
	);
};

export default Transaction;
