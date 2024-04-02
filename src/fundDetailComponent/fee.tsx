import { Coins, NotebookPen } from "lucide-react";


interface OverviewProps {
    fund: string;
}

const Fee = ({ fund }: OverviewProps) => {
    return (
            <div className="py-2 px-8">
                <p className="text-[0px]">{fund}</p>
                <div className="py-4 px-4 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">
                    <span className={`flex items-center w-full rounded-[10px]`}>
                        <NotebookPen className="mr-2 2xl:w-[24px] 2xl:h-[24px] xl:w-[22px] xl:h-[22px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] sm:w-[16px] sm:h-[16px]"/>
                        รายละเอียดการซื้อ
                    </span>
                </div>
                <div className={`py-4 bg-white rounded-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-700 px-5 shadow-md w-full`}>
                    <div className="px-4 py-1 grid grid-cols-5">
                        <p className="py-1.5">มูลค่าขั้นต่ำของการซื้อครั้งแรก</p>
                        <p className="flex justify-center py-1 col-start-3 font-bold">1,000 บาท</p>
                    </div>
                    <div className="px-4 py-1 grid grid-cols-5">
                        <p className="py-1.5">มูลค่าขั้นต่ำของการซื้อครั้งต่อไป</p>
                        <p className="flex justify-center py-1 col-start-3 font-bold">1,000 บาท</p>
                    </div>
                </div>
                <div className="py-4 px-4 pt-12 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">
                    <span className={`flex items-center w-full rounded-[10px]`}>
                        <Coins className="mr-2 2xl:w-[24px] 2xl:h-[24px] xl:w-[22px] xl:h-[22px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] sm:w-[16px] sm:h-[16px]"/>
                        ค่าธรรมเนียม
                    </span>
                </div>
                <div className={`grid grid-cols-3 py-5 bg-white rounded-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-700 px-5 shadow-md w-full`}>
                    <div className="px-4 py-1 pb-6 grid grid-rows-3">
                        <p className="py-1.5 row-start-2">ค่าธรรมเนียมการจัดการ<br />
                            <span className="text-gray-400 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Management Fee)</span>
                        </p>
                        <p className="py-1.5 row-start-3">ค่าธรรมเนียมและค่าใช้จ่ายรวมทั้งหมด<br />
                            <span className="text-gray-400 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">(Total Expense Ratio)</span>
                        </p>
                    </div>
                    <div className="px-4 py-1 grid grid-rows-3 border-x border-dashed border-gray-400">
                        <p className="flex justify-center font-semibold">ตามหนังสือชี้ชวน</p>
                        <p className="flex justify-center">2 % ต่อปี</p>
                        <p className="flex justify-center">4.49 % ต่อปี</p>
                    </div>
                    <div className="px-4 py-1 grid grid-rows-3">
                        <p className="flex justify-center font-semibold">เก็บจริง</p>
                        <p className="flex justify-center">0 % ต่อปี</p> 
                        <p className="flex justify-center">0 % ต่อปี</p>
                    </div>
                </div>
            </div>
    );
};

export default Fee;