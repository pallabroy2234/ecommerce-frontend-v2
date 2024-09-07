import AdminSidebar from "../../../components/admin/AdminSidebar";
import {DoughnutChart, PieChart} from "../../../components/admin/Charts";
// import data from "../../../assets/data.json";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {usePieChartDataQuery} from "../../../redux/api/dashboardAPI.ts";
import {useEffect} from "react";
import {CustomError} from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import {Skeleton} from "../../../components/Loader.tsx";
import {PieChart as PieChartType} from "../../../types/types.ts";

const PieCharts = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const {data, isError, error, isLoading} = usePieChartDataQuery(user?._id || "");

	// Pie Chart Data
	const orderFullFill = (data?.payload?.orderFullFill as PieChartType["orderFullFill"]) || {};
	const categoryPercentage =
		(data?.payload?.categoryPercentage as PieChartType["categoryPercentage"]) || [];
	const stockAvailability =
		(data?.payload?.stockAvailability as PieChartType["stockAvailability"]) || {};
	const revenueDistribution =
		(data?.payload?.revenueDistribution as PieChartType["revenueDistribution"]) || {};
	const adminUser = (data?.payload?.adminUser as PieChartType["adminUser"]) || {};
	const userAgeGroup = (data?.payload?.userAgeGroup as PieChartType["userAgeGroup"]) || {};

	// ! Error handling
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err?.data.message);
		}
	}, [isError, error]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='chart-container'>
				<h1>Pie & Doughnut Charts</h1>
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<section>
							<div>
								<PieChart
									labels={["Processing", "Shipped", "Delivered"]}
									data={[
										orderFullFill.processing,
										orderFullFill.shipped,
										orderFullFill.delivered,
									]}
									backgroundColor={[
										`hsl(110, 80%, 80%)`,
										`hsl(110, 80%, 50%)`,
										`hsl(110, 40%, 50%)`,
									]}
									offset={[0, 0, 50]}
								/>
							</div>
							<h2>Order Fulfillment Ratio</h2>
						</section>

						<section>
							<div>
								<DoughnutChart
									labels={categoryPercentage?.map((item) => Object.keys(item)[0])}
									data={categoryPercentage.map((item) => Object.values(item)[0])}
									backgroundColor={categoryPercentage.map(
										(item) =>
											`hsl(${Object.values(item)[0] * Math.random() * 4}, ${Object.values(item)[0]}%, 50%)`,
									)}
									legends={false}
									offset={[0, 0, 0, 80]}
								/>
							</div>
							<h2>Product Categories Ratio</h2>
						</section>

						<section>
							<div>
								<DoughnutChart
									labels={["In Stock", "Out Of Stock"]}
									data={[stockAvailability.inStock, stockAvailability.outOfStock]}
									backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
									legends={false}
									offset={[0, 80]}
									cutout={"70%"}
								/>
							</div>
							<h2> Stock Availability</h2>
						</section>

						<section>
							<div>
								<DoughnutChart
									labels={[
										"Marketing Cost",
										"Discount",
										"Burnt",
										"Production Cost",
										"Net Margin",
									]}
									data={[
										revenueDistribution.marketingCost,
										revenueDistribution.discount,
										revenueDistribution.burnt,
										revenueDistribution.productionCost,
										revenueDistribution.netMargin,
									]}
									backgroundColor={[
										"hsl(110,80%,40%)",
										"hsl(19,80%,40%)",
										"hsl(69,80%,40%)",
										"hsl(300,80%,40%)",
										"rgb(53, 162, 255)",
									]}
									legends={false}
									offset={[20, 30, 20, 30, 80]}
								/>
							</div>
							<h2>Revenue Distribution</h2>
						</section>

						<section>
							<div>
								<PieChart
									labels={[
										"Teenager(Below 20)",
										"Adult (20-40)",
										"Older (above 40)",
									]}
									data={[userAgeGroup.teen, userAgeGroup.adult, userAgeGroup.old]}
									backgroundColor={[
										`hsl(10, ${80}%, 80%)`,
										`hsl(10, ${80}%, 50%)`,
										`hsl(10, ${40}%, 50%)`,
									]}
									offset={[0, 0, 50]}
								/>
							</div>
							<h2>Users Age Group</h2>
						</section>

						<section>
							<div>
								<DoughnutChart
									labels={["Admin", "Customers"]}
									data={[adminUser.admins, adminUser.users]}
									backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
									offset={[0, 50]}
								/>
							</div>
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default PieCharts;
