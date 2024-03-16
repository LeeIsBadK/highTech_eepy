import {riskColor} from "../assets/color";
import { useState , useRef, useEffect } from "react";
import { Check, X ,CornerRightDown } from 'lucide-react';

const Fund = ({funds}: { funds: Array<any> }) => {
  const [selectedFund, setSelectedFund] = useState<string[]>([]);
  const compare = useRef<HTMLDivElement>(document.createElement('div'));
  const [showCompare, setShowCompare] = useState<boolean>(false);
  let check = 0;

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
  }, [compare.current]);

  const handleFundClick = (fund: string): void => {
    console.log(compare.current?.offsetHeight);
    if (selectedFund.includes(fund)) {
      setSelectedFund(selectedFund.filter((f) => f !== fund));
    } else {
      setSelectedFund([...selectedFund, fund]);
    }
  };

  const generateCompareUrl = () => {
    // Combine the selected funds into a string separated by commas
    const fundsQuery = selectedFund.join(",");
    // Generate the compare URL with the selected funds
    return `/compare?selectedFund=${fundsQuery}`;
  };

    return (
        <div className=""
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <div className="max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="p-5 rounded-[15px] bg-white mb-9 shadow-md">
              <span className="px-3 text-[20px] font-bold text-[#999999]">Sort:</span>
            </div>
            <div className="w-full bg-white p-8 rounded-[15px] shadow-md">
              <div className="w-full h-full flex pt-2 pb-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                <p className="text-md font-medium text-[#999999] min-w-[100px] w-[6vw]">เปรียบเทียบ</p>
                <p className="text-md font-medium text-[#999999] min-w-[180px] w-[15vw]">ชื่อกองทุน</p>
                <p className="text-md font-medium text-[#999999] min-w-[120px] w-[8vw] mr-auto ml-auto pl-9">ความเสี่ยง</p>
                <p className="text-md font-medium text-[#999999] min-w-[140px] w-[9vw] mr-auto ml-auto">ประเภทกองทุน</p>
                <p className="text-md font-medium text-[#999999] min-w-[120px] w-[8vw] mr-auto ml-auto pl-1">NAV</p>
                <p className="text-md font-medium text-[#999999] min-w-[120px] w-[8vw] mr-auto ml-auto">{"ผลตอบแทน (%)"}</p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {funds.map((fund) => (
                  <div key={fund.id} className="group relative flex border-b py-4">
                    <div className="h-full w-full flex justify-between">
                      <div className="w-full">
                        <div className="w-full flex items-center">
                          <div className={`flex py-1 mt-[-5px] min-w-[100px] w-[6vw]`}>
                            <button className={`${selectedFund.includes(fund.name) ? 'bg-[#1CA59B] border border-[#1CA59B]' : 'border border-2 border-gray-400'} 
                                                flex items-center justify-center h-[18px] w-[18px] ml-7 rounded-[5px] transition-all duration-300 ease-in-out`}
                              onClick={() => handleFundClick(fund.name)}>
                              <Check className={`${selectedFund.includes(fund.name) ? 'scale-100' : ''} text-white transform scale-0 transition-all duration-200 ease-in-out`}/>
                            </button>
                          </div>
                          <h3 className="flex min-w-[180px] w-[15vw] text-[17px] font-semibold text-[#072C29]">
                            <a href={fund.href}>
                              <span className="pt-1">{fund.name}</span>
                              <span className="text-[15px] text-gray-400 font-normal flex flex-wrap">{fund.detail}</span>
                            </a>
                          </h3> 
                          <div className={`min-w-[120px] w-[8vw] pl-[54px] mr-auto ml-auto`}>
                            <p className={`text-[20px] font-semibold px-[11px] py-[2px] border w-[37px] border-2 rounded-md `} style={{color:`${riskColor[fund.risk]}`,borderColor:`${riskColor[fund.risk]}`}}>{fund.risk}</p>
                          </div>
                          <div className="min-w-[140px] w-[9vw] mr-auto ml-auto">
                            <p className="px-3 py-[2px] items-center text-[16px] font-semibold">{fund.type}</p>
                          </div>
                          <p className="min-w-[100px] w-[8vw] mr-auto ml-auto text-[17px] font-semibold text-[#072C29] px-1">{fund.value}</p>
                          <p className="min-w-[100px] w-[8vw] mr-auto ml-auto text-[17px] font-semibold text-[#072C29] ml-auto px-9">{fund.returns}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedFund.length != 0 && (
              <div className="p-5 rounded-[15px] bg-white mt-9 shadow-md">
                <div className="flex">
                  <span className="px-3 text-[20px] font-bold text-[#072C29]">เปรียบเทียบกองทุน:</span>
                  <button className="ml-auto flex" onClick={() => setSelectedFund([])}>
                    <X className="mt-[2px] mr-1"/>
                    <span className="text-[20px] font-bold text-[#072C29]">รีเซ็ต</span>
                  </button>
                </div>
                <div className="flex flex-wrap pt-3 px-1 max-w-5xl" ref={compare}>
                  {selectedFund.map((fund) => (
                    <div className="px-2 mb-3" key={fund}>
                      <div className="flex px-2 py-1 bg-gray-200 rounded-md shadow-sm">
                        <span>{fund}</span>
                          <X className="ml-1" onClick={ () => setSelectedFund(selectedFund.filter((f) => f !== fund))}/>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="ml-auto flex">
                  <a href={generateCompareUrl()} className="py-2">
                  <span className="text-[18px] text-white font-bold bg-[#072C29] rounded-[5px] px-2 py-1.5 hover:bg-[#116564] hover:text-gray-100">เปรียบเทียบ</span>
                  </a>
                </button>
              </div>
            )}
            {showCompare && selectedFund.length !== 0 && (
              <button
                onClick={() => {compare.current?.scrollIntoView({ behavior: 'smooth' });
                  if (check === 0) {
                    setShowCompare(false);
                    check++;
                  }
                }}
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-300 font-bold text-gray-600 rounded-md focus:outline-none"
              >
                <span className="flex">เปรียบเทียบ {selectedFund.length} กองทุน <CornerRightDown size={22} className="ml-1 mt-[2px]" /></span>
              </button>
            )}
          </div>
        </div>
      );
};

export default Fund;
