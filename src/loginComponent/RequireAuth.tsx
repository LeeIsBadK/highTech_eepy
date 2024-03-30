import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "./hook/useAxiosPrivate";
import AuthContext from "./context/AuthProvider";

const RequireAuth: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState<JSX.Element>(<Outlet />);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth.user === '' && auth.accessToken === '') {
            navigate('/login', { state: { from: location }, replace: true });
        }
        const checkAuthentication = async () => {
            try {
                await axiosPrivate.get('/check', {
                    withCredentials: true
                });
            } catch (error) {
                console.error(error);
                setShow(
                    <>
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
                            style={{
                                fontFamily: "'Noto Sans Thai', sans-serif",
                            }}
                        >
                            <div className="bg-white flex flex-col items-center py-8 px-16 space-y-6 rounded-md shadow-md relative">
                                <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold">เซสชั่นหมดอายุ</p>
                                <p className="pb-1 sm:text-[12px] md:text-[14px] lg:text-[16px]">โปรดเข้าสู่ระบบใหม่</p>
                                <a href="/login">
                                    <button className={`px-5 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[12px] md:text-[14px] lg:text-[16px] font-semibold shadow-md `}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        ตกลง
                                    </button>
                                </a>
                            </div>
                        </div>
                        <Outlet />
                    </>
                );
            }
        };

        checkAuthentication();
    }, [show]);

    return (
        <>
            {show}
        </>
    );
};

export default RequireAuth;
