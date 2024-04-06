
import { ChevronLast, ChevronFirst, Scale, MoreVertical, List, NotebookText, ChevronDown, ChevronUp, Coins, HandCoins, PieChart, ReceiptText } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import lhfund from '../assets/lhFund.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../loginComponent/context/AuthProvider";
import { useLocalStorage } from "../loginComponent/hook/useLocalStorage";

const navigation = [
  { icon: <List size={30} className="m-1 2xl:w-[30px] 2xl:h-[30px] lg:w-[28px] lg:w-[28px] w-0" />, text: "Funds", href: "/fund" },
  { icon: <NotebookText size={30} className="m-1 2xl:w-[30px] 2xl:h-[30px] lg:w-[28px] lg:w-[28px] w-0" />, text: "Detail", href: "/detail" },
  { icon: <Scale size={30} className="m-1 2xl:w-[30px] 2xl:h-[30px] lg:w-[28px] lg:w-[28px] w-0" />, text: "Compare", href: "/compare" },
];



const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useLocalStorage<boolean>("expanded", true);
  const [active, setActive] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState<string>('');
  const [detail, setDetail] = useState<boolean>(false);
  const [compare, setCompare] = useState<boolean>(false);
  const [ storedCompare ] = useLocalStorage<string[]>("compare", []);
  const [ storedDetail ] = useLocalStorage("detail", "");

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    if (parts.includes('fund'))
      setActive('Funds')
    if (parts.includes('detail')) {
      setActive('Detail')
    }
    if (parts.includes('compare'))
      setActive('Compare')
  }, [active, location.pathname]);

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    let current = url.split('/detail/')[1];
    if (!current)
    current = url.split('/compare/')[1];
    if (parts.includes('detail'))
      setDetail(true);
    if (parts.includes('compare')) {
      current = url.split('/compare/')[1];
      setCompare(true);
    } 
    if (current && (current.includes('performance') || current.includes('port') || current.includes('fee')))
      setCurrent(current.split('/')[0]);
    else
      setCurrent('');
  }, [location.pathname, current]);

  const handleLogout = () => {
    setAuth({
      user: '',
      pwd: '',
      accessToken: ''
    });
    navigate('/login');
  }

  return (
    <aside className="lg:min-h-[100svh] lg:max-w-full max-w-0 min-h-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-lg pl-1 pr-1">
        <div className="lg:p-4 px-2 pb-2 flex justify-between items-center border-b p-0">
          <img
            src={lhfund}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "2xl:w-[128px] lg:w-[112px] w-0 mr-auto ml-auto py-3" : "w-0"
              }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="lg:p-1.5 lg:my-5 rounded-lg bg-gray-50 hover:bg-gray-100 p-0 my-0"
          >
            {expanded ? <ChevronFirst className="lg:w-6 w-0"/> : <ChevronLast className="lg:w-6 w-0"/>}
          </button>
        </div>
        <div>
          {navigation.map((item) => (
            <div key={item.text}>
              <div className={`relative`}>
                <Link to={item.href} className={`relative flex items-center lg:py-4 lg:px-3 my-1 py-0 px-0 font-medium rounded-md cursor-pointer transition-colors duration-250 ease-in-out group
                  ${active === item.text ? "bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] text-white" : "hover:bg-gray-200 text-gray-600"}`}>
                  {item.icon}
                  <span
                    className={`overflow-hidden lg:transition-all transition-none duration-500 ease-in-out flex  ${expanded ? "2xl:w-[208px] lg:w-[160px] w-0 ml-3 2xl:text-[18px] lg:text-[16px]" : "w-0"
                      }`}
                  >
                    {item.text}
                  </span>
                  {!expanded && (
                    <div
                      className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-[#cdfaf6] text-[#14938a] text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10
                    `}
                    >
                      {item.text}
                    </div>
                  )}
                </Link>
                {item.text === "Detail" && detail && expanded && (
                  <button className="absolute top-1/4 right-0 z-50" onClick={() => {setDetail(!detail); setCompare(false); }}>
                    <ChevronDown className={`${active === 'Detail' ? 'text-white' : 'text-gray-600' } mx-4 mt-[2px] lg:w-6 w-0`} />
                  </button>
                )}
                {item.text === "Detail" && !detail && expanded && (
                  <button className="absolute top-1/4 right-0  z-50" onClick={() => {setDetail(!detail); setCompare(false); }}>
                    <ChevronUp className={`${active === 'Detail' ? 'text-white' : 'text-gray-600' } mx-4 mt-[2px] lg:w-6 w-0`} />
                  </button>
                )}
                {item.text === "Compare" && compare && expanded && (
                  <button className="absolute top-1/4 right-0  z-50" onClick={() => {setCompare(!compare); setDetail(false); }}>
                    <ChevronDown className={`${active === 'Compare' ? 'text-white' : 'text-gray-600' } mx-4 mt-[2px] lg:w-6 w-0`} />
                  </button>
                )}
                {item.text === "Compare" && !compare && expanded && (
                  <button className="absolute top-1/4 right-0  z-50" onClick={() => {setCompare(!compare); setDetail(false); }}>
                    <ChevronUp className={`${active === 'Compare' ? 'text-white' : 'text-gray-600' } mx-4 mt-[2px] lg:w-6 w-0`} />
                  </button>
                )}
              </div>
              {item.text === "Detail" && (
                <div className={`${expanded ? 'max-w-full' : 'w-0 h-0'} transition-w duration-1000 ease-in-out`}>
                  <div className={`block bg-white text-gray-600 rounded-[5px] shadow-md overflow-hidden transition-max-h duration-1000 ease-in-out ${detail ? 'max-h-[250px]' : 'max-h-0'}`}>
                    <ul className="2xl:pl-[48px] lg:pl-[40px] pl-0 flex flex-col py-2 2xl:text-[16px] lg:text-[14px]">
                      <button className={`${active === item.text && current === '' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/detail/' + storedDetail, { state: { from: location }, replace: true })}>
                        <span className="flex items-center">
                          <ReceiptText size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />
                          ภาพรวม
                        </span>
                      </button>
                      <button className={`${active === item.text && current === 'performance' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/detail/performance/' + storedDetail, { state: { from: location }, replace: true })}>
                        <span className="flex items-center">
                          <HandCoins size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />
                          ผลการดำเนินงานและปันผล
                        </span>
                      </button>
                      <button className={`${active === item.text && current === 'port' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/detail/port/' + storedDetail, { state: { from: location }, replace: true })}>
                        <span className="flex items-center">
                          <PieChart size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />
                          พอร์ตการลงทุน
                        </span>
                      </button>
                      <button className={`${active === item.text && current === 'fee' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/detail/fee/' + storedDetail, { state: { from: location }, replace: true })}>
                        <span className="flex items-center">
                          <Coins size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />
                          ค่าธรรมเนียม
                        </span>
                      </button>
                    </ul>
                  </div>
                </div>
              )}
              {item.text === "Compare" && (
                <div className={`${expanded ? 'max-w-full' : 'w-0 h-0'} transition-w duration-1000 ease-in-out`}>
                  <div className={`block bg-white text-gray-600 rounded-[5px] shadow-md overflow-hidden transition-max-h duration-1000 ease-in-out ${compare ? 'max-h-[250px]' : 'max-h-0'}`}>
                    <ul className="2xl:pl-[48px] lg:pl-[40px] pl-0 flex flex-col py-2 2xl:text-[16px] lg:text-[14px]">
                      <button className={`${active === item.text && current === '' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/compare?selectedFund=' + storedCompare.join(','), { state: { from: location }, replace: true })}>
                        <span className="flex items-center"><ReceiptText size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />ภาพรวม</span>
                      </button>
                      <button className={`${active === item.text && current === 'performance' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/compare/performance?selectedFund=' + storedCompare.join(','), { state: { from: location }, replace: true })}>
                        <span className="flex items-center"><HandCoins size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />ผลการดำเนินงานและปันผล</span>
                      </button>
                      <button className={`${active === item.text && current === 'port' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/compare/port?selectedFund=' + storedCompare.join(','), { state: { from: location }, replace: true })}>
                        <span className="flex items-center"><PieChart size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />พอร์ตการลงทุน</span>
                      </button>
                      <button className={`${active === item.text && current === 'fee' ? 'text-[#1CA59B] font-semibold' : ''} 2xl:px-2 lg:px-1.5 py-3 rounded-[10px] hover:bg-gray-200`}
                        onClick={() => navigate('/compare/fee?selectedFund=' + storedCompare.join(','), { state: { from: location }, replace: true })}>
                        <span className="flex items-center"><Coins size={19} className="mr-[8px] 2xl:w-[19px] 2xl:h-[19px] lg:w-[17px] lg:h-[17px] w-0 h-0" />ค่าธรรมเนียม</span>
                      </button>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex-grow" /> {/* This will push the user profile section to the bottom */}
        <div className="border-t flex p-3 pb-4">
          <img
            src=""
            alt=""
            className="lg:w-10 lg:h-10 w-0 h-0 rounded-md bg-[#cdfaf6]"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "2xl:w-[208px] lg:w-[160px] w-0 ml-3" : "w-0"}
          `}
          >
            <div className="px-2 w-full">
              <h4 className="flex items-center font-semibold 2xl:text-[18px] lg:text-[16px] text-[#072C29]">{auth.user}</h4>
            </div>
            <button onClick={() => setShowProfile(!showProfile)}>
              <MoreVertical size={20} className="lg:w-[19px] w-0"/>
            </button>
            <div className={`block absolute ml-[0px] lg:ml-[187px] 2xl:ml-[235px] z-10 bg-white rounded-[5px] shadow-md overflow-hidden transition-max-w duration-500 ease-in-out ${showProfile ? 'max-w-[0px] lg:max-w-[300px]' : 'max-w-[0px]'}`}
            >
              <ul className="py-1.5 px-3">
                <button onClick={handleLogout} className="flex items-center h-[40px] w-full px-6 py-1 text-[1rem] text-gray-600 hover:bg-gray-200 rounded-[10px]" style={{ whiteSpace: 'nowrap' }}>
                  Sign out
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;
