import { X } from 'lucide-react';

interface OperatingResultsProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}


const OperatingResults = ({funds, generateDeleteFundUrl}: OperatingResultsProps) => {
    return (
        <div className="pb-[60px]">
            <div className="flex">
                    <div className="pr-[80px]"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <div className="px-4 py-8 font-bold text-[20px] text-[#072C29]">Funds</div>
                      <div className="text-[18px] text-gray-600">
                        <p className="pl-4 py-6">3M</p>
                        <p className="pl-4 py-6">6M</p>
                        <p className="pl-4 py-6">1Y</p>
                        <p className="pl-4 py-6">3Y</p>
                        <p className="pl-4 py-6">5Y</p>
                        <p className="pl-4 py-6">10Y</p>
                      </div>
                    </div>
                    <div className="flex overflow-x-auto max-w-5xl">
                      {funds?.map((fund) => (
                          <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
                            style={{ whiteSpace: 'nowrap'}}
                          >
                            <div className="py-4 px-2 font-bold text-[20px] text-[#072C29]">
                              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
                            </div>
                            <div className={`${funds.indexOf(fund)%2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]' } border border-gray-300 rounded-[10px] text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                              <p className="flex justify-center p-4 py-6">-</p>
                              <p className="flex justify-center p-4 py-6">-</p>
                              <p className="flex justify-center p-4 py-6">-</p>
                              <p className="flex justify-center p-4 py-6">-</p>
                              <p className="flex justify-center p-4 py-6">-</p>
                              <p className="flex justify-center p-4 py-6">-</p>
                            </div>
                          </div>
                      ))}
                    </div>
            </div>  
        </div>
    );
};

export default OperatingResults;