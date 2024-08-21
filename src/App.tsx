import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import Loader from "./components/Loader.tsx";
import Header from "./components/Header.tsx";
import {Toaster} from "react-hot-toast";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase.ts";
import {userExist, userNotExist} from "./redux/reducer/userReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./redux/api/userAPI.ts";
import {UserReducerInitialState} from "./types/reducer-types.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Shipping = lazy(() => import("./pages/Shipping.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const OrderDetails = lazy(() => import("./pages/OrderDetails.tsx"));
// * Admin Routes
const Dashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const Products = lazy(() => import("./pages/admin/products.tsx"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(() => import("./pages/admin/management/productmanagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));

const App = () => {
	const dispatch = useDispatch();
	const {user, loading} = useSelector(
		(state: {userReducer: UserReducerInitialState}) => state.userReducer,
	);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const data = await getUser(user.uid);
				dispatch(userExist(data.payload));
			} else {
				dispatch(userNotExist());
			}
		});
	}, []);

	return loading ? (
		<Loader />
	) : (
		<Router>
			{/*  Header   */}

			<Header user={user} />

			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/cart' element={<Cart />} />

					{/* Only Not Logged In User Route */}
					<Route element={<ProtectedRoute isAuthenticated={!user} />}>
						<Route path='/login' element={<Login />} />
					</Route>

					{/* Only  Logged In User Routes */}
					<Route element={<ProtectedRoute isAuthenticated={!!user} />}>
						<Route path='/shipping' element={<Shipping />} />
						<Route path='/orders' element={<Orders />} />
						<Route path='/order/:id' element={<OrderDetails />} />
					</Route>

					{/* Ony Admin Routes  */}
					<Route
						element={
							<ProtectedRoute
								isAuthenticated={!!user}
								adminRoute={true}
								isAdmin={user?.role === "admin"}
							/>
						}>
						<Route path='/admin/dashboard' element={<Dashboard />} />
						<Route path='/admin/product' element={<Products />} />
						<Route path='/admin/customer' element={<Customers />} />
						<Route path='/admin/transaction' element={<Transaction />} />
						{/* Charts */}
						<Route path='/admin/chart/bar' element={<Barcharts />} />
						<Route path='/admin/chart/pie' element={<Piecharts />} />
						<Route path='/admin/chart/line' element={<Linecharts />} />
						{/* Apps */}
						<Route path='/admin/app/coupon' element={<Coupon />} />
						<Route path='/admin/app/stopwatch' element={<Stopwatch />} />
						<Route path='/admin/app/toss' element={<Toss />} />

						{/* Management */}
						<Route path='/admin/product/new' element={<NewProduct />} />
						<Route path='/admin/product/:id' element={<ProductManagement />} />
						<Route path='/admin/transaction/:id' element={<TransactionManagement />} />
					</Route>
				</Routes>
			</Suspense>
			<Toaster position='bottom-center' />
		</Router>
	);
};
export default App;
