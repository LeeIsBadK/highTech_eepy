import { Clock } from "lucide-react";
import { useState } from "react";


interface OperatingResultsProps {
    fund: string;
}
const first = <button className="w-[54px] py-1 bg-[#00853e] text-white sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] rounded-[15px]">ดีที่สุด</button>
const second = <button className="w-[54px] py-1 bg-[#00e76b] text-white sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] rounded-[15px]">ดีมาก</button>
const third = <button className="w-[54px] py-1 bg-[#74ffb4] text-white sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] rounded-[15px]">ดี</button>

const OperatingResults = ({fund}: OperatingResultsProps) => {
    const [stat, setStat] = useState<string>('SD');

    return (
        <div className="pb-[50px] px-6 py-6">
            <p className="text-[0px]">{fund}</p>
            <div className=" grid grid-cols-2 gap-x-8">
                <div className="bg-white shadow-md rounded-[10px] px-11 py-1"
                >
                    <div className="pt-8 pb-2 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">Performance</div>
                    <div className="sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600">
                        <div className="grid grid-cols-4"><p className="flex justify-center py-2 col-start-3">กองนี้</p><p className="flex justify-center py-2">เฉลี่ยในกลุ่ม</p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>3M</p><p className="flex justify-center col-start-3">9.44%</p><p className="flex justify-center">10.29%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>6M</p><p className="flex justify-center col-start-3">100.73%</p><p className="flex justify-center">32.69%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3">{first}</p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>1Y</p><p className="flex justify-center col-start-3">136.02%</p><p className="flex justify-center">39.66%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3">{first}</p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>3Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">-3.67%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>5Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">8.21%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>10Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">-</p></div>
                        <div className="grid grid-cols-4 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-[10px] px-11 py-1"
                >
                    <div className="flex pt-8 pb-2 sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                        <button className={`${stat === 'SD' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-100 rounded-[10px]`} onClick={() => setStat('SD')}>SD</button>
                        <button className={`${stat === 'Sharpe Ratio' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-100 rounded-[10px]`} onClick={() => setStat('Sharpe Ratio')}>Sharpe Ratio</button>
                        <button className={`${stat === 'Max Drawdown' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-100 rounded-[10px]`} onClick={() => setStat('Max Drawdown')}>Max Drawdown</button>
                    </div>
                    <div className="sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600">
                        <div className="grid grid-cols-4"><p className="flex justify-center py-2 col-start-3">กองนี้</p><p className="flex justify-center py-2">เฉลี่ยในกลุ่ม</p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>3M</p><p className="flex justify-center col-start-3">9.44%</p><p className="flex justify-center">10.29%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>6M</p><p className="flex justify-center col-start-3">100.73%</p><p className="flex justify-center">32.69%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>1Y</p><p className="flex justify-center col-start-3">136.02%</p><p className="flex justify-center">39.66%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3">{first}</p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>3Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">-3.67%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>5Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">8.21%</p></div>
                        <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                        <div className="grid grid-cols-4 pt-4 pb-1"><p>10Y</p><p className="flex justify-center col-start-3">-</p><p className="flex justify-center">-</p></div>
                        <div className="grid grid-cols-4 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                    </div>
                </div>
            </div>
            <span className='flex items-center px-2 py-4 pb-11 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-[#7c8594]'><Clock size={18} className='mr-[6px]'/> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
            <div className="bg-white px-8 py-6 shadow-md rounded-[10px] space-y-4 sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-700">
                <p>* ข้อมูลการจัดอันดับ Performance และ Standard Deviation ยึดจากสมาคมบริษัทจัดการลงทุนโดย</p>
                <div className="flex space-x-6">
                    <div>{first} = อยู่ในช่วงเปอร์เซ็นไทล์ 1-5</div>
                    <div>{second} = อยู่ในช่วงเปอร์เซ็นไทล์ 5-25</div>
                    <div>{third} = อยู่ในช่วงเปอร์เซ็นไทล์ 25-50</div>
                </div>
            </div>
        </div>
    );
};

export default OperatingResults;