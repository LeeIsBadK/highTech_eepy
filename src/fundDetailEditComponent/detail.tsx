import { Coins, HandCoins, PieChart, ReceiptText } from "lucide-react"
import { useEffect, useState } from "react"
import ChartComponent from "../compareComponent/lineChart";
import OverView from "./overview";
import OperatingResults from "./opearatingResults";
import Investment from "./investment";
import Fee from "./fee";
import { useLocation, useNavigate } from "react-router-dom";

interface DetailProps {
  fund: string;
}

const Detail = ({ fund }: DetailProps) => {
  const [current, setCurrent] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const current = url.split('/edit/')[1]
    if (current && (current.includes('performance') || current.includes('port') || current.includes('fee')))
      setCurrent(current.split('/')[0]);
    else
      setCurrent(''); 
  }, [location.pathname]);

  return (
    <div>
      <div className="flex items-center pt-7 px-3 lg:px-5">
        <div className="border-b border-b-2 w-full 2xl:text-[16px] lg:text-[14px] md:text-[13px] text-[12px]">
          <button className={`${current === '' ? 'font-bold bg-gray-300' : ''} px-5 py-1 rounded-[10px]`}
            onClick={() => navigate('/detail/edit/'+ fund, { state: { from: location }, replace: true })}>
            <span className="flex items-center"><ReceiptText size={19} className="mr-[5px]" />ภาพรวม</span>
          </button>
          <button className={`${current === 'performance' ? 'font-bold bg-gray-300' : ''} px-5 py-1 rounded-[10px]`}
            onClick={() => navigate('/detail/edit/performance/'+ fund, { state: { from: location }, replace: true })}>
            <span className="flex items-center"><HandCoins size={19} className="mr-[5px]" />ผลการดำเนินงานและปันผล</span>
          </button>
          <button className={`${current === 'port' ? 'font-bold bg-gray-300' : ''} px-5 py-1 rounded-[10px]`}
            onClick={() => navigate('/detail/edit/port/'+ fund, { state: { from: location }, replace: true })}>
            <span className="flex items-center"><PieChart size={19} className="mr-[5px]" />พอร์ตการลงทุน</span>
          </button>
          <button className={`${current === 'fee' ? 'font-bold bg-gray-300' : ''} px-5 py-1 rounded-[10px]`}
            onClick={() => navigate('/detail/edit/fee/'+ fund, { state: { from: location }, replace: true })}>
            <span className="flex items-center"><Coins size={19} className="mr-[5px]" />ค่าธรรมเนียม</span>
          </button>
        </div>
      </div>
      <div className="h-full py-8 px-6 lg:px-8">
        {current === '' && fund !== 'edit' && (
          <div className="pb-8 pt-2">
            <ChartComponent funds={[fund]} />
            <OverView fund={fund} />
          </div>
        )}
        {current === 'performance' && fund !== 'edit' && (
          <OperatingResults fund={fund} />
        )}
        {current === 'port' && fund !== 'edit' && (
            <Investment fund={fund} />
        )}
        {current === 'fee' && fund !== 'edit' && (
            <Fee fund={fund} />
        )}
      </div>
    </div>
  )
}

export default Detail;