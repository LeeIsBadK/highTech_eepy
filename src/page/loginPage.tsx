import { useRef, useState, useEffect } from 'react';
import useAuth from '../loginComponent/hook/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import lhFund from '../assets/lhFund.png';

import axios from '../loginComponent/api/axios';
const LOGIN_URL = '/auth';

const LoginPage: React.FC = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/fund";

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('กรุณาใส่ชื่อผู้ใช้กับรหัสผ่าน');
            } else if (err.response?.status === 401) {
                setErrMsg('ไม่พบข้อมูลผู้ใช้');
            } else {
                setErrMsg('เข้าสู่ระบบผิดพลาด');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            style={{
                fontFamily: "'Noto Sans Thai', sans-serif",
            }}
        >
            <img src={lhFund} alt="Sign in" className="mt-5 mb-7 lg:w-64 w-56 sm:w-48 h-auto" />
            <div className="max-w-md w-full space-y-8 bg-white shadow-xl rounded-[10px] p-6 mt-8">
                <p ref={errRef} className={errMsg ? "bg-[#ffb6b7] text-[#b22222] font-bold py-2 px-4 mb-2 rounded-[5px]" : " "} aria-live="assertive">{errMsg}</p>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">ลงชื่อเข้าใช้</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <div>
                            <label htmlFor="username">ชื่อผู้ใช้:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                className="appearance-none relative block w-full mt-1 mb-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-[#1CA59B] focus:z-10 text-[16px] sm:text-[14px] lg:text-[18px]"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">รหัสผ่าน:</label>
                            <input
                                type="password"
                                id="password"
                                className="appearance-none relative block w-full mt-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-[#1CA59B] focus:z-10 text-[16px] sm:text-[14px] lg:text-[18px]"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            
                        </div>
                    </div> 
                    <button 
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[16px] sm:text-[14px] lg:text-[18px] font-medium rounded-md shadow-md text-white bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>
                <p>
                    ยังไม่ได้เป็นสมาชิก?<br />
                    <span className="underline font-bold mb-2">
                        <Link to="/register">สมัครสมาชิก</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;