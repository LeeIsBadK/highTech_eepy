import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/sidebar";
import SearchBar from "../Components/search";
import { CirclePlus, X, Search } from "lucide-react";
import TradingViewWidget from "../Components/chart";

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

const ComparePage = () => {
  const location = useLocation();
  const [selectedFundArray,setSelectedFundArray] = useState<string[]>([]);
  const [selected,setSelected] = useState<string>('ภาพรวม');
  const [showAddFund,setShowAddFund] = useState<boolean>(false);
  const [showAddSearch,setShowAddSearch] = useState<boolean>(false);
  const [searchAddFund,setSearchAddFund] = useState<string>('');

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

  const generateDeleteFundUrl = (fund: string) => {
    const fundArrayCopy = selectedFundArray.filter((f) => f !== fund);
    const fundsQuery = fundArrayCopy.join(",");
    // Generate the compare URL with the selected funds
    return `/compare?selectedFund=${fundsQuery}`;
  };

  const generateAddFundUrl = (fund: string) => {
    const fundArrayCopy = [...selectedFundArray, fund];
    const fundsQuery = fundArrayCopy.join(",");
    // Generate the compare URL with the selected funds
    return `/compare?selectedFund=${fundsQuery}`;
  };

    return (
        <div className="flex"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <Sidebar />
          <div className="w-full pl-2 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100vh] overflow-y-auto">
            <div className="pl-8">
              <div className='flex max-w-2xl px-2 pb-4 mt-1 sm:px-6 sm:pb-8 sm:mt-2 lg:max-w-7xl lg:px-8 lg:pb-12'>
                <h2 className="text-4xl font-bold tracking-tight text-[#072C29]">Compare</h2>
                <div className="ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]} />
                </div>
              </div>
            </div>
            <div className="flex items-center max-w-2xl ml-8 mb-6 py-6 sm:px-6 lg:max-w-7xl lg:px-8 bg-white shadow-md rounded-[10px]">
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
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-[0px] flex items-center justify-center">
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
                      <div className={`block absolute px-12 mt-[50px] z-10 bg-white rounded-[5px] shadow-md overflow-y-auto ${
                          showAddSearch ? 'max-h-[25vh]' : 'max-h-0'
                        }`}>
                        <ul className="py-2 pr-7 min-w-[175px] w-[12.5vw]">
                          {fundData.map((fund) => (
                            <button key={fund.id} className="flex items-center min-h-[44px] h-[5vh] w-full px-4 py-2 text-[1.05rem] text-gray-600 ml-[0px] hover:bg-gray-200 rounded-[10px]"
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
                    <div className="flex py-4">
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
                      <button className="ml-auto flex px-2">
                        <a href={generateAddFundUrl(searchAddFund)}><span className="text-[18px] ml-auto shadow-md text-white font-semibold bg-[#072C29] rounded-[7px] px-3 py-1.5 hover:bg-[#116564] hover:text-gray-100">Add</span></a>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center max-w-2xl ml-8 pt-7 sm:px-3 lg:max-w-7xl lg:px-5">
              <div className="border-b border-b-2 w-full">
                <button className={`${selected === 'ภาพรวม' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} onClick={() => setSelected('ภาพรวม')}>ภาพรวม</button>
                <button className={`${selected === 'กราฟ' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} onClick={() => setSelected('กราฟ')}>กราฟ</button>
                <button className={`${selected === 'ผลการดำเนินงานและปันผล' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} onClick={() => setSelected('ผลการดำเนินงานและปันผล')}>ผลการดำเนินงานและปันผล</button>
                <button className={`${selected === 'พอร์ตการลงทุน' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} onClick={() => setSelected('พอร์ตการลงทุน')}>พอร์ตการลงทุน</button>
                <button className={`${selected === 'ค่าธรรมเนียม' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} onClick={() => setSelected('ค่าธรรมเนียม')}>ค่าธรรมเนียม</button>
              </div>
            </div>
            <div className="h-full max-w-2xl ml-8 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
              {selected === 'ภาพรวม' && (
                <div className="pb-[60px]">
                  <div className="flex">
                    <div className="pr-10"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <div className="px-4 py-8 font-bold text-[20px] text-[#072C29]">Funds</div>
                      <div className="text-[18px] text-gray-600">
                        <p className="p-4">บลจ</p>
                        <p className="p-4">ประเภทกอง</p>
                        <p className="p-4">ค่าความเสี่ยง</p>
                        <p className="p-4">Feeder Fund</p>
                        <p className="p-4">นโยบายค่าเงิน</p>
                        <p className="p-4">นโยบายการจ่ายปันผล</p>
                      </div>
                    </div>
                    <div className="flex overflow-x-auto max-w-5xl mt-[-2px]">
                      {selectedFundArray?.map((fund) => (
                          <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
                            style={{ whiteSpace: 'nowrap'}}
                          >
                            <div className="py-4 px-2 font-bold text-[20px] text-[#072C29]">
                              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
                            </div>
                            <div className={`${selectedFundArray.indexOf(fund)%2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]' } border border-gray-300 rounded-[10px] text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="pr-10"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <div className="px-4 py-8 font-bold text-[20px] text-[#072C29]">Funds</div>
                      <div className="text-[18px] text-gray-600">
                        <p className="p-4">ค่าธรรมเนียมขาย</p>
                        <p className="p-4">ค่าธรรมเนียมรับซื้อคืน</p>
                        <p className="p-4">ค่าใช้จ่ายกองทุนรวม</p>
                        <p className="p-4">ลงทุนครั้งแรกขั้นต่ำ</p>
                        <p className="p-4">ลงทุนครั้งต่อไปขั้นต่ำ</p>
                        <p className="p-4">วันที่จดทะเบียนกองทุน</p>
                        <p className="p-4">มูลค่าทรัพย์สินสุทธิ</p>
                      </div>
                    </div>
                    <div className="flex overflow-x-auto max-w-5xl mt-[-2px]">
                      {selectedFundArray?.map((fund) => (
                          <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            <div className="py-4 px-2 font-bold text-[20px] text-[#072C29]">
                              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
                            </div>
                            <div className={`${selectedFundArray.indexOf(fund)%2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]' } border border-gray-300 rounded-[10px] text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                              <p className="flex justify-center p-4">-</p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>   
              )}
              {selected === 'กราฟ' && (
                <TradingViewWidget />
              )}
            </div>
          </div>
        </div>
      );
}

export default ComparePage;