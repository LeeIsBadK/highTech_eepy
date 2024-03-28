import { Clock } from "lucide-react";
import DoughNutChart from "./doughnutChart";

interface OverviewProps {
  fund: string;
}

const Investment = ({ fund }: OverviewProps) => {
  return (
      <div className="py-2 px-8">
        <p className="text-[0px]">{fund}</p>
        <div className="py-4 px-4 text-[20px] text-[#072C29]">
          <span className={`w-full py-4 rounded-[10px] font-bold`}>TOP 5 Holding</span>
          <span className='flex items-center py-2 text-[14px] text-[#7c8594]'><Clock size={16} className='mr-[6px]' /> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
        </div>
        <div className={`grid grid-cols-2 py-4 bg-white rounded-[10px] text-[20px] text-gray-700 px-5 shadow-md w-full`}>
          <div className="flex justify-center"><DoughNutChart /></div>
          <div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">76.95 %</p><p className="py-1 text-[16px] text-gray-500">VanEck Digital Transformation ETF</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">11.84 %</p><p className="py-1 text-[16px] text-gray-500">TMBTHANACHART BANK PUBLIC COMPANY LIMITED</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">5.08 %</p><p className="py-1 text-[16px] text-gray-500">MICROSTRATEGY INC-CL A</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.62 %</p><p className="py-1 text-[16px] text-gray-500">BLOCK INC</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.12 %</p><p className="py-1 text-[16px] text-gray-500">MSFT US</p></div>
          </div>
        </div>
        <div className="py-4 px-4 pt-14 text-[20px] text-[#072C29]">
          <span className={`w-full py-4 rounded-[10px] font-bold`}>สัดส่วนการลงทุน</span>
          <span className='flex items-center py-2 text-[14px] text-[#7c8594]'><Clock size={16} className='mr-[6px]' /> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
        </div>
        <div className={`grid grid-cols-2 py-4 bg-white rounded-[10px] text-[20px] text-gray-700 px-5 shadow-md w-full`}>
          <div className="flex justify-center"><DoughNutChart /></div>
          <div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">76.95 %</p><p className="py-1 text-[16px] text-gray-500">VanEck Digital Transformation ETF</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">11.84 %</p><p className="py-1 text-[16px] text-gray-500">TMBTHANACHART BANK PUBLIC COMPANY LIMITED</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">5.08 %</p><p className="py-1 text-[16px] text-gray-500">MICROSTRATEGY INC-CL A</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.62 %</p><p className="py-1 text-[16px] text-gray-500">BLOCK INC</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.12 %</p><p className="py-1 text-[16px] text-gray-500">MSFT US</p></div>
          </div>
        </div>
        <div className="py-4 px-4 pt-14 text-[20px] text-[#072C29]">
          <span className={`w-full py-4 rounded-[10px] font-bold`}>กลุ่มประเภทตราสารทุน/ตราสารหนี้ที่ลงทุน</span>
          <span className='flex items-center py-2 text-[14px] text-[#7c8594]'><Clock size={16} className='mr-[6px]' /> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
        </div>
        <div className={`grid grid-cols-2 py-4 bg-white rounded-[10px] text-[20px] text-gray-700 px-5 shadow-md w-full`}>
          <div className="flex justify-center"><DoughNutChart /></div>
          <div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">76.95 %</p><p className="py-1 text-[16px] text-gray-500">VanEck Digital Transformation ETF</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">11.84 %</p><p className="py-1 text-[16px] text-gray-500">TMBTHANACHART BANK PUBLIC COMPANY LIMITED</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">5.08 %</p><p className="py-1 text-[16px] text-gray-500">MICROSTRATEGY INC-CL A</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.62 %</p><p className="py-1 text-[16px] text-gray-500">BLOCK INC</p></div>
            <div className="px-4 py-1"><p className="py-1.5 font-bold">3.12 %</p><p className="py-1 text-[16px] text-gray-500">MSFT US</p></div>
          </div>
        </div>
      </div>
  );
};

export default Investment;