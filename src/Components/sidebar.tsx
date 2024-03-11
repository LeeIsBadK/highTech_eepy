import { ChevronLast, ChevronFirst } from "lucide-react"
import { useState } from "react"
import lhfund from '../assets/lhFund.png';
const navigation = [
  { icon: <i className="uil uil-create-dashboard text-[2rem] mt-[-8px] mb-[-5px] ml-[4px]"></i>, text: "Dashboard", active: false },
  { icon: <i className="uil uil-list-ul text-[2rem] mt-[-8px] mb-[-5px] ml-[4px]"></i>, text: "Funds", active: true},
  { icon: <i className="uil uil-chart text-[2rem] mt-[-8px] mb-[-5px] ml-[4px]"></i>, text: "Chart", active: false},
  { icon: <i className="uil uil-comparison text-[2rem] mt-[-8px] mb-[-5px] ml-[4px]"></i>, text: "Compare", active: false},
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center border-b">
          <img
            src={lhfund}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 m-1" : "w-0"
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
           <li
           className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
             ${item.active ? "bg-gradient-to-tr from-[#1CA59B] to-[#1CA59B] text-white" : "hover:bg-gray-200 text-gray-600"}
            `}
            >
           {item.icon}
           <span
             className={`overflow-hidden transition-all ${
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
         </li>
          ))}
        </div>
      </nav>
    </aside>
  )
}
