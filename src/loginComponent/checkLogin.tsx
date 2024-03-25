import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./hook/useAuth";
import { useEffect } from "react";

const CheckLogin: React.FC = () => { //ยังไม่ได้
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    console.log(auth);

    useEffect(() => {
        if (auth.user && auth.accessToken) {
            navigate('/fund', { state: { from: location }, replace: true });
        }
    }, [auth, navigate, location]);

    return <Outlet />;
}

export default CheckLogin;
