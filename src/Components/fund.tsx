import {riskColor} from "../assets/color";
import { useState, useEffect } from "react";
import { Check, X } from 'lucide-react';

const Fund = ({funds}: { funds: Array<any> }) => {

  const [selectedFund, setSelectedFund] = useState<string[]>([]);

  const handleFundClick = (fund: string): void => {
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
            <div className="p-5 rounded-[15px] bg-white mb-9">
              <span className="px-3 text-[20px] font-bold text-[#999999]">Sort:</span>
            </div>
            <div className="w-full bg-white p-8 rounded-[15px]">
              <div className="w-full h-full flex py-2">
                <p className="text-md font-medium text-[#999999] min-w-[100px] w-[7vw]">COMPARE</p>
                <p className="text-md font-medium text-[#999999] min-w-[180px] w-[15vw]">FUNDS</p>
                <p className="text-md font-medium text-[#999999] px-5">RISK</p>
                <p className="text-md font-medium text-[#999999] px-5">TAGS</p>
                <p className="text-md font-medium text-[#999999] ml-auto">NAV</p>
              </div>
              <div className="grid grid-cols-1 gap-y-0 max-h-[60vh] overflow-y-auto">
                {funds.map((fund) => (
                  <div key={fund.id} className="group relative flex border-b py-3">
                    <div className="h-full w-full flex justify-between">
                      <div className="w-full">
                        <div className="w-full flex items-center">
                          <div className={`flex py-1 mt-[-5px] min-w-[100px] w-[7vw]`}>
                            <button className={`${selectedFund.includes(fund.name) ? 'bg-[#1CA59B] border border-[#1CA59B]' : 'border border-2 border-gray-400'} 
                                                flex items-center justify-center h-[18px] w-[18px] ml-7 rounded-[5px] transition-all duration-300 ease-in-out`}
                              onClick={() => handleFundClick(fund.name)}>
                              <Check className={`${selectedFund.includes(fund.name) ? 'scale-100' : ''} text-white transform scale-0 transition-all duration-200 ease-in-out`}/>
                            </button>
                          </div>
                          <h3 className="flex min-w-[180px] w-[15vw] text-[17px] font-semibold text-[#072C29]">
                            <a href={fund.href}>
                              {fund.name}
                            </a>
                          </h3> 
                          <div className={`px-[18px]`}>
                            <p className={`text-[20px] font-semibold px-[11px] py-[2px] border border-2  rounded-md`} style={{color:`${riskColor[fund.risk]}`,borderColor:`${riskColor[fund.risk]}`}}>{fund.risk}</p>
                          </div>
                          <div className="px-5">
                            <p className="px-[11px] py-[2px] border border-[#999999] border-[2px] rounded-md  items-center text-[20px] font-semibold text-[#999999]">{fund.type}</p>
                          </div>
                          <p className="text-[17px] font-semibold text-[#072C29] ml-auto">{fund.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedFund.length != 0 && (
              <div className="p-5 rounded-[15px] bg-white mt-9">
                <div className="flex">
                  <span className="px-3 text-[20px] font-bold text-[#072C29]">Compare Funds:</span>
                  <button className="ml-auto flex" onClick={() => setSelectedFund([])}>
                    <X className="mt-[2px] mr-1"/>
                    <span className="text-[20px] font-bold text-[#072C29]">Reset</span>
                  </button>
                </div>
                <div className="flex flex-wrap pt-3 px-1 max-w-5xl">
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
                  <span className="text-[18px] text-white font-bold bg-[#072C29] rounded-[5px] px-2 py-1.5 hover:bg-[#116564] hover:text-gray-100">Compare</span>
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      );
};

export default Fund;
