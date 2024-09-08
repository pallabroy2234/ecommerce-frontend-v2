import AdminSidebar from "../../../components/admin/AdminSidebar";
import {LineChart} from "../../../components/admin/Charts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {useLineChartDataQuery} from "../../../redux/api/dashboardAPI.ts";
import {LineChart as LineChartType} from "../../../types/types";
import {useEffect} from "react";
import {CustomError} from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../../../components/Loader.tsx";
import {getLastMonth} from "../../../utils/feature.ts";

const Linecharts = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const {data, isLoading, isError, error} = useLineChartDataQuery(user?._id ?? "");

	// Line Chart Data
	const lastTwelveMonthDiscount =
		(data?.payload?.discount as LineChartType["discount"]) || Array(12).fill(0);
	const lastTwelveMonthRevenue =
		(data?.payload?.revenue as LineChartType["revenue"]) || Array(12).fill(0);
	const lastTwelveMonthProduct =
		(data?.payload?.products as LineChartType["products"]) || Array(12).fill(0);
	const lastTwelveMonthUser =
		(data?.payload?.users as LineChartType["users"]) || Array(12).fill(0);

	// Get month names
	const {lastTwelveMonth} = getLastMonth();

	// ! Error handling
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err.data?.message);
		}
	}, [isError, error]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='chart-container'>
				<h1>Line Charts</h1>
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<section>
							<LineChart
								data={lastTwelveMonthUser}
								label='Users'
								borderColor='rgb(53, 162, 255)'
								labels={lastTwelveMonth}
								backgroundColor='rgba(53, 162, 255, 0.5)'
							/>
							<h2>Active Users</h2>
						</section>

						<section>
							<LineChart
								data={lastTwelveMonthProduct}
								backgroundColor={"hsla(269,80%,40%,0.4)"}
								borderColor={"hsl(269,80%,40%)"}
								labels={lastTwelveMonth}
								label='Products'
							/>
							<h2>Total Products (SKU)</h2>
						</section>

						<section>
							<LineChart
								data={lastTwelveMonthRevenue}
								backgroundColor={"hsla(129,80%,40%,0.4)"}
								borderColor={"hsl(129,80%,40%)"}
								label='Revenue'
								labels={lastTwelveMonth}
							/>
							<h2>Total Revenue </h2>
						</section>

						<section>
							<LineChart
								data={lastTwelveMonthDiscount}
								backgroundColor={"hsla(29,80%,40%,0.4)"}
								borderColor={"hsl(29,80%,40%)"}
								label='Discount'
								labels={lastTwelveMonth}
							/>
							<h2>Discount Allotted </h2>
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default Linecharts;
