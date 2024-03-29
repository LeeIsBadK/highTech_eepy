import Sidebar from '../Components/sidebar';
import Fund from '../Components/fund';
import Favorite from '../Components/favorite';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface Fund {
  id: number;
  name: string;
  detail: string;
  href: string;
  risk: number;
  type: string;
  value: number;
  returns: number;
}

export const fundData = [
  {
    id: 1,
    name: 'ASP-DIGIBLOC-SSF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการออม',
    href: '/fund/ASP-DIGIBLOC-SSF',
    risk: 6,
    type: 'SSFEQ',
    value: 8.4301,
    returns: 138.70
  },
  {
    id: 2,
    name: 'ASP-DIGIBLOCRMF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการเลี้ยงชีพ',
    href: '/fund/ASP-DIGIBLOCRMF',
    risk: 1,
    type: 'RMFEQ',
    value: 7.7214,
    returns: 130.12
  },
  {
    id: 3,
    name: 'ASP-DIGIBLOC',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน',
    href: '/fund/ASP-DIGIBLOC',
    risk: 3,
    type: 'FIFEQ',
    value: 7.4037,
    returns: 125.88
  },
  {
    id: 4,
    name: 'LHBLOCKCHAIN',
    detail: 'กองทุนเปิด แอล เอช บล็อกเชน',
    href: '/fund/LHBLOCKCHAIN',
    risk: 2,
    type: 'MIXFLEX',
    value: 9.8522,
    returns: 81.36
  },
  {
    id: 5,
    name: 'SCBSEMI(SSFE)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดเพื่อการออมผ่านช่องทางอิเล็กทรอนิกส์)',
    href: '/fund/SCBSEMI(SSFE)',
    risk: 4,
    type: 'SSFEQ',
    value: 15.5487,
    returns: 77.20
  },
  {
    id: 6,
    name: 'SCBSEMI(E)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดช่องทางอิเล็กทรอนิกส์)',
    href: '/fund/SCBSEMI(E)',
    risk: 5,
    type: 'RMFEQ',
    value: 15.7053,
    returns: 77.17
  },
  {
    id: 7,
    name: 'SCBSEMI(P)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดผู้ลงทุนกลุ่ม/บุคคล)',
    href: '/fund/SCBSEMI(P)',
    risk: 7,
    type: 'FIFEQ',
    value: 15.2816,
    returns: 75.52
  },
  {
    id: 8,
    name: 'KT-BLOCKCHAIN-A',
    detail: 'กองทุนเปิดเคแทม Blockchain Economy (ชนิดสะสมมูลค่า)',
    href: '/fund/KT-BLOCKCHAIN-A',
    risk: 6,
    type: 'FIFEQ',
    value: 10.7280,
    returns: 73.10
  },
  {
    id: 9,
    name: 'TNEXTGEN-SSF',
    detail: 'กองทุนเปิด ทิสโก้ Next Generation Internet ชนิดหน่วยลงทุนเพื่อการออม',
    href: '/fund/TNEXTGEN-SSF',
    risk: 8,
    type: 'SSFEQ',
    value: 6.5763,
    returns: 64.94
  },
  {
    id: 10,
    name: 'KKP TECH-H-SSF',
    detail: 'กองทุนเปิดเคเคพี EXPANDED TECH - HEDGED ชนิดเพื่อการออม',
    href: '/fund/KKP TECH-H-SSF',
    risk: 1,
    type: 'SSFEQ',
    value: 15.1590,
    returns: 63.65
  }
]


const FundPage: React.FC = () => {
  /*const [fundData2, setFundData2] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/filter/product?searchString=Viet&take=20&skip=&orderBy=asc');
        setFundData2(response.data); // Assuming the API response is an array of fund objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(fundData2);*/

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value:string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex transition-all duration-500 ease-in-out"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />
      <div className="w-full pl-2 pt-4 sm:pt-7 lg:pt-11 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100svh] overflow-y-auto">
        <div className='px-2 pb-4 mt-1 sm:px-4 sm:pb-8 sm:mt-2 lg:px-7 lg:pb-12'>
          <div className="px-8 grid grid-cols-4 gap-x-10 items-center">
            <h2 className="sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] pr-4 font-bold tracking-tight text-[#072C29]">รายละเอียดกองทุน</h2>
            <div className="col-span-2 ml-auto mr-auto">
              <button
                className="flex relative outline-none rounded-[5px] px-4 py-1 border border-[#1CA59B] shadow-md mr-2 bg-white"
              >
                <Search size={21} className="sm:mt-[4px] lg:mt-[2px] sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <input
                  type="text"
                  placeholder="Search Mutual Funds"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-3 sm:w-[175px] md:w-[225px] lg:w-[275px] xl:w-[335px] 2xl:w-[395px] sm:h-[22px] md:h-[25px] lg:h-[28px] outline-none placeholder-[#1CA59B] md:text-[16px] sm:text-[14px] lg:text-[18px]"
                />
                {searchTerm !== '' && (<X className="mt-[-1px] sm:w-5 sm:h-5 lg:w-6 lg:h-6 items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setSearchTerm('')} />)}
              </button>
            </div>
            <div className="ml-auto">
              <Favorite />
            </div>
          </div>
        </div>
        <Fund funds={fundData as Fund[]} />
      </div>
    </div>
  );
}

export default FundPage;