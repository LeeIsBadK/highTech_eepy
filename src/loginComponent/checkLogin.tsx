import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./hook/useAuth";


const CheckLogin: React.FC = () => { //ยังไม่ได้
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken? <Navigate to="/fund" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default CheckLogin;
