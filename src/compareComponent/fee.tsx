import axios from 'axios';
import { BookText, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OperatingResultsProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const Fee = ({ funds, generateDeleteFundUrl }: OperatingResultsProps) => {
  const [fundData, setFundData] = useState<Array<any> | null>(null);

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!fundData && funds.length !== 0) {
          const promises = funds.map(async (fund) => {
            const response = await apiClient.get('/page4/' + fund);
            return response.data[0];
          });

          const dataForAllFunds = await Promise.all(promises);
          setFundData(dataForAllFunds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForAllFunds();
  }, [fundData, funds]);

  console.log(fundData);

  return (
    <div className="pb-[60px] px-4">
      <div className="flex">
        <div className="pr-[80px]"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="py-8 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="text-[11px] text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className='h-[65px]'></p>
            <p className="py-5">ขาย<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Front-end Fee)</p></p>
            <p className="py-5">ซื้อคืน<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Back-end Fee)</p></p>
            <p className="py-5">สับเปลี่ยนเข้า<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Switching Fee In)</p></p>
            <p className="py-5">สับเปลี่ยนออก<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Switching Fee out)</p></p>
            <p className="py-5">จัดการ<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Management Fee)</p></p>
            <p className="py-5">อัตราส่วนค่าใช้จ่ายรวม<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Total Expense Ratio)</p></p>
            <p className="py-5">หนังสือชี้ชวน<br /><p className='text-[7px] md:text-[8px] lg:text-[10px] 2xl:text-[14px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>(Funt Factsheet)</p></p>
          </div>
        </div>
        {fundData ? (
          <div className="flex overflow-x-auto">
            {fundData?.map((fund) => (
              <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[335px] max-w-[335px]"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="py-4 px-2 font-bold text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]">
                  <span className={`flex justify-center items-center w-full py-5 px-2 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 px-1 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund)}><X className="text-gray-400" /></a></span>
                </div>
                <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} grid grid-cols-2 border border-gray-300 rounded-[10px]text-[11px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                  <div>
                    <p className="flex justify-center items-center py-5 font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500">ตามหนังสือชี้ชวน</p>
                    {fund.data_from_sheet.Fund_Sell === "ดูหมายเหตุ" || fund.data_from_sheet.Fund_Sell === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_sheet.Fund_Sell === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.Fund_Sell} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_sheet.Fund_Buy === "ดูหมายเหตุ" || fund.data_from_sheet.Fund_Buy === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_sheet.Fund_Buy === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.Fund_Buy} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_sheet.Fund_switch_In === "ดูหมายเหตุ" || fund.data_from_sheet.Fund_switch_In === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_sheet.Fund_switch_In === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.Fund_switch_In} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_sheet.Fund_switch_Out === "ดูหมายเหตุ" || fund.data_from_sheet.Fund_switch_Out === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_sheet.Fund_switch_Out === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.Fund_switch_Out} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.manage_fee === '-' ? '-' : parseInt(fund.data_from_sheet.manage_fee).toFixed(2) + '%'}<p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>{fund.data_from_sheet.manage_fee === '-' ? '' : 'ต่อปี'}</p></p>
                    <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_sheet.ttl_fee === '-' ? '-' : parseInt(fund.data_from_sheet.ttl_fee).toFixed(2) + '%'}<p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>{fund.data_from_sheet.ttl_fee === '-' ? '' : 'ต่อปี'}</p></p>
                  </div>
                  <div>
                    <p className="flex justify-center items-center py-5 font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500">เก็บจริง</p>
                    {fund.data_from_real.Auc_Sell === "ดูหมายเหตุ" || fund.data_from_real.Auc_Sell === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_real.Auc_Sell === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.Auc_Sell} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_real.Auc_Buy === "ดูหมายเหตุ" || fund.data_from_real.Auc_Buy === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_real.Auc_Buy === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.Auc_Buy} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_real.Auc_switch_In === "ดูหมายเหตุ" || fund.data_from_real.Auc_switch_In === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_real.Auc_switch_In === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.Auc_switch_In} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    {fund.data_from_real.Auc_switch_Out === "ดูหมายเหตุ" || fund.data_from_real.Auc_switch_Out === "-" ? (
                      <p className="flex flex-col justify-center items-center py-5 font-semibold">-
                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                      </p>
                    ) : (
                      fund.data_from_real.Auc_switch_Out === "ยกเว้น" ? (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">0.00 %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      ) : (
                        <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.Auc_switch_Out} %
                          <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'></p>
                        </p>
                      )
                    )}
                    <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.manage_fee === '-' ? '-' : parseInt(fund.data_from_real.manage_fee).toFixed(2) + '%'}<p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>{fund.data_from_real.manage_fee === '-' ? '' : 'ต่อปี'}</p></p>
                    <p className="flex flex-col justify-center items-center py-5 font-semibold">{fund.data_from_real.ttl_fee === '-' ? '-' : parseInt(fund.data_from_real.ttl_fee).toFixed(2) + '%'}<p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 2xl:h-[20px] lg:h-[16px] h-[12px]'>{fund.data_from_real.ttl_fee === '-' ? '' : 'ต่อปี'}</p></p>
                  </div>
                  <a href={fund.fund_fact_url} target="_blank" rel="noopener noreferrer" className='flex col-span-2 justify-center items-center py-5 cursor-pointer'>
                    <p className="flex py-2 px-2 rounded-[15px] text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] bg-gray-200 font-semibold"><BookText className='w-[9px] md:w-[11px] lg:w-[13px] 2xl:w-[17px] mr-1' />หนังสือชี้ชวน</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[90vh]">
            <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
              <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังโหลดข้อมูล...
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Fee;