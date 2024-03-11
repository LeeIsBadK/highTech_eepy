import React, { useState } from 'react';
import './search.css';

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
            className="relative outline-none rounded-[15px] px-4 py-1 border border-gray-300 shadow-md min-w-[240px] mr-2"
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 outline-none min-w-[100px]"
              style={{
                width: 'calc(5px + 25vmin)',
                fontSize: 'calc(13px + 0.5vmin)',
              }}
            />
            <label htmlFor="Filter" className="sr-only">
              Filter
            </label>
            <select
              id="Filter"
              name="Filter"
              className="rounded-md border-0 bg-transparent py-0.5 pl-2 pr-2 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              style={{
                fontSize: 'calc(13px + 0.5vmin)',
              }}
            >
              <option>Filter</option>
            </select>
          </button>
          <div
            className={`block absolute px-12 mt-2 z-10 bg-white rounded-md shadow-md overflow-hidden transition-max-height duration-400 ease-in-out ${
              showSearch ? 'max-h-300' : 'max-h-0'
            }`}
          >
            <ul className="mt-5 max-h-200 py-2 overflow-y-auto pr-7">
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
          className="flex items-center justify-center filter-button text-gray-600 font-semibold py-[7px] px-3 rounded-[12px] cursor-pointer shadow-md mr-2"
          style={{
            fontSize: 'calc(13px + 0.5vmin)',
            background: '#ffbb5b-webkit-linear-gradient(90deg, #ffbb5b 0%, #ffd66d 50%, #ffeb93 100%) linear-gradient(90deg, #ffbb5b 0%, #ffd66d 50%, #ffeb93 100%)',
          }}
        >
          <i
            className="uil uil-filter mr-1.5 ml-[-1px] mt-[1px]"
            style={{
              fontSize: 'calc(13px + 0.5vmin)',
            }}
          ></i>
          Filter
        </button>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center search-button py-[7px] px-3 rounded-[12px] font-semibold text-gray-600 cursor-pointer shadow-md"
          style={{
            fontSize: 'calc(13px + 0.5vmin)',
            background: '#29fbed -webkit-linear-gradient(270deg, #29fbed 0%, #28d7cb 50%, #1eb0a7 100%) linear-gradient(270deg, #29fbed 0%, #28d7cb 50%, #1eb0a7 100%)',
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
