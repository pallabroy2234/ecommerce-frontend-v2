import {BiMaleFemale} from "react-icons/bi";
import {BsSearch} from "react-icons/bs";
import {FaRegBell} from "react-icons/fa";
import {HiTrendingDown, HiTrendingUp} from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {BarChart, DoughnutChart} from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {useStatsDataQuery} from "../../redux/api/dashboardAPI.ts";
import {useEffect} from "react";
import {CustomError} from "../../types/api-types.ts";
import toast from "react-hot-toast";
import {Count, Percentage, Stats} from "../../types/types.ts";
import {Skeleton} from "../../components/Loader.tsx";

const userImg =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
	const {user} = useSelector((state: RootState) => state.userReducer);
	const {data, isLoading, isError, error} = useStatsDataQuery(user?._id || "");

	// Destructors data
	const categoryCount = (data?.payload?.categoryCount as Stats["categoryCount"]) || [];
	const percentage = (data?.payload?.percentage as Percentage) || {};
	const count = (data?.payload?.count as Count) || {};
	const chart = (data?.payload?.chart as Stats["chart"]) || {};
	const userRatio = (data?.payload?.userRatio as Stats["userRatio"]) || {};
	const latestTransactions =
		(data?.payload?.latestTransactions as Stats["latestTransactions"]) || [];

	// !  Error
	useEffect(() => {
		if (isError) {
			const err = error as CustomError;
			toast.error(err?.data.message);
		}
	}, [isError, error]);
	return (
		<div className='admin-container'>
			<AdminSidebar />
			<main className='dashboard'>
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<div className='bar'>
							<BsSearch />
							<input type='text' placeholder='Search for data, users, docs' />
							<FaRegBell />
							<img src={(user?.image as string) || userImg} alt={user?.name} />
						</div>

						<section className='widget-container'>
							<WidgetItem
								percent={percentage.revenue}
								amount={true}
								value={count.totalRevenue}
								heading='Revenue'
								color='rgb(0, 115, 255)'
							/>
							<WidgetItem
								percent={percentage.user}
								value={count.totalUsers}
								color='rgb(0 198 202)'
								heading='Users'
							/>
							<WidgetItem
								percent={percentage.order}
								value={count.totalOrders}
								color='rgb(255 196 0)'
								heading='Transactions'
							/>

							<WidgetItem
								percent={percentage.product}
								value={count.totalProducts}
								color='rgb(76 0 255)'
								heading='Products'
							/>
						</section>

						<section className='graph-container'>
							<div className='revenue-chart'>
								<h2>Revenue & Transaction</h2>
								<BarChart
									data_2={chart.orderMonthCounts}
									data_1={chart.orderMonthRevenue}
									title_1='Revenue'
									title_2='Transaction'
									bgColor_1='rgb(0, 115, 255)'
									bgColor_2='rgba(53, 162, 235, 0.8)'
								/>
							</div>

							<div className='dashboard-categories'>
								<h2>Inventory</h2>

								<div>
									{categoryCount.map((i, index) => {
										const [[key, value]] = Object.entries(i);
										return (
											<CategoryItem
												key={index}
												value={value}
												heading={key}
												color={`hsl(${value * 4}, ${value}%, 50%)`}
											/>
										);
									})}
								</div>
							</div>
						</section>

						<section className='transaction-container'>
							<div className='gender-chart'>
								<h2>Gender Ratio</h2>
								<DoughnutChart
									labels={["Female", "Male", "Other"]}
									data={[userRatio.female, userRatio.male, userRatio.other]}
									backgroundColor={[
										"hsl(340, 82%, 56%)",
										"rgba(53, 162, 235, 0.8)",
										"rgba(102, 102, 102, 0.8)", // Color for "Other"
									]}
									cutout={70}
								/>
								<p>
									<BiMaleFemale />
								</p>
							</div>
							<Table data={latestTransactions} />
						</section>
					</>
				)}
			</main>
		</div>
	);
};

interface WidgetItemProps {
	heading: string;
	value: number;
	percent: number;
	color: string;
	amount?: boolean;
}

const WidgetItem = ({heading, value, percent, color, amount = false}: WidgetItemProps) => (
	<article className='widget'>
		<div className='widget-info'>
			<p>{heading}</p>
			<h4>{amount ? `₹${value}` : value}</h4>
			{percent > 0 ? (
				<span className='green'>
					<HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
				</span>
			) : (
				<span className='red'>
					<HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
				</span>
			)}
		</div>

		<div
			className='widget-circle'
			style={{
				background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
			}}>
			<span
				style={{
					color,
				}}>
				{percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
				{percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
			</span>
		</div>
	</article>
);

interface CategoryItemProps {
	color: string;
	value: number;
	heading: string;
}

const CategoryItem = ({color, value, heading}: CategoryItemProps) => (
	<div className='category-item'>
		<h5>{heading}</h5>
		<div>
			<div
				style={{
					backgroundColor: color,
					width: `${value}%`,
				}}></div>
		</div>
		<span>{value}%</span>
	</div>
);

export default Dashboard;
