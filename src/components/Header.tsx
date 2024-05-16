import {Link} from "react-router-dom";
import {FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {useState} from "react";

const user = {
    _id: "",
    role: "admin"
}


const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const handleLogout = ()=> {
        setIsOpen(false)
        console.log("Logout")
    }


    return (
        <nav className="header">
            <Link to={"/"} onClick={()=> setIsOpen(false)} >Home</Link>
            <Link to={"/search"} onClick={()=> setIsOpen(false)}><FaSearch/></Link>
            <Link to={"/cart"} onClick={()=> setIsOpen(false)}><FaShoppingBag/></Link>
            {
                user && user?._id ? (
                    <>
                        <button onClick={() => setIsOpen((prev) => !prev)} type="button"><FaUser/></button>
                        <dialog open={isOpen}>
                            <div>
                                {
                                    user?.role === "admin" && (
                                        <Link to={"/admin/dashboard"} onClick={()=> setIsOpen(false)} >Admin</Link>
                                    )
                                }

                                <Link to={"/orders"} onClick={()=> setIsOpen(false)} >Orders</Link>
                                <button onClick={handleLogout} type="button"><FaSignOutAlt/></button>
                            </div>
                        </dialog>
                    </>
                ) : (
                    <Link to={"/login"}><FaSignInAlt/></Link>
                )
            }
        </nav>
    )
}
export default Header
