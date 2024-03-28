import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/sidebar";
import SearchBar from "../Components/search";
import { CirclePlus, X, Search } from "lucide-react";
import Detail from "../compareComponent/detail";

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
    href: '#',
    risk: 6,
    type: 'SSFEQ',
    value: 8.4301,
    returns: 138.70
  },
  {
    id: 2,
    name: 'ASP-DIGIBLOCRMF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการเลี้ยงชีพ',
    href: '#',
    risk: 6,
    type: 'RMFEQ',
    value: 7.7214,
    returns: 130.12
  },
  {
    id: 3,
    name: 'ASP-DIGIBLOC',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน',
    href: '#',
    risk: 6,
    type: 'FIFEQ',
    value: 7.4037,
    returns: 125.88
  },
  {
    id: 4,
    name: 'LHBLOCKCHAIN',
    detail: 'กองทุนเปิด แอล เอช บล็อกเชน',
    href: '#',
    risk: 6,
    type: 'MIXFLEX',
    value: 9.8522,
    returns: 81.36
  },
  {
    id: 5,
    name: 'SCBSEMI(SSFE)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดเพื่อการออมผ่านช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 7,
    type: 'SSFEQ',
    value: 15.5487,
    returns: 77.20
  },
  {
    id: 6,
    name: 'SCBSEMI(E)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 7,
    type: 'RMFEQ',
    value: 15.7053,
    returns: 77.17
  },
  {
    id: 7,
    name: 'SCBSEMI(P)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดผู้ลงทุนกลุ่ม/บุคคล)',
    href: '#',
    risk: 7,
    type: 'FIFEQ',
    value: 15.2816,
    returns: 75.52
  },
  {
    id: 8,
    name: 'KT-BLOCKCHAIN-A',
    detail: 'กองทุนเปิดเคแทม Blockchain Economy (ชนิดสะสมมูลค่า)',
    href: '#',
    risk: 6,
    type: 'FIFEQ',
    value: 10.7280,
    returns: 73.10
  },
  {
    id: 9,
    name: 'TNEXTGEN-SSF',
    detail: 'กองทุนเปิด ทิสโก้ Next Generation Internet ชนิดหน่วยลงทุนเพื่อการออม',
    href: '#',
    risk: 6,
    type: 'SSFEQ',
    value: 6.5763,
    returns: 64.94
  },
  {
    id: 10,
    name: 'KKP TECH-H-SSF',
    detail: 'กองทุนเปิดเคเคพี EXPANDED TECH - HEDGED ชนิดเพื่อการออม',
    href: '#',
    risk: 7,
    type: 'SSFEQ',
    value: 15.1590,
    returns: 63.65
  }
]


