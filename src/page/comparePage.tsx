import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/sidebar";
import SearchBar from "../Components/search";
import { CirclePlus, X, Search, ChevronLeft } from "lucide-react";
import Detail from "../compareComponent/detail";
import { useLocalStorage } from "../loginComponent/hook/useLocalStorage";
import axios from "axios";
import Navbar from "../Components/Navbar";

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});


const ComparePage: React.FC = () => {
  const location = useLocation();
  const [allFunds, setAllFunds] = useState<Array<any> | null>(null);
  const [selectedFundArray, setSelectedFundArray] = useState<string[]>([]);
  const [showAddFund, setShowAddFund] = useState<boolean>(false);
  const [showAddSearch, setShowAddSearch] = useState<boolean>(false);
  const [searchAddFund, setSearchAddFund] = useState<string>('');
  const [filteredFunds, setFilteredFunds] = useState<any[]>([]);
  const [checkFunds, setCheckFunds] = useState<boolean>(false);
  const [storedCompare, setStoredCompare] = useLocalStorage<string[]>("compare", []);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/filter/product?searchString=&take=20&skip=&orderBy=asc');
        setAllFunds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedFund = searchParams.get("selectedFund");
    if (!selectedFund) {
      if (storedCompare.length !== 0) {
        const fundsQuery = storedCompare.join(",");
        navigate(`/compare?selectedFund=${fundsQuery}`, { state: { from: location }, replace: true });
        setSelectedFundArray(storedCompare);
      } else {
        setCheckFunds(true);
      }
    } else {
      setSelectedFundArray(selectedFund ? selectedFund.split(",") : []);
      setStoredCompare(selectedFund ? selectedFund.split(",") : []);
    }
  }, [location.search, checkFunds]);

  useEffect(() => {
    if (allFunds) {
      const filtered = allFunds.filter(fund => !selectedFundArray.includes(fund.name));
      setFilteredFunds(filtered);
    }
  }, [allFunds, selectedFundArray]);

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

  const handleSearch = async (e: any) => {
    setSearchAddFund(e);
    try {
      const response = await apiClient.get(`/filter/product?searchString=${e}&take=20&skip=&orderBy=asc`);
      setAllFunds(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex transition-all duration-500 ease-in-out min-w-[640px]"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />
      <div className="w-full px-2 lg:px-12 pt-0 lg:pt-12 pb-4 lg:pb-12 items-center bg-[#f9f9f9] min-h-[100svh] max-h-[100svh] overflow-y-auto">
        <div className="pb-10 pt-40 lg:pt-0 lg:pb-5">
          <Navbar />
          <div className='px-3 xl:px-4 grid grid-cols-3 gap-x-3.5 px-2 pb-4 mt-1 px-6 pb-8 mt-2 lg:px-8 lg:pb-12'>
            <h2 className="flex space-x-1.5 items-center text-[15px] md:text-[19px] lg:text-[23px] 2xl:text-[31px] font-bold tracking-tight text-[#072C29]">
              <button onClick={goBack}>
                <ChevronLeft size={36} className='2xl:w-9 2xl:h-9 lg:w-7 lg:h-7 md:w-6 md:h-6 w-5 h-5' />
              </button>
              เปรียบเทียบกองทุน
            </h2>
            <div className="ml-auto mr-auto">
              <SearchBar funds={allFunds} />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-8 py-6 px-6 lg:px-8 bg-white shadow-md rounded-[10px]">
          <div className="flex flex-wrap"
            style={{ whiteSpace: 'nowrap' }}
          >
            {selectedFundArray?.map((fund) => (
              <div key={fund} className="flex justify-center items-center mb-[1px]">
                {selectedFundArray[0] !== fund && (
                  <span className="text-[11px] md:text-[13px] lg:text-[15px] 2xl:text-[19px] font-semibold px-1 text-[#999999]">vs</span>
                )}
                <span className="flex justify-center items-center text-[13px] md:text-[15px] lg:text-[17px] 2xl:text-[21px] px-2 font-bold text-[#072C29]">
                  <a href={`/detail/${fund}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund}</a><a href={generateDeleteFundUrl(fund)}><X size={22} className="text-gray-400 2xl:w-[22px] 2xl:h-[22px] lg:w-[18px] lg:h-[18px] md:w-[16px] md:h-[16px] w-[14px] h-[14px]" /></a>
                </span>
              </div>
            ))}
          </div>
          <button className="ml-auto h-full flex bg-gray-200 px-2 py-[6px] rounded-[10px] hover:bg-gray-300"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setShowAddFund(true)}
          >
            <CirclePlus size={18} className="mt-[2px] ml-1 2xl:w-[18px] 2xl:h-[18px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] w-[10px] h-[10px]" />
            <span className="text-[10px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] px-1 font-bold text-[#072C29]">Add Fund</span>
          </button>
          {showAddFund && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-[#fafafa] p-6 rounded-lg shadow-lg min-w-[400px] w-[24vw] min-h-[240px] lg:min-h-[265px] lg:h-[25vh]"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="flex">
                  <span className="font-semibold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px]">เลือกกองทุนที่คุณต้องการ</span>
                  <X size={24} className="text-gray-600 ml-auto mt-[2px] 2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] w-[16px] h-[16px]" onClick={() => setShowAddFund(false)} />
                </div>
                <div className="flex justify-center py-6">
                  <button className="relative flex outline-none rounded-[5px] px-4 py-1 border border-[#A3BFB4] shadow-md mr-2 bg-white">
                    <Search size={21} className="lg:mt-[4px] mt-[2px] 2xl:w-[21px] lg:w-[19px] md:w-[18px] w-[17px]" />
                    <input
                      type="text"
                      placeholder="Search Mutual Funds"
                      value={searchAddFund}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="ml-3 outline-none min-w-[200px] lg:min-h-[28px] md:min-h-[26px] min-h-[24px] placeholder-[#A3BFB4] mt-[2px] w-[14vw] lg:h-[3vh] text-[13px] md:text-[14px] lg:text-[15px] 2xl:text-[17px]"
                      onClick={() => {
                        setShowAddSearch(true);
                      }}
                    />
                    {showAddSearch && (
                      <X className="items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() => {
                          setShowAddSearch(false)
                          setSearchAddFund('')
                        }} />
                    )}
                  </button>
                  <div className={`block absolute px-12 ml-[-8px] mt-[48px] z-10 bg-white rounded-[5px] shadow-md overflow-y-auto overflow-hidden transition-max-h duration-300 ease-in-out  ${showAddSearch ? 'max-h-[25vh]' : 'max-h-0'
                    }`}>
                    <ul className="py-2 pr-6 min-w-[175px] w-[12.5vw]">
                      {filteredFunds.map((fund) => (
                        <li key={fund.id} className="cursor-pointer min-h-[44px] w-full px-4 py-2 text-[12px] md:text-[13px] lg:text-[14px] 2xl:text-[16px] text-gray-600 ml-[0px] hover:bg-gray-200 rounded-[10px]"
                          onClick={() => {
                            setSearchAddFund(fund.proj_abbr_name)
                            setShowAddSearch(false)
                          }}
                        >
                          {fund.proj_abbr_name}
                          <span className='text-gray-400 font-normal flex flex-wrap text-[10px] md:text-[11px] lg:text-[12px] whitespace-normal'>{fund.proj_name_th}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                  <div className="flex py-2 pb-5 text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[14px]">
                    <span className="mr-1">ตอนนี้มี:</span>
                    <div className="flex flex-wrap">
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
                  <button className="m-auto flex py-2 px-2" onClick={() => setShowAddFund(false)}>
                    <a href={generateAddFundUrl(searchAddFund)}><span className="text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[16px] shadow-md text-white font-semibold bg-[#072C29] rounded-[7px] px-4 py-2 hover:bg-[#116564] hover:text-gray-100">เพิ่มกองทุน</span></a>
                  </button>
              </div>
            </div>
          )}
        </div>
        <Detail selectedFundArray={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
      </div>
      {checkFunds && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <div className="bg-white flex flex-col items-center py-8 px-16 space-y-6 rounded-md shadow-md relative">
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold">ไม่มีกองทุนในระบบ</p>
            <p className="pb-1 text-[12px] md:text-[14px] lg:text-[16px]">โปรดเลือกกองทุนก่อน</p>
            <a href="/fund">
              <button className={`px-5 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white text-[12px] md:text-[14px] lg:text-[16px] font-semibold shadow-md `}
                style={{ whiteSpace: 'nowrap' }}
              >
                ตกลง
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparePage;