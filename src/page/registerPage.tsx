import { useRef, useState, useEffect } from "react";
import axios from '../loginComponent/api/axios';
import { Link } from "react-router-dom";
import lhFund from '../assets/lhFund.png';
import { Check, Info } from "lucide-react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/register';

const RegisterPage: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [pwd, setPwd] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('ชื่อผู้ใช้ถูกใช้แล้ว');
            } else {
                setErrMsg('ลงทะเบียนไม่สำเร็จ')
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
            {success ? (
                <div className="max-w-md w-full space-y-4 bg-white shadow-xl rounded-[10px] pt-6 px-10 pb-10 mt-8">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">สมัครสมาชิกสำเร็จ</h2>
                    <Check size={120} className="flex w-full items-center text-[#00bc91]"/>
                    <div className="py-1">
                        <a href="/login">
                            <button 
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[16px] sm:text-[14px] lg:text-[18px] font-medium rounded-md shadow-md text-white bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                เข้าสู่ระบบ
                            </button>
                        </a>
                    </div>
                </div>
            
            ) : (
                <div className="max-w-md w-full space-y-8 bg-white shadow-xl rounded-[10px] p-6 mt-8">
                    <p ref={errRef} className={errMsg ? "bg-[#ffb6b7] text-[#b22222] font-bold py-2 px-4 mb-2 rounded-[5px]" : " "} aria-live="assertive">{errMsg}</p>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">สมัครสมาชิก</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <div>
                                <label htmlFor="username">ชื่อผู้ใช้:</label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    className="appearance-none relative block w-full mt-1 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-[#1CA59B] focus:z-10 text-[16px] sm:text-[14px] lg:text-[18px]"
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? "text-[14px] rounded-md bg-gray-300 px-1 py-1 relative" : "hidden"}>
                                    <span className="flex"><Info size={15} className="ml-1 mt-[2px] mr-1"/> 4 to 24 characters.</span>
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password">รหัสผ่าน:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className="appearance-none relative block w-full mt-1 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-[#1CA59B] focus:z-10 text-[16px] sm:text-[14px] lg:text-[18px]"
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "text-[14px] rounded-md bg-gray-300 px-1 py-1 relative" : "hidden"}>
                                <span className="flex"><Info size={15} className="ml-1 mt-[2px] mr-1"/>8 to 24 characters.</span>
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password">ยืนยันรหัสผ่าน:</label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className="appearance-none relative block w-full mt-1 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-[#1CA59B] focus:z-10 text-[16px] sm:text-[14px] lg:text-[18px]"
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "text-[14px] rounded-md bg-gray-300 px-1 py-1 relative" : "hidden"}>
                                <span className="flex"><Info size={15} className="ml-1 mt-[2px] mr-1"/>Must match the first password input field.</span>
                                </p>
                            </div>
                        </div> 
                        <button 
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[16px] sm:text-[14px] lg:text-[18px] font-medium rounded-md shadow-md text-white bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!validName || !validPwd || !validMatch ? true : false}
                        >
                            สมัครสมาชิก
                        </button>
                    </form>
                    <p>
                        เป็นสมาชิกอยู่แล้ว?<br />
                        <span className="underline font-bold mb-2">
                            <Link to="/login">ลงชื่อเข้า</Link>
                        </span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default RegisterPage