import { Coins, HandCoins, PieChart, ReceiptText } from "lucide-react"
import Investment from "./investment"
import ChartComponent from "./lineChart"
import OperatingResults from "./operatingResults"
import OverView from "./overview"
import { useEffect, useState } from "react"
import Fee from "./fee"
import { useLocation, useNavigate } from "react-router-dom"

interface DetailProps {
  selectedFundArray: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}

const Detail = ({selectedFundArray, generateDeleteFundUrl}: DetailProps) => {
  const [current, setCurrent] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const current = url.split('/compare/')[1]
    console.log(current)
    if (current && (current.includes('performance') || current.includes('port') || current.includes('fee'))) {
      setCurrent(current.split('/')[0]);
    }
    else
      setCurrent(''); 
  }, [location.pathname]);

    return (
      <div>
        <div className="flex items-center pt-7 sm:px-3 lg:px-5">
          <div className="border-b border-b-2 w-full">
            <button className={`${current === '' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
                onClick={() => navigate('/compare?selectedFund='+ selectedFundArray.join(","), { state: { from: location }, replace: true })}>
              <span className="flex items-center"><ReceiptText size={19} className="mr-[5px]" />ภาพรวม</span>
            </button>
            <button className={`${current === 'performance' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
              onClick={() => navigate('/compare/performance?selectedFund='+ selectedFundArray.join(","), { state: { from: location }, replace: true })}>
              <span className="flex items-center"><HandCoins size={19} className="mr-[5px]" />ผลการดำเนินงานและปันผล</span>
            </button>
            <button className={`${current === 'port' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
              onClick={() => navigate('/compare/port?selectedFund='+ selectedFundArray.join(","), { state: { from: location }, replace: true })}>
              <span className="flex items-center"><PieChart size={19} className="mr-[5px]" />พอร์ตการลงทุน</span>
            </button>
            <button className={`${current === 'fee' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
                  onClick={() => navigate('/compare/fee?selectedFund='+ selectedFundArray.join(","), { state: { from: location }, replace: true })}>
                  <span className="flex items-center"><Coins size={19} className="mr-[5px]" />ค่าธรรมเนียม</span>
            </button>
          </div>
        </div>
        <div className="h-full py-8 sm:px-6 lg:px-8">
          {current === '' && (
            <div>
              <div className="pb-8 pt-2">
                <ChartComponent funds={selectedFundArray}/>
              </div>
              <OverView funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
            </div>
          )}
          {current === 'performance' && (
            <OperatingResults funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
          )}
          {current === 'port' && (
            <Investment funds={selectedFundArray}  generateDeleteFundUrl={generateDeleteFundUrl} />
          )}
          {current === 'fee' && (
            <Fee funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
        )}
        </div>
      </div>
    )
}

export default Detail;