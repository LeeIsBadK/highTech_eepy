import { riskColor } from "../assets/color";
import { useState, useRef, useEffect } from "react";
import { Check, X, CornerRightDown, Star, CircleChevronDown, CircleChevronUp } from 'lucide-react';

const Fund = ({ funds }: { funds: Array<any> | null }) => {
  const [selectedFund, setSelectedFund] = useState<string[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<string[]>([]);
  const compare = useRef<HTMLDivElement>(document.createElement('div'));
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('');
  const [showFunds, setShowFunds] = useState<Array<any> | null>(funds);
  const [sortNum, setSortNum] = useState<number>(0);
  const [check, setCheck] = useState<number>(0);

  useEffect(() => {
    setShowFunds(funds);
  }, [funds]);

  useEffect(() => {
    if (compare.current) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setShowCompare(!entry.isIntersecting);
      });
      observer.observe(compare.current);

      // Return a cleanup function to disconnect the observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, [compare.current, showCompare]);

  const handleFundClick = (fund: string): void => {
    if (selectedFund.includes(fund)) {
      setSelectedFund(selectedFund.filter((f) => f !== fund));
    } else {
      setSelectedFund([...selectedFund, fund]);
    }
  };

  const handleFavorite = (fund: string): void => {
    if (selectedFavorite.includes(fund)) {
      setSelectedFavorite(selectedFavorite.filter((f) => f !== fund));
    } else {
      setSelectedFavorite([...selectedFavorite, fund]);
    }
  };

  const generateCompareUrl = () => {
    // Combine the selected funds into a string separated by commas
    const fundsQuery = selectedFund.join(",");
    // Generate the compare URL with the selected funds
    return `/compare?selectedFund=${fundsQuery}`;
  };

  const handleSort = (data: string) => {
    if (funds) {
      let updatedSortNum = sortNum;
      let updatedSort = sort;

      console.log(sort, sortNum);

      if (updatedSortNum === 2 && updatedSort === data) {
        setSort('');
        setShowFunds(funds);
        setSortNum(0);
        return;
      }

      if (sort === data) {
        updatedSortNum = sortNum === 1 ? 2 : 1;
      } else {
        updatedSort = data;
        updatedSortNum = 1;
      }

      const sortedFunds = [...funds].sort((a, b) => {
        if (data === 'name') {
          return updatedSortNum === 1 ? a.proj_abbr_name.localeCompare(b.proj_abbr_name) : b.proj_abbr_name.localeCompare(a.proj_abbr_name);
        } else if (data === 'type') {
          return updatedSortNum === 1 ? a.proj_abbr_name.localeCompare(b.proj_abbr_name) : b.proj_abbr_name.localeCompare(a.proj_abbr_name);
        } else {
          return updatedSortNum === 1 ? a[data] - b[data] : b[data] - a[data];
        }
      });

      setShowFunds(sortedFunds);
      setSort(updatedSort);
      setSortNum(updatedSortNum);
    }
  };

  console.log(funds, showFunds);

  return (
    <div className=""
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <div className="sm:px-5 lg:px-9">
        <div className="w-full bg-white sm:p-6 lg:p-8 rounded-[15px] shadow-md">
          <div className="w-full h-full flex pt-2 pb-3 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] font-medium text-[#999999]"
            style={{ whiteSpace: 'nowrap' }}
          >
            <div className="w-full grid grid-cols-12 gap-x-4">
              <span className="flex items-center justify-center">
                เปรียบเทียบ
              </span>
              <span className="flex col-span-3">
                ชื่อกองทุน
                {((sort === 'name' && sortNum !== 2) || sort !== 'name') && (
                  <CircleChevronDown size={17} className={`${sort === 'name' && sortNum === 1 ? 'text-[#1CA59B]' : 'text-[#666]'} mt-[-0.5px] lg:mt-[4px] ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('name')} />
                )}
                {sort === 'name' && sortNum === 2 && (
                  <CircleChevronUp size={17} className={`text-[#1CA59B] ml-1 mt-[-0.5px] lg:mt-[4px] 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('name')} />
                )}
              </span>
              <span className="flex col-span-2 justify-center items-center">
                ความเสี่ยง
                {((sort === 'risk' && sortNum !== 2) || sort !== 'risk') && (
                  <CircleChevronDown size={17} className={`${sort === 'risk' && sortNum === 1 ? 'text-[#1CA59B]' : 'text-[#666]'} ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px] `} onClick={() => handleSort('risk')} />
                )}
                {sort === 'risk' && sortNum === 2 && (
                  <CircleChevronUp size={17} className={`text-[#1CA59B] ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('risk')} />
                )}
              </span>
              <span className="flex col-span-2 justify-center items-center">
                ประเภทกองทุน
                {((sort === 'type' && sortNum !== 2) || sort !== 'type') && (
                  <CircleChevronDown size={17} className={`${sort === 'type' && sortNum === 1 ? 'text-[#1CA59B]' : 'text-[#666]'} ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('type')} />
                )}
                {sort === 'type' && sortNum === 2 && (
                  <CircleChevronUp size={17} className={`text-[#1CA59B] ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('type')} />
                )}
              </span>
              <span className="flex col-span-2 justify-center items-center">
                NAV
                {((sort === 'value' && sortNum !== 2) || sort !== 'value') && (
                  <CircleChevronDown size={17} className={`${sort === 'value' && sortNum === 1 ? 'text-[#1CA59B]' : 'text-[#666]'} ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('value')} />
                )}
                {sort === 'value' && sortNum === 2 && (
                  <CircleChevronUp size={17} className={`text-[#1CA59B] ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('value')} />
                )}
              </span>
              <span className="flex col-span-2 justify-center items-center">
                ผลตอบแทน (%)
                {((sort === 'returns' && sortNum !== 2) || sort !== 'returns') && (
                  <CircleChevronDown size={17} className={`${sort === 'returns' && sortNum === 1 ? 'text-[#1CA59B]' : 'text-[#666]'} ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('returns')} />
                )}
                {sort === 'returns' && sortNum === 2 && (
                  <CircleChevronUp size={17} className={`text-[#1CA59B] ml-1 2xl:w-[17px] 2xl:h-[17px] xl:w-[15px] xl:h-[15px] lg:w-[13px] lg:h-[13px] md:w-[11px] md:h-[11px] sm:w-[9px] sm:h-[9px]`} onClick={() => handleSort('returns')} />
                )}
              </span>
            </div>
          </div>
          {showFunds ? (
            <div className="max-h-[69svh] overflow-y-auto">
              {showFunds.map((fund) => (
                <div key={fund.id} className="relative border-b py-4">
                  <div className="w-full grid grid-cols-12 gap-x-4">
                    <div className='flex items-center justify-center h-full'>
                      <div className="px-2 py-1 h-full flex flex-col justify-between xl:space-y-3 space-y-2">
                        <button className={`${selectedFund.includes(fund.proj_abbr_name) ? 'bg-[#1CA59B] border border-[#1CA59B]' : 'border border-2 border-gray-400'} 
                                                    flex items-center justify-center 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] sm:w-[10px] sm:h-[10px] rounded-[5px] transition-all duration-250 ease-in-out transition ease-in-out delay-75 hover:-translate-y-[0px] hover:scale-125`}
                          onClick={() => handleFundClick(fund.proj_abbr_name)}>
                          <Check className={`${selectedFund.includes(fund.proj_abbr_name) ? 'scale-100' : ''} text-white transform scale-0 transition-all duration-200 ease-in-out`} />
                        </button>
                        <button className="w-[20px] transition duration-250 ease-in-out delay-75 hover:-translate-y-[0px] hover:scale-125" onClick={() => handleFavorite(fund.proj_abbr_name)}>
                          <Star
                            size={22}
                            fill={selectedFavorite.includes(fund.proj_abbr_name) ? "#ffea00" : "none"}
                            className={`${selectedFavorite.includes(fund.proj_abbr_name) ? "text-[#faea00]" : "text-gray-400"} 2xl:w-[22px] 2xl:h-[22px] xl:w-[20px] xl:h-[20px] lg:w-[18px] lg:h-[18px] md:w-[16px] md:h-[16px] sm:w-[14px] sm:h-[14px] mt-auto ml-[-2px] transition-colors duration-250 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                    <a href={`/fund/${fund.proj_abbr_name}`} className="col-span-3 hover:bg-gray-100 p-2 rounded-[10px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold text-[#072C29]">
                      <span className="pt-1">{fund.proj_abbr_name}</span>
                      <span className="sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] 2xl:text-[15px] text-gray-400 font-normal flex flex-wrap">{fund.Allinfo.fundName}</span>
                    </a>
                    <div className='flex col-span-2 justify-center items-center'>
                      <p className='sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold sm:px-[8px] sm:py-[2px] lg:px-[10px] lg:py-[3px] 2xl:px-[12px] 2xl:py-[4px] border border-2 rounded-md' style={{ color: `${riskColor[fund.risk]}`, borderColor: `${riskColor[fund.risk]}` }}>{fund.risk}</p>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                      <a href={`/fund/${fund.proj_abbr_name}`}>
                        <p className="sm:px-3 lg:px-2 py-1 hover:bg-gray-100 rounded-[10px] items-center sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold">{fund.type}</p>
                      </a>
                    </div>
                    <p className="flex col-span-2 justify-center items-center sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold text-[#072C29]">{fund.value}</p>
                    <p className="flex col-span-2 justify-center items-center sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold text-[#072C29]">{fund.returns}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-[69svh] overflow-y-auto">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="relative border-b py-4">
                  <div  className="animate-pulse grid grid-cols-12 gap-x-4">
                    <div className="px-2 py-1 h-full flex flex-col items-center justify-between space-y-3">
                      <div className="rounded-[5px] bg-[#d1d6df] sm:h-[14px] sm:w-[14px] md:h-[16px] md:w-[16px] lg:h-[18px] lg:w-[18px]"></div>
                      <div className="rounded-[5px] bg-[#d1d6df] sm:h-[14px] sm:w-[14px] md:h-[16px] md:w-[16px] lg:h-[18px] lg:w-[18px] mt-auto"></div>
                    </div>
                    <div className="col-span-3 flex-1 space-y-5 py-1">
                      <div className="h-2 w-1/2 bg-[#d1d6df] rounded"></div>
                      <div className="space-y-3">
                        <div className="h-2 bg-[#d1d6df] rounded"></div>
                        <div className="h-2 bg-[#d1d6df] rounded"></div>
                      </div>
                    </div>
                    <div className="m-auto col-span-2 h-10 w-10 bg-[#d1d6df] rounded"></div>
                    <div className="m-auto col-span-2 h-2 w-16 bg-[#d1d6df] rounded"></div>
                    <div className="m-auto col-span-2 h-2 w-16 bg-[#d1d6df] rounded"></div>
                    <div className="m-auto col-span-2 h-2 w-16 bg-[#d1d6df] rounded"></div>
                  </div>
                </div>
              ))
              }
            </div>
          )
          }
          <div ref={compare}></div>
        </div>
        {selectedFund.length != 0 && (
          <div className="p-5 rounded-[15px] bg-white mt-9 shadow-md">
            <div className="flex sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] ">
              <span className="px-3 font-bold text-[#072C29]">เปรียบเทียบกองทุน:</span>
              <button className="ml-auto flex" onClick={() => setSelectedFund([])}>
                <X className="mt-[2px] mr-1 2xl:w-[24px] 2xl:h-[24px] xl:w-[22px] xl:h-[22px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] sm:w-[16px] sm:h-[16px]" />
                <span className="font-bold text-[#072C29]">รีเซ็ต</span>
              </button>
            </div>
            <div className="flex flex-wrap pt-3 px-1 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">
              {selectedFund.map((fund) => (
                <div className="px-2 mb-3" key={fund}>
                  <div className="flex px-2 py-1 bg-gray-200 rounded-md shadow-sm">
                    <span>{fund}</span>
                    <X className="ml-1 2xl:w-[22px] 2xl:h-[22px] xl:w-[20px] xl:h-[20px] lg:w-[18px] lg:h-[18px] md:w-[16px] md:h-[16px] sm:w-[14px] sm:h-[14px]" onClick={() => setSelectedFund(selectedFund.filter((f) => f !== fund))} />
                  </div>
                </div>
              ))}
            </div>
            <button className="ml-auto flex">
              <a href={generateCompareUrl()} className="py-2">
                <span className="sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-white font-bold bg-[#072C29] rounded-[5px] px-2 py-1.5 hover:bg-[#116564] hover:text-gray-100">เปรียบเทียบ</span>
              </a>
            </button>
          </div>
        )}
        {showCompare && selectedFund.length !== 0 && (
          <button
            onClick={() => {
              setTimeout(() => { compare.current?.scrollIntoView({ behavior: 'smooth' }) }, 100);
              if (check === 0) {
                console.log('in');
                setShowCompare(false);
                setCheck(1);
              }
            }}
            className="fixed bottom-9 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-300 font-bold text-gray-600 rounded-md focus:outline-none"
          >
            <span className="absolute top-0 right-0 mt-[-3px] mr-[-3px] flex h-[12px] w-[12px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2e1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-[12px] w-[12px] bg-[#21aca3]"></span>
            </span>
            <span className="flex">เปรียบเทียบ {selectedFund.length} กองทุน <CornerRightDown size={22} className="ml-1 mt-[2px]" /></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Fund;
