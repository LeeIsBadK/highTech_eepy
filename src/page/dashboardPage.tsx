import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Fund from '../Components/fund';

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
    },
    {
      id: 8,
      name: 'KKP GNP',
      href: '#',
      risk: 6,
      type: 'A',
      value: 18.3118,
    },
    {
      id: 9,
      name: 'TSF-A',
      href: '#',
      risk: 6,
      type: 'A',
      value: 64.6817,
    }
  ]

const DashboardPage = () => {
    return (
        <div className="flex">
          <Sidebar />
          <div className="w-full pl-2 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 items-center bg-gray-100 max-h-[100vh] overflow-y-auto">
            <div className="pl-8">
              <div className='flex max-w-2xl px-2 pb-4 mt-1 sm:px-6 sm:pb-8 sm:mt-2 lg:max-w-7xl lg:px-8 lg:pb-12'>
                <h2 className="text-4xl font-bold tracking-tight text-[#072C29]">Dashboard</h2>
                <div className="ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]} />
                </div>
              </div>
            </div>
            <Fund funds={fundData as Fund[]}/>
          </div>
        </div>
      );
}

export default DashboardPage;