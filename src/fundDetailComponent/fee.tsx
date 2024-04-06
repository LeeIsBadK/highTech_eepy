import axios from "axios";
import { Coins, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";


interface OverviewProps {
    fund: string;
}

const apiClient = axios.create({
    baseURL: 'https://backend-ruby-eight.vercel.app',
});

const Fee = ({ fund }: OverviewProps) => {
    const [fundData, setFundData] = useState<any | null>(null);

    useEffect(() => {
        const fetchDataForAllFunds = async () => {
            try {
                if (!fundData && fund) {
                    const response = await apiClient.get('/page4/' + fund);
                    setFundData(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataForAllFunds();
    }, [fundData, fund]);

    return (
        <div className="py-2 px-8">
            {fundData ? (
                <div>
                    <div className="py-4 px-4 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                        <span className={`flex items-center w-full rounded-[10px]`}>
                            <NotebookPen className="mr-2 2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] sw-[16px] h-[16px]" />
                            รายละเอียดการซื้อ
                        </span>
                    </div>
                    <div className={`py-4 bg-white rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-700 px-5 shadow-md w-full`}>
                        <div className="px-4 py-1 grid grid-cols-5">
                            <p className="py-1.5">มูลค่าขั้นต่ำของการซื้อครั้งแรก</p>
                            <p className="flex justify-center py-1 col-start-3 font-bold">{fundData.buyInfo.การซื้อครั้งแรกขั้นต่ำ ? fundData.buyInfo.การซื้อครั้งแรกขั้นต่ำ : '-'}</p>
                        </div>
                        <div className="px-4 py-1 grid grid-cols-5">
                            <p className="py-1.5">มูลค่าขั้นต่ำของการซื้อครั้งต่อไป</p>
                            <p className="flex justify-center py-1 col-start-3 font-bold">{fundData.buyInfo.การซื้อครั้งถัดไปขั้นต่ำ ? fundData.buyInfo.การซื้อครั้งถัดไปขั้นต่ำ : '-'}</p>
                        </div>
                    </div>
                    <div className="py-4 px-4 pt-12 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                        <span className={`flex items-center w-full rounded-[10px]`}>
                            <Coins className="mr-2 2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] w-[16px] h-[16px]" />
                            ค่าธรรมเนียม
                        </span>
                    </div>
                    <div className={`grid grid-cols-3 py-5 bg-white rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-700 px-5 shadow-md w-full`}>
                        <div className="px-4 py-1 grid grid-rows-7">
                            <p className="py-1.5 row-start-2">ค่าธรรมเนียมเมื่อซื้อ<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Front-end Fee)</span>
                            </p>
                            <p className="py-1.5 row-start-3">ค่าธรรมเนียมการรับซื้อคืน<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Back-end Fee)</span>
                            </p>
                            <p className="py-1.5 row-start-4">ค่าธรรมเนียมการสับเปลี่ยนเข้า<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Switching-in Fee)</span>
                            </p>
                            <p className="py-1.5 row-start-5">ค่าธรรมเนียมการสับเปลี่ยนออก<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Switching-out Fee)</span>
                            </p>
                            <p className="py-1.5 row-start-6">ค่าธรรมเนียมการจัดการ<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Management Fee)</span>
                            </p>
                            <p className="py-1.5 row-start-7">ค่าธรรมเนียมและค่าใช้จ่ายรวมทั้งหมด<br />
                                <span className="text-gray-400 text-[9px]  md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">(Total Expense Ratio)</span>
                            </p>
                        </div>
                        <div className="px-4 py-1 grid grid-rows-7 border-x border-dashed border-gray-400">
                            <p className="flex justify-center">ตามหนังสือชี้ชวน</p>
                            {fundData.data_from_sheet.Fund_Sell === "ดูหมายเหตุ" || fundData.data_from_sheet.Fund_Sell === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.Fund_Sell === "ยกเว้น" || fundData.data_from_sheet.Fund_Sell === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.Fund_Sell).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_sheet.Fund_Buy === "ดูหมายเหตุ" || fundData.data_from_sheet.Fund_Buy === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.Fund_Buy === "ยกเว้น" || fundData.data_from_sheet.Fund_Buy   === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.Fund_Buy).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_sheet.Fund_switch_In === "ดูหมายเหตุ" || fundData.data_from_sheet.Fund_switch_In=== "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.Fund_switch_In === "ยกเว้น" || fundData.data_from_sheet.Fund_switch_In  === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.Fund_switch_In).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_sheet.Fund_switch_Out === "ดูหมายเหตุ" || fundData.data_from_sheet.Fund_switch_Out === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.Fund_switch_Out === "ยกเว้น" || fundData.data_from_sheet.Fund_switch_Out === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.Fund_switch_Out).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_sheet.manage_fee === "ดูหมายเหตุ" || fundData.data_from_sheet.manage_fee  === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.manage_fee === "ยกเว้น" || fundData.data_from_sheet.manage_fee === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.manage_fee).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_sheet.ttl_fee === "ดูหมายเหตุ" || fundData.data_from_sheet.ttl_fee === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_sheet.ttl_fee === "ยกเว้น" || fundData.data_from_sheet.ttl_fee === "0") ? (
                                    <p className="flex justify-centerpy-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_sheet.ttl_fee).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                        </div>
                        <div className="px-4 py-1 grid grid-rows-7">
                            <p className="flex justify-center">เก็บจริง</p>
                            {fundData.data_from_real.Auc_Sell === "ดูหมายเหตุ" || fundData.data_from_real.Auc_Sell === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.Auc_Sell === "ยกเว้น" || fundData.data_from_real.Auc_Sell === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_real.Auc_Sell).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_real.Auc_Buy === "ดูหมายเหตุ" || fundData.data_from_real.Auc_switch_In === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.Auc_Buy === "ยกเว้น" || fundData.data_from_real.Auc_Buy === "0") ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_real.Auc_Buy).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_real.Auc_switch_In === "ดูหมายเหตุ" || fundData.data_from_real.Auc_switch_In === "-" ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.Auc_switch_In === "ยกเว้น" || fundData.data_from_real.Auc_switch_In === "0")  ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_real.Auc_switch_In).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_real.Auc_switch_Out === "ดูหมายเหตุ" || fundData.data_from_real.Auc_switch_Out=== "-"  ? (
                                <p className="flex justify-center py-2 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.Auc_switch_Out === "ยกเว้น" || fundData.data_from_real.Auc_switch_Out === "0")  ? (
                                    <p className="flex justify-center py-2 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center py-2 font-semibold">{parseFloat(fundData.data_from_real.Auc_switch_Out).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_real.manage_fee === "ดูหมายเหตุ" || fundData.data_from_real.manage_fee === "-" ? (
                                <p className="flex justify-center items-center py-5 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.manage_fee === "ยกเว้น" || fundData.data_from_real.manage_fee === "0") ? (
                                    <p className="flex justify-center items-center py-5 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center items-center py-5 font-semibold">{parseFloat(fundData.data_from_real.manage_fee).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                            {fundData.data_from_real.ttl_fee === "ดูหมายเหตุ" || fundData.data_from_real.ttl_fee === "-" ? (
                                <p className="flex justify-center items-center py-5 font-semibold">-
                                    <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                </p>
                            ) : (
                                (fundData.data_from_real.ttl_fee === "ยกเว้น" || fundData.data_from_real.ttl_fee === "0") ? (
                                    <p className="flex justify-center items-center py-5 font-semibold">0.00 <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                ) : (
                                    <p className="flex justify-center items-center py-5 font-semibold">{parseFloat(fundData.data_from_real.ttl_fee).toFixed(2)} <span className="font-normal ml-1">% ต่อปี</span>
                                        <p className='font-normal text-[9px] md:text-[11px] lg:text-[13px] 2xl:text-[17px] text-gray-500 '></p>
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-start-3 col-span-3 flex justify-center items-center w-full h-[50vh]">
                    <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
                        <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        กำลังโหลดข้อมูล...
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fee;