import "react";
import Sidebar from "./Components/sidebar";
import SearchBar from "./Components/search";
import Fund from "./Components/fund";
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
  return (
    <>
    <div className="flex">
      <Sidebar />
      <div className="w-full pl-2 pt-16" style={{alignItems:"center"}}>
        <div className="pl-8">
          <SearchBar funds={fundData as Fund[]} />
        </div>
          <Fund funds={fundData as Fund[]} />
      </div>
    </div>
    </>
  );
}
export default App;