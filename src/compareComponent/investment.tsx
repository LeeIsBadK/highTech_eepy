import { X } from "lucide-react";
import DoughNutChart from "./doughnutChart";
import { useState } from "react";

interface OverviewProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}

const Investment = ({ funds, generateDeleteFundUrl }: OverviewProps) => {
  const [status, setStatus] = useState<string>('TOP 5 Holding');

  return (
    <div className="pb-[60px] px-2">
      <div className="flex py-4 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
        <button className={`${status === 'TOP 5 Holding' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('TOP 5 Holding')}>TOP 5 Holding</button>
        <button className={`${status === 'กลุ่มประเภทของหุ้นที่ลงทุน' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('กลุ่มประเภทของหุ้นที่ลงทุน')}>กลุ่มประเภทของหุ้นที่ลงทุน</button>
        <button className={`${status === 'สัดส่วนการลงทุน' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('สัดส่วนการลงทุน')}>สัดส่วนการลงทุน</button>
      </div>
      <div className="flex overflow-x-auto px-4 pt-4">
        {funds?.map((fund) => (
          <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
            style={{ whiteSpace: 'nowrap' }}
          >
            <div className="py-4 px-2 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">
              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
            </div>
            <div className={`${funds.indexOf(fund) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
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