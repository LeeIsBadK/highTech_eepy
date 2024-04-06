import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


interface OperatingResultsProps {
    fund: string;
}
const first = <button className="2xl:w-[54px] lg:w-[48px] md:w-[45px] w-[42px] py-1 bg-[#00853e] text-white text-[9px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] rounded-[15px]">ดีที่สุด</button>
const second = <button className="2xl:w-[54px] lg:w-[48px] md:w-[45px] w-[42px] py-1 bg-[#00e76b] text-white text-[9px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] rounded-[15px]">ดีมาก</button>
const third = <button className="2xl:w-[54px] lg:w-[48px] md:w-[45px] w-[42px] py-1 bg-[#74ffb4] text-white text-[9px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] rounded-[15px]">ดี</button>

const apiClient = axios.create({
    baseURL: 'https://backend-ruby-eight.vercel.app',
});

const OperatingResults = ({ fund }: OperatingResultsProps) => {
    const [fundData, setFundData] = useState<any | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchDataForAllFunds = async () => {
            try {
                // Check if fundData is null before fetching the data
                if (!fundData && fund) {
                    const response = await apiClient.get('/page2/' + fund);
                    setFundData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/missing', { state: { from: location }, replace: true });
            }
        };

        fetchDataForAllFunds();
    }, [fundData, fund]);

    return (
        <div className="pb-[50px] space-y-8 p-4 md:p-6">
            <div className=" grid grid-cols-1 gap-y-6 md:gap-y-0 md:grid-cols-2 gap-x-8">
                <div className="bg-white shadow-md rounded-[10px] px-11 py-1"
                >
                    <div className="pt-8 pb-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Performance</div>
                    <div className="text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
                        {fundData ? (
                            fundData.operating_results.length !== 0 && fundData.operating_results.ผลตอบแทนกองทุนรวม && fundData.operating_results.ผลตอบแทนตัวชี้วัด ? (
                                <div>
                                    <div className="grid grid-cols-4"><p className="flex justify-center py-2 col-start-3">กองนี้</p><p className="flex justify-center py-2">เฉลี่ยในกลุ่ม</p></div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>3M</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['3_month'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['3_month']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['3_month'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['3_month']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>6M</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['6_month'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['6_month']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['6_month'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['6_month']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>1Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['1_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['1_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['1_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['1_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>3Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['3_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['3_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['3_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['3_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>5Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['5_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['5_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['5_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['5_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>10Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ผลตอบแทนกองทุนรวม['10_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนกองทุนรวม['10_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ผลตอบแทนตัวชี้วัด['10_year'] ? parseFloat(fundData.operating_results.ผลตอบแทนตัวชี้วัด['10_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                                </div>
                            ) : (
                                <div className="w-full h-[50vh] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                            )
                        ) : (
                            <div className="flex justify-center items-center w-full h-[50vh]">
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
                </div>
                <div className="bg-white shadow-md rounded-[10px] px-11 py-1"
                >
                    <div className="pt-8 pb-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Standrad Deviation</div>
                    <div className="text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
                        {fundData ? (
                            fundData.operating_results.length !== 0 && fundData.operating_results.ความผันผวนของกองทุนรวม && fundData.operating_results.ความผันผวนของตัวชี้วัด ? (
                                <div>
                                    <div className="grid grid-cols-4"><p className="flex justify-center py-2 col-start-3">กองนี้</p><p className="flex justify-center py-2">เฉลี่ยในกลุ่ม</p></div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>3M</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['3_month'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['3_month']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['3_month'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['3_month']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>6M</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['6_month'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['6_month']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['6_month'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['6_month']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>1Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['1_year'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['1_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['1_year'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['1_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>3Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['3_year'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['3_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['3_year'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['3_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>5Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['5_year'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['5_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['5_year'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['5_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-dashed border-gray-400 pt-1 pb-4 h-[53px]">
                                        <p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-4 pb-1"><p>10Y</p>
                                        <p className="flex justify-center col-start-3">{fundData.operating_results.ความผันผวนของกองทุนรวม['10_year'] ? parseFloat(fundData.operating_results.ความผันผวนของกองทุนรวม['10_year']).toFixed(2) + '%' : '-'}</p>
                                        <p className="flex justify-center">{fundData.operating_results.ความผันผวนของตัวชี้วัด['10_year'] ? parseFloat(fundData.operating_results.ความผันผวนของตัวชี้วัด['10_year']).toFixed(2) + '%' : '-'}</p>
                                    </div>
                                    <div className="grid grid-cols-4 pt-1 pb-4 h-[53px]"><p className="flex justify-center col-start-3"></p><p className="flex justify-center"></p></div>
                                </div>
                            ) : (
                                <div className="w-full h-[50vh] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                            )
                        ) : (
                            <div className="flex justify-center items-center w-full h-[50vh]">
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
                </div>
            </div>
            <div className="bg-white px-8 py-6 shadow-md rounded-[10px] space-y-4 text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] text-gray-700">
                <p>* ข้อมูลการจัดอันดับ Performance และ Standard Deviation ยึดจากสมาคมบริษัทจัดการลงทุนโดย</p>
                <div className="flex space-x-3 md:space-x-6">
                    <div className="flex flex-wrap items-center">{first}<span className="ml-2">= อยู่ในช่วงเปอร์เซ็นไทล์ 1-5</span></div>
                    <div className="flex flex-wrap items-center">{second}<span className="ml-2">= อยู่ในช่วงเปอร์เซ็นไทล์ 5-25</span></div>
                    <div className="flex flex-wrap items-center">{third}<span className="ml-2">= อยู่ในช่วงเปอร์เซ็นไทล์ 25-50</span></div>
                </div>
            </div>
        </div>
    );
};

export default OperatingResults;