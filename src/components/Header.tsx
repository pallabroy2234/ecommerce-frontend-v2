import {Link} from "react-router-dom";
import {FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {useState} from "react";
import {User} from "../types/types.ts";
import {signOut} from "firebase/auth";
import {auth} from "../firebase.ts";
import toast from "react-hot-toast";

interface PropsType {
	user: User | null;
}

const Header = ({user}: PropsType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success("Sign out successfully");

			setIsOpen(false);
		} catch (error) {
			toast.error("Sign out failed");
		}
	};

	return (
		<nav className='header'>
			<Link to={"/"} onClick={() => setIsOpen(false)}>
				HOME
			</Link>
			<Link to={"/search"} onClick={() => setIsOpen(false)}>
				<FaSearch />
			</Link>
			<Link to={"/cart"} onClick={() => setIsOpen(false)}>
				<FaShoppingBag />
			</Link>
			{user && user?._id ? (
				<>
					<button onClick={() => setIsOpen((prev) => !prev)} type='button'>
						<FaUser />
					</button>
					<dialog open={isOpen}>
						<div>
							{user?.role === "admin" && (
								<Link to={"/admin/dashboard"} onClick={() => setIsOpen(false)}>
									Admin
								</Link>
							)}
							<Link to={"/orders"} onClick={() => setIsOpen(false)}>
								Orders
							</Link>
							<button onClick={handleLogout} type='button'>
								<FaSignOutAlt />
							</button>
						</div>
					</dialog>
				</>
			) : (
				<Link to={"/login"}>
					<FaSignInAlt />
				</Link>
			)}
		</nav>
	);
};
export default Header;
