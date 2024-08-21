import {ReactElement} from "react";
import {Navigate, Outlet} from "react-router-dom";

interface Props {
	isAuthenticated: boolean;
	adminRoute?: boolean;
	isAdmin?: boolean;
	children?: ReactElement;
	redirect?: string;
}

const ProtectedRoute = ({
	isAuthenticated,
	adminRoute,
	isAdmin,
	redirect = "/",
	children,
}: Props) => {
	if (!isAuthenticated) {
		return <Navigate to={redirect} />;
	}
	if (adminRoute && !isAdmin) {
		return <Navigate to={redirect} />;
	}

	return children ? children : <Outlet />;
};
export default ProtectedRoute;
