import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import useAxiosPrivate from "./hook/useAxiosPrivate";

const CheckLogin: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (auth.user && auth.accessToken) {
                    await axiosPrivate.get('/check', {
                        withCredentials: true
                    });
                    navigate('/fund', { state: { from: location }, replace: true });
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
            }
        };

        checkAuthentication();
    }, []);

    return <Outlet />;
};

export default CheckLogin;
