import { X } from "lucide-react";
import DoughNutChart from "./doughnutChart";
import { Link } from "react-router-dom";

interface OverviewProps {
    funds: Array<string>;
    generateDeleteFundUrl: (fund: string) => string;
  }

const Investment = ({funds, generateDeleteFundUrl}: OverviewProps) => {
    return(
        <div className="relative max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="flex overflow-x-auto max-w-5xl">
                      {funds?.map((fund) => (
                          <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            <div className="py-4 px-2 font-bold text-[20px] text-[#072C29]">
                              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<Link to={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></Link></span>
                            </div>
                            <div className={`${funds.indexOf(fund)%2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]' } border border-gray-300 rounded-[10px] text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                              <div className="flex justify-center p-4"><DoughNutChart /></div>
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
    );
};

export default Investment;