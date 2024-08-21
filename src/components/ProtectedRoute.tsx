import {ReactElement} from "react";
import {Navigate} from "react-router-dom";

interface PropsType {
	isAuthenticated: boolean;
	children?: ReactElement;
	adminRoute?: boolean;
	isAdmin?: boolean;
	redirect?: string;
}

const ProtectedRoute = ({
	isAuthenticated,
	adminRoute,
	isAdmin,
	redirect = "/",
	children,
}: PropsType) => {
	if (!isAuthenticated) {
		return <Navigate to={redirect} />;
	}

	return <div>ProtectedRoute</div>;
};
export default ProtectedRoute;
