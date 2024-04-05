import { List, NotebookText, PencilLine, Scale } from 'lucide-react';
import lhfund from '../assets/lhFund.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navigation = [
  { icon: <List size={20} className="mr-1.5 w-5 lg:w-0" />, text: "Funds", href: "/fund" },
  { icon: <NotebookText size={20} className="mr-1.5 lg:w-0" />, text: "Detail", href: "/detail" },
  { icon: <PencilLine size={20} className="mr-1.5 lg:w-0" />, text: "Edit", href: "/detail/edit" },
  { icon: <Scale size={20} className="mr-1.5 w-5 lg:w-0" />, text: "Compare", href: "/compare" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    if (parts.includes('fund'))
      setActive('Funds')
    if (parts.includes('detail')) {
      if (parts.includes('edit'))
        setActive('Edit')
      else
        setActive('Detail')
    }
    if (parts.includes('compare'))
      setActive('Compare')
  }, [active]);


  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md lg:h-0">
      <div className="px-2 py-7 sm:px-4 lg:px-0 lg:w-0 lg:h-0">
        <div className="flex flex-1 sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img
              src={lhfund}
              className={`overflow-hidden transition-all duration-500 ease-in-out w-20 md:w-24 lg:w-0 mx-4 mr-4`}
              alt=""
            />
          </div>
          <div className="flex space-x-6 px-4 overflow-x-auto lg:overflow-hidden">
            {navigation.map((item) => (
              <div key={item.text} className={`relative flex lg:w-0 lg:py-0 lg:px-0 py-1.5 md:py-2 px-2.5 font-medium rounded-md cursor-pointer transition-colors duration-250 ease-in-out group
                    ${active === item.text ? "bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] text-white" : "hover:bg-gray-200 text-gray-600"}`}>
                <Link to={item.href} className="flex items-center" onClick={() => setActive(item.text)}>
                  {item.icon}
                  <span
                    className={`overflow-hidden lg:transition-all transition-none duration-500 ease-in-out flex text-[12px] md:text-[14px] lg:w-0`}
                  >
                    {item.text}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;