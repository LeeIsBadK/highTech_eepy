import "react";
import Sidebar from "./Components/sidebar";
import SearchBar from "./Components/search";
import Fund from "./Components/fund";
import { useEffect, useState } from "react";



interface Fund {
  id: number;
  name: string;
  href: string;
  risk: number;
  type: string;
  value: number;
}

export const fundData = [
  {
    id: 1,
    name: 'K-USXNDQ-A(A)',
    href: '#',
    risk: 6,
    type: 'A',
    value: 32.7534,
  },
  {
    id: 2,
    name: 'KFLRMF',
    href: '#',
    risk: 6,
    type: 'RMF',
    value: 81.3507,
  },
  {
    id: 3,
    name: 'SCBRM1',
    href: '#',  
    risk: 4,
    type: 'RMF',
    value: 14.6425,
  },
  {
    id: 4,
    name: 'K-CHANGE-A(A)',
    href: '#',  
    risk: 6,
    type: 'A',
    value: 16.0144,
  },
  {
    id: 5,
    name: 'K-US500X-A(A)',
    href: '#',  
    risk: 6,
    type: 'A',
    value: 11.4849,
  },
  {
    id: 6,
    name: 'SCBRS2000(A)',
    href: '#',
    risk: 6,
    type: 'A',
    value: 11.9956,
  },
  {
    id: 7,
    name: 'ONE-UGG-RA',
    href: '#',
    risk: 6,
    type: 'A',
    value: 26.95,
  }
]

const App = () => {
  const [fundData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/filter/product?searchString=Vietnam&take=20&skip=0&orderBy=asc");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div className="flex">
      <Sidebar />
      <div className="w-full pl-2 items-center bg-gray-100">
        <div className="pl-8">
          <div className='flex max-w-2xl px-2 py-4 mt-1 sm:px-6 sm:py-12 sm:mt-2 lg:max-w-7xl lg:px-8'>
            <h2 className="text-4xl font-bold tracking-tight text-[#072C29]">Funds</h2>
            <div className="ml-auto mr-auto">
              <SearchBar funds={fundData as Fund[]} />
            </div>
          </div>
        </div>
        <div className='max-h-[84vh] overflow-y-auto'>
          <Fund funds={fundData as Fund[]} />
        </div>
      </div>
    </div>
    </>
  );
}
export default App;