import { X } from 'lucide-react';

interface OverviewProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}


const OverView = ({ funds, generateDeleteFundUrl }: OverviewProps) => {
  return (
    <div className="pb-[50px]">
      <div className="flex">
        <div className="pr-10"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="px-4 py-8 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className="p-4">บลจ</p>
            <p className="p-4">ประเภทกอง</p>
            <p className="p-4">ค่าความเสี่ยง</p>
            <p className="p-4">Feeder Fund</p>
            <p className="p-4">นโยบายค่าเงิน</p>
            <p className="p-4">นโยบายการจ่ายปันผล</p>
          </div>
        </div>
        <div className="flex overflow-x-auto">
          {funds?.map((fund) => (
            <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
              style={{ whiteSpace: 'nowrap' }}
            >
              <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-4 px-3 rounded-[10px]`}><a href={`/detail/${fund}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund}</a><a href={generateDeleteFundUrl(fund)}><X className="text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
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
      <div className="flex">
        <div className="pr-10"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="px-4 py-8 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className="p-4">ค่าธรรมเนียมขาย</p>
            <p className="p-4">ค่าธรรมเนียมรับซื้อคืน</p>
            <p className="p-4">ค่าใช้จ่ายกองทุนรวม</p>
            <p className="p-4">ลงทุนครั้งแรกขั้นต่ำ</p>
            <p className="p-4">ลงทุนครั้งต่อไปขั้นต่ำ</p>
            <p className="p-4">วันที่จดทะเบียนกองทุน</p>
            <p className="p-4">มูลค่าทรัพย์สินสุทธิ</p>
          </div>
        </div>
        <div className="flex overflow-x-auto">
          {funds?.map((fund) => (
            <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
              style={{ whiteSpace: 'nowrap' }}
            >
              <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-4 px-3 rounded-[10px]`}><a href={`/detail/${fund}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund}</a><a href={generateDeleteFundUrl(fund)}><X className="text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                <p className="flex justify-center p-4">-</p>
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
    </div>
  );
};

export default OverView;