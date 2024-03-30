import { X } from 'lucide-react';

interface OperatingResultsProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}


const Fee = ({funds, generateDeleteFundUrl}: OperatingResultsProps) => {
    return (
        <div className="pb-[60px] px-4">
            <div className="flex">
                    <div className="pr-[80px]"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <div className="py-8 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">Funds</div>
                      <div className="sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600">
                        <p className='h-[65px]'></p>
                        <p className="py-5">ขาย<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Front-end Fee)</p></p>
                        <p className="py-5">ซื้อคืน<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Back-end Fee)</p></p>
                        <p className="py-5">สับเปลี่ยนเข้า<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Switching Fee In)</p></p>
                        <p className="py-5">สับเปลี่ยนออก<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Switching Fee out)</p></p>
                        <p className="py-5">จัดการ<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Management Fee)</p></p>
                        <p className="py-5">อัตราส่วนค่าใช้จ่ายรวม<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Total Expense Ratio)</p></p>
                        <p className="py-5">หนังสือชี้ชวน<br/><p className='sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>(Funt Factsheet)</p></p>
                      </div>
                    </div>
                    <div className="flex overflow-x-auto">
                      {funds?.map((fund) => (
                          <div key={fund} className="flex flex-col items-center mr-2 ml-2 2xl:min-w-[300px] lg:min-w-[250px] sm:min-w-[200px]"
                            style={{ whiteSpace: 'nowrap'}}
                          >
                            <div className="py-4 px-2 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">
                              <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
                            </div>
                            <div className={`${funds.indexOf(fund)%2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]' } grid grid-cols-2 border border-gray-300 rounded-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                              <div>
                                <p className="flex justify-center items-center py-5 font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500">ตามหนังสือชี้ชวน</p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">2.00%<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>ต่อปี</p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                              </div>
                              <div>
                                <p className="flex justify-center items-center py-5 font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500">เก็บจริง</p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">2.00%<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'>ต่อปี</p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                                <p className="flex flex-col justify-center items-center py-5 font-semibold">-<p className='font-normal sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] sm:h-[12px]'></p></p>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
            </div>  
        </div>
    );
};

export default Fee;