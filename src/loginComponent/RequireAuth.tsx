import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    console.log(auth)

    return (
        auth?.user && auth?.accessToken ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;