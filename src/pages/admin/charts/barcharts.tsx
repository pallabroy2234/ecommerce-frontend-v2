import AdminSidebar from "../../../components/admin/AdminSidebar";
import {BarChart} from "../../../components/admin/Charts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import {useBarChartDataQuery} from "../../../redux/api/dashboardAPI.ts";
import {useEffect} from "react";
import {CustomError} from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import {BarChart as BarChartType} from "../../../types/types.ts";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const Barcharts = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const {data, isError, error, isLoading} = useBarChartDataQuery(user?._id ?? "");

	//  Bar Chart Data
	const productCount =
		(data?.payload?.productCount as BarChartType["productCount"]) || Array(6).fill(0);
	const userCount = (data?.payload?.userCount as BarChartType["userCount"]) || Array(6).fill(0);
	const orderCount =
		(data?.payload?.orderCount as BarChartType["orderCount"]) || Array(12).fill(0);

	// ! Error handling
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err?.data?.message);
		}
	}, [isError, error]);

	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='chart-container'>
				<h1>Bar Charts</h1>
				<section>
					<BarChart
						data_2={[300, 144, 433, 655, 237, 755, 190]}
						data_1={[200, 444, 343, 556, 778, 455, 990]}
						title_1='Products'
						title_2='Users'
						bgColor_1={`hsl(260, 50%, 30%)`}
						bgColor_2={`hsl(360, 90%, 90%)`}
					/>
					<h2>Top Products & Top Customers</h2>
				</section>

				<section>
					<BarChart
						horizontal={true}
						data_1={[200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909]}
						data_2={[]}
						title_1='Orders'
						title_2=''
						bgColor_1={`hsl(180, 40%, 50%)`}
						bgColor_2=''
						labels={months}
					/>
					<h2>Orders throughout the year</h2>
				</section>
			</main>
		</div>
	);
};

export default Barcharts;
