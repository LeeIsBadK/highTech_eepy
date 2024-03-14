
import { ChevronLast, ChevronFirst, LayoutDashboard, Handshake, LineChart, Scale } from "lucide-react"
import { useState, useEffect } from "react"
import lhfund from '../assets/lhFund.png';



const navigation = [
  { icon: <LayoutDashboard size={30} className="m-1" />, text: "Dashboard", href: "/dashboard" },
  { icon: <Handshake size={30} className="m-1" />, text: "Funds", href: "/funds" },
  { icon: <LineChart size={30} className="m-1" />, text: "Chart", href: "/chart" },
  { icon: <Scale size={30} className="m-1" />, text: "Compare", href: "/compare" },
];


export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    // Set the active state based on the current URL path
    const currentPath = window.location.pathname;
    setActive(navigation.find(item => currentPath.startsWith(item.href))?.text ?? '');
  }, []); // Run this effect only once when the component mounts
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center border-b">
          <img
            src={lhfund}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 mr-auto ml-auto py-3" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="">
          {navigation.map((item) => (
            <a href={item.href} key={item.text}>
              <button
                className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
                  ${ active === item.text ? "bg-gradient-to-tr from-[#1CA59B] to-[#1CA59B] text-white" : "hover:bg-gray-200 text-gray-600"}
                  `}
                  onClick={() => setActive(item.text)}
                  >
                {item.icon}
                <span
                  className={`overflow-hidden transition-all flex px-4 ${
                    expanded ? "w-52 ml-3 text-[1.1rem]" : "w-0"
                  }`}
                >
                  {item.text}
                </span>

                {!expanded && (
                  <div
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10
                    `}
                  >
                    {item.text}
                  </div>
                )}
              </button>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  )
}
