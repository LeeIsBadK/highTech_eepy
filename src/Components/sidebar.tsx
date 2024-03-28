
import { ChevronLast, ChevronFirst, LayoutDashboard, LineChart, Scale, MoreVertical, List } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import lhfund from '../assets/lhFund.png';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../loginComponent/context/AuthProvider";

const navigation = [
  { icon: <LayoutDashboard size={30} className="m-1" />, text: "Dashboard", href: "/dashboard" },
  { icon: <List size={30} className="m-1" />, text: "Funds", href: "/fund" },
  { icon: <LineChart size={30} className="m-1" />, text: "Chart", href: "/chart" },
  { icon: <Scale size={30} className="m-1" />, text: "Compare", href: "/compare" },
];



const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => { 
    setAuth({});
    navigate('/login');
  }

  useEffect(() => {
    // Set the active state based on the current URL path
    const currentPath = window.location.pathname;
    setActive(navigation.find(item => currentPath.startsWith(item.href))?.text ?? '');
  }, []); // Run this effect only once when the component mounts
  
  return (
    <aside className="min-h-[100svh]">
      <nav className="h-full flex flex-col bg-white border-r shadow-lg pl-1 pr-1">
        <div className="p-4 px-2 pb-2 flex justify-between items-center border-b">
          <img
            src={lhfund}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "w-32 mr-auto ml-auto py-3" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 my-5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="">
          {navigation.map((item) => (
            <Link to={item.href} key={item.text}>
              <button
                className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-250 ease-in-out group
                  ${ active === item.text ? "bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] text-white" : "hover:bg-gray-200 text-gray-600"}
                  `}
                  onClick={() => setActive(item.text)}
                  >
                {item.icon}
                <span
                  className={`overflow-hidden transition-all duration-500 ease-in-out flex  ${
                    expanded ? "w-52 ml-3 text-[1.1rem]" : "w-0"
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
              </button>
            </Link>
          ))}
        </div>      
        <div className="flex-grow" /> {/* This will push the user profile section to the bottom */}
        <div className="border-t flex p-3 pb-4">
          <img
            src=""
            alt=""
            className="w-10 h-10 rounded-md bg-[#cdfaf6]"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="px-2 w-full">
              <h4 className="flex items-center font-semibold text-[18px] text-[#072C29]">{auth.user}</h4>
            </div>
            <button onClick={() => setShowProfile(!showProfile)}>
              <MoreVertical size={20} />
            </button>
            <div className={`block absolute ml-[235px] z-10 bg-white rounded-[5px] shadow-md overflow-hidden transition-max-w duration-500 ease-in-out ${
              showProfile ? 'max-w-[300px]' : 'max-w-[0px]'}`} 
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