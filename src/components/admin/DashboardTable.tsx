// import {Column} from "react-table";
// import TableHOC from "./TableHOC";
// import {OrderItem} from "../../types/api-types.ts";
//
// interface DataType {
// 	// _id: string;
// 	// // quantity: number;
// 	// discount: number;
// 	// quantity: OrderItem[];
// 	// total: number;
// 	// status: string;
// 	// createdAt: string;
//
// 	_id: string;
// 	discount: number;
// 	orderItems: OrderItem[];
// 	status: string;
// 	total: number;
// 	createdAt: string;
// }
//
// const columns: Column<DataType>[] = [
// 	{
// 		Header: "Id",
// 		accessor: "_id",
// 	},
// 	{
// 		Header: "Quantity",
// 		accessor: (row) => row.orderItems.length,
// 	},
// 	{
// 		Header: "Discount",
// 		accessor: "discount",
// 	},
// 	{
// 		Header: "Amount",
// 		accessor: "total",
// 	},
// 	{
// 		Header: "Status",
// 		accessor: "status",
// 	},
// ];
//
// const DashboardTable = ({data = []}: {data: DataType[]}) => {
// 	console.log(data);
//
// 	return TableHOC<DataType>(columns, data, "transaction-box", "Top Transaction")();
// };
//
// export default DashboardTable;

import {Column} from "react-table";
import TableHOC from "./TableHOC";
import {OrderItem} from "../../types/api-types.ts";

interface DataType {
	_id: string;
	discount: number;
	orderItems?: OrderItem[];
	total: number;
	status: string;
	createdAt: string;
}

const columns: Column<DataType>[] = [
	{
		Header: "Id",
		accessor: "_id",
	},
	{
		Header: "Quantity",
		accessor: "orderItems",
		Cell: ({row}: {row: {original: DataType}}) =>
			row.original.orderItems ? row.original.orderItems.length : 0, // Handle missing orderItems
	},
	{
		Header: "Discount",
		accessor: "discount",
	},
	{
		Header: "Amount",
		accessor: "total",
	},
	{
		Header: "Status",
		accessor: "status",
	},
];

const DashboardTable = ({data = []}: {data: DataType[]}) => {
	// Don't invoke TableHOC as a function directly in render
	const TableComponent = TableHOC<DataType>(columns, data, "transaction-box", "Top Transaction");

	return <TableComponent />; // Return the component instead of invoking it
};

export default DashboardTable;
