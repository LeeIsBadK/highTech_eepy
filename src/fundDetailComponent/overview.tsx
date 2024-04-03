import { ChevronRight, ClipboardCheck, ClipboardPenLine } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface OverviewProps {
  fund: string;
}


const OverView = ({ fund }: OverviewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="pb-[50px] pt-[45px]">
      <p className="text-[0px]">{fund}</p>
      <div className="grid grid-cols-7 gap-x-0 px-8 py-6 bg-[#eaeaea] rounded-[10px] shadow-md">
        <span className="flex items-center font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">ผลตอบแทน</span>
        <span className="col-start-3 flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#00bc91] font-bold items-center">
          9.44%
          <p className="pt-2 text-[10px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">3M</p>
        </span>
        <span className="flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#00bc91] font-bold items-center border-x border-gray-400">
          100.73%
          <p className="pt-2 text-[10px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">6M</p>
        </span>
        <span className="flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#00bc91] font-bold items-center">
          136.02%
          <p className="pt-2 text-[10px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">1Y</p>
        </span>
        <button className="col-start-7 flex items-center ml-auto font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]" onClick={() => navigate('/detail/performance/' + fund, { state: { from: location }, replace: true })}>
          ดูทั้งหมด
          <ChevronRight className="mt-[1px] 2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] w-[16px] h-[16px]" />
        </button>
      </div>
      <div className="px-4 pt-14 pb-4">
        <span className="flex font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#072C29]">
          <ClipboardCheck size={26} className="mr-2 mt-[2px] 2xl:w-[26px] 2xl:h-[26px] lg:w-[22px] lg:h-[22px] md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
          กลยุทธ์การลงทุน
        </span>
      </div>
      <div className="w-full px-8 py-5 bg-white rounded-[10px] shadow-md">
        <span className="text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] leading-9">กองทุนหุ้นที่ลงทุนผ่านบริษัทหรือมีความเกี่ยวข้องกับกิจการที่ดำเนินงานเกี่ยวกับสินทรัพย์ดิจิทัล (Digital Assets Companies) โดยมุ่งหวังผลตอบแทนที่เหนือกว่าดัชนีชี้วัด เหมาะสำหรับนักลงทุนที่ต้องการมีสัดส่วนการลงทุนในสินทรัพย์ดิจิทัลแต่ไม่ต้องการเข้าลงทุนโดยตรงในสินทรัพย์ดังกล่าว</span>
      </div>
      <div className="px-4 pt-14 pb-4">
        <span className="flex font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#072C29]">
          <ClipboardPenLine size={26} className="mr-2 mt-[2px] 2xl:w-[26px] 2xl:h-[26px] lg:w-[22px] lg:h-[22px] md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
          รายละเอียดกองทุน
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full px-3 py-5 bg-white rounded-[10px] shadow-md">
        <div className="py-1 px-8 w-full text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] border-none md:border-r border-dashed border-gray-400">
          <div className="grid grid-cols-2"><p className="p-4">หนังสือชี้ชวน</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">บลจ</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ประเภทกอง</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ค่าความเสี่ยง</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">Feeder Fund</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">นโยบายค่าเงิน</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4 pb-1">นโยบายการจ่ายปันผล</p><p className="ml-auto p-4 pb-1">-</p></div>
        </div>
        <div className="py-1 px-8 w-full text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]">
          <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมขาย</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมรับซื้อคืน</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ค่าใช้จ่ายกองทุนรวม</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งแรกขั้นต่ำ</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งต่อไปขั้นต่ำ</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">วันที่จดทะเบียนกองทุน</p><p className="ml-auto p-4">-</p></div>
          <div className="grid grid-cols-2"><p className="p-4">มูลค่าทรัพย์สินสุทธิ</p><p className="ml-auto p-4">-</p></div>
        </div>
      </div>
    </div>
  );
};

export default OverView;