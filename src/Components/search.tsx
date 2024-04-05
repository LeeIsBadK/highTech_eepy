import React, { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';
import axios from 'axios';

interface Props {
  funds: Array<any> | null;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const SearchBar: React.FC<Props> = ({ funds }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [fundData, setFundData] = useState<Array<any> | null>(null);

  useEffect(() => {
    if (fundData === null)
      setFundData(funds);
  }, [funds, fundData]);

  const handleSearch = async (e: any) => {
    setSearchTerm(e);
    try {
      const response = await apiClient.get(`/filter/product?searchString=${e}&take=20&skip=&orderBy=asc`);
      setFundData(response.data); // Assuming the API response is an array of fund objects
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
        whiteSpace: 'nowrap'
      }}
    >
      <div className="flex">
        <div className='relative'>
          <div
            className="flex outline-none rounded-[5px] px-4 py-1 border border-[#1CA59B] shadow-md mr-2 bg-white"
          >
            <Search size={21} className="mt-[4px] lg:mt-[2px] mr-2 w-3 h-3 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search Mutual Funds"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="ml-3 w-[175px] md:w-[225px] lg:w-[275px] 2xl:w-[375px] h-[18px] md:h-[20px] lg:h-[24px] 2xl:h-[28px] outline-none placeholder-[#1CA59B] text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]"
              onClick={() => {
                setShowSearch(true);
              }}
            />
            {showSearch && (<X className="mt-[-1px] w-5 h-5 lg:w-6 lg:h-6 items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowSearch(false)} />)}
          </div>
          <div className={`block absolute px-9 w-[240px] md:w-[290px] lg:w-[340px] 2xl:w-[445px] mt-2 z-10 bg-white rounded-[5px] shadow-md overflow-y-auto overflow-hidden transition-max-h duration-300 ease-in-out ${showSearch ? 'max-h-[26.5vh]' : 'max-h-0'
            }`}>
            <ul className="py-2">
              {fundData ? (
                fundData?.map((fund) => (
                  <a key={fund.id} href={"/detail/" + fund.proj_abbr_name}>
                    <li className="cursor-pointer items-center w-full px-4 py-3 text-[14px] text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-[#072C29] hover:bg-gray-200 rounded-[10px]">
                      {fund.proj_abbr_name}
                      <span className='text-gray-400 font-normal flex flex-wrap text-[10px] md:text-[12px] lg:text-[14px] whitespace-normal'>{fund.proj_name_th}</span>
                    </li>
                  </a>
                ))
              ) : (
                <div className="animate-pulse">
                  <li className="cursor-pointer items-center w-full space-y-4 px-4 py-3 text-[14px] text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-[#072C29] hover:bg-gray-200 rounded-[10px]">
                    <div className="h-2 w-1/3 bg-[#d1d6df] rounded"></div>
                    <div className="h-2 w-full bg-[#d1d6df] rounded"></div>
                  </li>
                  <li className="cursor-pointer items-center w-full space-y-4 px-4 py-3 text-[14px] text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-[#072C29] hover:bg-gray-200 rounded-[10px]">
                    <div className="h-2 w-1/3 bg-[#d1d6df] rounded"></div>
                    <div className="h-2 w-full bg-[#d1d6df] rounded"></div>
                  </li>
                  <li className="cursor-pointer items-center w-full space-y-4 px-4 py-3 text-[14px] text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-[#072C29] hover:bg-gray-200 rounded-[10px]">
                    <div className="h-2 w-1/3 bg-[#d1d6df] rounded"></div>
                    <div className="h-2 w-full bg-[#d1d6df] rounded"></div>
                  </li>
                  <li className="cursor-pointer items-center w-full space-y-4 px-4 py-3 text-[14px] text-[12px] md:text-[14px] lg:text-[16px] font-semibold text-[#072C29] hover:bg-gray-200 rounded-[10px]">
                    <div className="h-2 w-1/3 bg-[#d1d6df] rounded"></div>
                    <div className="h-2 w-full bg-[#d1d6df] rounded"></div>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
        <a href={'/fund?search=' + searchTerm}>
          <button
            className="items-center justify-center ml-4 text-white font-medium py-[6px] px-6 rounded-[5px] shadow-md bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] text-[12px] md:text-[14px] lg:text-[16px]">
            ค้นหา
          </button>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
