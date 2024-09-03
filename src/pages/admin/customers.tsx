import {ReactElement, useEffect, useState} from "react";
import {Column} from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {useDeleteUserByAdminMutation, useGetAllUserByAdminQuery} from "../../redux/api/userAPI.ts";
import {CustomError} from "../../types/api-types.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../../components/Loader.tsx";
import {FaTrash} from "react-icons/fa";
import {responseToast} from "../../utils/feature.ts";

interface DataType {
	avatar: ReactElement;
	name: string;
	email: string;
	gender: string;
	role: string;
	action: ReactElement;
}

const columns: Column<DataType>[] = [
	{
		Header: "Avatar",
		accessor: "avatar",
	},
	{
		Header: "Name",
		accessor: "name",
	},
	{
		Header: "Gender",
		accessor: "gender",
	},
	{
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Role",
		accessor: "role",
	},
	{
		Header: "Action",
		accessor: "action",
	},
];

const Customers = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const [rows, setRows] = useState<DataType[]>([]);
	const {data, isLoading, isError, error} = useGetAllUserByAdminQuery(user?._id || "");
	// Get all users
	const users = data?.payload || [];
	//  Delete user mutation
	const [deleteUser] = useDeleteUserByAdminMutation();

	const Table = TableHOC<DataType>(
		columns,
		rows,
		"dashboard-product-box",
		"Customers",
		rows.length > 6,
	)();

	// Delete handler
	const handleDeleteUser = async (id: string) => {
		try {
			const res = await deleteUser({userId: id, id: user?._id || ""});
			responseToast(res, null, "");
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	// Data
	useEffect(() => {
		if (data) {
			setRows(
				users.map((item) => ({
					avatar: <img src={`${item?.image}`} alt={item?.name} />,
					name: item?.name,
					email: item?.email,
					gender: item?.gender,
					role: item?.role!,
					action: (
						<button type='button' onClick={() => handleDeleteUser(item?._id)}>
							<FaTrash />
						</button>
					),
				})),
			);
		}
	}, [data]);

	// handle Error
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err.data.message);
		}
	}, [isError, error]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main>{isLoading ? <Skeleton length={20} /> : Table}</main>
		</div>
	);
};

export default Customers;
