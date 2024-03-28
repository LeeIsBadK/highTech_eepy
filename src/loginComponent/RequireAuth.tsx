import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(auth)

    return (
        auth?.roles? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;