import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

type RequiresAuthProps = {
	children: ReactNode;
};
export default function AuthenticatedRoute({ children }: RequiresAuthProps) {
	const auth = useAuth();
	const location = useLocation();

	if (auth?.loading) return <span>Loading...</span>;
	if (!auth?.user)
		return <Navigate to="/login" state={{ from: location }} replace />;
	return <>{children}</>;
}