const ComparePage: React.FC = () => {
  const location = useLocation();
  const [selectedFundArray,setSelectedFundArray] = useState<string[]>([]);
  const [showAddFund,setShowAddFund] = useState<boolean>(false);
  const [showAddSearch,setShowAddSearch] = useState<boolean>(false);
  const [searchAddFund,setSearchAddFund] = useState<string>('');
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);

  useEffect(() => {
    // Parse the query parameters
    const searchParams = new URLSearchParams(location.search);
    
    // Get the value of the selectedFund parameter
    const selectedFund = searchParams.get("selectedFund");
    
    // Use the selectedFund as needed
    console.log(selectedFund); // Output: K-USXNDQ-A(A),KFLRMF,SCBRM1,K-CHANGE-A(A)
    
    // Convert selectedFund string to an array
    setSelectedFundArray(selectedFund ? selectedFund.split(",") : []);
    console.log(selectedFundArray); // Output: ["K-USXNDQ-A(A)", "KFLRMF", "SCBRM1", "K-CHANGE-A(A)"]
  }, [location.search]);

  useEffect(() => {
    // Filter out the funds that are already in selectedFundArray
    const filtered = fundData.filter(fund => !selectedFundArray.includes(fund.name));
    setFilteredFunds(filtered);
  }, [selectedFundArray]);

  const generateDeleteFundUrl = (fund: string) => {
    const fundArrayCopy = selectedFundArray.filter((f) => f !== fund);
    const fundsQuery = fundArrayCopy.join(",");
    // Generate the compare URL with the selected funds
    if (fundArrayCopy.length === 0)
      return `/fund`;
    return `/compare?selectedFund=${fundsQuery}`;
  };

  const generateAddFundUrl = (fund: string) => {
    const fundArrayCopy = [...selectedFundArray, fund];
    const fundsQuery = fundArrayCopy.join(",");
    // Generate the compare URL with the selected funds
    return `/compare?selectedFund=${fundsQuery}`;
  };

    return (
        <div className="flex transition-all duration-500 ease-in-out"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <Sidebar />
          <div className="w-full sm:px-8 lg:px-12 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100svh] overflow-y-auto">
            <div className="px-1">
              <div className='grid grid-cols-3 gap-x-10 px-2 pb-4 mt-1 sm:px-6 sm:pb-8 sm:mt-2 lg:px-8 lg:pb-12'>
                <h2 className="text-4xl font-bold tracking-tight text-[#072C29]">เปรียบเทียบกองทุน</h2>
                <div className="ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]} />
                </div>
              </div>
            </div>
            <div className="flex items-center mb-6 py-6 sm:px-6 lg:px-8 bg-white shadow-md rounded-[10px]">
              <div className="flex flex-wrap"
                style={{ whiteSpace: 'nowrap' }}
              >
                {selectedFundArray?.map((fund) => (
                  <div key={fund} className="flex justify-center items-center mb-[1px]">
                    {selectedFundArray[0] !== fund && (
                      <span className="text-[19px] font-semibold px-1 text-[#999999]">vs</span>
                    )}
                    <span className="flex justify-center items-center text-[21px] px-2 font-bold text-[#072C29]">
                      {fund}<a href={generateDeleteFundUrl(fund)}><X size={22} className="text-gray-400 ml-1"/></a>
                    </span>
                  </div>
                ))}
              </div>
              <button className="ml-auto h-full flex bg-gray-200 px-2 py-[6px] rounded-[10px] hover:bg-gray-300"
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => setShowAddFund(true)}
              >
                <CirclePlus size={18} className="mt-[2px] ml-1"/>
                <span className="text-[17px] px-1 font-bold text-[#072C29]">Add Fund</span>
              </button>
              {showAddFund && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-[#fafafa] p-6 rounded-lg shadow-lg min-w-[400px] w-[24vw] min-h-[225px] h-[25vh]"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <div className="flex">
                      <span className="font-semibold text-[20px]">เลือกกองทุนที่คุณต้องการ</span>
                      <X size={24} className="text-gray-600 ml-auto mt-[2px]" onClick={() => setShowAddFund(false)}/>
                    </div>
                    <div className="flex justify-center py-6">
                      <button className="relative flex outline-none rounded-[5px] px-4 py-1 border border-[#A3BFB4] shadow-md mr-2 bg-white">
                        <Search size={21} className="mt-[4px]"/>
                        <input
                          type="text"
                          placeholder="Search Mutual Funds"
                          value={searchAddFund}
                          onChange={(e) => setSearchAddFund(e.target.value)}
                          className="ml-3 outline-none min-w-[200px] min-h-[24px] placeholder-[#A3BFB4] mt-[2px] w-[14vw] h-[3vh] text-[17px]"
                          onClick={() => {
                            setShowAddSearch(true);
                          }}
                        />
                        {showAddSearch && (
                          <X className="items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600" 
                          onClick={() => {
                            setShowAddSearch(false)
                            setSearchAddFund('')
                          }}/>
                        )}
                      </button>
                      <div className={`block absolute px-12 ml-[-8px] mt-[50px] z-10 bg-white rounded-[5px] shadow-md overflow-y-auto overflow-hidden transition-max-h duration-300 ease-in-out  ${
                          showAddSearch ? 'max-h-[25vh]' : 'max-h-0'
                        }`}>
                        <ul className="py-2 pr-6 min-w-[175px] w-[12.5vw]">
                          {filteredFunds.map((fund) => (
                            <button key={fund.id} className="flex items-center min-h-[44px] h-[4.6vh] w-full px-4 py-2 text-[1rem] text-gray-600 ml-[0px] hover:bg-gray-200 rounded-[10px]"
                              onClick={() => {
                                setSearchAddFund(fund.name)
                                setShowAddSearch(false)
                              }}
                            >
                              {fund.name}
                            </button>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex py-2">
                      <div className="flex">
                        <span className="mr-1 text-[14px]">ตอนนี้มี:</span>
                        <div className="flex flex-wrap text-[14px]">
                          {selectedFundArray.map((fund) => (
                            <span key={fund}>
                              {selectedFundArray.indexOf(fund) !== 0 && (
                                <span>, </span>
                              )}
                              {fund}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="ml-auto flex px-2 pt-1">
                        <a href={generateAddFundUrl(searchAddFund)}><span className="text-[18px] ml-auto shadow-md text-white font-semibold bg-[#072C29] rounded-[7px] px-3 py-1.5 hover:bg-[#116564] hover:text-gray-100">Add</span></a>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Detail selectedFundArray={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />               
          </div>
        </div>
      );
}

export default ComparePage;