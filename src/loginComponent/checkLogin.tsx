import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthProvider";


const CheckLogin: React.FC = () => { //ยังไม่ได้
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.user && auth?.accessToken ? <Navigate to="/fund" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default CheckLogin;
