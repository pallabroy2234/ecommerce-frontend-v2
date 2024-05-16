import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loader from "./components/Loader.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));


const App = () => {
    return (
        <Router>
            {/*  Header   */}
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </Suspense>
        </Router>
    )
}
export default App
