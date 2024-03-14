import React, { useState } from 'react';
import { X ,Search } from 'lucide-react';

interface Fund {
  id: number;
  name: string;
  href: string;
  risk: number;
  type: string;
  value: number;
}

interface Props {
  funds: Fund[];
}

const SearchBar: React.FC<Props> = ({ funds }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleSearch = () => {
    // Implement your search logic here using the 'searchTerm' state
    console.log('Search term:', searchTerm);
    console.log(showSearch);
  };

  const handleFilter = () => {
    // Implement your filter logic here
    console.log('Filter button clicked');
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <div className="flex">
        <div>
          <button
            className="relative flex outline-none rounded-[5px] px-4 py-1 border border-[#A3BFB4] shadow-sm min-w-[240px] mr-2 bg-white"
          >
            <Search size={21} className="mt-[3px]"/>
            <input
              type="text"
              placeholder="Search Mutual Funds"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 outline-none min-w-[100px] placeholder-[#A3BFB4] mt-[2px]"
              style={{
                width: 'calc(5px + 20vw)',
                fontSize: 'calc(13px + 0.25vw)',
              }}
              onClick={() => {
                setShowSearch(true);
                handleSearch();
              }}
            />
            {showSearch && (<X className="items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowSearch(false)}/>)}
          </button>
          <div className={`block absolute px-12 mt-2 z-10 bg-white rounded-[5px] shadow-md overflow-y-auto ${
              showSearch ? 'max-h-[26.5vh]' : 'max-h-0'
            }`}>
            <ul className="py-2 pr-7"
              style={{
                width: 'calc(-26px + 20vw)',
              }}
            >
              {funds.map((fund) => (
                <li key={fund.id} className="flex items-center min-h-[44px] h-[5vh] w-full px-4 py-2 text-[1.05rem] text-gray-600 hover:bg-gray-200 rounded-[10px]">
                  {fund.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="items-center justify-center ml-3 text-white py-[0px] px-3 rounded-[5px] cursor-pointer shadow-sm"
          style={{
            fontSize: 'calc(13px + 0.5vmin)',
            background: '#A3BFB4',
          }}
        >
          Sort & Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
