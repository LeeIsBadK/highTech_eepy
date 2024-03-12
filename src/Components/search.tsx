import React, { useState } from 'react';

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
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
        <div>
          <button
            className="relative outline-none rounded-[5px] px-4 py-1 border border-[#A3BFB4] shadow-sm min-w-[240px] mr-2 bg-white"
            onClick={() => {
              setShowSearch(!showSearch);
              handleSearch();
            }}
          >
            <i
              className="uil uil-search"
              style={{
                fontSize: 'calc(15px + 0.5vmin)',
              }}
            ></i>
            <input
              type="text"
              placeholder="Search Mutual Funds"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 outline-none min-w-[100px] placeholder-[#A3BFB4]"
              style={{
                width: 'calc(5px + 35vmin)',
                fontSize: 'calc(13px + 0.5vmin)',
              }}
            />
            <label htmlFor="Filter" className="sr-only">
              Filter
            </label>
          </button>
          <div
            className={`block absolute px-12 mt-2 z-10 bg-white rounded-[5px] shadow-md overflow-hidden transition-max-height duration-400 ease-in-out ${
              showSearch ? 'max-h-300' : 'max-h-0'
            }`}
          >
            <ul className="max-h-200 py-2 overflow-y-auto pr-7"
              style={{
                width: 'calc(-26px + 35vmin)',
              }}
            >
              {funds.map((fund) => (
                <li key={fund.id} className="h-full w-full px-2 py-2 text-[1.05rem] text-gray-600 ml-[0px]">
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
          <i
            className="uil uil-filter mr-1.5 ml-[-1px] mt-[1px] text-white"
            style={{
              fontSize: 'calc(13px + 0.5vmin)',
            }}
          ></i>
          Sort & Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;